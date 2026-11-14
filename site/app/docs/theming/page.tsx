import type { Metadata } from "next";
import Link from "next/link";
import { PikaIcon } from "@pikaicons/react";
import { ArrowRightIcon } from "@pikaicons/core-free";
import { CodeBlock } from "@/components/docs/code-block";
import { DocsPageHeader } from "@/components/docs/page-header";
import { ThemeGlyph } from "@/components/tessera/theme-switcher";

export const metadata: Metadata = {
  title: "Themes",
  description:
    "Paper, Ink and Moss, the --ts-* token contract, custom themes and the ThemeProvider.",
};

const themeOptions = [
  { value: "paper", label: "Paper", note: "Warm light" },
  { value: "ink", label: "Ink", note: "Near black" },
  { value: "moss", label: "Moss", note: "Deep green" },
] as const;

const tokens = [
  { name: "--ts-bg", role: "Page background", paper: "#f2ece1", ink: "#121110", moss: "#0d1712" },
  { name: "--ts-surface", role: "Raised surface", paper: "#fbf7ee", ink: "#1a1815", moss: "#14221a" },
  { name: "--ts-surface-2", role: "Quiet fill", paper: "#e9e1d3", ink: "#24211d", moss: "#1c2c22" },
  { name: "--ts-ink", role: "Primary text", paper: "#1a1712", ink: "#f2ece2", moss: "#e8f0e3" },
  { name: "--ts-muted", role: "Secondary text", paper: "#6e6558", ink: "#a79b8b", moss: "#9eb09f" },
  { name: "--ts-line", role: "Hairline", paper: "#d9cfbf", ink: "#332f29", moss: "#2a3a30" },
  { name: "--ts-line-strong", role: "Visible border", paper: "#b7aa96", ink: "#4a443b", moss: "#415546" },
  { name: "--ts-accent", role: "The one accent", paper: "#e24a21", ink: "#ff6b3d", moss: "#e9b44c" },
  { name: "--ts-accent-hover", role: "Accent hover", paper: "#c83d18", ink: "#ff8159", moss: "#f3c467" },
  { name: "--ts-accent-ink", role: "Text on accent", paper: "#fff8ef", ink: "#1a1712", moss: "#151b11" },
  { name: "--ts-success", role: "Success", paper: "#24774e", ink: "#6bc596", moss: "#7fcf9a" },
  { name: "--ts-warning", role: "Warning", paper: "#8a5607", ink: "#e6a94a", moss: "#e9b44c" },
  { name: "--ts-danger", role: "Danger", paper: "#ac2f26", ink: "#f27d72", moss: "#f08a7c" },
];

const customTheme = `/* Add a fourth mood beside the built-in blocks. */
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
}`;

const provider = `"use client";

import { ThemeProvider } from "@/components/tessera/theme";
import { ThemeSwitcher } from "@/components/tessera/theme-switcher";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultPreference="system">
      <header className="flex items-center justify-between p-4">
        <span>Tessera</span>
        <ThemeSwitcher />
      </header>
      {children}
    </ThemeProvider>
  );
}`;

const useTheme = `"use client";

import { useTheme } from "@/components/tessera/theme";

export function ThemeLabel() {
  const { preference, theme, setPreference } = useTheme();

  return (
    <button type="button" onClick={() => setPreference("ink")}>
      {preference} / {theme}
    </button>
  );
}`;

const radius = `:root,
[data-theme="paper"] {
  /* Square-ish is the default. Keep it small. */
  --ts-radius: 8px;

  /* The site loads these faces with Fontsource.
     Point them at whatever your project already ships. */
  --ts-font-sans: "Inter Tight Variable", "Inter Tight", system-ui, sans-serif;
  --ts-font-mono: "IBM Plex Mono", ui-monospace, monospace;
  --ts-font-display: "Instrument Serif", ui-serif, Georgia, serif;
}`;

