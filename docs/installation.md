# Installation

Tessera is copied into your project, not installed as a runtime package. The CLI writes the token sheet and helpers once, then copies the parts you ask for.

## Requirements

- Node 18 or newer for the CLI
- React 18 or 19
- Tailwind CSS v4, imported with `@import "tailwindcss";`
- TypeScript
- A path alias such as `@/*` in `tsconfig.json`

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

`clsx` and `tailwind-merge` are needed by `cn()`. The CLI checks for them and prints the install command if they are missing.

## Init

```bash
npx github:dhirajaryaa/tessera#main init
```

The CLI detects `src/`, the components directory, the lib directory and the global CSS file. If detection is wrong, pass `--components`, `--lib` and `--css`.

Init writes or updates:

1. `tessera.json` at the project root.
2. `tessera.css` next to the global stylesheet. This holds the `--ts-*` tokens and the three themes.
3. `utils.ts` in the lib directory. It exports `cn()` and `useControllableState`.
4. The import line after Tailwind in the global CSS.

Existing files are not overwritten without `--force`.

## CSS import

```css
@import "tailwindcss";
@import "./tessera.css";
```

Tailwind must come first. The token sheet uses `@theme inline` to map every token to a Tailwind colour, radius, font and shadow. Without it, classes such as `bg-ts-surface` do nothing.

## Theme attribute

Set a default on the root element:

```html
<html lang="en" data-theme="paper">
```

Paper is the warm light default. Ink and Moss are dark. To follow the operating system, use the provider described in [theming.md](theming.md).

## Config

```json
{
  "$schema": "https://dhirajaryaa.github.io/tessera/schema.json",
  "componentsDir": "src/components/tessera",
  "libDir": "src/lib",
  "css": "src/app",
  "themeFile": "src/app/tessera.css"
}
```

Paths are relative to the project root. Commit the file so the next person and the next agent know where the parts live.

## Add components

```bash
npx github:dhirajaryaa/tessera#main add button dialog
npx github:dhirajaryaa/tessera#main list
```

The CLI resolves registry dependencies. For example, `theme-switcher` also adds `theme`.

Import the files from your project:

```tsx
import { Button } from "@/components/tessera/button";
import { Dialog, DialogClose } from "@/components/tessera/dialog";
```

## CLI reference

| Command | What it does |
| :--- | :--- |
| `init` | Write config, tokens, utils and the CSS import. |
| `add <names...>` | Copy components and their dependencies. |
| `list` | Print the registry with categories. |
| `--yes` | Accept detected paths. |
| `--force` | Overwrite existing files during init. |
| `--overwrite` | Overwrite component files during add. |
| `--cwd <path>` | Run against another directory. |
| `--components <path>` | Override the components directory. |
| `--lib <path>` | Override the lib directory. |
| `--css <path>` | Override the global CSS file or directory. |
| `--json` | Machine-readable output. |
| `--no-color` | Disable colour. |

## Manual installation

```bash
# 1. Helpers
npm install clsx tailwind-merge

# 2. Copy registry/tessera/tessera.css to your global CSS folder
# 3. Copy registry/tessera/utils.ts to your lib folder
# 4. Copy only the component files you want
# 5. Import tessera.css after Tailwind
```

## Updating

Add skips files that already exist. To take a newer version of one part:

```bash
npx github:dhirajaryaa/tessera#main add button --overwrite
```

Then read the diff. If you edited the file, the diff is the conversation.

## Troubleshooting

**Styles are missing.** Check the import order and the path. Tailwind first, Tessera second.

**`bg-ts-surface` does nothing.** The token sheet was not loaded. Confirm the import resolves from the CSS file that actually loads.

**The CLI picked the wrong folder.** Run init again with explicit paths. Existing files are preserved.

**Two copies of `cn()`.** Point `--lib` at the directory the project already uses, or edit the import in the copied component.

**`useTheme must be used inside <ThemeProvider>`.** Wrap the tree, or use the switcher only where the provider exists.
