# Theming

Themes are CSS variable blocks. There is no runtime style engine. Change a block or add one, and every component follows.

## How it works

`tessera.css` defines the same variable names under `:root, [data-theme="paper"]`, `[data-theme="ink"]` and `[data-theme="moss"]`. A theme change is one attribute on `<html>`.

The `@theme inline` block maps the tokens to Tailwind:

```css
@theme inline {
  --color-ts-surface: var(--ts-surface);
  --color-ts-ink: var(--ts-ink);
  --color-ts-line: var(--ts-line);
  --color-ts-accent: var(--ts-accent);
  --radius-ts: var(--ts-radius);
  --font-ts-sans: var(--ts-font-sans);
  --shadow-ts: var(--ts-shadow);
}
```

That is why `bg-ts-surface`, `text-ts-ink`, `border-ts-line`, `rounded-ts`, `font-ts-sans` and `shadow-ts` exist.

## Tokens

| Token | Role | Paper | Ink | Moss |
| :--- | :--- | :--- | :--- | :--- |
| `--ts-bg` | Page | `#f2ece1` | `#121110` | `#0d1712` |
| `--ts-surface` | Raised surface | `#fbf7ee` | `#1a1815` | `#14221a` |
| `--ts-surface-2` | Quiet fill | `#e9e1d3` | `#24211d` | `#1c2c22` |
| `--ts-ink` | Primary text | `#1a1712` | `#f2ece2` | `#e8f0e3` |
| `--ts-muted` | Secondary text | `#6e6558` | `#a79b8b` | `#9eb09f` |
| `--ts-line` | Hairline | `#d9cfbf` | `#332f29` | `#2a3a30` |
| `--ts-line-strong` | Visible border | `#b7aa96` | `#4a443b` | `#415546` |
| `--ts-accent` | One accent | `#e24a21` | `#ff6b3d` | `#e9b44c` |
| `--ts-accent-hover` | Accent hover | `#c83d18` | `#ff8159` | `#f3c467` |
| `--ts-accent-ink` | Text on accent | `#fff8ef` | `#1a1712` | `#151b11` |
| `--ts-success` | Success | `#24774e` | `#6bc596` | `#7fcf9a` |
| `--ts-warning` | Warning | `#8a5607` | `#e6a94a` | `#e9b44c` |
| `--ts-danger` | Danger | `#ac2f26` | `#f27d72` | `#f08a7c` |

Every theme also sets `--ts-radius`, `--ts-font-sans`, `--ts-font-mono`, `--ts-font-display` and `--ts-shadow`. The default radius is `8px`.

Each block sets `color-scheme`, so native scrollbars and controls match.

## Add a theme

```css
[data-theme="clay"] {
  color-scheme: light;

  --ts-bg: #efe7dc;
  --ts-surface: #faf4ea;
  --ts-surface-2: #e4d8c8;
  --ts-ink: #211a14;
  --ts-muted: #6f6154;
  --ts-line: #d6c7b4;
  --ts-line-strong: #b3a18b;
  --ts-accent: #a24a2a;
  --ts-accent-hover: #873b1f;
  --ts-accent-ink: #fff9f2;
  --ts-success: #2f6f4f;
  --ts-warning: #8a5607;
  --ts-danger: #a5302a;
}
```

Set `data-theme="clay"` on the root. To add it to the switcher, extend `ThemeName` and `themeOptions` in `theme.tsx` and add a glyph branch in `theme-switcher.tsx`.

## Radius and type

```css
:root {
  --ts-radius: 8px;
  --ts-font-sans: "Inter Tight Variable", "Inter Tight", system-ui, sans-serif;
  --ts-font-mono: "IBM Plex Mono", ui-monospace, monospace;
  --ts-font-display: "Instrument Serif", ui-serif, Georgia, serif;
}
```

The documentation site loads the three faces with Fontsource. A project can keep its own fonts and change only the values.

## Provider

`ThemeProvider` is optional. It stores the preference under `tessera-theme`, resolves `system` to Paper or Ink, and sets `data-theme` plus `color-scheme`.

```tsx
"use client";

import { ThemeProvider } from "@/components/tessera/theme";
import { ThemeSwitcher } from "@/components/tessera/theme-switcher";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultPreference="system">
      <ThemeSwitcher />
      {children}
    </ThemeProvider>
  );
}
```

`useTheme()` returns `preference`, `theme` and `setPreference`.

## No first-paint flash

Put this blocking script in the document head:

```tsx
const themeScript = `(function () {
  try {
    var preference = localStorage.getItem("tessera-theme") || "system";
    var dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = preference === "system" ? (dark ? "ink" : "paper") : preference;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme === "paper" ? "light" : "dark";
  } catch (error) {
    document.documentElement.dataset.theme = "paper";
  }
})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

The script and the provider read the same key.

## Glyphs

The switcher uses four tile glyphs: Paper (solid pane), Ink (cut pane), Moss (folded pane) and Auto (split pane). They share the 16px grid and read at 14px in a header. Do not replace them with sun and moon icons.

## Rules

- Use the tokens. A hard-coded hex in a component breaks every theme except the one you tested.
- Keep one accent per theme. Success, warning and danger are for state.
- Check contrast on all three themes, especially muted text on a surface.
- Set `color-scheme` in every theme block.
- Do not scope a theme to a card in a real interface. Keep one theme per viewport.
- The theme change itself is instant. Do not animate every colour.
