# CLAUDE.md

Claude Code notes for Tessera. Read [AGENTS.md](AGENTS.md) first for the full contract.

## Commands

Run everything from `site/`:

```bash
cd site
npm install          # first time
npm run sync         # copy registry into the site
npm run dev          # docs site at http://localhost:3000
npm run typecheck    # tsc --noEmit
npm run build        # static export to site/out
```

The CLI lives at `bin/tessera.mjs`. Test it directly with Node:

```bash
node bin/tessera.mjs --help
node bin/tessera.mjs list
node bin/tessera.mjs --version
```

To test an install, use a scratch directory rather than the repository root:

```bash
mkdir -p /tmp/tessera-test && cd /tmp/tessera-test
node /path/to/tessera/bin/tessera.mjs init --yes
```

## Boundaries

- Edit canonical components in `registry/tessera/`.
- Never edit `site/components/tessera/`, `site/lib/utils.ts` or `site/styles/tessera.css`. `npm run sync` overwrites them.
- Update `registry.json`, `site/lib/components.ts`, `site/lib/component-docs.ts` and `site/components/docs/demos.tsx` together when adding a component.
- Never add Radix, Headless UI, React Aria, CVA or a runtime UI package.
- Keep `AGENTS.md`, `llms.txt`, `skills/tessera/SKILL.md` and `docs/` in sync with the real API.

## Constraints

- Use `--ts-*` tokens. No palette classes and no hard-coded hex in components.
- Default radius is `8px` (`--ts-radius`). No pill buttons.
- Theme glyphs are custom tiles. No sun, no moon.
- Focus ring: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ts-ink`.
- Copy is plain, short and specific. No em dashes in body copy.

## Skill

The portable skill is at `skills/tessera/SKILL.md`. To install it in another project:

```bash
mkdir -p .claude/skills
cp -r /path/to/tessera/skills/tessera .claude/skills/
```
