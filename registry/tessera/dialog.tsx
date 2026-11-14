"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn, useControllableState } from "@/lib/utils";

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const focusable =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const DialogContext = React.createContext<{ close: () => void } | null>(null);

export function DialogClose({
  children,
  className,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(DialogContext);
  if (!context) throw new Error("DialogClose must be used inside <Dialog>.");
  return (
    <button
      type="button"
      onClick={(event) => {
        onClick?.(event);
        context.close();
      }}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}

export function Dialog({
  open,
  defaultOpen = false,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footer,
  className,
}: DialogProps) {
  const [isOpen, setIsOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const [mounted, setMounted] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLSpanElement>(null);
  const titleId = React.useId();
  const descriptionId = React.useId();

  React.useEffect(() => setMounted(true), []);

  const close = React.useCallback(() => setIsOpen(false), [setIsOpen]);

  React.useEffect(() => {
    if (!isOpen || !mounted) return;

    const previous = document.activeElement as HTMLElement | null;
    const bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = window.requestAnimationFrame(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const first = panel.querySelector<HTMLElement>(focusable);
      (first ?? panel).focus();
    });

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;

      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(focusable)).filter(
        (node) => node.offsetParent !== null
      );
      if (!nodes.length) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = bodyOverflow;
      (previous ?? triggerRef.current)?.focus?.();
    };
  }, [close, isOpen, mounted]);

  return (
    <DialogContext.Provider value={{ close }}>
      {trigger ? (
        <span
          ref={triggerRef}
          className="contents"
          onClick={() => setIsOpen(true)}
        >
          {trigger}
        </span>
      ) : null}

      {mounted && isOpen
        ? createPortal(
            <div className="fixed inset-0 z-50 grid place-items-center p-4">
              <div
                aria-hidden="true"
                className="ts-dialog-backdrop absolute inset-0 bg-black/45"
                onClick={close}
              />
              <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
                aria-describedby={description ? descriptionId : undefined}
                tabIndex={-1}
                className={cn(
                  "ts-dialog-panel relative w-full max-w-[440px] rounded-[14px] border border-ts-line bg-ts-surface p-5 shadow-ts",
                  "focus:outline-none",
                  className
                )}
              >
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close dialog"
                  className="absolute right-3 top-3 grid size-7 place-items-center rounded-[6px] text-ts-muted transition-colors hover:bg-ts-surface-2 hover:text-ts-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ts-ink"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="size-3.5"
                  >
                    <path
                      d="m4 4 8 8M12 4l-8 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                {title ? (
                  <h2
                    id={titleId}
                    className="pr-8 font-ts-sans text-[17px] font-semibold leading-tight tracking-[-0.02em] text-ts-ink"
                  >
                    {title}
                  </h2>
                ) : null}
                {description ? (
                  <p
                    id={descriptionId}
                    className="mt-1.5 font-ts-sans text-[12.5px] leading-relaxed text-ts-muted"
                  >
                    {description}
                  </p>
                ) : null}

                {children ? <div className="mt-4">{children}</div> : null}

                {footer ? (
                  <div className="mt-5 flex items-center justify-end gap-2">
                    {footer}
                  </div>
                ) : null}
              </div>
            </div>,
            document.body
          )
        : null}
    </DialogContext.Provider>
  );
}
