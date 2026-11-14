"use client";

import * as React from "react";
import { PikaIcon } from "@pikaicons/react";
import { CheckTickSquareIcon, CopyIcon } from "@pikaicons/core-free";
import { cn } from "@/lib/utils";

export function InstallCommand({
  command = "npx github:dhirajaryaa/tessera@main add button",
  className,
  compact = false,
}: {
  command?: string;
  className?: string;
  compact?: boolean;
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
      await navigator.clipboard.writeText(command);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      className={cn(
        "group flex max-w-full items-center gap-2 rounded-ts border border-ts-line-strong bg-ts-surface",
        compact ? "h-9 pl-3 pr-1.5" : "h-11 pl-4 pr-2",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="font-mono text-[11px] text-ts-accent"
      >
        $
      </span>
      <code
        className={cn(
          "min-w-0 flex-1 truncate font-mono text-ts-ink",
          compact ? "text-[11px]" : "text-[12px]"
        )}
      >
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy command"}
        className={cn(
          "grid shrink-0 place-items-center rounded-[5px] border border-transparent text-ts-muted",
          "transition-colors hover:bg-ts-surface-2 hover:text-ts-ink",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ts-ink",
          compact ? "size-7" : "size-8"
        )}
      >
        <PikaIcon
          icon={copied ? CheckTickSquareIcon : CopyIcon}
          size={compact ? 12 : 14}
          strokeWidth={1.6}
        />
      </button>
    </div>
  );
}
