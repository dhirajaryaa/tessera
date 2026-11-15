"use client";

import * as React from "react";
import { PikaIcon } from "@pikaicons/react";
import { ArrowRightIcon, CheckTickSquareIcon, PlusIcon } from "@pikaicons/core-free";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/tessera/accordion";
import { Avatar, AvatarGroup } from "@/components/tessera/avatar";
import { Badge } from "@/components/tessera/badge";
import { Button } from "@/components/tessera/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/tessera/card";
import { Checkbox } from "@/components/tessera/checkbox";
import { Dialog, DialogClose } from "@/components/tessera/dialog";
import { Field, Input } from "@/components/tessera/input";
import { Select } from "@/components/tessera/select";
import { Switch } from "@/components/tessera/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tessera/tabs";
import { Textarea } from "@/components/tessera/textarea";
import { useToast } from "@/components/tessera/toast";
import { ThemeGlyph, ThemeSwitcher } from "@/components/tessera/theme-switcher";

function ButtonDemo() {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-center gap-2">
        <Button>Save changes</Button>
        <Button variant="soft">Soft</Button>
        <Button variant="outline">Preview</Button>
        <Button variant="ghost">Discard</Button>
        <Button variant="link">Read the note</Button>
      </div>
      <div className="flex flex-wrap items-end gap-2 border-t border-ts-line pt-5">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="Add a part">
          <PikaIcon icon={PlusIcon} size={15} strokeWidth={1.7} />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t border-ts-line pt-5">
        <Button loading={loading} onClick={() => setLoading(true)}>
          {loading ? "Saving" : "Try loading"}
        </Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  );
}

function BadgeDemo() {
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge>Neutral</Badge>
        <Badge tone="outline">Outline</Badge>
        <Badge tone="accent">Accent</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t border-ts-line pt-4">
        <Badge tone="success" dot>
          Active
        </Badge>
        <Badge tone="warning" dot>
          Review
        </Badge>
        <Badge tone="danger" dot>
          Failed
        </Badge>
      </div>
      <p className="text-[12px] leading-relaxed text-ts-muted">
        The dot is decorative. The word carries the state.
      </p>
    </div>
  );
}

function InputDemo() {
  return (
    <div className="grid max-w-[380px] gap-4">
      <Field label="Email address" htmlFor="demo-email" hint="We only use this for receipts.">
        <Input id="demo-email" type="email" placeholder="you@studio.example" />
      </Field>
      <Field label="Workspace" htmlFor="demo-workspace" error="Use at least three characters.">
        <Input id="demo-workspace" defaultValue="At" aria-invalid />
      </Field>
      <Field label="Disabled" htmlFor="demo-input-disabled" hint="This value is managed upstream.">
        <Input id="demo-input-disabled" defaultValue="atelier-north" disabled />
      </Field>
    </div>
  );
}

function TextareaDemo() {
  const [value, setValue] = React.useState("Keep the parts small and the edges sharp.");

  return (
    <div className="grid max-w-[440px] gap-4">
      <Field
        label="Project note"
        htmlFor="demo-note"
        hint={`${value.length} of 240 characters`}
      >
        <Textarea
          id="demo-note"
          rows={4}
          maxLength={240}
          value={value}
          onChange={(value) => setValue(value)}
        />
      </Field>
    </div>
  );
}

function SelectDemo() {
  const [plan, setPlan] = React.useState("studio");

  return (
    <div className="grid max-w-[360px] gap-4">
      <Field label="Plan" htmlFor="demo-plan" hint="Change whenever. The proration is monthly.">
        <Select id="demo-plan" value={plan}         onChange={(value) => setPlan(value)}>
          <option value="personal">Personal</option>
          <option value="studio">Studio</option>
          <option value="studio-plus">Studio plus</option>
        </Select>
      </Field>
      <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-ts-muted">
        selected: {plan}
      </p>
    </div>
  );
}

function CheckboxDemo() {
  const [items, setItems] = React.useState<string[]>(["receipt"]);

  function toggle(value: string, checked: boolean) {
    setItems((current) =>
      checked ? [...current, value] : current.filter((item) => item !== value)
    );
  }

  return (
    <div className="grid max-w-[400px] gap-4">
      <Checkbox
        label="Email me a receipt"
        description="One message after payment."
        checked={items.includes("receipt")}
        onChange={(checked) => toggle("receipt", checked)}
      />
      <Checkbox
        label="Save this card"
        description="Stored with the payment provider."
        checked={items.includes("card")}
        onChange={(checked) => toggle("card", checked)}
      />
      <Checkbox label="Disabled option" disabled />
    </div>
  );
}

