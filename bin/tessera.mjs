#!/usr/bin/env node
// Tessera CLI — zero-dependency installer for the Tessera component library.
// Node builtins only. Commands: init, add <names...>, list, help, --version.

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const VERSION = '0.1.0';
const SCHEMA_URL = 'https://dhirajaryaa.github.io/tessera/schema.json';

const HERE = path.dirname(fileURLToPath(import.meta.url));
// Determine package root: if bin is a subdirectory of the package, use parent; otherwise use here.
function detectPackageRoot() {
  const candidates = [
    path.resolve(HERE, '..'),
    path.resolve(HERE),
  ];
  for (const p of candidates) {
    try {
      if (fs.existsSync(path.join(p, 'package.json')) && fs.existsSync(path.join(p, 'registry', 'tessera'))) {
        return p;
      }
    } catch { /* continue */ }
  }
  return path.resolve(HERE);
}
const PKG_ROOT = detectPackageRoot();
const REGISTRY_JSON_PATH = path.join(PKG_ROOT, 'registry.json');
const REGISTRY_SRC_DIR = path.join(PKG_ROOT, 'registry', 'tessera');

// ─────────────────────────── colors ───────────────────────────

function stdoutIsTTY() {
  try { return Boolean(process.stdout.isTTY); } catch { return false; }
}

function colorEnabled(flags) {
  if (flags.noColor) return false;
  if (process.env.NO_COLOR !== undefined && process.env.NO_COLOR !== '') return false;
  return stdoutIsTTY();
}

const CODES = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m',
  blue: '\x1b[34m', magenta: '\x1b[35m', cyan: '\x1b[36m',
  white: '\x1b[37m', gray: '\x1b[90m',
};

let _color = false;
function paint(code, text) {
  if (!_color) return text;
  return CODES[code] + text + CODES.reset;
}

const out = (s = '') => process.stdout.write(s + '\n');
const ok = (msg) => out(_color ? paint('green', '✓ ' + msg) : '✓ ' + msg);
const warn = (msg) => out(_color ? paint('yellow', '⚠ ' + msg) : '⚠ ' + msg);
const err = (msg) => out(_color ? paint('red', '✗ ' + msg) : '✗ ' + msg);
const note = (msg) => out(_color ? paint('cyan', 'ℹ ' + msg) : 'ℹ ' + msg);
const dim = (msg) => out(paint('dim', msg));

// ─────────────────────────── registry ───────────────────────────

function readRegistry() {
  let raw;
  try {
    raw = fs.readFileSync(REGISTRY_JSON_PATH, 'utf8');
  } catch {
    throw new Error('Could not find registry.json next to the CLI (' + REGISTRY_JSON_PATH + ').');
  }
  let list;
  try {
    list = JSON.parse(raw);
  } catch (e) {
    throw new Error('registry.json is not valid JSON: ' + e.message);
  }
  if (!Array.isArray(list)) throw new Error('registry.json must be an array of entries.');
  const byName = new Map();
  for (const entry of list) {
    if (entry && typeof entry.name === 'string') byName.set(entry.name, entry);
  }
  return { list, byName };
}

function sourceFile(entry, filename) {
  return path.join(REGISTRY_SRC_DIR, filename);
}

// Resolve entry + all transitive registryDependencies, base first.
function resolveEntries(names, byName) {
  const ordered = [];
  const seen = new Set();

  // base is always first (if it exists)
  const base = byName.get('base');

  function visit(name, stack) {
    const entry = byName.get(name);
    if (!entry) return null;
    if (seen.has(name)) return entry;
    if (stack.includes(name)) {
      throw new Error('Circular registryDependencies detected: ' + [...stack, name].join(' -> '));
    }
    for (const dep of entry.registryDependencies || []) {
      if (!byName.has(dep)) {
        throw new Error(`Component "${name}" depends on unknown component "${dep}".`);
      }
      visit(dep, [...stack, name]);
    }
    seen.add(name);
    ordered.push(entry);
    return entry;
  }

  if (base) { visit('base', []); }
  for (const name of names) {
    if (name === 'base') continue;
    visit(name, []);
  }
  return ordered;
}

