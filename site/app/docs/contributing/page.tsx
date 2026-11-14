import type { Metadata } from "next";
import Link from "next/link";
import { PikaIcon } from "@pikaicons/react";
import {
  ArrowRightIcon,
  CheckTickSquareIcon,
  GithubIcon,
  MultipleCrossCancelIcon,
} from "@pikaicons/core-free";
import { CodeBlock } from "@/components/docs/code-block";
import { DocsPageHeader } from "@/components/docs/page-header";

export const metadata: Metadata = {
  title: "Contributing",
  description:
    "Branch workflow, the registry contract and the review checklist for adding a Tessera component.",
};

const branches = `# one time
git clone git@github.com:dhirajaryaa/tessera.git
cd tessera
npm --prefix site install

# every change
git switch dev
git pull --ff-only
git switch -c feat/<component-name>

# when the work is ready
git push -u origin feat/<component-name>
gh pr create --base dev --head feat/<component-name>`;

const commands = `npm --prefix site run sync
npm --prefix site run typecheck
npm --prefix site run build
npm --prefix site run dev`;

const registryEntry = `{
  "name": "fieldset",
  "title": "Fieldset",
  "description": "A labelled group of related controls.",
  "category": "Forms",
  "files": [
    "fieldset.tsx"
  ],
  "registryDependencies": [
    "input"
  ],
  "dependencies": []
}`;

const componentFile = `"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface FieldsetProps
  extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend: React.ReactNode;
}

export function Fieldset({ legend, className, children, ...props }: FieldsetProps) {
  return (
    <fieldset
      className={cn("grid gap-4 border-t border-ts-line pt-4", className)}
      {...props}
    >
      <legend className="px-0 font-mono text-[9px] uppercase tracking-[0.1em] text-ts-muted">
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}`;

const componentsEntry = `{
  slug: "fieldset",
  name: "Fieldset",
  category: "Forms",
  description: "A labelled group of related controls.",
  summary: "A legend, a rule and a group of fields.",
}`;

const docsEntry = `fieldset: {
  files: ["fieldset.tsx"],
  deps: ["input"],
  code: \`import { Fieldset } from "@/components/tessera/fieldset";

export function Details() {
  return (
    <Fieldset legend="Billing address">
      {/* fields */}
    </Fieldset>
  );
}\`,
  anatomy: "A native fieldset with a legend and a top rule.",
  props: [
    { name: "legend", type: "ReactNode", description: "The visible group label." },
  ],
  use: ["Related controls share one name."],
  avoid: ["A group with one control. Drop the wrapper."],
  a11y: ["legend names the group for assistive tech."],
},`;

const checklist = [
  "The component solves a general interaction, not one page layout.",
  "It uses native HTML and React state. No new runtime dependency.",
  "Every colour, radius, font and shadow comes from a --ts-* token.",
  "It reads correctly in Paper, Ink and Moss.",
  "Keyboard: Tab reaches it, the expected keys work, focus is visible.",
  "ARIA states are present and correct where the pattern needs them.",
  "The file is named in kebab-case and exports named components.",
  "Refs and native HTML attributes are forwarded where they make sense.",
  "The demo shows the default, the variants and the disabled state.",
  "The docs explain when to use it and when to leave it out.",
  "npm run sync, npm run typecheck and npm run build pass.",
  "The pull request targets dev, not main.",
];

const review = [
  {
    title: "Source first",
    body: "Read the registry file before the demo. If the implementation is hard to read, the demo is hiding it.",
  },
  {
    title: "One system",
    body: "A new colour, radius or font needs a reason. Most contributions should add zero tokens.",
  },
  {
    title: "The third theme",
    body: "Check Moss last. It is the theme where hard-coded warm neutrals fail.",
  },
  {
    title: "Small is allowed",
    body: "A component can be fifteen lines. Refusing a wrapper is a valid review outcome.",
  },
];

