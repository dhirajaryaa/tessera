import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeTone =
  | "neutral"
  | "accent"
  | "outline"
  | "success"
  | "warning"
  | "danger";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  dot?: boolean;
}

const toneClasses: Record<BadgeTone, string> = {
  neutral: "border-transparent bg-ts-surface-2 text-ts-ink",
  accent: "border-transparent bg-ts-accent text-ts-accent-ink",
  outline: "border-ts-line-strong bg-transparent text-ts-muted",
  success: "border-transparent bg-ts-success/12 text-ts-success",
  warning: "border-transparent bg-ts-warning/12 text-ts-warning",
  danger: "border-transparent bg-ts-danger/12 text-ts-danger",
};

export function Badge({
  className,
  tone = "neutral",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-[22px] items-center gap-1.5 rounded-[4px] border px-2",
        "font-ts-mono text-[10px] font-medium uppercase leading-none tracking-[0.08em]",
        toneClasses[tone],
        className
      )}
      {...props}
    >
      {dot ? (
        <span
          aria-hidden="true"
          className="size-1.5 shrink-0 rounded-full bg-current"
        />
      ) : null}
      {children}
    </span>
  );
}