const antiFlash = `// app/layout.tsx
const themeScript = \`(function () {
  try {
    var preference = localStorage.getItem("tessera-theme") || "system";
    var dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = preference === "system" ? (dark ? "ink" : "paper") : preference;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme === "paper" ? "light" : "dark";
  } catch (error) {
    document.documentElement.dataset.theme = "paper";
  }
})();\`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}`;

export default function ThemingPage() {
  return (
    <>
      <DocsPageHeader
        eyebrow="The manual / Themes"
        title={
          <>
            Three moods.
            <br />
            <em className="font-display font-normal italic text-ts-accent">One contract.</em>
          </>
        }
        description="Themes are CSS variable blocks. There is no runtime style engine. Change a block, or add one of your own, and every component follows."
      />

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {themeOptions
          .map((option) => (
            <div
              key={option.value}
              data-theme={option.value}
              className="rounded-[9px] border border-ts-line bg-ts-bg p-3"
            >
              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-[5px] border border-ts-line bg-ts-surface text-ts-ink">
                  <ThemeGlyph theme={option.value} className="size-3.5" />
                </span>
                <div>
                  <p className="text-[12px] font-semibold leading-tight text-ts-ink">
                    {option.label}
                  </p>
                  <p className="font-mono text-[8px] uppercase tracking-[0.08em] text-ts-muted">
                    {option.note}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <span className="size-5 rounded-[3px] border border-ts-line-strong bg-ts-bg" />
                <span className="size-5 rounded-[3px] border border-ts-line-strong bg-ts-surface" />
                <span className="size-5 rounded-[3px] border border-ts-line-strong bg-ts-ink" />
                <span className="size-5 rounded-[3px] border border-ts-line-strong bg-ts-accent" />
              </div>
            </div>
          ))}
      </div>

      <div className="prose-tessera mt-8">
        <h2>How a theme is applied</h2>
        <p>
          The token sheet defines the same variable names three times, under{" "}
          <code>:root, [data-theme=&quot;paper&quot;]</code>,{" "}
          <code>[data-theme=&quot;ink&quot;]</code> and{" "}
          <code>[data-theme=&quot;moss&quot;]</code>. A theme change is one
          attribute on <code>&lt;html&gt;</code>. Nothing re-renders, nothing is
          fetched, and the browser can still optimise the paint.
        </p>
        <p>
          The <code>@theme inline</code> block at the top of{" "}
          <code>tessera.css</code> maps every token to a Tailwind colour, radius,
          font or shadow. That is why <code>bg-ts-surface</code> and{" "}
          <code>border-ts-line</code> exist as utilities.
        </p>
      </div>

      <div className="mt-5 overflow-hidden rounded-[10px] border border-ts-line">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-left">
            <thead>
              <tr className="border-b border-ts-line bg-ts-surface-2">
                <th className="px-3 py-2.5 font-mono text-[9px] font-medium uppercase tracking-[0.09em] text-ts-muted">
                  Token
                </th>
                <th className="px-3 py-2.5 font-mono text-[9px] font-medium uppercase tracking-[0.09em] text-ts-muted">
                  Role
                </th>
                <th className="px-3 py-2.5 font-mono text-[9px] font-medium uppercase tracking-[0.09em] text-ts-muted">
                  Paper
                </th>
                <th className="px-3 py-2.5 font-mono text-[9px] font-medium uppercase tracking-[0.09em] text-ts-muted">
                  Ink
                </th>
                <th className="px-3 py-2.5 font-mono text-[9px] font-medium uppercase tracking-[0.09em] text-ts-muted">
                  Moss
                </th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token) => (
                <tr key={token.name} className="border-b border-ts-line last:border-b-0">
                  <td className="whitespace-nowrap px-3 py-2.5">
                    <code className="font-mono text-[10.5px] text-ts-ink">{token.name}</code>
                  </td>
                  <td className="px-3 py-2.5 text-[11.5px] text-ts-muted">{token.role}</td>
                  {([token.paper, token.ink, token.moss] as const).map((value, index) => (
                    <td key={index} className="whitespace-nowrap px-3 py-2.5">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-ts-muted">
                        <span
                          className="size-3 rounded-[2px] border border-black/15"
                          style={{ background: value }}
                        />
                        {value}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="prose-tessera mt-8">
        <h2>Add a theme</h2>
        <p>
          Copy a block, rename the attribute, change the values. Keep the variable
          names exactly as they are. Every component reads these names and nothing
          else, so a new block is the whole integration.
        </p>
      </div>

      <CodeBlock code={customTheme} filename="app/tessera.css" className="mt-5" />

      <div className="prose-tessera mt-8">
        <p>
          Then set <code>data-theme=&quot;clay&quot;</code> on the root element.
          If you want the switcher to offer it, extend <code>ThemeName</code> and{" "}
          <code>themeOptions</code> in <code>theme.tsx</code>, and add a glyph in{" "}
          <code>theme-switcher.tsx</code>. The menu maps over the options, so the
          new entry appears without another component.
        </p>

        <h2>Radius and type</h2>
        <p>
          The default radius is <code>8px</code>. That is deliberate: square
          enough to read as a tile, soft enough not to feel like a spreadsheet.
          Buttons and inputs use the same token. Badges use a smaller fixed
          radius because they are marks, not controls.
        </p>
        <p>
          The three font tokens are plain CSS families. The documentation site
          loads Instrument Serif, Inter Tight and IBM Plex Mono with Fontsource.
          A consuming project can keep its own faces and change only the token
          values.
        </p>
      </div>

      <CodeBlock code={radius} filename="app/tessera.css" className="mt-5" />

      <div className="prose-tessera mt-8">
        <h2>The provider</h2>
        <p>
          <code>ThemeProvider</code> is optional. Use it when the preference
          should persist and follow the operating system. It stores one key,{" "}
          <code>tessera-theme</code>, and sets <code>data-theme</code> plus{" "}
          <code>color-scheme</code> on the document element.
        </p>
      </div>

      <CodeBlock code={provider} filename="app/providers.tsx" className="mt-5" />

      <div className="prose-tessera mt-8">
        <p>
          <code>useTheme()</code> returns the stored preference, the resolved
          theme and the setter. Use it when a component needs to react to the
          current theme without reading the attribute by hand.
        </p>
      </div>

      <CodeBlock code={useTheme} filename="theme-label.tsx" className="mt-5" />

      <div className="prose-tessera mt-8">
        <h2>No flash on first paint</h2>
        <p>
          A static export cannot know the stored preference on the server. Put
          this script in the document head, before the body paints. Mark the root
          with <code>suppressHydrationWarning</code> because the attribute is
          added after React renders the server markup.
        </p>
      </div>

      <CodeBlock code={antiFlash} filename="app/layout.tsx" className="mt-5" />

      <div className="prose-tessera mt-8">
        <h2>The glyphs</h2>
        <p>
          The switcher does not use a sun and a moon. Each theme has a small tile
          window: Paper is a solid pane, Ink is cut, Moss is folded, Auto is
          split. The marks share the same 16px grid as the rest of the kit, so
          they read at 14px in a header without a label.
        </p>

        <h2>Rules for themes</h2>
        <ul>
          <li>
            Use the tokens. A hard-coded hex inside a component breaks every theme
            except the one you tested.
          </li>
          <li>
            Keep one accent per theme. The success, warning and danger tokens are
            for state, not decoration.
          </li>
          <li>
            Check contrast on all three themes. Muted text on a surface is the
            usual failure.
          </li>
          <li>
            Set <code>color-scheme</code> in the theme block. Native controls and
            scrollbars need it.
          </li>
          <li>
            Do not scope a theme to a card. Two themes in one viewport muddle the
            accent rule. The documentation uses scoped previews only to show what
            a theme looks like.
          </li>
        </ul>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-ts-line pt-5">
        <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-ts-muted">
          Next: how to use a part
        </p>
        <Link
          href="/docs/principles"
          className="link-quiet inline-flex items-center gap-2 text-[12.5px] font-semibold text-ts-ink"
        >
          Principles
          <PikaIcon icon={ArrowRightIcon} size={13} strokeWidth={1.7} />
        </Link>
      </div>
    </>
  );
}
