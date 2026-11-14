import Link from "next/link";
import { PikaIcon } from "@pikaicons/react";
import {
  ArrowRightIcon,
  CheckTickSquareIcon,
  MultipleCrossCancelIcon,
} from "@pikaicons/core-free";
import { CopyButton } from "@/components/site/copy-button";

const adds = [
  "The .tsx file, with comments intact",
  "The shared --ts-* token sheet",
  "utils.ts with cn(), clsx and tailwind-merge",
  "A readable install report",
];

const neverAdds = [
  "A runtime UI package",
  "Radix, CVA or a component framework",
  "A provider unless the part needs one",
  "A build step, plugin or config rewrite",
];

const steps = [
  {
    number: "01",
    title: "Init once",
    command: "npx github:dhirajaryaa/tessera@main init",
    note: "Writes tessera.json, the token sheet and utils.ts. Wires the CSS import.",
  },
  {
    number: "02",
    title: "Add what you need",
    command: "npx github:dhirajaryaa/tessera@main add button dialog",
    note: "Resolves dependencies, skips files you already changed.",
  },
  {
    number: "03",
    title: "Import the file",
    command: 'import { Button } from "@/components/tessera/button";',
    note: "No wrapper. No barrel file. Edit it like your own code.",
  },
];

export function InstallSection() {
  return (
    <section className="section" id="install">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">03 / Install</p>
            <h2 className="section-heading mt-5 max-w-[12ch]">
              Add a part.
              <br />
              <em className="text-ts-accent">Keep the keys.</em>
            </h2>
          </div>
          <p className="max-w-[38ch] text-[13.5px] leading-relaxed text-ts-muted md:text-right">
            The CLI is a courier, not a dependency. It copies files into your
            project and gets out of the way.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[10px] border border-ts-line bg-[#171411] shadow-ts">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#e24a21]" />
                <span className="size-2 rounded-full bg-[#e9b44c]" />
                <span className="size-2 rounded-full bg-[#6bc596]" />
              </div>
              <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-[#a79b8b]">
                tessera · zsh
              </span>
              <span className="w-12" />
            </div>
            <div className="code-scroll overflow-x-auto p-5 font-mono text-[11px] leading-[1.8] text-[#f2ece2]">
              <p>
                <span className="text-[#6bc596]">~</span>{" "}
                <span className="text-[#a79b8b]">npx github:dhirajaryaa/tessera@main init</span>
              </p>
              <p className="mt-1 text-[#6bc596]">✓ Tessera initialized</p>
              <p className="text-[#8a8177]">  created tessera.json</p>
              <p className="text-[#8a8177]">  created src/lib/utils.ts</p>
              <p className="text-[#8a8177]">  created src/styles/tessera.css</p>
              <p className="mt-3">
                <span className="text-[#6bc596]">~</span>{" "}
                <span className="text-[#a79b8b]">
                  npx github:dhirajaryaa/tessera@main add button dialog
                </span>
                <span className="caret ml-1" />
              </p>
              <p className="mt-1 text-[#6bc596]">✓ Base installed (utils.ts, tessera.css)</p>
              <p className="mt-1 text-[#e9b44c]">  button</p>
              <p className="text-[#8a8177]">    created src/components/tessera/button.tsx</p>
              <p className="mt-1 text-[#e9b44c]">  dialog</p>
              <p className="text-[#8a8177]">    created src/components/tessera/dialog.tsx</p>
              <p className="mt-2 text-[#8a8177]">Import it:</p>
              <p className="text-[#8a8177]">  import &#123; Button &#125; from &quot;@/components/tessera/button&quot;</p>
              <p className="text-[#8a8177]">  import &#123; Dialog &#125; from &quot;@/components/tessera/dialog&quot;</p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div>
              <p className="flex items-center gap-2 border-b border-ts-line pb-2 font-mono text-[9px] uppercase tracking-[0.11em] text-ts-ink">
                <PikaIcon icon={CheckTickSquareIcon} size={11} strokeWidth={1.9} className="text-ts-success" />
                It adds
              </p>
              <ul className="mt-3 grid gap-2.5">
                {adds.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[12px] leading-snug text-ts-muted">
                    <span className="mt-[7px] size-1 shrink-0 bg-ts-success" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="flex items-center gap-2 border-b border-ts-line pb-2 font-mono text-[9px] uppercase tracking-[0.11em] text-ts-ink">
                <PikaIcon
                  icon={MultipleCrossCancelIcon}
                  size={11}
                  strokeWidth={1.9}
                  className="text-ts-danger"
                />
                It never adds
              </p>
              <ul className="mt-3 grid gap-2.5">
                {neverAdds.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[12px] leading-snug text-ts-muted">
                    <span className="mt-[7px] size-1 shrink-0 bg-ts-danger" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 grid border-t border-ts-line md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="border-b border-ts-line py-5 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.11em] text-ts-accent">
                  {step.number}
                </span>
                <span className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-ts-muted">
                  {index === 0 ? "setup" : index === 1 ? "copy" : "use"}
                </span>
              </div>
              <h3 className="mt-2 text-[14px] font-semibold tracking-[-0.01em] text-ts-ink">
                {step.title}
              </h3>
              <div className="mt-2 flex items-start gap-2">
                <code className="min-w-0 flex-1 break-words [overflow-wrap:anywhere] font-mono text-[10.5px] leading-relaxed text-ts-muted">
                  {step.command}
                </code>
                <CopyButton value={step.command} />
              </div>
              <p className="mt-2 text-[11.5px] leading-relaxed text-ts-muted">{step.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Link
            href="/docs/installation"
            className="link-quiet inline-flex items-center gap-2 text-[12.5px] font-semibold text-ts-ink"
          >
            Read the full install guide
            <PikaIcon icon={ArrowRightIcon} size={13} strokeWidth={1.7} />
          </Link>
        </div>
      </div>
    </section>
  );
}
