# Coding agents

Tessera ships its context as files. An agent can read the same rules you do, install the parts and check its own work.

## Files

| File | Where | What it is |
| :--- | :--- | :--- |
| `AGENTS.md` | root | The full contract: layout, rules, API, verification. |
| `CLAUDE.md` | root | Claude Code notes: commands, boundaries, constraints. |
| `llms.txt` | root | A flat index for model context. |
| `skills/tessera/SKILL.md` | portable | The same rules as a skill, with a component cheat sheet. |

## Install the skill

```bash
git clone --depth 1 https://github.com/dhirajaryaa/tessera /tmp/tessera
mkdir -p .claude/skills
cp -r /tmp/tessera/skills/tessera .claude/skills/
```

Claude Code reads `.claude/skills/tessera/SKILL.md`. Codex and OpenCode read `AGENTS.md` from the repository root. To carry the conventions into another project, copy `AGENTS.md` and adjust the paths, but keep the token and dependency rules.

## Machine output

Every CLI command accepts `--json`:

```bash
npx github:dhirajaryaa/tessera#main init --yes --json
npx github:dhirajaryaa/tessera#main add button dialog --json
npx github:dhirajaryaa/tessera#main list --json
```

The output names every file that was created, updated or skipped.

## Guardrails

- Use `--ts-*` tokens. Never a Tailwind palette colour.
- Use native elements and React state. No Radix, Headless UI or CVA.
- Keep the radius small. No pill buttons.
- Keep the four tile glyphs. No sun and moon.
- Preserve keyboard behaviour, focus trap, Escape and focus restore.
- Run sync, typecheck and build before claiming the work is done.
- Do not overwrite a consumer's edited component. Report the diff.

## Common API mistakes

| Wrong | Right |
| :--- | :--- |
| `<Button variant="primary">` | `<Button>` |
| `<Badge variant="accent">` | `<Badge tone="accent">` |
| `<Input label="Email" />` | `<Field label="Email" htmlFor="email"><Input id="email" /></Field>` |
| `<Select options={[...]} />` | `<Select><option value="a">A</option></Select>` |
| `DialogTrigger` / `DialogContent` | `<Dialog trigger={...} title={...}>` |
| `<TabsTrigger asChild>` | `<TabsTrigger value="x">` |

The default Button variant is `solid`. The variants are `solid`, `soft`, `outline`, `ghost` and `link`.

## Prompt that holds

```text
You are adding a settings screen to this app with Tessera.

1. Read AGENTS.md and the component docs in site/lib/component-docs.ts.
2. Add the parts you need:
   npx github:dhirajaryaa/tessera#main add switch select button toast
3. Build the screen at app/settings/page.tsx.
4. Use Field for every label. Use a Switch for settings that save at once.
5. Use one solid Button for the primary action and ghost for cancel.
6. Do not add a dependency. Do not invent a colour outside the tokens.
7. Run: cd site && npm run sync && npm run typecheck && npm run build
8. Report the files changed and any component you had to edit.
```

## Review agent output

1. Read the installed files. Confirm they were not invented.
2. Search for palette classes: `grep -R "bg-zinc\|text-blue\|rounded-full" src`.
3. Tab through every new control. The focus ring must be visible.
4. Switch to Ink and Moss. Check muted text and the accent.
5. Build the app. A type error is not a style opinion.
6. If the agent edited a copied component, ask why. The answer belongs in the project or upstream in the registry.

More detail lives in [../CONTRIBUTING.md](../CONTRIBUTING.md).
