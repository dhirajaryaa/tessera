import type { Metadata } from "next";
import Link from "next/link";
import { PikaIcon } from "@pikaicons/react";
import { ArrowRightIcon } from "@pikaicons/core-free";
import { CodeBlock } from "@/components/docs/code-block";
import { DocsPageHeader } from "@/components/docs/page-header";
import { InstallCommand } from "@/components/site/install-command";

export const metadata: Metadata = {
  title: "Installation",
  description:
    "Install Tessera in a React project with Tailwind CSS v4. Init once, add the parts you need, keep the source.",
};

const quick = `# 1. Set up the token sheet, utils and config
npx github:dhirajaryaa/tessera@main init

# 2. Add only the parts you need
npx github:dhirajaryaa/tessera@main add button dialog

# 3. Import the file, not a package
import { Button } from "@/components/tessera/button";`;

const globalCss = `@import "tailwindcss";
@import "./tessera.css";`;

const config = `{
  "$schema": "https://dhirajaryaa.github.io/tessera/schema.json",
  "componentsDir": "src/components/tessera",
  "libDir": "src/lib",
  "css": "src/app",
  "themeFile": "src/app/tessera.css"
}`;

const manual = `# 1. Install the two class helpers
npm install clsx tailwind-merge

# 2. Copy the token sheet and utils from the repo
#    registry/tessera/tessera.css  ->  src/app/tessera.css
#    registry/tessera/utils.ts     ->  src/lib/utils.ts

# 3. Copy only the components you want
#    registry/tessera/button.tsx   ->  src/components/tessera/button.tsx

# 4. Import the token sheet after Tailwind in your global CSS`;

const html = `<html lang="en" data-theme="paper">`;

const themeScript = `<script>
  (function () {
    try {
      var preference = localStorage.getItem("tessera-theme") || "system";
      var dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var theme = preference === "system" ? (dark ? "ink" : "paper") : preference;
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme === "paper" ? "light" : "dark";
    } catch (error) {
      document.documentElement.dataset.theme = "paper";
    }
  })();
</script>`;

const cli = [
  {
    command: "init",
    note: "Writes tessera.json, the token sheet, utils.ts and the CSS import.",
  },
  {
    command: "add <names...>",
    note: "Copies the component files and any parts they depend on.",
  },
  {
    command: "list",
    note: "Prints every entry in the registry with its category.",
  },
  {
    command: "--yes",
    note: "Accept detected paths without prompting.",
  },
  {
    command: "--force",
    note: "Overwrite existing files. Use this for a deliberate upgrade.",
  },
  {
    command: "--overwrite",
    note: "With add: overwrite component files that already exist.",
  },
  {
    command: "--cwd <path>",
    note: "Run against another directory.",
  },
  {
    command: "--json",
    note: "Machine-readable output for scripts and agents.",
  },
];

