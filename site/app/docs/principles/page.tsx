import type { Metadata } from "next";
import Link from "next/link";
import { PikaIcon } from "@pikaicons/react";
import {
  ArrowRightIcon,
  CheckTickSquareIcon,
  MultipleCrossCancelIcon,
} from "@pikaicons/core-free";
import { DocsPageHeader } from "@/components/docs/page-header";

export const metadata: Metadata = {
  title: "Principles",
  description:
    "When to reach for a Tessera component, when to leave it out, and the rules that keep the set coherent.",
};

const reach = [
  {
    title: "The action has a consequence",
    body: "A save, a delete, a send. One solid button names it. A second solid button in the same row means the hierarchy is not finished.",
  },
  {
    title: "The setting applies at once",
    body: "A switch is immediate and reversible. If the change waits for a save button, use a checkbox. The control should match the commitment.",
  },
  {
    title: "The object needs a frame",
    body: "One plan, one project, one record. A card earns its border when there is a clear top, body and bottom. A page is not a card.",
  },
  {
    title: "Two or more peer views",
    body: "Tabs work when the same object has a small set of angles and people move between them. A linear flow is not a tab set.",
  },
  {
    title: "A decision needs the room",
    body: "A dialog is for one clear question that should interrupt. A tour, a long form or a second dialog is not that.",
  },
  {
    title: "The state has a short name",
    body: "Active, Draft, Failed. A badge is a label with a shape. It is not a button and it does not carry the only copy of a fact.",
  },
];

const leave = [
  {
    title: "Because the layout looks empty",
    body: "Space is a material. Do not add a card grid to fill it. Type, a rule and a margin usually do the job better.",
  },
  {
    title: "Because the competitor has one",
    body: "A date picker, combobox or data table is not in the kit. If you need one, build it in your project. Do not stretch a select until it becomes one.",
  },
  {
    title: "The toast is the only record",
    body: "A success can leave. A failure cannot. Put the error next to the field or on the page, then use a toast as a courtesy.",
  },
  {
    title: "The theme carries the brand",
    body: "Change the tokens, not the component. A one-off green button is a token problem wearing a component costume.",
  },
  {
    title: "The shape is a habit",
    body: "No pill buttons, no free-floating shadows, no gradient accent. The radius is a token and it is small on purpose.",
  },
  {
    title: "A wrapper would be tidier",
    body: "Do not wrap the library in a second library. Edit the copied file. If three projects need the same change, it belongs upstream in the registry.",
  },
];

const composition = [
  {
    rule: "One accent per screen",
    note: "The accent marks the primary action, the active tab and the focus ring. It is not a decoration budget.",
  },
  {
    rule: "One solid button per row",
    note: "Pair solid with ghost or outline. If both actions matter equally, the decision is not ready.",
  },
  {
    rule: "Radius stays small",
    note: "8px for controls and surfaces. Badges may be tighter. Circles are for avatars and status dots only.",
  },
  {
    rule: "Lines before shadows",
    note: "A hairline border does most of the work. The shadow token is for a raised surface, not every card.",
  },
  {
    rule: "Labels are visible",
    note: "A placeholder is an example, never the label. Field renders a real label and connects it.",
  },
  {
    rule: "Motion is short",
    note: "150 to 250ms for state changes. The theme change itself is instant. Respect prefers-reduced-motion.",
  },
];

const a11y = [
  "Every interactive element is reachable by keyboard and shows a visible focus ring.",
  "Dialogs trap focus, close on Escape and return focus to the trigger.",
  "Tabs use arrow keys, Home and End, with one tabbable trigger.",
  "Accordion triggers expose aria-expanded and aria-controls.",
  "Menu items use menuitemradio and arrow-key movement.",
  "Status colour is paired with a word. The dot is never the only signal.",
  "Touch targets on primary actions reach 44px, either by control height or padding.",
  "Motion stops when the operating system asks for reduced motion.",
];

const voice = [
  "Labels name the outcome: Save changes, Send invite, Delete project.",
  "Errors say what happened and what to do next. They do not apologise.",
  "Empty states are a sentence, not a mascot.",
  "No exclamation marks. No cheerful filler. No em dashes in body copy.",
  "A number gets a unit. A date gets a timezone when it matters.",
];