function SwitchDemo() {
  const [digest, setDigest] = React.useState(true);
  const [profile, setProfile] = React.useState(false);

  return (
    <div className="grid max-w-[420px] gap-1">
      <div className="flex items-center justify-between gap-4 border-b border-ts-line py-3">
        <div>
          <p className="text-[13px] font-medium text-ts-ink">Weekly digest</p>
          <p className="mt-0.5 text-[11.5px] text-ts-muted">One email, Friday morning.</p>
        </div>
        <Switch
          checked={digest}
          onCheckedChange={setDigest}
          label=""
          aria-label="Weekly digest"
        />
      </div>
      <div className="flex items-center justify-between gap-4 py-3">
        <div>
          <p className="text-[13px] font-medium text-ts-ink">Public profile</p>
          <p className="mt-0.5 text-[11.5px] text-ts-muted">Anyone with the link can see it.</p>
        </div>
        <Switch
          checked={profile}
          onCheckedChange={setProfile}
          label=""
          aria-label="Public profile"
        />
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-ts-muted">
        digest {digest ? "on" : "off"} · profile {profile ? "on" : "off"}
      </p>
    </div>
  );
}

function CardDemo() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Studio</CardTitle>
          <CardDescription>Six seats, unlimited projects.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-[24px] font-medium tracking-[-0.04em] text-ts-ink">
            $24
            <span className="ml-1 font-mono text-[10px] font-normal uppercase tracking-[0.08em] text-ts-muted">
              / month
            </span>
          </p>
        </CardContent>
        <CardFooter className="justify-end">
          <Button size="sm">Choose Studio</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle>Personal</CardTitle>
            <Badge tone="outline">Free</Badge>
          </div>
          <CardDescription>One project, no card required.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-[24px] font-medium tracking-[-0.04em] text-ts-ink">
            $0
            <span className="ml-1 font-mono text-[10px] font-normal uppercase tracking-[0.08em] text-ts-muted">
              forever
            </span>
          </p>
        </CardContent>
        <CardFooter className="justify-end">
          <Button size="sm" variant="outline">
            Start here
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function TabsDemo() {
  return (
    <Tabs defaultValue="general" className="max-w-[460px]">
      <TabsList aria-label="Profile sections">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="members">Members</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="pt-4">
        <p className="text-[13px] leading-relaxed text-ts-muted">
          The name, timezone and weekly digest for this workspace.
        </p>
      </TabsContent>
      <TabsContent value="members" className="pt-4">
        <AvatarGroup>
          <Avatar alt="Mira Sol" fallback="MS" />
          <Avatar alt="Jun Rao" fallback="JR" />
          <Avatar alt="Ada Kemi" fallback="AK" />
          <Avatar alt="Leo Neri" fallback="LN" />
        </AvatarGroup>
        <p className="mt-3 text-[13px] leading-relaxed text-ts-muted">
          Four people, one owner. Arrow keys move between these tabs.
        </p>
      </TabsContent>
      <TabsContent value="billing" className="pt-4">
        <p className="text-[13px] leading-relaxed text-ts-muted">
          Studio, $24 a month, renewing on 01 Dec 2026.
        </p>
      </TabsContent>
    </Tabs>
  );
}

function DialogDemo() {
  const { toast } = useToast();

  return (
    <Dialog
      title="Invite a teammate"
      description="They will get an email with a link to Atelier North."
      trigger={<Button>Invite a teammate</Button>}
      footer={
        <>
          <DialogClose className="inline-flex h-8 items-center justify-center rounded-ts border border-transparent px-3 font-sans text-[12.5px] font-semibold text-ts-ink transition-colors hover:bg-ts-surface-2">
            Cancel
          </DialogClose>
          <DialogClose
            onClick={() =>
              toast({
                title: "Invite sent",
                description: "One seat is still open.",
                tone: "success",
              })
            }
            className="inline-flex h-8 items-center justify-center rounded-ts border border-transparent bg-ts-accent px-3 font-sans text-[12.5px] font-semibold text-ts-accent-ink transition-colors hover:bg-ts-accent-hover"
          >
            Send invite
          </DialogClose>
        </>
      }
    >
      <Field label="Email address" htmlFor="demo-invite">
        <Input id="demo-invite" type="email" placeholder="name@studio.example" />
      </Field>
    </Dialog>
  );
}

