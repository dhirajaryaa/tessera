import type { Metadata } from "next";
import Link from "next/link";
import { PikaIcon } from "@pikaicons/react";
import { ArrowRightIcon, CheckTickSquareIcon, MultipleCrossCancelIcon } from "@pikaicons/core-free";
import { InstallCommand } from "@/components/site/install-command";
import { DocsPageHeader } from "@/components/docs/page-header";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Install Tessera, add a component, change the tokens and read the rules for using the parts.",
};

const cards = [
  {
    href: "/docs/installation",
    index: "01",
    title: "Installation",
    note: "Init once, add only what you need, wire Tailwind v4 correctly.",
  },
  {
    href: "/docs/components",
    index: "02",
    title: "Components",
    note: "Fourteen parts with live previews, source, props and guidance.",
  },
  {
    href: "/docs/theming",
    index: "03",
    title: "Themes",
    note: "Paper, Ink and Moss. Tokens, custom themes and the anti-flash script.",
  },
  {
    href: "/docs/principles",
    index: "04",
    title: "Principles",
    note: "How to add a part, and the cases where it should stay out.",
  },
  {
    href: "/docs/agents",
    index: "05",
    title: "For agents",
    note: "AGENTS.md, SKILL.md, llms.txt and prompts that respect the system.",
  },
  {
    href: "/docs/contributing",
    index: "06",
    title: "Contributing",
    note: "The main and dev branches, the registry, the review checklist.",
  },
];

export default function DocsIntroductionPage() {
  return (
    <>
      <DocsPageHeader
        eyebrow="The manual / Introduction"
        title={
          <>
            Small parts.
            <br />
            <em className="font-display font-normal italic text-ts-accent">
              Owned source.
            </em>
          </>
        }
        description="Tessera is a small React UI kit with an ownership model and a point of view. These pages cover the install, the tokens, every component and the rules that keep the set coherent."
      >
        <div className="mt-6 max-w-[470px]">
          <InstallCommand command="npx github:dhirajaryaa/tessera@main init" />
        </div>
      </DocsPageHeader>

      <div className="prose-tessera mt-8">
        <p>
          There is no runtime package. The CLI copies source files into your
          project, ensures a <code>--ts-*</code> token sheet exists, and stops.
          You can read every line, rename every class and delete every part you
          do not use.
        </p>
        <p>
          The visual language is warm and editorial: bone paper, near-black ink,
          one vermilion accent, a deep green alternative and square-ish tiles.
          The theme switch uses four custom glyphs, not a sun and a moon.
        </p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="hover-lift group rounded-[10px] border border-ts-line bg-ts-surface p-4 hover:border-ts-line-strong hover:shadow-ts"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-ts-accent">
                {card.index}
              </span>
              <span className="text-ts-muted transition-transform group-hover:translate-x-0.5">
                <PikaIcon icon={ArrowRightIcon} size={12} strokeWidth={1.7} />
              </span>
            </div>
            <h2 className="mt-2 text-[14px] font-semibold tracking-[-0.01em] text-ts-ink">
              {card.title}
            </h2>
            <p className="mt-1 text-[11.5px] leading-relaxed text-ts-muted">
              {card.note}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-px overflow-hidden rounded-[10px] border border-ts-line bg-ts-line sm:grid-cols-2">
        <div className="bg-ts-surface p-5">
          <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.1em] text-ts-ink">
            <PikaIcon icon={CheckTickSquareIcon} size={11} strokeWidth={1.9} className="text-ts-success" />
            In the box
          </p>
          <ul className="mt-3 grid gap-2 text-[12px] text-ts-muted">
            <li>14 accessible React components</li>
            <li>3 themes and a system-aware switch</li>
            <li>One token sheet, prefixed for safety</li>
            <li>Agent files and a portable skill</li>
          </ul>
        </div>
        <div className="bg-ts-surface p-5">
          <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.1em] text-ts-ink">
            <PikaIcon
              icon={MultipleCrossCancelIcon}
              size={11}
              strokeWidth={1.9}
              className="text-ts-danger"
            />
            Not in the box
          </p>
          <ul className="mt-3 grid gap-2 text-[12px] text-ts-muted">
            <li>A runtime UI dependency</li>
            <li>A chart, table or date picker</li>
            <li>A brand system you cannot change</li>
            <li>A promise to cover every edge case</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-ts-line pt-5">
        <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-ts-muted">
          Next: get it into a project
        </p>
        <Link
          href="/docs/installation"
          className="link-quiet inline-flex items-center gap-2 text-[12.5px] font-semibold text-ts-ink"
        >
          Installation
          <PikaIcon icon={ArrowRightIcon} size={13} strokeWidth={1.7} />
        </Link>
      </div>
    </>
  );
}
