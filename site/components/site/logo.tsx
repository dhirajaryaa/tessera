import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-6 shrink-0", className)}
    >
      <rect x="1" y="1" width="10" height="10" rx="1.2" fill="currentColor" />
      <rect
        x="13"
        y="1"
        width="10"
        height="10"
        rx="1.2"
        fill="currentColor"
        opacity="0.22"
      />
      <rect
        x="1"
        y="13"
        width="10"
        height="10"
        rx="1.2"
        fill="currentColor"
        opacity="0.22"
      />
      <rect
        x="13"
        y="13"
        width="10"
        height="10"
        rx="1.2"
        fill="var(--ts-accent)"
      />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline gap-1", className)}>
      <span className="font-sans text-[17px] font-semibold leading-none tracking-[-0.045em]">
        tessera
      </span>
      <span className="font-mono text-[8px] font-medium uppercase leading-none tracking-[0.12em] text-ts-muted">
        ui
      </span>
    </span>
  );
}
