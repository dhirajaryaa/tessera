"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export type ToastTone = "default" | "success" | "danger";

export interface ToastOptions {
  title: React.ReactNode;
  description?: React.ReactNode;
  tone?: ToastTone;
  duration?: number;
}

type ToastRecord = ToastOptions & { id: number };

type ToastContextValue = {
  toast: (options: ToastOptions) => number;
  dismiss: (id: number) => void;
};

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside <ToastProvider>.");
  return context;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  max?: number;
}

export function ToastProvider({ children, max = 4 }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastRecord[]>([]);
  const [mounted, setMounted] = React.useState(false);
  const idRef = React.useRef(0);
  const timers = React.useRef(new Map<number, ReturnType<typeof setTimeout>>());

  React.useEffect(() => {
    setMounted(true);
    return () => {
      timers.current.forEach((timer) => clearTimeout(timer));
      timers.current.clear();
    };
  }, []);

  const dismiss = React.useCallback((id: number) => {
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toast = React.useCallback(
    (options: ToastOptions) => {
      const id = ++idRef.current;
      setToasts((current) => [...current.slice(-(max - 1)), { ...options, id }]);

      const duration = options.duration ?? 4200;
      if (duration > 0) {
        const timer = setTimeout(() => dismiss(id), duration);
        timers.current.set(id, timer);
      }

      return id;
    },
    [dismiss, max]
  );

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {mounted
        ? createPortal(
            <div
              aria-live="polite"
              aria-label="Notifications"
              className="pointer-events-none fixed bottom-4 right-4 z-[60] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2"
            >
              {toasts.map((item) => (
                <div
                  key={item.id}
                  role="status"
                  className={cn(
                    "ts-toast pointer-events-auto flex items-start gap-3 rounded-[10px] border border-ts-line bg-ts-surface p-3.5 pr-2.5 shadow-ts"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                      item.tone === "danger"
                        ? "bg-ts-danger/12 text-ts-danger"
                        : item.tone === "success"
                          ? "bg-ts-success/12 text-ts-success"
                          : "bg-ts-surface-2 text-ts-muted"
                    )}
                  >
                    {item.tone === "danger" ? (
                      <svg viewBox="0 0 16 16" fill="none" className="size-3">
                        <path
                          d="M8 4.5v4M8 11.5v.01"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 16 16" fill="none" className="size-3">
                        <path
                          d="m3.5 8.5 3 3 6-7"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="font-ts-sans text-[12.5px] font-semibold leading-snug text-ts-ink">
                      {item.title}
                    </p>
                    {item.description ? (
                      <p className="mt-0.5 font-ts-sans text-[11.5px] leading-relaxed text-ts-muted">
                        {item.description}
                      </p>
                    ) : null}
                  </div>

                  <button
                    type="button"
                    onClick={() => dismiss(item.id)}
                    aria-label="Dismiss notification"
                    className="grid size-6 shrink-0 place-items-center rounded-[5px] text-ts-muted transition-colors hover:bg-ts-surface-2 hover:text-ts-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ts-ink"
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="size-3">
                      <path
                        d="m4 4 8 8M12 4l-8 8"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>,
            document.body
          )
        : null}
    </ToastContext.Provider>
  );
}
