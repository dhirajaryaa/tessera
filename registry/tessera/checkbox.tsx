import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    { className, label, description, disabled, id, ...props },
    ref
  ) {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "group inline-flex cursor-pointer items-start gap-2.5",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <span
          aria-hidden="true"
          className={cn(
            "mt-px flex size-[18px] shrink-0 items-center justify-center rounded-[4px] border border-ts-line-strong bg-ts-surface",
            "transition-colors duration-150",
            "after:block after:h-[9px] after:w-[5px] after:-translate-y-px after:rotate-45",
            "after:border-b-2 after:border-r-2 after:border-ts-accent-ink after:opacity-0 after:transition-opacity",
            "peer-checked:border-ts-accent peer-checked:bg-ts-accent peer-checked:after:opacity-100",
            "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ts-ink"
          )}
        />
        {label || description ? (
          <span className="grid gap-0.5">
            {label ? (
              <span className="font-ts-sans text-[13px] font-medium leading-snug text-ts-ink">
                {label}
              </span>
            ) : null}
            {description ? (
              <span className="font-ts-sans text-[11.5px] leading-snug text-ts-muted">
                {description}
              </span>
            ) : null}
          </span>
        ) : null}
      </label>
    );
  }
);
