import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  function Switch(
    { className, label, checked, defaultChecked, onCheckedChange, disabled, id, ...props },
    ref
  ) {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "inline-flex cursor-pointer items-center gap-2.5",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          role="switch"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={(event) => onCheckedChange?.(event.target.checked)}
          className="ts-switch-input peer sr-only"
          {...props}
        />
        <span
          aria-hidden="true"
          className={cn(
            "ts-switch-track relative h-[22px] w-[38px] shrink-0 rounded-full border border-ts-line-strong bg-ts-surface-2"
          )}
        >
          <span className="ts-switch-thumb absolute left-[2px] top-1/2 size-4 -translate-y-1/2 rounded-full bg-ts-ink shadow-sm" />
        </span>
        {label ? (
          <span className="font-ts-sans text-[13px] font-medium leading-snug text-ts-ink">
            {label}
          </span>
        ) : null}
      </label>
    );
  }
);
