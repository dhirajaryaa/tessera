# Contributing

Tessera is small because the bar is clear. A contribution is a source file, a registry entry and a doc page. The review is about the system, not the author.

## Branches

- `main` is published. The docs site deploys from it and the install commands resolve it.
- `dev` is the integration branch. Every feature and component pull request targets `dev`.
- Releases merge `dev` into `main`.

```bash
git clone git@github.com:dhirajaryaa/tessera.git
cd tessera
npm --prefix site install

git switch dev
git pull --ff-only
git switch -c feat/<name>
```

Use `feat/tooltip`, `fix/dialog-focus` or `docs/install-paths`. One topic per pull request.

Commit subjects are short and imperative:

```text
add fieldset component
fix select focus in safari
document the theme script
```

The body explains why. The diff shows what.

## Run the site

```bash
npm --prefix site run sync
npm --prefix site run dev
```

The site runs at `http://localhost:3000`. The sync script copies `registry/tessera/*.tsx`, `utils.ts` and `tessera.css` into `site/`. Those copies are gitignored. Never edit them.

```bash
npm --prefix site run typecheck
npm --prefix site run build
```

## Add a component

### 1. Write the source

Create `registry/tessera/<name>.tsx`.

- Kebab-case filename.
- Named exports.
- Forward refs for form controls and buttons.
- Spread native HTML attributes.
- Use `cn()` from `@/lib/utils`.
- Use tokens only: `bg-ts-surface`, `text-ts-ink`, `border-ts-line`, `rounded-ts`, `font-ts-mono`, `shadow-ts`.
- Focus pattern: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ts-ink`.
- No Radix, Headless UI, React Aria or CVA.
- No runtime dependency.

### 2. Register it

Add an entry to `registry.json`:

```json
{
  "name": "fieldset",
  "title": "Fieldset",
  "description": "A labelled group of related controls.",
  "category": "Forms",
  "files": ["fieldset.tsx"],
  "registryDependencies": ["input"],
  "dependencies": []
}
```

`files` names files inside `registry/tessera/`. `registryDependencies` names other registry entries the CLI must add. `dependencies` is for npm packages and should usually stay empty.

### 3. Index it

Add the slug and summary to `site/lib/components.ts`:

```ts
{
  slug: "fieldset",
  name: "Fieldset",
  category: "Forms",
  description: "A labelled group of related controls.",
  summary: "A legend, a rule and a group of fields.",
}
```

This drives the sidebar, the gallery and the component index.

### 4. Document it

Add an entry to `site/lib/component-docs.ts` with:

- `files` and optional `deps`
- a runnable `code` sample
- an `anatomy` paragraph
- a `props` table
- `use` and `avoid` lists
- an `a11y` list

The component page throws at build time if a slug is missing, so a blank page cannot ship.

### 5. Demo it

Add a case to `site/components/docs/demos.tsx`. Show the default, the variants, the disabled state and one real composition. Keep it interactive where that helps.

### 6. Sync and verify

```bash
npm --prefix site run sync
npm --prefix site run typecheck
npm --prefix site run build
```

Open the page at 1440, 1024, 768 and 390 pixels. Tab through the demo. Switch to Ink and Moss. Open a dialog, close it with Escape and confirm focus returns.

## Checklist

- [ ] The component solves a general interaction, not one page layout.
- [ ] It uses native HTML and React state. No new runtime dependency.
- [ ] Every colour, radius, font and shadow comes from a `--ts-*` token.
- [ ] It reads correctly in Paper, Ink and Moss.
- [ ] Keyboard: Tab reaches it, the expected keys work, focus is visible.
- [ ] ARIA states are present and correct where the pattern needs them.
- [ ] The file is kebab-case and exports named components.
- [ ] Refs and native HTML attributes are forwarded where they make sense.
- [ ] The demo shows the default, the variants and the disabled state.
- [ ] The docs explain when to use it and when to leave it out.
- [ ] Sync, typecheck and build pass.
- [ ] The pull request targets `dev`.

## Review

Review looks for:

- **Source first.** Read the registry file before the demo.
- **One system.** A new colour, radius or font needs a reason.
- **The third theme.** Moss is where hard-coded warm neutrals fail.
- **Small is allowed.** A fifteen-line component is a valid contribution.

A pull request is closed without merge when it:

- adds Radix, Headless UI, React Aria, CVA or another runtime package;
- hard-codes a colour or radius outside the tokens;
- changes the theme glyphs to sun and moon icons;
- ships a component with no keyboard or screen-reader path;
- targets `main` directly without a release reason.

## Fix a bug

Reproduce it in a branch. Add the smallest failing case to the relevant demo, then fix the component. If the bug is in a file you copied into your own project, fix it there and open an upstream pull request when the same fix belongs in the registry.

## Change the site

The site is a Next.js App Router project with static export. Routes live in `site/app`, shared UI in `site/components`, content objects in `site/lib`. Keep the tokens and the plain copy. A marketing page with a fabricated metric will be rejected.

## Test the CLI

Use a scratch directory, never the repository root:

```bash
mkdir -p /tmp/tessera-test && cd /tmp/tessera-test
node /path/to/tessera/bin/tessera.mjs init --yes
node /path/to/tessera/bin/tessera.mjs add button dialog
node /path/to/tessera/bin/tessera.mjs list
```

Check the created paths, the CSS import and that a second add reports skipped files instead of overwriting.

## Release

The maintainer merges `dev` into `main` when the set is coherent. That merge is the release: GitHub Pages deploys the site and the install commands resolve the new files. There is no npm publish step for the components.

If a component changes in a way that affects people who already copied it, write the migration note in the pull request and the release notes. A breaking rename is not a silent diff.

## Contributors

- **Dhiraj Arya** ([@dhirajaryaa](https://github.com/dhirajaryaa)) — Creator and maintainer
- **Claude AI** (Anthropic) — Automated co-creator and contributor

