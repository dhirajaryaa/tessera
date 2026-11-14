import type { Metadata } from "next";
import Link from "next/link";
import { PikaIcon } from "@pikaicons/react";
import {
  ArrowRightIcon,
  BotIcon,
  CodeIcon,
  FileIcon,
  GithubIcon,
} from "@pikaicons/core-free";
import { CodeBlock } from "@/components/docs/code-block";
import { DocsPageHeader } from "@/components/docs/page-header";

export const metadata: Metadata = {
  title: "For agents",
  description:
    "The Tessera agent contract: AGENTS.md, CLAUDE.md, llms.txt, the portable skill and prompts that respect the system.",
};

const files = [
  {
    name: "AGENTS.md",
    icon: FileIcon,
    where: "repository root",
    body: "The long contract. Repository layout, component rules, token names, install flow, verification commands and the list of things not to do.",
    href: "https://github.com/dhirajaryaa/tessera/blob/main/AGENTS.md",
  },
  {
    name: "CLAUDE.md",
    icon: CodeIcon,
    where: "repository root",
    body: "Claude Code specific notes: which directory to run commands from, where the files live and the short list of hard constraints.",
    href: "https://github.com/dhirajaryaa/tessera/blob/main/CLAUDE.md",
  },
  {
    name: "llms.txt",
    icon: BotIcon,
    where: "repository root",
    body: "A flat index for model context: install commands, component list, token names and links. Short enough to keep in a prompt.",
    href: "https://github.com/dhirajaryaa/tessera/blob/main/llms.txt",
  },
  {
    name: "skills/tessera/SKILL.md",
    icon: CodeIcon,
    where: "portable skill",
    body: "The same rules as a skill, with a component cheat sheet. Copy it into .claude/skills or .codex/skills.",
    href: "https://github.com/dhirajaryaa/tessera/blob/main/skills/tessera/SKILL.md",
  },
];

const guardrails = [
  "Use the --ts-* tokens. Never a Tailwind palette colour such as zinc or blue.",
  "Use native elements and React state. No Radix, no Headless UI, no CVA.",
  "Keep the radius small. No pill buttons and no full rounding on surfaces.",
  "Do not replace the four tile glyphs with sun and moon icons.",
  "Preserve keyboard behaviour, focus trap, Escape and focus restore.",
  "Run sync, typecheck and build before claiming the work is done.",
  "Do not overwrite a consumer's edited component. Report the diff instead.",
];

const prompt = `You are adding a settings screen to this app with Tessera.

1. Read AGENTS.md and the component docs in site/lib/component-docs.ts.
2. Add the parts you need:
   npx github:dhirajaryaa/tessera@main add switch select button toast
3. Build the screen at app/settings/page.tsx.
4. Use Field for every label. Use a Switch for settings that save at once.
5. Use one solid Button for the primary action and ghost for cancel.
6. Do not add a dependency. Do not invent a colour outside the tokens.
7. Run: cd site && npm run sync && npm run typecheck && npm run build
8. Report the files changed and any component you had to edit.`;

const agentApi = `npx github:dhirajaryaa/tessera@main init --yes --json
npx github:dhirajaryaa/tessera@main add button dialog --json
npx github:dhirajaryaa/tessera@main list --json`;

const mistakes = [
  {
    wrong: '<Button variant="primary">',
    right: '<Button>',
    note: "The default variant is solid. The named variants are solid, soft, outline, ghost and link.",
  },
  {
    wrong: '<Badge variant="accent">',
    right: '<Badge tone="accent">',
    note: "Badge uses tone, not variant. Six tones plus an optional dot.",
  },
  {
    wrong: '<Input label="Email" />',
    right: "<Field label=\"Email\" htmlFor=\"email\"><Input id=\"email\" /></Field>",
    note: "Input is the control. Field owns the label, hint and error.",
  },
  {
    wrong: '<Select options={[...]} />',
    right: '<Select><option value="a">A</option></Select>',
    note: "Select is a native select. Children are option elements.",
  },
  {
    wrong: 'import { Theme } from "@/components/tessera/theme"',
    right: 'import { ThemeProvider, useTheme } from "@/components/tessera/theme"',
    note: "The provider and hook are named exports.",
  },
];

