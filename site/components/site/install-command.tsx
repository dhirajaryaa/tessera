"use client";

import * as React from "react";
import { PikaIcon } from "@pikaicons/react";
import { CheckTickSquareIcon, CopyIcon } from "@pikaicons/core-free";
import { cn } from "@/lib/utils";
import {
  PACKAGE_MANAGERS,
  formatInstallCommand,
  usePackageManager,
} from "@/lib/package-manager";

export function InstallCommand({
  command = "npx github:dhirajaryaa/tessera#main add button",
  className,
  compact = false,
  showTabs,
}: {
  command?: string;
  className?: string;
  compact?: boolean;
  showTabs?: boolean;
}) {
  const { packageManager, setPackageManager } = usePackageManager();
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const shouldShowTabs = showTabs ?? !compact;
  const formattedCommand = formatInstallCommand(command, packageManager);

  React.useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(formattedCommand);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  if (!shouldShowTabs) {
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
          className="select-none font-mono text-[11px] text-ts-accent"
        >
          $
        </span>
        <code
          className={cn(
            "min-w-0 flex-1 truncate font-mono text-ts-ink",
            compact ? "text-[11px]" : "text-[12px]"
          )}
        >
          {formattedCommand}
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

  return (
    <div
      className={cn(
        "group flex max-w-full flex-col rounded-ts border border-ts-line-strong bg-ts-surface shadow-xs",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-ts-line px-2.5 py-1">
        <div
          role="tablist"
          aria-label="Package manager selection"
          className="flex items-center gap-1"
        >
          {PACKAGE_MANAGERS.map((pm) => {
            const active = packageManager === pm;
            return (
              <button
                key={pm}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setPackageManager(pm)}
                className={cn(
                  "rounded-[4px] px-2 py-0.5 font-mono text-[11px] font-medium transition-colors",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ts-ink",
                  active
                    ? "bg-ts-surface-2 font-semibold text-ts-ink"
                    : "text-ts-muted hover:bg-ts-surface-2/60 hover:text-ts-ink"
                )}
              >
                {pm}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex h-10 items-center gap-2 pl-3.5 pr-2">
        <span
          aria-hidden="true"
          className="select-none font-mono text-[11px] text-ts-accent"
        >
          $
        </span>
        <code className="min-w-0 flex-1 truncate font-mono text-[12px] text-ts-ink">
          {formattedCommand}
        </code>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy command"}
          className="grid size-7 shrink-0 place-items-center rounded-[5px] border border-transparent text-ts-muted transition-colors hover:bg-ts-surface-2 hover:text-ts-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ts-ink"
        >
          <PikaIcon
            icon={copied ? CheckTickSquareIcon : CopyIcon}
            size={13}
            strokeWidth={1.6}
          />
        </button>
      </div>
    </div>
  );
}
