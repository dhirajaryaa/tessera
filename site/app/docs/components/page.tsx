import type { Metadata } from "next";
import Link from "next/link";
import { PikaIcon } from "@pikaicons/react";
import { ArrowRightIcon } from "@pikaicons/core-free";
import { DocsPageHeader } from "@/components/docs/page-header";
import { components } from "@/lib/components";

export const metadata: Metadata = {
  title: "Components",
  description:
    "Every Tessera component with its install command, live demo, source and guidance.",
};

const order = [
  "Actions",
  "Forms",
  "Layout",
  "Navigation",
  "Feedback",
  "Identity",
  "Appearance",
] as const;

export default function ComponentsIndexPage() {
  return (
    <>
      <DocsPageHeader
        eyebrow="The manual / Components"
        title={
          <>
            Fourteen parts.
            <br />
            <em className="font-display font-normal italic text-ts-accent">
              One language.
            </em>
          </>
        }
        description="Each page has a live demo, the exact source sample, the props, and the cases where the part belongs. If a part is missing, it is not hiding in a package."
      />

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-ts-line py-3 font-mono text-[9px] uppercase tracking-[0.1em] text-ts-muted">
        <span>{components.length} components</span>
        <span>3 themes</span>
        <span>0 runtime deps</span>
        <span className="ml-auto">Copy in · own it</span>
      </div>

      <div className="mt-8 grid gap-10">
        {order.map((category) => {
          const group = components.filter((component) => component.category === category);
          if (!group.length) return null;

          return (
            <section key={category}>
              <div className="rule-label">
                {category}
                <span className="font-mono text-[8.5px] text-ts-muted">
                  {String(group.length).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {group.map((component) => (
                  <Link
                    key={component.slug}
                    href={`/docs/components/${component.slug}`}
                    className="hover-lift group rounded-[9px] border border-ts-line bg-ts-surface p-4 hover:border-ts-line-strong hover:shadow-ts"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="text-[13.5px] font-semibold tracking-[-0.01em] text-ts-ink">
                          {component.name}
                        </h2>
                        <p className="mt-1 text-[11.5px] leading-relaxed text-ts-muted">
                          {component.summary}
                        </p>
                      </div>
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-[4px] border border-ts-line text-ts-muted transition-[transform,color,border-color] group-hover:translate-x-0.5 group-hover:border-ts-accent group-hover:text-ts-accent">
                        <PikaIcon icon={ArrowRightIcon} size={11} strokeWidth={1.8} />
                      </span>
                    </div>
                    <p className="mt-3 border-t border-ts-line pt-2 font-mono text-[8.5px] uppercase tracking-[0.08em] text-ts-muted">
                      npx … add {component.slug}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-12 rounded-[9px] border border-ts-line bg-ts-surface p-5">
        <p className="eyebrow">Missing something</p>
        <h2 className="mt-2 text-[16px] font-semibold tracking-[-0.02em] text-ts-ink">
          Build it in your project first.
        </h2>
        <p className="mt-2 max-w-[62ch] text-[12.5px] leading-relaxed text-ts-muted">
          A date picker, a combobox, a data table and a command menu are not in the
          kit. Use one from your product if it fits. If the same pattern repeats
          across projects, send it upstream with the reasoning.
        </p>
        <Link
          href="/docs/contributing"
          className="link-quiet mt-4 inline-flex items-center gap-2 text-[12px] font-semibold text-ts-ink"
        >
          Contribution guide
          <PikaIcon icon={ArrowRightIcon} size={12} strokeWidth={1.7} />
        </Link>
      </div>
    </>
  );
}