export default function AgentsPage() {
  return (
    <>
      <DocsPageHeader
        eyebrow="The manual / For agents"
        title={
          <>
            Your agent
            <br />
            <em className="font-display font-normal italic text-ts-accent">
              reads the same rules.
            </em>
          </>
        }
        description="Tessera ships its context as files. An agent can install the parts, follow the token contract and check its own work without guessing at the API."
      />

      <div className="prose-tessera mt-8">
        <p>
          The kit is a good fit for an agent because nothing is hidden. The
          source is in the repository, the registry names every file, and the
          install is a copy. When the model is wrong, the diff is visible.
        </p>
        <p>
          The files below are the contract. They are deliberately repetitive:
          an agent may load only one of them.
        </p>
      </div>

      <div className="mt-6 grid gap-2">
        {files.map((file) => (
          <a
            key={file.name}
            href={file.href}
            target="_blank"
            rel="noreferrer"
            className="group grid grid-cols-[32px_1fr_auto] items-start gap-3 rounded-[8px] border border-ts-line bg-ts-surface p-3.5 transition-colors hover:border-ts-line-strong"
          >
            <span className="grid size-8 place-items-center rounded-[5px] border border-ts-line bg-ts-bg text-ts-muted transition-colors group-hover:border-ts-accent/40 group-hover:text-ts-accent">
              <PikaIcon icon={file.icon} size={14} strokeWidth={1.6} />
            </span>
            <span>
              <span className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] font-medium text-ts-ink">
                  {file.name}
                </span>
                <span className="font-mono text-[8px] uppercase tracking-[0.09em] text-ts-muted">
                  {file.where}
                </span>
              </span>
              <span className="mt-1 block text-[11.5px] leading-relaxed text-ts-muted">
                {file.body}
              </span>
            </span>
            <span className="mt-1 text-ts-muted transition-transform group-hover:translate-x-0.5">
              <PikaIcon icon={ArrowRightIcon} size={12} strokeWidth={1.7} />
            </span>
          </a>
        ))}
      </div>

      <div className="prose-tessera mt-10">
        <h2>Drop the skill into a project</h2>
        <p>
          The skill is a folder with one Markdown file. Claude Code reads it from{" "}
          <code>.claude/skills/tessera/SKILL.md</code>. Codex and OpenCode read{" "}
          <code>AGENTS.md</code> from the repository root. Copy the files you
          need; there is no installer for this part.
        </p>
      </div>

      <CodeBlock
        code={`git clone --depth 1 https://github.com/dhirajaryaa/tessera /tmp/tessera\nmkdir -p .claude/skills\ncp -r /tmp/tessera/skills/tessera .claude/skills/`}
        filename="terminal"
        className="mt-5"
      />

      <div className="prose-tessera mt-8">
        <p>
          If the project should also carry the repository conventions, copy{" "}
          <code>AGENTS.md</code> to the project root and adjust the paths. Keep
          the token rules and the no-dependency rule exactly as they are.
        </p>

        <h2>Machine output</h2>
        <p>
          Every command accepts <code>--json</code>. Use it when a script or an
          agent needs to know which files were created, updated or skipped.
        </p>
      </div>

      <CodeBlock code={agentApi} filename="terminal" className="mt-5" />

      <div className="prose-tessera mt-8">
        <h2>Guardrails</h2>
        <p>
          These are the lines an agent should not cross when working with the
          kit. They are also the lines a reviewer should check.
        </p>
      </div>

      <ul className="mt-4 grid gap-2.5">
        {guardrails.map((item) => (
          <li key={item} className="flex gap-3 text-[12.5px] leading-relaxed text-ts-muted">
            <span className="mt-[7px] size-1 shrink-0 bg-ts-accent" />
            {item}
          </li>
        ))}
      </ul>

      <div className="prose-tessera mt-10">
        <h2>The five API mistakes</h2>
        <p>
          These are the recurring errors from generated code. Each one comes from
          an older API shape or a shadcn habit.
        </p>
      </div>

      <div className="mt-5 overflow-hidden rounded-[10px] border border-ts-line">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-ts-line bg-ts-surface-2">
              <th className="px-3 py-2.5 font-mono text-[9px] uppercase tracking-[0.09em] text-ts-muted">
                Wrong
              </th>
              <th className="px-3 py-2.5 font-mono text-[9px] uppercase tracking-[0.09em] text-ts-muted">
                Right
              </th>
            </tr>
          </thead>
          <tbody>
            {mistakes.map((row) => (
              <tr key={row.wrong} className="border-b border-ts-line last:border-b-0">
                <td className="align-top px-3 py-3">
                  <code className="break-all font-mono text-[10.5px] text-ts-danger">
                    {row.wrong}
                  </code>
                </td>
                <td className="align-top px-3 py-3">
                  <code className="break-all font-mono text-[10.5px] text-ts-ink">
                    {row.right}
                  </code>
                  <p className="mt-1 text-[11px] leading-relaxed text-ts-muted">
                    {row.note}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose-tessera mt-10">
        <h2>A prompt that holds</h2>
        <p>
          Short prompts produce generic layouts. This one names the file, the
          parts, the constraints and the check. Change the screen, keep the
          shape.
        </p>
      </div>

      <CodeBlock code={prompt} filename="prompt.md" className="mt-5" />

      <div className="prose-tessera mt-8">
        <h2>Reviewing agent output</h2>
        <ol>
          <li>Read the installed files. Confirm they were not invented.</li>
          <li>
            Search for palette classes:{" "}
            <code>grep -R &quot;bg-zinc\\|text-blue\\|rounded-full&quot; src</code>.
          </li>
          <li>Tab through every new control. The focus ring must be visible.</li>
          <li>Switch to Ink and Moss. Check the muted text and the accent.</li>
          <li>Build the site or app. A type error is not a style opinion.</li>
          <li>
            If the agent edited a copied component, ask why. The answer belongs in
            the project or upstream in the registry.
          </li>
        </ol>
        <p>
          More detail lives in <Link href="/docs/contributing">Contributing</Link>.
          The repository itself is at{" "}
          <a
            href="https://github.com/dhirajaryaa/tessera"
            target="_blank"
            rel="noreferrer"
          >
            github.com/dhirajaryaa/tessera
          </a>
          .
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-ts-line pt-5">
        <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.1em] text-ts-muted">
          <PikaIcon icon={GithubIcon} size={11} strokeWidth={1.7} />
          Source, issues and pull requests
        </p>
        <Link
          href="/docs/contributing"
          className="link-quiet inline-flex items-center gap-2 text-[12.5px] font-semibold text-ts-ink"
        >
          Contributing
          <PikaIcon icon={ArrowRightIcon} size={13} strokeWidth={1.7} />
        </Link>
      </div>
    </>
  );
}
