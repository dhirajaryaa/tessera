import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  onChange?: (value: string) => void;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ className, children, onChange, ...props }, ref) {
    return (
      <div className="relative">
        <select
          ref={ref}
          onChange={(event) => onChange?.(event.target.value)}
          className={cn(
            "h-9 w-full appearance-none rounded-ts border border-ts-line-strong bg-ts-surface pl-3 pr-9",
            "font-ts-sans text-[13.5px] text-ts-ink",
            "transition-[border-color,box-shadow] duration-150",
            "focus:border-ts-accent focus:outline-none focus:ring-[3px] focus:ring-ts-accent/15",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          fill="none"
          className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-ts-muted"
        >
          <path
            d="m4 6 4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }
);