export default function ContributingPage() {
  return (
    <>
      <DocsPageHeader
        eyebrow="The manual / Contributing"
        title={
          <>
            Send a part.
            <br />
            <em className="font-display font-normal italic text-ts-accent">
              Bring the reasons.
            </em>
          </>
        }
        description="Tessera is small because the bar is clear. A contribution is a source file, a registry entry and a doc page. The review is about the system, not the author."
      >
        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href="https://github.com/dhirajaryaa/tessera"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-ts border border-ts-line bg-ts-surface px-3 text-[12px] font-medium text-ts-ink transition-colors hover:border-ts-line-strong"
          >
            <PikaIcon icon={GithubIcon} size={13} strokeWidth={1.7} />
            Repository
          </a>
          <a
            href="https://github.com/dhirajaryaa/tessera/issues"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-ts border border-transparent px-3 text-[12px] font-medium text-ts-muted transition-colors hover:text-ts-ink"
          >
            Open an issue
          </a>
        </div>
      </DocsPageHeader>

      <div className="prose-tessera mt-8">
        <h2>Branches</h2>
        <p>
          <code>main</code> is the published branch. The documentation site
          deploys from it, and the install commands point at it.{" "}
          <code>dev</code> is the integration branch. Work lands in{" "}
          <code>dev</code> first, then moves to <code>main</code> in a release
          commit.
        </p>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <div className="rounded-[8px] border border-ts-line bg-ts-surface p-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-ts-accent">
            main
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-ts-muted">
            Stable. Published site and registry. Only release merges and urgent
            fixes.
          </p>
        </div>
        <div className="rounded-[8px] border border-ts-line bg-ts-surface p-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-ts-ink">
            dev
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-ts-muted">
            Integration. Every feature and component pull request targets this
            branch.
          </p>
        </div>
      </div>

      <CodeBlock code={branches} filename="terminal" className="mt-5" />

      <div className="prose-tessera mt-8">
        <p>
          Keep the branch name descriptive: <code>feat/tooltip</code>,{" "}
          <code>fix/dialog-focus</code>, <code>docs/install-paths</code>. One
          topic per pull request. If you rename the branch, reopen the pull
          request against <code>dev</code>.
        </p>
        <p>
          Commit subjects are short and imperative:{" "}
          <code>add tooltip component</code>, <code>fix select focus in safari</code>.
          The body explains why, not what. The diff already shows what.
        </p>
      </div>

      <div className="prose-tessera mt-10">
        <h2>Add a component</h2>
        <p>
          There are five files to touch. The registry is the source of truth; the
          site is generated from it for the parts and linked to it for the docs.
        </p>
      </div>

      <ol className="mt-5 grid gap-4">
        {[
          {
            title: "Write the component",
            body: (
              <>
                Create <code>registry/tessera/&lt;name&gt;.tsx</code>. Named
                export, kebab-case file, tokens only, native elements, forwarded
                ref where the control needs one.
              </>
            ),
          },
          {
            title: "Register it",
            body: (
              <>
                Add an entry to <code>registry.json</code>. Name the files, the
                category and any other registry entries it needs. The CLI reads
                this file when someone runs <code>add</code>.
              </>
            ),
          },
          {
            title: "Index it",
            body: (
              <>
                Add the slug and summary to <code>site/lib/components.ts</code>.
                This drives the sidebar, the gallery and the component index.
              </>
            ),
          },
          {
            title: "Document it",
            body: (
              <>
                Add the code, props and guidance to{" "}
                <code>site/lib/component-docs.ts</code>. The component page reads
                this object, so a missing entry is a build error, not a blank
                page.
              </>
            ),
          },
          {
            title: "Demo it",
            body: (
              <>
                Add a case to <code>site/components/docs/demos.tsx</code>. Show
                the default, the variants, the disabled state and one real
                composition if the part has one.
              </>
            ),
          },
        ].map((step, index) => (
          <li
            key={step.title}
            className="grid grid-cols-[34px_1fr] gap-3 rounded-[8px] border border-ts-line bg-ts-surface p-4"
          >
            <span className="font-mono text-[9px] leading-6 text-ts-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-[13px] font-semibold text-ts-ink">{step.title}</h3>
              <p className="mt-1 text-[12px] leading-relaxed text-ts-muted">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="prose-tessera mt-8">
        <h3>Registry entry</h3>
      </div>
      <CodeBlock code={registryEntry} filename="registry.json" className="mt-4" />

      <div className="prose-tessera mt-8">
        <h3>The source file</h3>
        <p>
          This is the shape we expect. Small, typed, exported by name, and honest
          about what it is.
        </p>
      </div>
      <CodeBlock code={componentFile} filename="registry/tessera/fieldset.tsx" className="mt-4" />

      <div className="prose-tessera mt-8">
        <h3>The site entries</h3>
      </div>
      <CodeBlock code={componentsEntry} filename="site/lib/components.ts" className="mt-4" />
      <CodeBlock code={docsEntry} filename="site/lib/component-docs.ts" className="mt-4" />

      <div className="mt-8 rounded-[7px] border-l-2 border-ts-accent bg-ts-surface-2/60 px-4 py-3">
        <p className="text-[13px] leading-relaxed text-ts-ink">
          The sync script copies <code>registry/tessera/*.tsx</code>,{" "}
          <code>utils.ts</code> and <code>tessera.css</code> into the site. Do
          not edit the copies under <code>site/components/tessera/</code>; they
          are generated and gitignored.
        </p>
      </div>

      <div className="prose-tessera mt-8">
        <h2>Verify</h2>
        <p>
          Run these from the repository root. The site scripts run the registry
          sync first, so a stale copy cannot hide a broken import.
        </p>
      </div>

      <CodeBlock code={commands} filename="terminal" className="mt-5" />

      <div className="prose-tessera mt-8">
        <p>
          Open the local site and test the new page at 1440, 1024, 768 and 390
          pixels. Tab through the demo. Switch to Ink and Moss. Open a dialog,
          close it with Escape and confirm focus returns to the trigger.
        </p>

        <h2>Review checklist</h2>
        <p>
          Paste this into the pull request or check it before you ask for review.
        </p>
      </div>

      <ul className="mt-4 grid gap-2.5">
        {checklist.map((item) => (
          <li key={item} className="flex gap-3 text-[12.5px] leading-relaxed text-ts-muted">
            <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-[3px] border border-ts-line-strong text-ts-success">
              <PikaIcon icon={CheckTickSquareIcon} size={9} strokeWidth={2.2} />
            </span>
            {item}
          </li>
        ))}
      </ul>

      <div className="prose-tessera mt-10">
        <h2>What review looks for</h2>
      </div>

      <div className="mt-5 grid gap-px overflow-hidden rounded-[10px] border border-ts-line bg-ts-line sm:grid-cols-2">
        {review.map((item) => (
          <div key={item.title} className="bg-ts-surface p-4">
            <p className="text-[12.5px] font-semibold text-ts-ink">{item.title}</p>
            <p className="mt-1 text-[11.5px] leading-relaxed text-ts-muted">
              {item.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[8px] border border-ts-line bg-ts-surface p-4">
        <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.1em] text-ts-ink">
          <PikaIcon icon={MultipleCrossCancelIcon} size={11} strokeWidth={1.9} className="text-ts-danger" />
          A pull request is closed without merge when
        </p>
        <ul className="mt-3 grid gap-2 text-[12px] leading-relaxed text-ts-muted">
          <li>It adds Radix, Headless UI, CVA or another runtime package.</li>
          <li>It hard-codes a colour or a radius outside the tokens.</li>
          <li>It changes the theme glyphs to sun and moon icons.</li>
          <li>It ships a component with no keyboard or screen-reader path.</li>
          <li>It targets main directly without a release reason.</li>
        </ul>
      </div>

      <div className="prose-tessera mt-10">
        <h2>Fix a bug</h2>
        <p>
          Reproduce it in a branch, add the smallest failing case to the relevant
          demo, then fix the component. If the bug is in a copied file in your own
          project, fix it there and open an upstream pull request when the same
          fix belongs in the registry.
        </p>

        <h2>Change the site</h2>
        <p>
          The site is a Next.js App Router project with static export. Routes live
          in <code>site/app</code>, shared UI in <code>site/components</code>, and
          the content objects in <code>site/lib</code>. Keep the same tokens and
          the same plain copy. A marketing page with a fabricated metric will be
          rejected.
        </p>

        <h2>Release</h2>
        <p>
          The maintainer merges <code>dev</code> into <code>main</code> when the
          set is coherent. That merge is the release: the GitHub Pages workflow
          deploys the site, and the install commands resolve the new files. There
          is no npm publish step for the components.
        </p>
        <p>
          If you change a component that people already copied, say so in the
          pull request and write the migration note. A breaking rename needs a
          line in the release notes, not a silent diff.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-ts-line pt-5">
        <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-ts-muted">
          Ready to send one
        </p>
        <a
          href="https://github.com/dhirajaryaa/tessera/compare"
          target="_blank"
          rel="noreferrer"
          className="link-quiet inline-flex items-center gap-2 text-[12.5px] font-semibold text-ts-ink"
        >
          Open a pull request
          <PikaIcon icon={ArrowRightIcon} size={13} strokeWidth={1.7} />
        </a>
      </div>
    </>
  );
}
