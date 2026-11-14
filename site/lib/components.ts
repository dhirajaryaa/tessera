export type ComponentCategory =
  | "Actions"
  | "Forms"
  | "Layout"
  | "Navigation"
  | "Feedback"
  | "Identity"
  | "Appearance";

export type ComponentMeta = {
  slug: string;
  name: string;
  category: ComponentCategory;
  description: string;
  summary: string;
};

export const components: ComponentMeta[] = [
  {
    slug: "button",
    name: "Button",
    category: "Actions",
    description:
      "The one action on screen that matters. Five variants, four sizes, no gradients.",
    summary: "Solid, soft, outline, ghost and link actions.",
  },
  {
    slug: "badge",
    name: "Badge",
    category: "Actions",
    description:
      "A small, uppercase status mark. Use it for state, not for decoration.",
    summary: "Six tones of compact status.",
  },
  {
    slug: "input",
    name: "Input",
    category: "Forms",
    description:
      "A labelled text field with a visible focus ring and an optional hint or error.",
    summary: "Text entry, labels, hints and errors.",
  },
  {
    slug: "textarea",
    name: "Textarea",
    category: "Forms",
    description:
      "The long-form sibling of Input. Resizable on purpose, never on accident.",
    summary: "Multi-line text with a quiet resize handle.",
  },
  {
    slug: "select",
    name: "Select",
    category: "Forms",
    description:
      "A native select with a custom chevron. Familiar on every platform.",
    summary: "Native choice with a custom edge.",
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    category: "Forms",
    description:
      "A square check with a label and an optional note. Works without JavaScript.",
    summary: "Independent choices with real labels.",
  },
  {
    slug: "switch",
    name: "Switch",
    category: "Forms",
    description:
      "An immediate on or off. Use a checkbox when the change needs a save.",
    summary: "A binary setting that applies at once.",
  },
  {
    slug: "card",
    name: "Card",
    category: "Layout",
    description:
      "A surface with a header, content and footer. The quiet container for a single idea.",
    summary: "A surface for one object or decision.",
  },
  {
    slug: "tabs",
    name: "Tabs",
    category: "Navigation",
    description:
      "Switch between a small set of peers without leaving the page.",
    summary: "Peer views with arrow-key navigation.",
  },
  {
    slug: "dialog",
    name: "Dialog",
    category: "Feedback",
    description:
      "A focused interruption with a trapped focus ring and one clear exit.",
    summary: "A modal for decisions, not tours.",
  },
  {
    slug: "toast",
    name: "Toast",
    category: "Feedback",
    description:
      "A short confirmation that leaves on its own. Never the only place a fact lives.",
    summary: "Brief confirmations with a polite live region.",
  },
  {
    slug: "accordion",
    name: "Accordion",
    category: "Layout",
    description:
      "Stack related sections and let people open one at a time.",
    summary: "Progressive disclosure without a maze.",
  },
  {
    slug: "avatar",
    name: "Avatar",
    category: "Identity",
    description:
      "A face, a fallback, or initials. Round because people are not tiles.",
    summary: "Images and initials with a clean fallback.",
  },
  {
    slug: "theme-switcher",
    name: "Theme switcher",
    category: "Appearance",
    description:
      "Four custom tile glyphs for Paper, Ink, Moss and Auto. No sun, no moon.",
    summary: "The signature switch, without the clichés.",
  },
];

export const categories = [
  "All",
  "Actions",
  "Forms",
  "Layout",
  "Navigation",
  "Feedback",
  "Identity",
  "Appearance",
] as const;

export function getComponent(slug: string) {
  return components.find((component) => component.slug === slug);
}