export default function PrinciplesPage() {
  return (
    <>
      <DocsPageHeader
        eyebrow="The manual / Principles"
        title={
          <>
            Add it when it
            <br />
            <em className="font-display font-normal italic text-ts-accent">
              earns its place.
            </em>
          </>
        }
        description="A component library is a set of defaults, not a mandate. These are the lines we use before a part goes in, and the lines that keep it out."
      />

      <div className="prose-tessera mt-8">
        <p>
          Tessera is small on purpose. Fourteen parts cover the common shapes of
          an interface: an action, a field, a surface, a choice, a confirmation.
          The set is not trying to be a page builder. Restraint is the feature.
        </p>
        <p>
          The rules below are the ones we use in this repository. They apply to
          the documentation, the examples and any component added later.
        </p>
      </div>

      <section className="mt-10">
        <div className="flex items-center gap-2 border-b border-ts-line pb-3">
          <span className="grid size-5 place-items-center rounded-full bg-ts-success/12 text-ts-success">
            <PikaIcon icon={CheckTickSquareIcon} size={11} strokeWidth={2} />
          </span>
          <h2 className="font-mono text-[10px] uppercase tracking-[0.11em] text-ts-ink">
            Reach for it
          </h2>
        </div>
        <div className="mt-1">
          {reach.map((item, index) => (
            <article
              key={item.title}
              className="grid grid-cols-[34px_1fr] gap-3 border-b border-ts-line py-4 last:border-b-0"
            >
              <span className="font-mono text-[9px] leading-6 text-ts-success">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[13.5px] font-semibold tracking-[-0.01em] text-ts-ink">
                  {item.title}
                </h3>
                <p className="mt-1 text-[12.5px] leading-relaxed text-ts-muted">
                  {item.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-center gap-2 border-b border-ts-line pb-3">
          <span className="grid size-5 place-items-center rounded-full bg-ts-danger/12 text-ts-danger">
            <PikaIcon icon={MultipleCrossCancelIcon} size={11} strokeWidth={2} />
          </span>
          <h2 className="font-mono text-[10px] uppercase tracking-[0.11em] text-ts-ink">
            Leave it out
          </h2>
        </div>
        <div className="mt-1">
          {leave.map((item, index) => (
            <article
              key={item.title}
              className="grid grid-cols-[34px_1fr] gap-3 border-b border-ts-line py-4 last:border-b-0"
            >
              <span className="font-mono text-[9px] leading-6 text-ts-danger">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[13.5px] font-semibold tracking-[-0.01em] text-ts-ink">
                  {item.title}
                </h3>
                <p className="mt-1 text-[12.5px] leading-relaxed text-ts-muted">
                  {item.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-10 rounded-[7px] border-l-2 border-ts-accent bg-ts-surface-2/60 px-4 py-3">
        <p className="text-[13px] leading-relaxed text-ts-ink">
          The shortest version: if you cannot name the user action a part
          supports in one sentence, it is decoration. Remove it.
        </p>
      </div>

      <div className="prose-tessera mt-10">
        <h2>Composition rules</h2>
        <p>
          The parts share one grid, one radius scale and one accent. These rules
          are what make a set of files feel like a language.
        </p>
      </div>

      <div className="mt-5 grid gap-px overflow-hidden rounded-[10px] border border-ts-line bg-ts-line sm:grid-cols-2">
        {composition.map((item) => (
          <div key={item.rule} className="bg-ts-surface p-4">
            <p className="text-[12.5px] font-semibold text-ts-ink">{item.rule}</p>
            <p className="mt-1 text-[11.5px] leading-relaxed text-ts-muted">
              {item.note}
            </p>
          </div>
        ))}
      </div>

      <div className="prose-tessera mt-10">
        <h2>Accessibility floor</h2>
        <p>
          This is the floor, not the ceiling. A part that cannot meet these lines
          is not ready to ship in the registry.
        </p>
      </div>

      <ul className="mt-4 grid gap-2.5">
        {a11y.map((item) => (
          <li key={item} className="flex gap-3 text-[12.5px] leading-relaxed text-ts-muted">
            <span className="mt-[7px] size-1 shrink-0 bg-ts-accent" />
            {item}
          </li>
        ))}
      </ul>

      <div className="prose-tessera mt-10">
        <h2>Writing inside the interface</h2>
        <p>
          Copy is part of the component. A tidy button with a vague label is still
          a vague button.
        </p>
      </div>

      <ul className="mt-4 grid gap-2.5">
        {voice.map((item) => (
          <li key={item} className="flex gap-3 text-[12.5px] leading-relaxed text-ts-muted">
            <span className="mt-[7px] size-1 shrink-0 bg-ts-line-strong" />
            {item}
          </li>
        ))}
      </ul>

      <div className="prose-tessera mt-10">
        <h2>Adding a new part</h2>
        <p>
          A new component belongs in the registry when it repeats across projects
          and the interaction is general enough to survive a second context. A
          one-off layout stays in the product.
        </p>
        <p>Use these questions before you start:</p>
        <ol>
          <li>Can it be built by composing the existing parts? If yes, do that.</li>
          <li>Does it need a new dependency? Justify it, and prefer native HTML.</li>
          <li>Is the keyboard model clear without reading the source?</li>
          <li>Does it read correctly in Paper, Ink and Moss?</li>
          <li>Would you be comfortable if a stranger deleted every line of it?</li>
        </ol>
        <p>
          If the answers hold, read the{" "}
          <Link href="/docs/contributing">contribution guide</Link>. It covers the
          file layout, the registry entry and the review checklist.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-ts-line pt-5">
        <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-ts-muted">
          Next: build with agents
        </p>
        <Link
          href="/docs/agents"
          className="link-quiet inline-flex items-center gap-2 text-[12.5px] font-semibold text-ts-ink"
        >
          For agents
          <PikaIcon icon={ArrowRightIcon} size={13} strokeWidth={1.7} />
        </Link>
      </div>
    </>
  );
}
