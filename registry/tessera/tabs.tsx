"use client";

import * as React from "react";
import { cn, useControllableState } from "@/lib/utils";

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
  baseId: string;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabs() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs parts must be used inside <Tabs>.");
  }
  return context;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function Tabs({
  className,
  value,
  defaultValue = "",
  onValueChange,
  children,
  ...props
}: TabsProps) {
  const [current, setCurrent] = useControllableState({
    value,
    defaultValue,
    onChange: onValueChange,
  });
  const baseId = React.useId();

  return (
    <TabsContext.Provider value={{ value: current, setValue: setCurrent, baseId }}>
      <div className={cn("font-ts-sans", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  "aria-label"?: string;
}

export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-[7px] border border-ts-line bg-ts-surface-2 p-[3px]",
        className
      )}
      {...props}
    />
  );
}

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function TabsTrigger({
  className,
  value,
  children,
  ...props
}: TabsTriggerProps) {
  const tabs = useTabs();
  const active = tabs.value === value;

  function moveFocus(event: React.KeyboardEvent<HTMLButtonElement>) {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    const list = event.currentTarget.parentElement;
    if (!list) return;
    const triggers = Array.from(
      list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)')
    );
    if (!triggers.length) return;

    const index = triggers.indexOf(event.currentTarget);
    let next = index;
    if (event.key === "ArrowLeft") next = (index - 1 + triggers.length) % triggers.length;
    if (event.key === "ArrowRight") next = (index + 1) % triggers.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = triggers.length - 1;

    triggers[next]?.focus();
    triggers[next]?.click();
  }

  return (
    <button
      type="button"
      role="tab"
      id={`${tabs.baseId}-tab-${value}`}
      aria-controls={`${tabs.baseId}-panel-${value}`}
      aria-selected={active}
      data-state={active ? "active" : "inactive"}
      tabIndex={active ? 0 : -1}
      onClick={() => tabs.setValue(value)}
      onKeyDown={moveFocus}
      className={cn(
        "h-7 rounded-[5px] px-2.5 font-ts-sans text-[12px] font-medium text-ts-muted",
        "transition-[background-color,color,box-shadow] duration-150",
        "hover:text-ts-ink",
        "data-[state=active]:bg-ts-surface data-[state=active]:text-ts-ink data-[state=active]:shadow-sm",
        "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ts-ink",
        "disabled:pointer-events-none disabled:opacity-40",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({
  className,
  value,
  children,
  ...props
}: TabsContentProps) {
  const tabs = useTabs();
  const active = tabs.value === value;

  return (
    <div
      role="tabpanel"
      id={`${tabs.baseId}-panel-${value}`}
      aria-labelledby={`${tabs.baseId}-tab-${value}`}
      hidden={!active}
      tabIndex={0}
      className={cn(
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ts-ink",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
