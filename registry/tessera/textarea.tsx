import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, rows = 4, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          "min-h-[92px] w-full resize-y rounded-ts border border-ts-line-strong bg-ts-surface px-3 py-2.5",
          "font-ts-sans text-[13.5px] leading-relaxed text-ts-ink placeholder:text-ts-muted/75",
          "transition-[border-color,box-shadow] duration-150",
          "focus:border-ts-accent focus:outline-none focus:ring-[3px] focus:ring-ts-accent/15",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
