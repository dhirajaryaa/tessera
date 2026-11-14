import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, type = "text", ...props }, ref) {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "h-9 w-full rounded-ts border border-ts-line-strong bg-ts-surface px-3",
          "font-ts-sans text-[13.5px] text-ts-ink placeholder:text-ts-muted/75",
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

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ className, children, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "font-ts-sans text-[12.5px] font-semibold leading-none text-ts-ink",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  htmlFor?: string;
}

export function Field({
  className,
  label,
  hint,
  error,
  htmlFor,
  children,
  ...props
}: FieldProps) {
  return (
    <div className={cn("grid gap-1.5", className)} {...props}>
      {label ? <Label htmlFor={htmlFor}>{label}</Label> : null}
      {children}
      {error ? (
        <p className="font-ts-sans text-[11.5px] leading-snug text-ts-danger">
          {error}
        </p>
      ) : hint ? (
        <p className="font-ts-sans text-[11.5px] leading-snug text-ts-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
