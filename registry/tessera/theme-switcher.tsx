"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  themeOptions,
  useTheme,
  type ThemePreference,
} from "./theme";

/**
 * Four tile glyphs. The metaphor is a window, not a sun or a moon:
 * paper (light), ink (dark), moss (green), auto (split system).
 */
export function ThemeGlyph({
  theme,
  className,
}: {
  theme: ThemePreference;
  className?: string;
}) {
  const shared = {
    viewBox: "0 0 18 18",
    fill: "none",
    "aria-hidden": true as const,
    className: cn("size-[18px]", className),
  };

  if (theme === "paper") {
    return (
      <svg {...shared}>
        <rect
          x="2.75"
          y="2.75"
          width="12.5"
          height="12.5"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.35"
        />
        <rect x="5.4" y="5.4" width="4.6" height="4.6" rx="0.6" fill="currentColor" />
      </svg>
    );
  }

  if (theme === "ink") {
    return (
      <svg {...shared}>
        <path
          d="M4.75 2.75h8.5c1.1 0 2 .9 2 2v8.5c0 1.1-.9 2-2 2h-8.5c-1.1 0-2-.9-2-2v-8.5c0-1.1.9-2 2-2Zm5.4 7.3h3.6v3.6h-3.6v-3.6Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
    );
  }

  if (theme === "moss") {
    return (
      <svg {...shared}>
        <rect
          x="2.75"
          y="2.75"
          width="12.5"
          height="12.5"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.35"
        />
        <path
          d="M3.5 14.5V8.25L10.25 3.5H14.5v5.75L7.25 14.5H3.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg {...shared}>
      <rect
        x="2.75"
        y="2.75"
        width="12.5"
        height="12.5"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.35"
      />
      <path d="M9 2.75h4.25c.55 0 1 .45 1 1v10.5c0 .55-.45 1-1 1H9V2.75Z" fill="currentColor" />
      <path
        d="M9 2.75v12.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeDasharray="1.3 2"
      />
    </svg>
  );
}

export interface ThemeSwitcherProps {
  variant?: "menu" | "rail";
  className?: string;
  align?: "left" | "right";
  onThemeChange?: (theme: ThemePreference) => void;
}

export function ThemeSwitcher({
  variant = "menu",
  className,
  align = "right",
  onThemeChange,
}: ThemeSwitcherProps) {
  const { preference, setPreference } = useTheme();

  const handleSetPreference = React.useCallback(
    (next: ThemePreference) => {
      setPreference(next);
      onThemeChange?.(next);
    },
    [setPreference, onThemeChange]
  );

  if (variant === "rail") {
    return (
      <div
        role="radiogroup"
        aria-label="Appearance"
        className={cn(
          "inline-flex items-center gap-0.5 rounded-[10px] border border-ts-line bg-ts-surface-2 p-1",
          className
        )}
      >
        {themeOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={preference === option.value}
            aria-label={`${option.label}: ${option.note}`}
            title={`${option.label} · ${option.note}`}
            onClick={() => handleSetPreference(option.value)}
            className={cn(
              "grid size-8 place-items-center rounded-[7px] text-ts-muted",
              "transition-[background-color,color,box-shadow,transform] duration-150",
              "hover:text-ts-ink active:scale-95",
              "aria-checked:bg-ts-surface aria-checked:text-ts-ink aria-checked:shadow-sm",
              "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ts-ink"
            )}
          >
            <ThemeGlyph theme={option.value} />
          </button>
        ))}
      </div>
    );
  }

  return (
    <ThemeMenu
      className={className}
      align={align}
      preference={preference}
      onThemeChange={handleSetPreference}
    />
  );
}

function ThemeMenu({
  className,
  align,
  preference,
  onThemeChange,
}: {
  className?: string;
  align: "left" | "right";
  preference: ThemePreference;
  onThemeChange: (next: ThemePreference) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    const frame = window.requestAnimationFrame(() => {
      const checked = panelRef.current?.querySelector<HTMLElement>(
        '[aria-checked="true"]'
      );
      checked?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function onPanelKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const keys = ["ArrowDown", "ArrowUp", "Home", "End"];
    if (!keys.includes(event.key)) return;

    const items = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>('[role="menuitemradio"]') ?? []
    );
    if (!items.length) return;

    event.preventDefault();
    const index = items.indexOf(document.activeElement as HTMLElement);
    let next = index;
    if (event.key === "ArrowDown") next = (index + 1) % items.length;
    if (event.key === "ArrowUp") next = (index - 1 + items.length) % items.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = items.length - 1;
    items[next]?.focus();
  }

  const current = themeOptions.find((option) => option.value === preference);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Appearance: ${current?.label ?? "Paper"}`}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "grid size-9 place-items-center rounded-ts border border-ts-line bg-ts-surface text-ts-ink",
          "transition-[background-color,border-color,transform] duration-150",
          "hover:-translate-y-px hover:border-ts-line-strong hover:bg-ts-surface-2",
          "active:translate-y-0",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ts-ink"
        )}
      >
        <ThemeGlyph theme={preference} />
      </button>

      {open ? (
        <div
          ref={panelRef}
          role="menu"
          aria-label="Appearance"
          onKeyDown={onPanelKeyDown}
          className={cn(
            "ts-menu absolute top-[calc(100%+8px)] z-50 w-[228px] rounded-[11px] border border-ts-line bg-ts-surface p-1.5 shadow-ts",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          <p className="px-2 pb-1.5 pt-1 font-ts-mono text-[9.5px] font-medium uppercase tracking-[0.12em] text-ts-muted">
            Appearance
          </p>
          {themeOptions.map((option) => {
            const active = preference === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                  onThemeChange(option.value);
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-[7px] px-2 py-1.5 text-left",
                  "transition-colors hover:bg-ts-surface-2 focus:bg-ts-surface-2 focus:outline-none",
                  active && "bg-ts-surface-2"
                )}
              >
                <span
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-[6px] border",
                    active
                      ? "border-ts-accent/35 text-ts-accent"
                      : "border-ts-line text-ts-muted"
                  )}
                >
                  <ThemeGlyph theme={option.value} className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-ts-sans text-[12.5px] font-medium leading-tight text-ts-ink">
                    {option.label}
                  </span>
                  <span className="block font-ts-sans text-[10.5px] leading-tight text-ts-muted">
                    {option.note}
                  </span>
                </span>
                {active ? (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="size-3.5 text-ts-accent"
                  >
                    <path
                      d="m3.5 8.5 3 3 6-7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
