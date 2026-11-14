import { PikaIcon } from "@pikaicons/react";
import { CheckTickSquareIcon } from "@pikaicons/core-free";
import { Mark } from "@/components/site/logo";

const principles = [
  {
    number: "01",
    title: "Copy, don't install.",
    body: "The component lands in your repo as a file you can read, rename and break. No version lock. No peer dependency dance. No package to audit on a Friday.",
  },
  {
    number: "02",
    title: "Tokens, not classes.",
    body: "Every surface, line and accent is a CSS variable. Change one block and the whole set follows. The themes are proof, not a setting hidden in a provider.",
  },
  {
    number: "03",
    title: "Boring on purpose.",
    body: "Native buttons. Real labels. Visible focus. 44px targets. Motion that stops when the OS asks. The interesting part is the interface, not the abstraction.",
  },
];

export function Manifesto() {
  return (
    <section className="section" id="why">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <p className="eyebrow">01 / Why it exists</p>
            <h2 className="section-heading mt-5 max-w-[15ch]">
              A UI library shouldn&apos;t <em className="text-ts-accent">move in.</em>
            </h2>
            <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-ts-muted">
              Tessera is a small set of parts, not another platform. You take the
              files you need, put them where you want them, and delete the rest.
              The library ends where your project begins.
            </p>

            <div className="mt-9 inline-flex max-w-full items-center gap-3 rounded-ts border border-ts-line bg-ts-surface p-2.5 pr-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-[5px] border border-ts-line bg-ts-bg text-ts-ink">
                <Mark className="size-4" />
              </span>
              <code className="min-w-0 truncate font-mono text-[10.5px] text-ts-muted">
                src/components/tessera/button.tsx
              </code>
              <span className="inline-flex shrink-0 items-center gap-1.5 border-l border-ts-line pl-3 font-mono text-[9px] uppercase tracking-[0.08em] text-ts-success">
                <PikaIcon icon={CheckTickSquareIcon} size={10} strokeWidth={1.8} />
                Yours
              </span>
            </div>
          </div>

          <div className="self-end">
            <div className="rule-label">The short version</div>
            <div>
              {principles.map((principle) => (
                <article
                  key={principle.number}
                  className="grid grid-cols-[36px_1fr] gap-4 border-b border-ts-line py-6 first:pt-4 last:border-b-0"
                >
                  <span className="font-mono text-[9.5px] leading-6 tracking-[0.1em] text-ts-accent">
                    {principle.number}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-ts-ink">
                      {principle.title}
                    </h3>
                    <p className="mt-2 max-w-[48ch] text-[13px] leading-relaxed text-ts-muted">
                      {principle.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
