"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PikaIcon } from "@pikaicons/react";
import {
  ArrowRightIcon,
  BurgerMenuThreeIcon,
  GithubIcon,
  MultipleCrossCancelIcon,
} from "@pikaicons/core-free";
import { ThemeSwitcher } from "@/components/tessera/theme-switcher";
import { Mark, Wordmark } from "@/components/site/logo";
import { InstallCommand } from "@/components/site/install-command";
import { cn } from "@/lib/utils";

const links = [
  { href: "/docs/components", label: "Components" },
  { href: "/docs/theming", label: "Themes" },
  { href: "/docs", label: "Docs" },
  { href: "/docs/agents", label: "Agents" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

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

  return (
    <header className="site-header sticky top-0 z-40 border-b border-ts-line">
      <div className="shell-wide flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="Tessera home"
          className="flex items-center gap-2.5 rounded-[4px] text-ts-ink"
        >
          <Mark className="size-[22px]" />
          <Wordmark />
          <span className="ml-1 hidden rounded-[3px] border border-ts-line px-1.5 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-ts-muted sm:inline">
            v0.1
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {links.map((link) => {
            const active =
              link.href === "/docs"
                ? pathname === "/docs"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                data-active={active}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "link-quiet font-sans text-[12.5px] font-medium transition-colors",
                  active ? "text-ts-ink" : "text-ts-muted hover:text-ts-ink"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <a
            href="https://github.com/dhirajaryaa/tessera"
            target="_blank"
            rel="noreferrer"
            aria-label="Tessera on GitHub"
            className="hidden size-9 place-items-center rounded-ts border border-transparent text-ts-muted transition-colors hover:border-ts-line hover:bg-ts-surface hover:text-ts-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ts-ink sm:grid"
          >
            <PikaIcon icon={GithubIcon} size={16} strokeWidth={1.6} />
          </a>
          <Link
            href="/docs/installation"
            className="hidden h-9 items-center gap-2 rounded-ts border border-transparent bg-ts-ink px-3.5 font-sans text-[12.5px] font-semibold leading-none text-ts-bg transition-[transform,background-color] hover:-translate-y-px hover:bg-ts-accent hover:text-ts-accent-ink active:translate-y-0 sm:inline-flex"
          >
            Install
            <PikaIcon icon={ArrowRightIcon} size={13} strokeWidth={1.7} />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-9 place-items-center rounded-ts border border-ts-line bg-ts-surface text-ts-ink lg:hidden"
          >
            <PikaIcon
              icon={open ? MultipleCrossCancelIcon : BurgerMenuThreeIcon}
              size={16}
              strokeWidth={1.6}
            />
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-ts-line bg-ts-bg lg:hidden"
        >
          <div className="shell flex min-h-full flex-col py-8">
            <p className="eyebrow">Navigate</p>
            <nav aria-label="Mobile" className="mt-5 grid">
              {links.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-baseline justify-between border-b border-ts-line py-4 text-ts-ink"
                >
                  <span className="text-[26px] font-medium tracking-[-0.04em]">
                    {link.label}
                  </span>
                  <span className="font-mono text-[10px] text-ts-muted">
                    0{index + 1}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mt-8">
              <p className="eyebrow">Appearance</p>
              <div className="mt-3">
                <ThemeSwitcher variant="rail" />
              </div>
            </div>

            <div className="mt-8">
              <p className="eyebrow">Install</p>
              <InstallCommand
                command="npx github:dhirajaryaa/tessera#main init"
                className="mt-3"
              />
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-ts-line pt-6 text-[12px] text-ts-muted">
              <a
                href="https://github.com/dhirajaryaa/tessera"
                target="_blank"
                rel="noreferrer"
                className="link-quiet inline-flex items-center gap-2 text-ts-ink"
              >
                <PikaIcon icon={GithubIcon} size={14} strokeWidth={1.6} />
                GitHub
              </a>
              <span className="font-mono text-[10px] uppercase tracking-[0.1em]">
                MIT · 2026
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
