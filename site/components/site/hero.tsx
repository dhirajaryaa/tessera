import Link from "next/link";
import { PikaIcon } from "@pikaicons/react";
import { ArrowRightIcon } from "@pikaicons/core-free";
import { InstallCommand } from "@/components/site/install-command";
import { HeroStage } from "@/components/site/hero-stage";

const stats = [
  { value: "14", label: "components" },
  { value: "03", label: "themes" },
  { value: "00", label: "runtime deps" },
  { value: "MIT", label: "licensed" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ts-line">
      <div className="shell-wide grid min-h-[calc(100svh-4rem)] items-center gap-10 py-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-0 lg:py-0">
        <div className="min-w-0 lg:border-r lg:border-ts-line lg:py-16 lg:pr-12 xl:pr-16">
          <div className="enter">
            <p className="eyebrow">A small UI kit · v0.1</p>
          </div>

          <h1 className="enter-2 mt-5 text-[clamp(3.3rem,6.4vw,6.05rem)] font-medium leading-[0.9] tracking-[-0.072em] text-ts-ink">
            Small parts.
            <span className="mt-1 block font-display font-normal italic tracking-[-0.03em] text-ts-accent">
              Sharp edges.
            </span>
          </h1>

          <p className="enter-3 mt-6 max-w-[43ch] text-[15.5px] leading-[1.65] text-ts-muted">
            Fourteen careful components for React. Warm paper, real focus states,
            custom tile glyphs. Copy the source into your project and keep the keys.
          </p>

          <div className="enter-3 mt-6 w-full max-w-[470px]">
            <InstallCommand command="npx github:dhirajaryaa/tessera#main add button" />
          </div>

          <div className="enter-4 mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/docs/components"
              className="inline-flex h-10 items-center gap-2 rounded-ts border border-transparent bg-ts-accent px-4 font-sans text-[13px] font-semibold text-ts-accent-ink transition-[transform,background-color] hover:-translate-y-px hover:bg-ts-accent-hover active:translate-y-0"
            >
              Browse the parts
              <PikaIcon icon={ArrowRightIcon} size={14} strokeWidth={1.7} />
            </Link>
            <Link
              href="/docs/principles"
              className="link-quiet inline-flex h-10 items-center px-1 font-sans text-[13px] font-semibold text-ts-ink"
            >
              Read the rules
            </Link>
          </div>

          <dl className="enter-4 mt-10 grid max-w-[540px] grid-cols-4 border-t border-ts-line pt-4">
            {stats.map((stat) => (
              <div key={stat.label} className="border-l border-ts-line pl-3 first:border-l-0 first:pl-0">
                <dt className="font-mono text-[9px] uppercase tracking-[0.1em] text-ts-muted">
                  {stat.label}
                </dt>
                <dd className="mt-1 text-[20px] font-medium leading-none tracking-[-0.04em] text-ts-ink">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative min-w-0 lg:pl-10 xl:pl-14">
          <div className="enter-fade">
            <HeroStage />
          </div>
          <div className="mt-3 flex items-center justify-between font-mono text-[8.5px] uppercase tracking-[0.12em] text-ts-muted">
            <span>The parts, working together</span>
            <span>Live preview</span>
          </div>
        </div>
      </div>

      <div className="border-t border-ts-line">
        <div className="shell-wide flex flex-wrap items-center justify-between gap-2 py-3 font-mono text-[9px] uppercase tracking-[0.11em] text-ts-muted">
          <span>React 18 / 19</span>
          <span>Tailwind CSS v4</span>
          <span>TypeScript</span>
          <span>No provider unless you need one</span>
          <span className="hidden sm:inline">Icons by Pikaicons</span>
        </div>
      </div>
    </section>
  );
}