// Simple Levenshtein for "did you mean".
function levenshtein(a, b) {
  a = a.toLowerCase(); b = b.toLowerCase();
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prev = new Array(n + 1);
  let curr = new Array(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;
  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[n];
}

function closeMatches(name, byName, limit = 3) {
  const scored = [];
  for (const key of byName.keys()) {
    if (key === 'base') continue;
    const d = levenshtein(name, key);
    const contains = key.includes(name.toLowerCase()) || name.toLowerCase().includes(key);
    if (d <= Math.max(2, Math.floor(name.length / 2)) || contains) {
      scored.push({ key, score: contains ? 0 : d });
    }
  }
  scored.sort((a, b) => a.score - b.score);
  return scored.slice(0, limit).map((s) => s.key);
}

// ─────────────────────────── config ───────────────────────────

function configPath(cwd) { return path.join(cwd, 'tessera.json'); }

function defaultConfig() {
  return { $schema: SCHEMA_URL, componentsDir: '', libDir: '', css: '', themeFile: '' };
}

function readConfig(cwd) {
  const p = configPath(cwd);
  try {
    if (!fs.existsSync(p)) return null;
    const parsed = JSON.parse(fs.readFileSync(p, 'utf8'));
    return Object.assign(defaultConfig(), parsed);
  } catch (e) {
    throw new Error('Could not read tessera.json: ' + e.message);
  }
}

function writeConfig(cwd, cfg) {
  // Normalize to forward slashes for portability in the JSON.
  const serializable = {
    $schema: SCHEMA_URL,
    componentsDir: toPosix(cfg.componentsDir),
    libDir: toPosix(cfg.libDir),
    css: toPosix(cfg.css),
    themeFile: toPosix(cfg.themeFile),
  };
  fs.writeFileSync(configPath(cwd), JSON.stringify(serializable, null, 2) + '\n', 'utf8');
  return serializable;
}

function toPosix(p) {
  return String(p).split(path.sep).join('/');
}

// ─────────────────────────── layout detection ───────────────────────────

function detectLayout(cwd) {
  const hasSrc = fs.existsSync(path.join(cwd, 'src'));
  const componentsDir = hasSrc ? path.join(cwd, 'src', 'components', 'tessera') : path.join(cwd, 'components', 'tessera');
  const libDir = hasSrc ? path.join(cwd, 'src', 'lib') : path.join(cwd, 'lib');
  return { hasSrc, componentsDir, libDir };
}

const CSS_CANDIDATES = [
  'app/globals.css',
  'src/app/globals.css',
  'src/styles/globals.css',
  'src/index.css',
  'src/globals.css',
  'styles/globals.css',
];

function findGlobalCSS(cwd) {
  for (const rel of CSS_CANDIDATES) {
    const abs = path.join(cwd, rel);
    if (fs.existsSync(abs)) return abs;
  }
  return null;
}

// ─────────────────────────── file ops ───────────────────────────

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function fileExists(p) {
  try { return fs.statSync(p).isFile(); } catch { return false; }
}

function ensureDirFor(filePath) {
  mkdirp(path.dirname(filePath));
}

/**
 * Copy a registry source file to dst.
 * Returns 'created' | 'skipped'. Throws if source missing.
 */
function copyIfNeeded(src, dst, { force }, report) {
  if (!fileExists(src)) {
    throw new Error('Missing registry source file: ' + src);
  }
  if (fileExists(dst) && !force) {
    report.push({ file: dst, status: 'skipped' });
    return 'skipped';
  }
  ensureDirFor(dst);
  fs.copyFileSync(src, dst);
  report.push({ file: dst, status: fileExists(dst) ? 'created' : 'created' });
  return 'created';
}

function writeIfNeeded(dst, content, { force }, report) {
  if (fileExists(dst) && !force) {
    report.push({ file: dst, status: 'skipped' });
    return 'skipped';
  }
  ensureDirFor(dst);
  fs.writeFileSync(dst, content, 'utf8');
  report.push({ file: dst, status: 'created' });
  return 'created';
}

// ─────────────────────────── CSS import insertion ───────────────────────────

const TESSERA_IMPORT = '@import "./tessera.css";';

function hasTesseraImport(content) {
  // Match either quote style, optional ./ prefix.
  return /@import\s+['"]\.?\/?tessera\.css['"]\s*;/.test(content);
}

function hasTailwindImport(content) {
  return /@import\s+['"]tailwindcss['"]\s*;/.test(content);
}

/**
 * Ensure the tessera import exists in the CSS file. Returns true if the file
 * was modified, false if it already contained the import.
 */
function ensureCSSImport(cssFile) {
  if (!fileExists(cssFile)) return false;
  const content = fs.readFileSync(cssFile, 'utf8');
  if (hasTesseraImport(content)) return false;

  const lines = content.split(/\r?\n/);
  let inserted = false;
  for (let i = 0; i < lines.length; i++) {
    if (!inserted && /@import\s+['"]tailwindcss['"]\s*;/.test(lines[i])) {
      lines.splice(i + 1, 0, TESSERA_IMPORT);
      inserted = true;
      break;
    }
  }
  let result;
  if (inserted) {
    result = lines.join('\n');
  } else {
    // No tailwind import — prepend.
    result = TESSERA_IMPORT + '\n' + content;
  }
  fs.writeFileSync(cssFile, result, 'utf8');
  return true;
}

// ─────────────────────────── init ───────────────────────────

function cmdInit(flags) {
  const cwd = path.resolve(flags.cwd || process.cwd());
  const layout = detectLayout(cwd);

  let componentsDir = flags.components ? path.resolve(cwd, flags.components) : layout.componentsDir;
  let libDir = flags.lib ? path.resolve(cwd, flags.lib) : layout.libDir;

  let existingCss = flags.css ? path.resolve(cwd, flags.css) : findGlobalCSS(cwd);
  let createdCss = false;

  if (!existingCss) {
    // No CSS file exists — create styles/globals.css with the two imports.
    const cssDir = flags.css ? path.dirname(path.resolve(cwd, flags.css))
      : path.join(cwd, 'styles');
    mkdirp(cssDir);
    existingCss = path.join(cssDir, 'globals.css');
    fs.writeFileSync(existingCss, '@import "tailwindcss";\n' + TESSERA_IMPORT + '\n', 'utf8');
    createdCss = true;
  }

  const cssDir = path.dirname(existingCss);
  const tesseraCssTarget = path.join(cssDir, 'tessera.css');

  const report = [];
  const force = Boolean(flags.force);

  // 1. tessera.json (preserve existing unless force)
  let cfg = readConfig(cwd);
  if (cfg) {
    // Preserve existing config values — only fill empties and honor flags.
    if (flags.components) cfg.componentsDir = componentsDir;
    if (flags.lib) cfg.libDir = libDir;
    if (flags.css) cfg.css = cssDir;
    cfg.$schema = cfg.$schema || SCHEMA_URL;
    cfg.componentsDir = cfg.componentsDir || componentsDir;
    cfg.libDir = cfg.libDir || libDir;
    cfg.css = cfg.css || cssDir;
    cfg.themeFile = cfg.themeFile || path.join(cfg.css, 'tessera.css');
  } else {
    cfg = {
      $schema: SCHEMA_URL,
      componentsDir,
      libDir,
      css: cssDir,
      themeFile: tesseraCssTarget,
    };
  }
  const writtenCfg = writeConfig(cwd, cfg);
  report.push({ file: configPath(cwd), status: 'updated' });

  // Use the config's actual paths from here on (respects preserved config).
  componentsDir = path.resolve(cwd, cfg.componentsDir);
  libDir = path.resolve(cwd, cfg.libDir);
  const cfgCssDir = path.resolve(cwd, cfg.css);
  const themeFile = path.resolve(cwd, cfg.themeFile || path.join(cfg.css, 'tessera.css'));

  // 2. utils.ts
  copyIfNeeded(path.join(REGISTRY_SRC_DIR, 'utils.ts'), path.join(libDir, 'utils.ts'), { force }, report);

  // 3. tessera.css
  copyIfNeeded(path.join(REGISTRY_SRC_DIR, 'tessera.css'), themeFile, { force }, report);

  // 4. insert import into the global CSS
  const globalCss = existingCss;
  let importAdded = false;
  if (fileExists(globalCss)) {
    importAdded = ensureCSSImport(globalCss);
  }

  // 5. ensure component dir exists
  mkdirp(componentsDir);

  // ── report ──
  if (flags.json) {
    out(JSON.stringify({ ok: true, config: writtenCfg, files: report, cssImport: importAdded || createdCss }, null, 2));
    return;
  }

  ok('Tessera initialized');
  dim('');
  dim('  Config:       ' + toPosix(path.relative(cwd, configPath(cwd))) || 'tessera.json');
  dim('  Components:   ' + toPosix(cfg.componentsDir));
  dim('  Lib:          ' + toPosix(cfg.libDir));
  dim('  Theme file:   ' + toPosix(cfg.themeFile));
  dim('  Global CSS:   ' + toPosix(path.relative(cwd, globalCss)));
  dim('');
  for (const r of report) {
    const rel = toPosix(path.relative(cwd, r.file));
    const label = r.status === 'skipped' ? paint('yellow', 'skipped (exists)') : paint('green', r.status);
    out('  ' + label + '  ' + rel);
  }
  if (createdCss) {
    note('Created ' + toPosix(path.relative(cwd, globalCss)) + ' with Tailwind + Tessera imports.');
  } else if (importAdded) {
    note('Added ' + TESSERA_IMPORT + ' to ' + toPosix(path.relative(cwd, globalCss)) + '.');
  } else {
    note('Tessera import already present in ' + toPosix(path.relative(cwd, globalCss)) + '.');
  }
  dim('');
  out('Next:');
  out('  ' + paint('cyan', 'tessera add button dialog'));
}

// ─────────────────────────── add ───────────────────────────

function cmdAdd(names, flags) {
  const cwd = path.resolve(flags.cwd || process.cwd());
  const { byName } = readRegistry();
  const force = Boolean(flags.force);
  const overwrite = Boolean(flags.overwrite) || force;

  let cfg = readConfig(cwd);
  let usingDefaults = false;
  if (!cfg) {
    usingDefaults = true;
    const layout = detectLayout(cwd);
    const css = findGlobalCSS(cwd) || path.join(cwd, 'styles', 'globals.css');
    cfg = {
      $schema: SCHEMA_URL,
      componentsDir: toPosix(path.relative(cwd, layout.componentsDir)),
      libDir: toPosix(path.relative(cwd, layout.libDir)),
      css: toPosix(path.relative(cwd, path.dirname(css))),
      themeFile: toPosix(path.relative(cwd, path.join(path.dirname(css), 'tessera.css'))),
    };
    if (!usingDefaults) { /* unreachable */ }
  }

  const componentsDir = path.resolve(cwd, cfg.componentsDir);
  const libDir = path.resolve(cwd, cfg.libDir);
  const themeFile = path.resolve(cwd, cfg.themeFile || path.join(cfg.css || 'styles', 'tessera.css'));
  const globalCssAbs = path.resolve(cwd, cfg.css || 'styles', 'globals.css');

  // Validate requested names; collect unknown.
  const unknown = [];
  const wanted = [];
  for (const name of names) {
    if (name === 'base') continue;
    if (!byName.has(name)) unknown.push(name);
    else wanted.push(name);
  }

  if (unknown.length > 0) {
    for (const name of unknown) {
      err('Unknown component: ' + name);
      const matches = closeMatches(name, byName);
      if (matches.length > 0) {
        note('Did you mean: ' + matches.join(', ') + '?');
      }
    }
    out('');
    out('Run ' + paint('cyan', 'tessera list') + ' to see all available components.');
    return 1;
  }

  if (wanted.length === 0 && !byName.has('base')) {
    err('Nothing to add. Pass one or more component names.');
    return 1;
  }

  // Expand deps. If no names provided, we add everything.
  const effectiveNames = wanted.length > 0 ? wanted : [...byName.keys()].filter((n) => n !== 'base');
  const ordered = resolveEntries(effectiveNames, byName);

  const report = [];
  let baseApplied = false;

  // Always ensure base (utils.ts + tessera.css).
  const baseEntry = byName.get('base');
  if (baseEntry) {
    copyIfNeeded(path.join(REGISTRY_SRC_DIR, 'utils.ts'), path.join(libDir, 'utils.ts'), { force: overwrite }, report);
    copyIfNeeded(path.join(REGISTRY_SRC_DIR, 'tessera.css'), themeFile, { force: overwrite }, report);
    baseApplied = true;
  } else {
    // Fallback: still try to place utils/css if present.
    try {
      copyIfNeeded(path.join(REGISTRY_SRC_DIR, 'utils.ts'), path.join(libDir, 'utils.ts'), { force: overwrite }, report);
      copyIfNeeded(path.join(REGISTRY_SRC_DIR, 'tessera.css'), themeFile, { force: overwrite }, report);
      baseApplied = true;
    } catch { /* no base sources */ }
  }

  // Insert CSS import so styles actually load.
  if (fileExists(globalCssAbs)) ensureCSSImport(globalCssAbs);

  // Copy each entry's files.
  const perComponent = [];
  for (const entry of ordered) {
    if (entry.name === 'base') continue;
    const files = [];
    for (const filename of entry.files || []) {
      const src = sourceFile(entry, filename);
      if (!fileExists(src)) {
        throw new Error(`Registry entry "${entry.name}" references missing file "${filename}".`);
      }
      const dst = path.join(componentsDir, path.basename(filename));
      const status = copyIfNeeded(src, dst, { force: overwrite }, report);
      files.push({ file: path.basename(filename), status });
    }
    perComponent.push({ name: entry.name, files, deps: entry.registryDependencies || [] });
  }

  if (flags.json) {
    out(JSON.stringify({
      ok: true,
      usingDefaults,
      componentsDir: toPosix(cfg.componentsDir),
      libDir: toPosix(cfg.libDir),
      themeFile: toPosix(path.relative(cwd, themeFile)),
      components: perComponent,
      files: report.map((r) => ({ file: toPosix(path.relative(cwd, r.file)), status: r.status })),
    }, null, 2));
    return 0;
  }

  if (usingDefaults) {
    note('No tessera.json found — using detected defaults.');
    dim('  (' + toPosix(cfg.componentsDir) + ', ' + toPosix(cfg.libDir) + ')');
    dim('  Run "tessera init" to pin these in tessera.json.');
    out('');
  }

  ok(baseApplied ? 'Base installed (utils.ts, tessera.css)' : 'Added components');

  for (const comp of perComponent) {
    const depNote = comp.deps.length ? paint('dim', '  (deps: ' + comp.deps.join(', ') + ')') : '';
    out('');
    out(paint('bold', '  ' + comp.name) + depNote);
    for (const f of comp.files) {
      const rel = toPosix(path.join(cfg.componentsDir, f.file));
      const label = f.status === 'created' ? paint('green', 'created') : paint('yellow', 'skipped ');
      out('    ' + label + '  ' + rel);
    }
  }

  out('');
  const importPath = toPosix(path.relative(cwd, componentsDir));
  out('Import it:');
  for (const comp of perComponent) {
    out('  ' + paint('cyan', `import { } from "@/components/tessera/${comp.name}"`));
  }
  out('');
  out(paint('dim', '  ↳ adjust the alias to match your ' + importPath + ' directory.'));
  return 0;
}

// ─────────────────────────── list ───────────────────────────

function cmdList(flags) {
  const { list } = readRegistry();
  const entries = list.slice().sort((a, b) => {
    // base first, then by category, then name
    if (a.name === 'base') return -1;
    if (b.name === 'base') return 1;
    return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
  });

  if (flags.json) {
    out(JSON.stringify(entries, null, 2));
    return 0;
  }

  const rows = entries.map((e) => ({
    name: e.name,
    category: e.category,
    description: e.description,
  }));
  const nameW = Math.max('NAME'.length, ...rows.map((r) => r.name.length));
  const catW = Math.max('CATEGORY'.length, ...rows.map((r) => r.category.length));
  const descW = Math.max('DESCRIPTION'.length, ...rows.map((r) => r.description.length));

  const line = (n, cat, desc) =>
    '  ' + n.padEnd(nameW) + '  ' + cat.padEnd(catW) + '  ' + desc.padEnd(descW);

  out(paint('bold', line('NAME', 'CATEGORY', 'DESCRIPTION')));
  out(paint('dim', '  ' + '-'.repeat(nameW + catW + descW + 4)));
  for (const r of rows) {
    out(line(paint('cyan', r.name.padEnd(nameW)), r.category.padEnd(catW), r.description));
  }
  out('');
  out('Add one: ' + paint('cyan', 'tessera add <name>'));
  return 0;
}

// ─────────────────────────── help / version ───────────────────────────

function cmdHelp() {
  const b = (s) => paint('bold', s);
  out(b('Tessera') + ' — copy-paste UI components, install with one command.');
  out('');
  out(b('Usage:'));
  out('  tessera <command> [options]');
  out('');
  out(b('Commands:'));
  out('  init                 Set up tessera.json and install base files.');
  out('  add <names...>       Add one or more components (resolves dependencies).');
  out('  list                 List all available components.');
  out('  help                 Show this help.');
  out('  --version            Print the version.');
  out('');
  out(b('Options:'));
  out('  --cwd <path>         Project directory (default: current directory).');
  out('  --components <path>  Override the components directory.');
  out('  --lib <path>         Override the lib directory.');
  out('  --css <path>         Override the global CSS file or directory.');
  out('  --yes                Accept defaults, no prompts.');
  out('  --force              Overwrite existing files.');
  out('  --overwrite          Overwrite existing component files (add).');
  out('  --list               With add: list components instead of adding.');
  out('  --json               Machine-readable JSON output.');
  out('  --no-color           Disable colored output.');
  out('');
  out(b('Examples:'));
  out('  ' + paint('cyan', 'npx github:dhirajaryaa/tessera@main init'));
  out('  ' + paint('cyan', 'npx github:dhirajaryaa/tessera@main add button dialog'));
  out('  ' + paint('cyan', 'npx github:dhirajaryaa/tessera@main list'));
  out('');
  out(b('Exit codes:') + ' 0 success, 1 user/CLI error.');
}

function cmdVersion() {
  out(VERSION);
}

// ─────────────────────────── arg parsing ───────────────────────────

function parseArgs(argv) {
  const flags = {
    cwd: undefined, components: undefined, lib: undefined, css: undefined,
    yes: false, force: false, overwrite: false, noColor: false,
    json: false, list: false, help: false, version: false,
  };
  const positional = [];
  const valueFlags = new Set(['--cwd', '--components', '--lib', '--css']);

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--') { positional.push(...argv.slice(i + 1)); break; }
    if (arg.startsWith('--')) {
      let key = arg;
      let inlineVal;
      const eq = arg.indexOf('=');
      if (eq !== -1) { key = arg.slice(0, eq); inlineVal = arg.slice(eq + 1); }

      if (valueFlags.has(key)) {
        const val = inlineVal !== undefined ? inlineVal : argv[++i];
        if (val === undefined) throw new Error(`Option ${key} requires a value.`);
        const name = key.replace(/^--/, '');
        flags[name] = val;
        continue;
      }
      switch (key) {
        case '--yes': case '-y': flags.yes = true; break;
        case '--force': flags.force = true; break;
        case '--overwrite': flags.overwrite = true; break;
        case '--no-color': flags.noColor = true; break;
        case '--json': flags.json = true; break;
        case '--list': flags.list = true; break;
        case '--help': case '-h': flags.help = true; break;
        case '--version': case '-v': flags.version = true; break;
        default:
          throw new Error('Unknown option: ' + key);
      }
      continue;
    }
    positional.push(arg);
  }
  return { flags, positional };
}

// ─────────────────────────── main ───────────────────────────

function main() {
  let parsed;
  try {
    parsed = parseArgs(process.argv.slice(2));
  } catch (e) {
    err(e.message);
    return 1;
  }
  const { flags, positional } = parsed;
  _color = colorEnabled(flags);

  if (flags.version) { cmdVersion(); return 0; }

  let command = positional[0];
  let rest = positional.slice(1);

  if (!command) {
    cmdHelp();
    return 1;
  }

  if (flags.help || command === 'help') {
    cmdHelp();
    return 0;
  }

  try {
    switch (command) {
      case 'init':
        cmdInit(flags);
        return 0;
      case 'add': {
        if (flags.list) return cmdList(flags);
        return cmdAdd(rest, flags);
      }
      case 'list':
        return cmdList(flags);
      case 'version':
        cmdVersion();
        return 0;
      default:
        err('Unknown command: ' + command);
        out('');
        cmdHelp();
        return 1;
    }
  } catch (e) {
    err(e.message || String(e));
    return 1;
  }
}

process.exitCode = main();