export default function InstallationPage() {
  return (
    <>
      <DocsPageHeader
        eyebrow="The manual / Installation"
        title={
          <>
            Get the parts
            <br />
            <em className="font-display font-normal italic text-ts-accent">into your repo.</em>
          </>
        }
        description="Tessera is source code, not a dependency. One init writes the tokens and helpers. Each add copies a file you can read and change."
      >
        <div className="mt-6 max-w-[520px]">
          <InstallCommand command="npx github:dhirajaryaa/tessera@main init" />
        </div>
      </DocsPageHeader>

      <div className="prose-tessera mt-8">
        <h2>Before you start</h2>
        <p>Tessera assumes a modern React project. It does not scaffold one.</p>
        <ul>
          <li>Node 18 or newer for the CLI.</li>
          <li>React 18 or 19, with TypeScript in strict mode.</li>
          <li>Tailwind CSS v4, imported with <code>@import &quot;tailwindcss&quot;;</code>.</li>
          <li>
            A path alias in <code>tsconfig.json</code>:{" "}
            <code>@/*</code> pointing at the project root or <code>src</code>.
          </li>
          <li>
            <code>clsx</code> and <code>tailwind-merge</code>. The CLI checks for
            them and prints the install command if they are missing.
          </li>
        </ul>

        <h2>Quick start</h2>
        <p>
          Run init once per project. Run add for each part you want. The CLI
          detects <code>src/</code>, the components directory, the lib directory
          and your global CSS file. If detection is wrong, pass the path flags.
        </p>
      </div>

      <CodeBlock code={quick} filename="terminal" className="mt-5" />

      <div className="prose-tessera mt-8">
        <h2>What init writes</h2>
        <ul>
          <li>
            <code>tessera.json</code> at the project root. It pins the paths so
            later adds do not have to guess.
          </li>
          <li>
            <code>tessera.css</code> next to your global stylesheet. This holds
            the <code>--ts-*</code> tokens, the three themes and the small amount
            of CSS that belongs with them.
          </li>
          <li>
            <code>utils.ts</code> in the lib directory. It exports <code>cn()</code>{" "}
            plus a small controlled state helper.
          </li>
          <li>
            The import line, added after the Tailwind import in your global CSS.
            If no CSS file exists, init creates <code>styles/globals.css</code>.
          </li>
        </ul>
        <p>
          Existing files are never overwritten by default. Init reports{" "}
          <code>created</code>, <code>updated</code> or <code>skipped</code> for
          every path.
        </p>

        <h2>Wire the stylesheet</h2>
        <p>
          Tailwind must come first. The token sheet extends it with the{" "}
          <code>ts-</code> colour names, radius, fonts and shadow.
        </p>
      </div>

      <CodeBlock code={globalCss} filename="app/globals.css" className="mt-5" />

      <div className="prose-tessera mt-8">
        <p>
          The root element needs a default theme. Paper is the light default;
          Ink and Moss are dark. The theme switch changes{" "}
          <code>data-theme</code> at runtime.
        </p>
      </div>

      <CodeBlock code={html} filename="app/layout.tsx" className="mt-5" />

      <div className="prose-tessera mt-8">
        <p>
          If you use <code>ThemeProvider</code>, add the small blocking script in
          the document head so the first paint does not flash the wrong theme.
          The provider and script read the same{" "}
          <code>tessera-theme</code> key.
        </p>
      </div>

      <CodeBlock code={themeScript} filename="app/layout.tsx" className="mt-5" />

      <div className="prose-tessera mt-8">
        <h2>The config file</h2>
        <p>
          Paths are relative to the project root. Empty strings mean{" "}
          &quot;detect and fill in&quot;. Commit this file so the next person and
          the next agent know where the parts live.
        </p>
      </div>

      <CodeBlock code={config} filename="tessera.json" className="mt-5" />

      <div className="prose-tessera mt-8">
        <h2>CLI reference</h2>
      </div>

      <div className="mt-5 overflow-hidden rounded-[10px] border border-ts-line">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-ts-line bg-ts-surface-2">
              <th className="px-4 py-2.5 font-mono text-[9px] font-medium uppercase tracking-[0.1em] text-ts-muted">
                Command
              </th>
              <th className="px-4 py-2.5 font-mono text-[9px] font-medium uppercase tracking-[0.1em] text-ts-muted">
                What it does
              </th>
            </tr>
          </thead>
          <tbody>
            {cli.map((row) => (
              <tr key={row.command} className="border-b border-ts-line last:border-b-0">
                <td className="whitespace-nowrap px-4 py-3 align-top">
                  <code className="font-mono text-[11px] text-ts-ink">{row.command}</code>
                </td>
                <td className="px-4 py-3 text-[12.5px] leading-relaxed text-ts-muted">
                  {row.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose-tessera mt-8">
        <h2>Install without the CLI</h2>
        <p>
          The CLI is a convenience. Every part is a plain file, so you can copy
          it by hand. Use the same layout so imports and future adds still work.
        </p>
      </div>

      <CodeBlock code={manual} filename="terminal" className="mt-5" />

      <div className="prose-tessera mt-8">
        <h2>Updating a part</h2>
        <p>
          There is no version lock, and that is the point. Add copies skip files
          that already exist. When you want a newer version of one part, run{" "}
          <code>add &lt;name&gt; --overwrite</code>, then read the diff. If you
          have changed the file, the diff is the whole conversation.
        </p>

        <h2>Troubleshooting</h2>
        <h3>Styles are missing</h3>
        <p>
          Check the import order. <code>@import &quot;tailwindcss&quot;;</code>{" "}
          must come before <code>@import &quot;./tessera.css&quot;;</code>. In
          Next.js the import belongs in the root layout or the global stylesheet
          that the layout imports.
        </p>
        <h3>Classes like bg-ts-surface do nothing</h3>
        <p>
          The token sheet was not picked up. Confirm the file exists and that
          the import resolves from the CSS file that loads.
        </p>
        <h3>The CLI picked the wrong folder</h3>
        <p>
          Run init again with <code>--components</code>, <code>--lib</code> and{" "}
          <code>--css</code>. The config is updated in place and existing files
          are left alone.
        </p>
        <h3>Two copies of cn()</h3>
        <p>
          Point the CLI at the lib directory your project already uses, or edit
          the import in the copied component. There is no hidden resolution
          layer.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-ts-line pt-5">
        <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-ts-muted">
          Next: the tokens
        </p>
        <Link
          href="/docs/theming"
          className="link-quiet inline-flex items-center gap-2 text-[12.5px] font-semibold text-ts-ink"
        >
          Themes
          <PikaIcon icon={ArrowRightIcon} size={13} strokeWidth={1.7} />
        </Link>
      </div>
    </>
  );
}
