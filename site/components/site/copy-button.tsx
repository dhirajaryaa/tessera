"use client";

import * as React from "react";
import { PikaIcon } from "@pikaicons/react";
import { CheckTickSquareIcon, CopyIcon } from "@pikaicons/core-free";
import { cn } from "@/lib/utils";

export function CopyButton({
  value,
  label = "Copy",
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : label}
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-[5px] border border-ts-line bg-ts-surface px-2",
        "font-mono text-[9.5px] uppercase tracking-[0.08em] text-ts-muted",
        "transition-colors hover:border-ts-line-strong hover:text-ts-ink",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ts-ink",
        copied && "text-ts-ink",
        className
      )}
    >
      <PikaIcon
        icon={copied ? CheckTickSquareIcon : CopyIcon}
        size={11}
        strokeWidth={1.7}
      />
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
