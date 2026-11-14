"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PikaIcon } from "@pikaicons/react";
import { BurgerMenuThreeIcon, MultipleCrossCancelIcon } from "@pikaicons/core-free";
import { components } from "@/lib/components";
import { cn } from "@/lib/utils";

const start = [
  { href: "/docs", label: "Introduction" },
  { href: "/docs/installation", label: "Installation" },
  { href: "/docs/theming", label: "Themes" },
  { href: "/docs/principles", label: "Principles" },
  { href: "/docs/agents", label: "For agents" },
  { href: "/docs/contributing", label: "Contributing" },
];

function isActive(pathname: string, href: string) {
  if (href === "/docs") return pathname === "/docs";
  if (href === "/docs/components") return pathname.startsWith("/docs/components");
  return pathname === href;
}

function NavList({ close }: { close?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div>
        <p className="font-mono text-[9px] font-medium uppercase tracking-[0.13em] text-ts-muted">
          Start here
        </p>
        <ul className="mt-3 grid gap-0.5">
          {start.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block rounded-[5px] px-2 py-[5px] text-[12px] transition-colors",
                    active
                      ? "bg-ts-surface-2 font-medium text-ts-ink"
                      : "text-ts-muted hover:bg-ts-surface-2/60 hover:text-ts-ink"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[9px] font-medium uppercase tracking-[0.13em] text-ts-muted">
            Components
          </p>
          <span className="font-mono text-[8.5px] text-ts-muted">
            {components.length}
          </span>
        </div>
        <ul className="mt-3 grid gap-0.5">
          {components.map((component) => {
            const href = `/docs/components/${component.slug}`;
            const active = pathname === href;
            return (
              <li key={component.slug}>
                <Link
                  href={href}
                  onClick={close}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between rounded-[5px] px-2 py-[5px] text-[12px] transition-colors",
                    active
                      ? "bg-ts-surface-2 font-medium text-ts-ink"
                      : "text-ts-muted hover:bg-ts-surface-2/60 hover:text-ts-ink"
                  )}
                >
                  {component.name}
                  <span className="font-mono text-[8px] uppercase tracking-[0.06em] text-ts-muted/70">
                    {component.category.slice(0, 3)}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-6 border-t border-ts-line pt-4">
        <a
          href="https://github.com/dhirajaryaa/tessera"
          target="_blank"
          rel="noreferrer"
          className="block rounded-[5px] px-2 py-[5px] text-[12px] text-ts-muted transition-colors hover:bg-ts-surface-2/60 hover:text-ts-ink"
        >
          GitHub source ↗
        </a>
        <a
          href="https://github.com/dhirajaryaa/tessera/blob/main/llms.txt"
          target="_blank"
          rel="noreferrer"
          className="block rounded-[5px] px-2 py-[5px] text-[12px] text-ts-muted transition-colors hover:bg-ts-surface-2/60 hover:text-ts-ink"
        >
          llms.txt ↗
        </a>
      </div>
    </>
  );
}

export function DocsSidebar() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => setOpen(false), [pathname]);

  React.useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const current =
    [...start].reverse().find((item) => isActive(pathname, item.href))?.label ??
    components.find((item) => pathname === `/docs/components/${item.slug}`)?.name ??
    "Manual";

  return (
    <>
      <aside className="hidden lg:block">
        <div className="sticky top-[calc(4rem+28px)] max-h-[calc(100svh-6rem)] overflow-y-auto pb-8 pr-2">
          <NavList />
        </div>
      </aside>

      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="docs-mobile-nav"
          className="flex h-10 w-full items-center justify-between gap-3 rounded-ts border border-ts-line bg-ts-surface px-3 text-left"
        >
          <span className="flex items-center gap-2">
            <PikaIcon icon={BurgerMenuThreeIcon} size={14} strokeWidth={1.7} />
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-ts-muted">
              Manual
            </span>
          </span>
          <span className="truncate text-[12px] font-medium text-ts-ink">{current}</span>
        </button>

        {open ? (
          <div
            id="docs-mobile-nav"
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-ts-line bg-ts-bg lg:hidden"
          >
            <div className="shell py-6">
              <div className="flex items-center justify-between border-b border-ts-line pb-3">
                <p className="eyebrow">The manual</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close manual menu"
                  className="grid size-8 place-items-center rounded-[5px] border border-ts-line text-ts-muted"
                >
                  <PikaIcon icon={MultipleCrossCancelIcon} size={14} strokeWidth={1.7} />
                </button>
              </div>
              <div className="mt-5">
                <NavList close={() => setOpen(false)} />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