function ToastDemo() {
  const { toast } = useToast();

  return (
    <div className="grid max-w-[440px] gap-4">
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() =>
            toast({
              title: "Profile saved",
              description: "Atelier North is up to date.",
              tone: "success",
            })
          }
        >
          Save
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              title: "Copy failed",
              description: "The clipboard is not available in this context.",
              tone: "danger",
            })
          }
        >
          Trigger a failure
        </Button>
        <Button
          variant="ghost"
          onClick={() =>
            toast({
              title: "Digest scheduled",
              description: "The next one goes out on Friday.",
              duration: 0,
            })
          }
        >
          Keep it open
        </Button>
      </div>
      <p className="text-[12px] leading-relaxed text-ts-muted">
        Toasts stack bottom right, pause on hover and leave on their own. The third
        one stays until you dismiss it.
      </p>
    </div>
  );
}

const questions = [
  {
    value: "shipping",
    question: "What ships with a component?",
    answer:
      "The .tsx file, the shared token sheet, and any other component file it names. Nothing is hidden in a package.",
  },
  {
    value: "updates",
    question: "How do updates work?",
    answer:
      "Copy the new file when you want it. The CLI will not overwrite a file you have changed unless you pass --overwrite.",
  },
  {
    value: "removal",
    question: "Can I delete a part I do not use?",
    answer:
      "Yes. Delete the file and any import of it. The rest of the set has no knowledge of it.",
  },
];

function AccordionDemo() {
  return (
    <div className="max-w-[560px]">
      <Accordion type="single" collapsible defaultValue="shipping">
        {questions.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

function AvatarDemo() {
  return (
    <div className="grid gap-6">
      <div className="flex items-end gap-3">
        <Avatar alt="Mira Sol" fallback="MS" size="sm" />
        <Avatar alt="Jun Rao" fallback="JR" size="md" />
        <Avatar alt="Ada Kemi" fallback="AK" size="lg" />
        <Avatar
          alt="Photo"
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop"
          size="lg"
        />
      </div>
      <div className="flex items-center gap-4 border-t border-ts-line pt-5">
        <AvatarGroup>
          <Avatar alt="Mira Sol" fallback="MS" />
          <Avatar alt="Jun Rao" fallback="JR" />
          <Avatar alt="Ada Kemi" fallback="AK" />
        </AvatarGroup>
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ts-muted">
          three of seven
        </span>
      </div>
    </div>
  );
}

function ThemeSwitcherDemo() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <ThemeSwitcher />
        <ThemeSwitcher variant="rail" />
      </div>
      <div className="flex flex-wrap items-center gap-3 border-t border-ts-line pt-5">
        {(["paper", "ink", "moss", "system"] as const).map((theme) => (
          <span
            key={theme}
            className="inline-flex items-center gap-2 rounded-[5px] border border-ts-line bg-ts-surface px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-ts-muted"
          >
            <ThemeGlyph theme={theme} className="size-3.5" />
            {theme}
          </span>
        ))}
      </div>
      <p className="flex items-center gap-2 text-[12px] leading-relaxed text-ts-muted">
        <PikaIcon icon={CheckTickSquareIcon} size={12} strokeWidth={1.8} className="text-ts-success" />
        The menu and rail share one stored preference.
      </p>
    </div>
  );
}

function GenericDemo({ slug }: { slug: string }) {
  return (
    <div className="grid gap-4">
      <p className="text-[13px] text-ts-muted">
        This part is available in the kit. See the install command above.
      </p>
      <a
        className="link-quiet inline-flex w-fit items-center gap-2 text-[12.5px] font-semibold text-ts-ink"
        href={`https://github.com/dhirajaryaa/tessera/blob/main/registry/tessera/${slug}.tsx`}
        target="_blank"
        rel="noreferrer"
      >
        Read the source
        <PikaIcon icon={ArrowRightIcon} size={12} strokeWidth={1.7} />
      </a>
    </div>
  );
}

export function ComponentDemo({ slug }: { slug: string }) {
  switch (slug) {
    case "button":
      return <ButtonDemo />;
    case "badge":
      return <BadgeDemo />;
    case "input":
      return <InputDemo />;
    case "textarea":
      return <TextareaDemo />;
    case "select":
      return <SelectDemo />;
    case "checkbox":
      return <CheckboxDemo />;
    case "switch":
      return <SwitchDemo />;
    case "card":
      return <CardDemo />;
    case "tabs":
      return <TabsDemo />;
    case "dialog":
      return <DialogDemo />;
    case "toast":
      return <ToastDemo />;
    case "accordion":
      return <AccordionDemo />;
    case "avatar":
      return <AvatarDemo />;
    case "theme-switcher":
      return <ThemeSwitcherDemo />;
    default:
      return <GenericDemo slug={slug} />;
  }
}
