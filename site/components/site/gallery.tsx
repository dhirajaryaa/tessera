"use client";

import * as React from "react";
import Link from "next/link";
import { PikaIcon } from "@pikaicons/react";
import { ArrowRightIcon } from "@pikaicons/core-free";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/tessera/accordion";
import { Avatar, AvatarGroup } from "@/components/tessera/avatar";
import { Badge } from "@/components/tessera/badge";
import { Button } from "@/components/tessera/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/tessera/card";
import { Checkbox } from "@/components/tessera/checkbox";
import { Field, Input } from "@/components/tessera/input";
import { Select } from "@/components/tessera/select";
import { Switch } from "@/components/tessera/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tessera/tabs";
import { Textarea } from "@/components/tessera/textarea";
import { ThemeSwitcher } from "@/components/tessera/theme-switcher";
import { components, categories, type ComponentMeta } from "@/lib/components";
import { cn } from "@/lib/utils";

function Preview({ slug }: { slug: string }) {
  switch (slug) {
    case "button":
      return (
        <div className="flex items-center gap-2">
          <Button size="sm">Save</Button>
          <Button size="sm" variant="outline">
            Cancel
          </Button>
        </div>
      );
    case "badge":
      return (
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <Badge tone="accent">New</Badge>
          <Badge tone="neutral">Draft</Badge>
          <Badge tone="outline">Archived</Badge>
        </div>
      );
    case "input":
      return (
        <Field label="Email" htmlFor="gallery-email" className="w-[190px]">
          <Input id="gallery-email" placeholder="you@studio.example" />
        </Field>
      );
    case "textarea":
      return (
        <Textarea
          aria-label="Note"
          rows={2}
          placeholder="A short note about this project."
          className="min-h-[64px] w-[200px] resize-none text-[11px]"
        />
      );
    case "select":
      return (
        <Field label="Plan" htmlFor="gallery-plan" className="w-[180px]">
          <Select id="gallery-plan" defaultValue="studio">
            <option value="personal">Personal</option>
            <option value="studio">Studio</option>
            <option value="studio-plus">Studio plus</option>
          </Select>
        </Field>
      );
    case "checkbox":
      return (
        <div className="grid gap-3">
          <Checkbox defaultChecked label="Send a copy" />
          <Checkbox label="Save as draft" />
        </div>
      );
    case "switch":
      return (
        <div className="grid gap-3">
          <Switch defaultChecked label="Notifications" />
          <Switch label="Public profile" />
        </div>
      );
    case "card":
      return (
        <Card className="w-[210px]">
          <CardHeader className="p-3.5">
            <CardTitle className="text-[12px]">Studio plan</CardTitle>
            <CardDescription className="text-[10.5px]">
              Six seats, unlimited projects.
            </CardDescription>
          </CardHeader>
        </Card>
      );
    case "tabs":
      return (
        <div className="w-[210px]">
          <Tabs defaultValue="one">
            <TabsList aria-label="Gallery tabs" className="w-full">
              <TabsTrigger value="one" className="flex-1">
                One
              </TabsTrigger>
              <TabsTrigger value="two" className="flex-1">
                Two
              </TabsTrigger>
              <TabsTrigger value="three" className="flex-1">
                Three
              </TabsTrigger>
            </TabsList>
            <TabsContent value="one" className="pt-2 text-center text-[11px] text-ts-muted">
              The first view.
            </TabsContent>
            <TabsContent value="two" className="pt-2 text-center text-[11px] text-ts-muted">
              The second view.
            </TabsContent>
            <TabsContent value="three" className="pt-2 text-center text-[11px] text-ts-muted">
              The third view.
            </TabsContent>
          </Tabs>
        </div>
      );
    case "dialog":
      return (
        <div className="w-[210px] rounded-[9px] border border-ts-line bg-ts-surface p-3 shadow-ts">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[11.5px] font-semibold text-ts-ink">Invite a teammate</p>
              <p className="mt-0.5 text-[9.5px] leading-snug text-ts-muted">
                They will get an email link.
              </p>
            </div>
            <span className="grid size-4 place-items-center rounded-[3px] border border-ts-line text-ts-muted">
              <span className="text-[9px] leading-none">×</span>
            </span>
          </div>
          <div className="mt-2 h-6 rounded-[5px] border border-ts-line bg-ts-bg" />
          <div className="mt-2 flex justify-end gap-1.5">
            <span className="inline-flex h-5 items-center rounded-[4px] px-2 text-[8.5px] font-semibold text-ts-muted">
              Cancel
            </span>
            <span className="inline-flex h-5 items-center rounded-[4px] bg-ts-accent px-2 text-[8.5px] font-semibold text-ts-accent-ink">
              Send
            </span>
          </div>
        </div>
      );
    case "toast":
      return (
        <div className="w-[220px] rounded-[8px] border border-ts-line bg-ts-surface p-3 shadow-ts">
          <div className="flex gap-2">
            <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-ts-success/15 text-ts-success">
              <svg viewBox="0 0 16 16" fill="none" className="size-2.5">
                <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <p className="text-[10.5px] font-semibold leading-tight text-ts-ink">Profile saved</p>
              <p className="mt-0.5 text-[9.5px] leading-snug text-ts-muted">Atelier North is up to date.</p>
            </div>
          </div>
        </div>
      );
    case "accordion":
      return (
        <Accordion
          type="single"
          collapsible
          defaultValue="one"
          className="w-[210px] text-[11px]"
        >
          <AccordionItem value="one" className="border-ts-line">
            <AccordionTrigger className="py-2 text-[11px]">What ships?</AccordionTrigger>
            <AccordionContent className="pb-2 text-[10px]">Source and tokens.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="two" className="border-b-0">
            <AccordionTrigger className="py-2 text-[11px]">What stays?</AccordionTrigger>
            <AccordionContent className="pb-2 text-[10px]">Your decisions.</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    case "avatar":
      return (
        <AvatarGroup className="-space-x-2.5">
          <Avatar alt="Mira Sol" fallback="MS" size="lg" />
          <Avatar alt="Jun Rao" fallback="JR" size="lg" />
          <Avatar alt="Ada Kemi" fallback="AK" size="lg" />
          <Avatar alt="Leo Neri" fallback="LN" size="lg" />
        </AvatarGroup>
      );
    case "theme-switcher":
      return <ThemeSwitcher variant="rail" />;
    default:
      return null;
  }
}

export function Gallery() {
  const [filter, setFilter] = React.useState<(typeof categories)[number]>("All");
  const visible = components.filter(
    (component) => filter === "All" || component.category === filter
  );

  return (
    <section className="section" id="components">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">02 / The parts</p>
            <h2 className="section-heading mt-5 max-w-[16ch]">
              Fourteen pieces,
              <br />
              <em className="text-ts-accent">one language.</em>
            </h2>
          </div>
          <div className="max-w-[36ch] md:text-right">
            <p className="text-[13.5px] leading-relaxed text-ts-muted">
              Every part is a file. Every token is yours. Open one to see the
              source, the props and the cases where it belongs.
            </p>
            <Link
              href="/docs/components"
              className="link-quiet mt-3 inline-flex items-center gap-2 text-[12.5px] font-semibold text-ts-ink"
            >
              All components
              <PikaIcon icon={ArrowRightIcon} size={13} strokeWidth={1.7} />
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-1.5 border-y border-ts-line py-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
              className={cn(
                "h-7 rounded-[5px] px-2.5 font-mono text-[9px] uppercase tracking-[0.08em] transition-colors",
                filter === category
                  ? "bg-ts-ink text-ts-bg"
                  : "text-ts-muted hover:bg-ts-surface-2 hover:text-ts-ink"
              )}
            >
              {category}
            </button>
          ))}
          <span className="ml-auto self-center font-mono text-[9px] uppercase tracking-[0.08em] text-ts-muted">
            {visible.length} / {components.length}
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((component, index) => (
            <GalleryTile key={component.slug} component={component} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryTile({
  component,
  index,
}: {
  component: ComponentMeta;
  index: number;
}) {
  return (
    <Link
      href={`/docs/components/${component.slug}`}
      className="hover-lift group flex min-h-[214px] flex-col rounded-[10px] border border-ts-line bg-ts-surface hover:border-ts-line-strong hover:shadow-ts"
    >
      <div className="flex items-center justify-between px-3.5 pt-3">
        <span className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-ts-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-ts-muted">
          {component.category}
        </span>
      </div>

      <div
        inert
        aria-hidden="true"
        className="pointer-events-none flex flex-1 items-center justify-center px-4 py-4"
      >
        <Preview slug={component.slug} />
      </div>

      <div className="flex items-end justify-between gap-3 border-t border-ts-line px-3.5 py-3">
        <div>
          <h3 className="text-[13px] font-semibold tracking-[-0.01em] text-ts-ink">
            {component.name}
          </h3>
          <p className="mt-0.5 line-clamp-1 text-[10.5px] text-ts-muted">
            {component.summary}
          </p>
        </div>
        <span className="grid size-6 shrink-0 place-items-center rounded-[4px] border border-ts-line text-ts-muted transition-[transform,color,border-color] duration-200 group-hover:translate-x-0.5 group-hover:border-ts-accent group-hover:text-ts-accent">
          <PikaIcon icon={ArrowRightIcon} size={11} strokeWidth={1.8} />
        </span>
      </div>
    </Link>
  );
}
