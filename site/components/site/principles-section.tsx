import Link from "next/link";
import { PikaIcon } from "@pikaicons/react";
import {
  ArrowRightIcon,
  CheckTickSquareIcon,
  MultipleCrossCancelIcon,
} from "@pikaicons/core-free";

const use = [
  "A consequence follows the click. Use one solid button.",
  "A setting applies at once. Use a switch, not a checkbox.",
  "A decision needs the room. Use a dialog for one clear question.",
  "A status has a short name. A badge earns its place.",
  "You need the same field in three places. Copy it, then make it local.",
];

const avoid = [
  "The page needs a card grid because a competitor has one.",
  "A toast is the only record of something important.",
  "The theme should carry the brand. Change the tokens instead.",
  "You need a date picker, combobox or data table. Tessera has none yet.",
  "You want a pill-shaped button. Round is a token, not a habit.",
];

const rules = [
  { title: "One accent", note: "Per screen. Not per component." },
  { title: "8px radius", note: "Square enough to think." },
  { title: "44px targets", note: "On anything that moves." },
  { title: "Copy in", note: "Never wrap the library." },
];

export function PrinciplesSection() {
  return (
    <section className="section" id="rules">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow">05 / How to use it</p>
            <h2 className="section-heading mt-5 max-w-[13ch]">
              Add it when it
              <br />
              <em className="text-ts-accent">earns its place.</em>
            </h2>
          </div>
          <p className="max-w-[48ch] text-[14px] leading-relaxed text-ts-muted lg:justify-self-end">
            A component library is a set of defaults, not a mandate. These are
            the lines we use before a part goes in, and the lines that keep it out.
          </p>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-[12px] border border-ts-line bg-ts-line md:grid-cols-2">
          <div className="bg-ts-surface p-5 sm:p-7">
            <div className="flex items-center gap-2 border-b border-ts-line pb-3">
              <span className="grid size-5 place-items-center rounded-full bg-ts-success/12 text-ts-success">
                <PikaIcon icon={CheckTickSquareIcon} size={11} strokeWidth={2} />
              </span>
              <h3 className="font-mono text-[9.5px] uppercase tracking-[0.11em] text-ts-ink">
                Reach for it
              </h3>
            </div>
            <ul className="mt-4 grid gap-3.5">
              {use.map((item, index) => (
                <li key={item} className="flex gap-3 text-[12.5px] leading-relaxed text-ts-muted">
                  <span className="font-mono text-[9px] leading-5 text-ts-success">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-ts-surface p-5 sm:p-7">
            <div className="flex items-center gap-2 border-b border-ts-line pb-3">
              <span className="grid size-5 place-items-center rounded-full bg-ts-danger/12 text-ts-danger">
                <PikaIcon icon={MultipleCrossCancelIcon} size={11} strokeWidth={2} />
              </span>
              <h3 className="font-mono text-[9.5px] uppercase tracking-[0.11em] text-ts-ink">
                Leave it out
              </h3>
            </div>
            <ul className="mt-4 grid gap-3.5">
              {avoid.map((item, index) => (
                <li key={item} className="flex gap-3 text-[12.5px] leading-relaxed text-ts-muted">
                  <span className="font-mono text-[9px] leading-5 text-ts-danger">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 grid gap-px overflow-hidden rounded-[12px] border border-ts-line bg-ts-line sm:grid-cols-2 lg:grid-cols-4">
          {rules.map((rule) => (
            <div key={rule.title} className="bg-ts-surface px-4 py-4">
              <p className="text-[12.5px] font-semibold text-ts-ink">{rule.title}</p>
              <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.09em] text-ts-muted">
                {rule.note}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-ts-muted">
            Long version in the manual
          </p>
          <Link
            href="/docs/principles"
            className="link-quiet inline-flex items-center gap-2 text-[12.5px] font-semibold text-ts-ink"
          >
            Read the principles
            <PikaIcon icon={ArrowRightIcon} size={13} strokeWidth={1.7} />
          </Link>
        </div>
      </div>
    </section>
  );
}
