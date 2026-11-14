"use client";

import * as React from "react";
import { cn, useControllableState } from "@/lib/utils";

type AccordionContextValue = {
  openItems: string[];
  toggle: (value: string) => void;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordion() {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("Accordion parts must be used inside <Accordion>.");
  return context;
}

type ItemContextValue = {
  value: string;
  open: boolean;
  toggle: () => void;
  triggerId: string;
  contentId: string;
};

const ItemContext = React.createContext<ItemContextValue | null>(null);

function useItem() {
  const context = React.useContext(ItemContext);
  if (!context) throw new Error("AccordionItem parts must be used inside <AccordionItem>.");
  return context;
}

function normalize(value: string | string[] | undefined): string[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  collapsible?: boolean;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string[]) => void;
}

export function Accordion({
  className,
  type = "single",
  collapsible = true,
  value,
  defaultValue,
  onValueChange,
  children,
  ...props
}: AccordionProps) {
  const [openItems, setOpenItems] = useControllableState<string[]>({
    value: value === undefined ? undefined : normalize(value),
    defaultValue: normalize(defaultValue),
    onChange: onValueChange,
  });

  const toggle = React.useCallback(
    (item: string) => {
      const isOpen = openItems.includes(item);
      if (type === "multiple") {
        setOpenItems(
          isOpen ? openItems.filter((value) => value !== item) : [...openItems, item]
        );
        return;
      }
      if (isOpen) {
        if (collapsible) setOpenItems([]);
        return;
      }
      setOpenItems([item]);
    },
    [collapsible, openItems, setOpenItems, type]
  );

  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div className={cn("font-ts-sans", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function AccordionItem({
  className,
  value,
  children,
  ...props
}: AccordionItemProps) {
  const accordion = useAccordion();
  const id = React.useId();
  const open = accordion.openItems.includes(value);

  return (
    <ItemContext.Provider
      value={{
        value,
        open,
        toggle: () => accordion.toggle(value),
        triggerId: `${id}-trigger`,
        contentId: `${id}-content`,
      }}
    >
      <div className={cn("border-b border-ts-line", className)} {...props}>
        {children}
      </div>
    </ItemContext.Provider>
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const item = useItem();

  return (
    <button
      type="button"
      id={item.triggerId}
      aria-expanded={item.open}
      aria-controls={item.contentId}
      onClick={item.toggle}
      className={cn(
        "flex w-full items-center justify-between gap-4 py-3.5 text-left",
        "font-ts-sans text-[13.5px] font-medium text-ts-ink",
        "transition-colors hover:text-ts-accent",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ts-ink",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        fill="none"
        className={cn(
          "size-3.5 shrink-0 text-ts-muted transition-transform duration-200",
          item.open && "rotate-180"
        )}
      >
        <path
          d="m4 6 4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const item = useItem();
  if (!item.open) return null;

  return (
    <div
      id={item.contentId}
      role="region"
      aria-labelledby={item.triggerId}
      className={cn(
        "pb-4 font-ts-sans text-[12.5px] leading-relaxed text-ts-muted",
        "[animation:ts-accordion-in_180ms_ease-out_both]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
