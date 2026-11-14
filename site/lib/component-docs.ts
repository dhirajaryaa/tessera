import { components, type ComponentMeta } from "@/lib/components";

export type PropDoc = {
  name: string;
  type: string;
  default?: string;
  description: string;
};

type Details = {
  files: string[];
  deps?: string[];
  code: string;
  anatomy: string;
  props: PropDoc[];
  use: string[];
  avoid: string[];
  a11y: string[];
};

export type ComponentDoc = ComponentMeta &
  Details & {
    install: string;
    editUrl: string;
  };

const base = "npx github:dhirajaryaa/tessera@main add";

const details: Record<string, Details> = {
  button: {
    files: ["button.tsx"],
    code: `import { Button } from "@/components/tessera/button";

export function SaveBar() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost">Discard</Button>
      <Button variant="outline">Preview</Button>
      <Button>Save changes</Button>
    </div>
  );
}`,
    anatomy:
      "One native button, two lookup maps and a spinner. Solid is the main action. Outline and ghost are secondary. Link is a button that looks like text, not a replacement for an anchor.",
    props: [
      { name: "variant", type: '"solid" | "soft" | "outline" | "ghost" | "link"', default: '"solid"', description: "Visual weight and intent." },
      { name: "size", type: '"sm" | "md" | "lg" | "icon"', default: '"md"', description: "Height and horizontal padding." },
      { name: "loading", type: "boolean", default: "false", description: "Shows a spinner, disables the button and sets aria-busy." },
      { name: "disabled", type: "boolean", default: "false", description: "Native disabled. The button stops receiving pointer events." },
      { name: "type", type: '"button" | "submit" | "reset"', default: '"button"', description: "Defaults to button so forms do not submit by accident." },
    ],
    use: [
      "There is one clear action on the screen. Make it solid.",
      "A form needs a save and a discard. Pair solid with ghost.",
      "A request takes time. Set loading and keep the label.",
      "You need an icon-only control. Use size icon and an aria-label.",
    ],
    avoid: [
      "Two solid buttons in the same row. The eye cannot choose.",
      "A button for navigation. Use an anchor, even if it looks like a button.",
      "The link variant for a long paragraph. It belongs on one short phrase.",
      "A spinner with no label. The label tells people what is happening.",
    ],
    a11y: [
      "Renders a native button element, so Enter and Space work.",
      "The focus ring uses the ink token and survives both light and dark themes.",
      "Loading sets aria-busy and disabled, preventing a second submit.",
      "An icon-only button needs an aria-label, because the icon is hidden from assistive tech.",
    ],
  },
  badge: {
    files: ["badge.tsx"],
    code: `import { Badge } from "@/components/tessera/badge";

export function Status() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge tone="success" dot>Active</Badge>
      <Badge tone="warning">Review</Badge>
      <Badge tone="outline">Archived</Badge>
    </div>
  );
}`,
    anatomy:
      "A compact uppercase label with an optional dot. It is not a button and it does not carry an action. Six tones cover the common states without introducing a second palette.",
    props: [
      { name: "tone", type: '"neutral" | "accent" | "outline" | "success" | "warning" | "danger"', default: '"neutral"', description: "The semantic colour of the mark." },
      { name: "dot", type: "boolean", default: "false", description: "Adds a small current-colour dot before the label." },
    ],
    use: [
      "A record has a short state: Active, Draft, Review.",
      "A count needs context, not a giant number.",
      "A plan or environment needs a quiet identifier.",
    ],
    avoid: [
      "A badge as the primary call to action.",
      "A colour alone to communicate danger. Add a word.",
      "Six badges in one table cell. Use one status and put the rest in the detail view.",
    ],
    a11y: [
      "Status colour is paired with a text label.",
      "Do not use the dot as the only signal.",
      "Badge text stays in the accessible name of its container.",
    ],
  },
  input: {
    files: ["input.tsx"],
    code: `import { Field, Input } from "@/components/tessera/input";

export function EmailField() {
  return (
    <Field
      label="Email address"
      htmlFor="email"
      hint="We only use this for receipts."
    >
      <Input id="email" type="email" placeholder="you@studio.example" />
    </Field>
  );
}`,
    anatomy:
      "Field, Label and Input are three parts. Field arranges the label, control, hint or error. Label is a real label. Input is the text control. Keeping them separate lets Field wrap a Select or Textarea without a second abstraction.",
    props: [
      { name: "label", type: "ReactNode", description: "Field: visible label text." },
      { name: "hint", type: "ReactNode", description: "Field: quiet supporting text." },
      { name: "error", type: "ReactNode", description: "Field: replaces the hint and uses the danger token." },
      { name: "htmlFor", type: "string", description: "Field: id of the control the label belongs to." },
      { name: "type", type: "string", default: '"text"', description: "Input: native input type." },
      { name: "disabled", type: "boolean", default: "false", description: "Input: native disabled state." },
    ],
    use: [
      "A label is visible and the user needs to type a short value.",
      "A field needs a hint before the user makes a mistake.",
      "An error belongs to one field. Put it under that field.",
    ],
    avoid: [
      "A placeholder as the only label. It disappears when typing starts.",
      "An error summary at the top of a long form with no field markers.",
      "A custom input wrapper that strips native autofill or password managers.",
    ],
    a11y: [
      "Always connect Label and Input with htmlFor and id.",
      "Error text should be referenced with aria-describedby when you customise the field.",
      "The focus ring is visible on the border and with a 3px ring.",
      "Disabled fields are still announced; use readOnly when the value matters.",
    ],
  },
  textarea: {
    files: ["textarea.tsx"],
    deps: ["input"],
    code: `import { Field } from "@/components/tessera/input";
import { Textarea } from "@/components/tessera/textarea";

export function NoteField() {
  return (
    <Field
      label="Project note"
      htmlFor="note"
      hint="Keep it under 400 characters."
    >
      <Textarea id="note" rows={4} placeholder="What should the next person know?" />
    </Field>
  );
}`,
    anatomy:
      "A native textarea with a shared field skin. The resize handle is vertical and visible, so the control does not fight the browser.",
    props: [
      { name: "rows", type: "number", default: "4", description: "Initial visible lines." },
      { name: "disabled", type: "boolean", default: "false", description: "Native disabled state." },
      { name: "placeholder", type: "string", description: "Short example, never the label." },
    ],
    use: [
      "A note, description or message can be longer than one line.",
      "The value benefits from seeing several lines at once.",
      "The user may want to resize while drafting.",
    ],
    avoid: [
      "A comment box that needs rich text. Use an editor, not a textarea.",
      "A single word answer. Use Input.",
      "Auto-growing heights that jump while typing. Let people resize.",
    ],
    a11y: [
      "Pair with a visible Label from the input file.",
      "Do not hide the resize handle entirely.",
      "The focus treatment matches Input, including dark themes.",
    ],
  },
  select: {
    files: ["select.tsx"],
    code: `import { Field } from "@/components/tessera/input";
import { Select } from "@/components/tessera/select";

export function PlanField() {
  return (
    <Field label="Plan" htmlFor="plan">
      <Select id="plan" defaultValue="studio">
        <option value="personal">Personal</option>
        <option value="studio">Studio</option>
        <option value="studio-plus">Studio plus</option>
      </Select>
    </Field>
  );
}`,
    anatomy:
      "A native select under a custom chevron. The browser keeps its picker, keyboard behaviour and mobile treatment. Only the surface changes.",
    props: [
      { name: "defaultValue", type: "string", description: "Native initial value." },
      { name: "value", type: "string", description: "Controlled value." },
      { name: "disabled", type: "boolean", default: "false", description: "Native disabled state." },
      { name: "children", type: "ReactNode", description: "Native option elements." },
    ],
    use: [
      "There are four to twelve known options.",
      "The native picker is an advantage on mobile.",
      "The list does not need search or grouping.",
    ],
    avoid: [
      "Two options. Use a checkbox or a switch.",
      "Searchable lists or grouped command menus. Use a combobox.",
      "A select as a navigation menu.",
    ],
    a11y: [
      "Native keyboard behaviour is preserved.",
      "The visible label is connected with htmlFor and id.",
      "Do not remove the focus outline; only restyle it.",
    ],
  },
  checkbox: {
    files: ["checkbox.tsx"],
    code: `import { Checkbox } from "@/components/tessera/checkbox";

export function ReceiptOptions() {
  return (
    <div className="grid gap-3">
      <Checkbox
        defaultChecked
        label="Email me a receipt"
        description="One message after payment."
      />
      <Checkbox label="Save this card" />
    </div>
  );
}`,
    anatomy:
      "A visually hidden native checkbox, a drawn square and a label group. The native input keeps Space, form submission and screen-reader semantics.",
    props: [
      { name: "label", type: "ReactNode", description: "Visible label text." },
      { name: "description", type: "ReactNode", description: "Optional supporting line." },
      { name: "defaultChecked", type: "boolean", default: "false", description: "Native initial state." },
      { name: "disabled", type: "boolean", default: "false", description: "Native disabled state." },
    ],
    use: [
      "Several independent options can be selected.",
      "A change needs a save step.",
      "The choice is part of a form.",
    ],
    avoid: [
      "One on/off setting that applies immediately. Use Switch.",
      "A single opt-in that is required to continue. Make the consequence clear.",
      "A checkbox for a destructive action. Use a button and a dialog.",
    ],
    a11y: [
      "The label wraps the input, so the hit target includes the text.",
      "Space toggles the checkbox.",
      "The focus ring appears on the drawn square, not on a hidden input.",
    ],
  },
  switch: {
    files: ["switch.tsx"],
    code: `import { Switch } from "@/components/tessera/switch";

export function DigestSetting() {
  return (
    <Switch
      defaultChecked
      label="Weekly digest"
      onCheckedChange={(checked) => console.log(checked)}
    />
  );
}`,
    anatomy:
      "A native checkbox with role switch and a track that holds the thumb. The switch is immediate. If the change needs a save button, it is the wrong control.",
    props: [
      { name: "label", type: "ReactNode", description: "Visible label text." },
      { name: "checked", type: "boolean", description: "Controlled state." },
      { name: "defaultChecked", type: "boolean", default: "false", description: "Uncontrolled initial state." },
      { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Called after a user toggle." },
      { name: "disabled", type: "boolean", default: "false", description: "Native disabled state." },
    ],
    use: [
      "A setting applies at once and can be reversed.",
      "The label reads as a state: Notifications, Public profile.",
      "The result is visible or easy to undo.",
    ],
    avoid: [
      "A choice inside a form with a save button. Use Checkbox.",
      "An irreversible action.",
      "A three-state control. Use radio buttons or a select.",
    ],
    a11y: [
      "Role switch and checked state are exposed to assistive tech.",
      "Space toggles the switch.",
      "The label is part of the click target.",
    ],
  },
  card: {
    files: ["card.tsx"],
    code: `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/tessera/card";
import { Button } from "@/components/tessera/button";

export function PlanCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Studio plan</CardTitle>
        <CardDescription>Six seats, unlimited projects.</CardDescription>
      </CardHeader>
      <CardContent className="text-[13px] text-ts-muted">
        $24 a month. Cancel whenever.
      </CardContent>
      <CardFooter className="justify-end">
        <Button size="sm">Choose Studio</Button>
      </CardFooter>
    </Card>
  );
}`,
    anatomy:
      "A surface, a header, content and a footer. The card is a container, not a design motif. Nested cards are almost always a layout mistake.",
    props: [
      { name: "Card", type: "HTMLAttributes<HTMLDivElement>", description: "The bordered surface." },
      { name: "CardHeader", type: "HTMLAttributes<HTMLDivElement>", description: "Top block with 18px padding." },
      { name: "CardTitle", type: "HTMLAttributes<HTMLHeadingElement>", description: "An h3 with the card text scale." },
      { name: "CardDescription", type: "HTMLAttributes<HTMLParagraphElement>", description: "Quiet supporting copy." },
      { name: "CardContent", type: "HTMLAttributes<HTMLDivElement>", description: "The main body." },
      { name: "CardFooter", type: "HTMLAttributes<HTMLDivElement>", description: "Bottom row with a top border." },
    ],
    use: [
      "One object, plan or decision needs a quiet frame.",
      "The content has a clear top and bottom.",
      "A grid of peers needs equal visual weight.",
    ],
    avoid: [
      "A page wrapped in a card. Use spacing and a section rule.",
      "A card inside a card. Remove one border.",
      "Every block on the page in a card. The page becomes a dashboard.",
    ],
    a11y: [
      "CardTitle renders a real heading.",
      "Interactive cards need one clear link or button, not a click handler on the surface.",
      "Do not remove the focus ring from actions inside.",
    ],
  },
  tabs: {
    files: ["tabs.tsx"],
    code: `import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/tessera/tabs";

export function ProfileTabs() {
  return (
    <Tabs defaultValue="general">
      <TabsList aria-label="Profile sections">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="members">Members</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="pt-4">
        General settings live here.
      </TabsContent>
      <TabsContent value="members" className="pt-4">
        People and roles live here.
      </TabsContent>
      <TabsContent value="billing" className="pt-4">
        The plan lives here.
      </TabsContent>
    </Tabs>
  );
}`,
    anatomy:
      "A small context, a tab list, triggers and panels. The active trigger is the only one in the tab order. Arrow keys move between peers and activate them.",
    props: [
      { name: "defaultValue", type: "string", description: "Initial active tab." },
      { name: "value", type: "string", description: "Controlled active tab." },
      { name: "onValueChange", type: "(value: string) => void", description: "Called when the active tab changes." },
      { name: "TabsList aria-label", type: "string", description: "Names the group of tabs." },
      { name: "TabsTrigger value", type: "string", description: "Connects a trigger to its panel." },
      { name: "TabsContent value", type: "string", description: "The panel for that value." },
    ],
    use: [
      "Two to five peer views of the same object.",
      "The user will switch back and forth.",
      "Each panel is short enough to keep on the page.",
    ],
    avoid: [
      "A linear flow. Use a stepper or separate pages.",
      "Ten tabs. Use navigation or a select.",
      "Tabs that lazy-load a completely different product area.",
    ],
    a11y: [
      "The tab list has an accessible name.",
      "ArrowLeft, ArrowRight, Home and End move focus.",
      "Only the selected trigger is tabbable.",
      "Panels are labelled by their triggers.",
    ],
  },
  dialog: {
    files: ["dialog.tsx", "button.tsx"],
    code: `import { Button } from "@/components/tessera/button";
import { Dialog, DialogClose } from "@/components/tessera/dialog";
import { Field, Input } from "@/components/tessera/input";

export function InviteDialog() {
  return (
    <Dialog
      title="Invite a teammate"
      description="They will get an email with a link."
      trigger={<Button>Invite</Button>}
      footer={
        <>
          <DialogClose className="px-3 py-2 text-[13px]">Cancel</DialogClose>
          <DialogClose className="rounded-ts bg-ts-accent px-3 py-2 text-[13px] text-ts-accent-ink">
            Send invite
          </DialogClose>
        </>
      }
    >
      <Field label="Email address" htmlFor="invite">
        <Input id="invite" type="email" placeholder="name@studio.example" />
      </Field>
    </Dialog>
  );
}`,
    anatomy:
      "A trigger wrapper, a portal, a backdrop and a panel. The panel traps Tab and Shift+Tab, closes on Escape and restores focus to the trigger.",
    props: [
      { name: "trigger", type: "ReactNode", description: "The element that opens the dialog." },
      { name: "open", type: "boolean", description: "Controlled open state." },
      { name: "defaultOpen", type: "boolean", default: "false", description: "Uncontrolled initial state." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the dialog opens or closes." },
      { name: "title", type: "ReactNode", description: "The accessible and visible title." },
      { name: "description", type: "ReactNode", description: "A short explanation under the title." },
      { name: "footer", type: "ReactNode", description: "Action row. Use DialogClose for buttons that close." },
    ],
    use: [
      "A decision needs focus and one clear question.",
      "A destructive action needs a confirmation.",
      "A small form fits without scrolling on a phone.",
    ],
    avoid: [
      "A long multi-step form. Use a page or a drawer.",
      "A dialog that opens on page load.",
      "A dialog inside a dialog.",
    ],
    a11y: [
      "Role dialog, aria-modal and a labelled title.",
      "Focus moves into the panel and is restored on close.",
      "Escape closes. The backdrop is clickable but not the only exit.",
      "Body scroll is locked while the panel is open.",
    ],
  },
  toast: {
    files: ["toast.tsx", "button.tsx"],
    code: `"use client";

import { Button } from "@/components/tessera/button";
import { ToastProvider, useToast } from "@/components/tessera/toast";

function SaveButton() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() =>
        toast({
          title: "Profile saved",
          description: "Atelier North is up to date.",
          tone: "success",
        })
      }
    >
      Save changes
    </Button>
  );
}

export function App() {
  return (
    <ToastProvider>
      <SaveButton />
    </ToastProvider>
  );
}`,
    anatomy:
      "A provider, a queue and a portal. Each toast lives in a polite live region, leaves after 4.2 seconds by default and can be dismissed by hand.",
    props: [
      { name: "title", type: "ReactNode", description: "The one line that matters." },
      { name: "description", type: "ReactNode", description: "A short second line." },
      { name: "tone", type: '"default" | "success" | "danger"', default: '"default"', description: "The icon and colour of the toast." },
      { name: "duration", type: "number", default: "4200", description: "Milliseconds before auto-dismiss. Use 0 to keep it open." },
      { name: "max", type: "number", default: "4", description: "ToastProvider: maximum visible toasts." },
    ],
    use: [
      "A save or copy succeeded and the user does not need to act.",
      "A background action finished.",
      "An undo window is short and explicit.",
    ],
    avoid: [
      "The only record of a failure. Put the error next to the field or on the page.",
      "A toast for every click.",
      "A toast that requires a decision. Use a dialog or a banner.",
    ],
    a11y: [
      "The viewport uses aria-live=polite, so it waits for a pause.",
      "Dismiss has a visible label and a 24px target.",
      "The toast is not the only way to recover from an error.",
      "Auto-dismiss respects a long enough default and can be disabled.",
    ],
  },
  accordion: {
    files: ["accordion.tsx"],
    code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/tessera/accordion";

export function Questions() {
  return (
    <Accordion type="single" collapsible defaultValue="shipping">
      <AccordionItem value="shipping">
        <AccordionTrigger>What ships with a component?</AccordionTrigger>
        <AccordionContent>
          The source file, the shared token sheet and any dependency it names.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="updates">
        <AccordionTrigger>How do updates work?</AccordionTrigger>
        <AccordionContent>
          Copy the new file when you want it. There is no version lock.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
    anatomy:
      "An accordion context tracks open values. Each item gets its own ids for the trigger and region. The panel mounts only when open, so hidden actions never enter the tab order.",
    props: [
      { name: "type", type: '"single" | "multiple"', default: '"single"', description: "Whether one or many items can stay open." },
      { name: "collapsible", type: "boolean", default: "true", description: "Single mode: allow the open item to close." },
      { name: "defaultValue", type: "string | string[]", description: "Initial open item or items." },
      { name: "value", type: "string | string[]", description: "Controlled open state." },
      { name: "onValueChange", type: "(value: string[]) => void", description: "Called with the open values." },
    ],
    use: [
      "A page has related answers that do not all need to be visible.",
      "A mobile layout needs to save vertical space.",
      "The titles are informative enough to scan.",
    ],
    avoid: [
      "Hiding the primary action or the price.",
      "A long article where every paragraph is collapsed.",
      "Nested accordions.",
    ],
    a11y: [
      "Triggers are native buttons with aria-expanded and aria-controls.",
      "The panel is a region labelled by its trigger.",
      "Closed content is not rendered, so links inside stay out of the tab order.",
    ],
  },
  avatar: {
    files: ["avatar.tsx"],
    code: `import { Avatar, AvatarGroup } from "@/components/tessera/avatar";

export function Team() {
  return (
    <AvatarGroup>
      <Avatar alt="Mira Sol" fallback="MS" size="lg" />
      <Avatar alt="Jun Rao" fallback="JR" size="lg" />
      <Avatar alt="Ada Kemi" src="/team/ada.jpg" size="lg" />
      <Avatar alt="Leo Neri" fallback="LN" size="lg" />
    </AvatarGroup>
  );
}`,
    anatomy:
      "A span, an optional image and an initials fallback. The ring uses the surface token so overlapping faces stay legible. The component is round because people are not tiles.",
    props: [
      { name: "src", type: "string", description: "Image URL. Falls back if it fails." },
      { name: "alt", type: "string", description: "Required name. Also used to derive initials." },
      { name: "fallback", type: "string", description: "Explicit initials or short text." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "24, 32 or 40 pixels." },
    ],
    use: [
      "A person needs to be recognised quickly.",
      "A list mixes photos and people without photos.",
      "An avatar group shows a small team.",
    ],
    avoid: [
      "An avatar as the only label for an action.",
      "A photo with no alt text.",
      "A group of twenty. Show four and a count.",
    ],
    a11y: [
      "alt is required and doubles as the fallback name.",
      "The fallback exposes role img with the person's name.",
      "Decorative duplicate avatars can be hidden from assistive tech by the parent.",
    ],
  },
  "theme-switcher": {
    files: ["theme.tsx", "theme-switcher.tsx"],
    deps: [],
    code: `"use client";

import { ThemeProvider } from "@/components/tessera/theme";
import { ThemeSwitcher } from "@/components/tessera/theme-switcher";

export function Root({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultPreference="system">
      <header className="flex items-center justify-between p-4">
        <span>Tessera</span>
        <ThemeSwitcher />
      </header>
      {children}
    </ThemeProvider>
  );
}`,
    anatomy:
      "A provider resolves Paper, Ink, Moss or the system preference. The switcher shows the current glyph in a menu, or all four glyphs in a rail. The glyphs are custom tiles: solid, cut, folded and split.",
    props: [
      { name: "preference", type: '"paper" | "ink" | "moss" | "system"', description: "useTheme: the stored preference." },
      { name: "theme", type: '"paper" | "ink" | "moss"', description: "useTheme: the resolved theme after system detection." },
      { name: "setPreference", type: "(value: ThemePreference) => void", description: "useTheme: stores the preference and applies it." },
      { name: "variant", type: '"menu" | "rail"', default: '"menu"', description: "A compact menu or an inline row of four glyphs." },
      { name: "align", type: '"left" | "right"', default: '"right"', description: "Menu alignment relative to the trigger." },
    ],
    use: [
      "The product has more than one visual mood.",
      "The user should be able to follow the operating system.",
      "The header needs a compact control that is not another sun/moon.",
    ],
    avoid: [
      "More than one switcher in the same viewport. They share state, but the page gets noisy.",
      "A theme selector that changes only the marketing page. Wire the tokens everywhere.",
      "Sun and moon icons. The kit has its own marks.",
    ],
    a11y: [
      "The menu trigger reports its expanded state and has an accessible label.",
      "Menu items use menuitemradio and arrow-key navigation.",
      "The rail uses a radiogroup with checked states.",
      "Theme changes update color-scheme, not just colours.",
    ],
  },
};

export const componentDocs: ComponentDoc[] = components.map((component) => {
  const detail = details[component.slug];
  if (!detail) throw new Error(`Missing documentation for ${component.slug}`);
  return {
    ...component,
    ...detail,
    install: `${base} ${component.slug}`,
    editUrl: `https://github.com/dhirajaryaa/tessera/edit/main/registry/tessera/${
      detail.files[0]
    }`,
  };
});

export function getComponentDoc(slug: string) {
  return componentDocs.find((component) => component.slug === slug);
}
