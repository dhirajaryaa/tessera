import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "solid" | "soft" | "outline" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const variantClasses: Record<ButtonVariant, string> = {
  solid:
    "border-transparent bg-ts-accent text-ts-accent-ink hover:bg-ts-accent-hover",
  soft: "border-transparent bg-ts-surface-2 text-ts-ink hover:bg-ts-line",
  outline:
    "border-ts-line-strong bg-transparent text-ts-ink hover:bg-ts-surface-2",
  ghost:
    "border-transparent bg-transparent text-ts-ink hover:bg-ts-surface-2",
  link: "h-auto border-transparent bg-transparent p-0 text-ts-ink underline-offset-4 hover:underline",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-[12.5px]",
  md: "h-9 px-3.5 text-[13.5px]",
  lg: "h-11 px-5 text-sm",
  icon: "size-9 p-0",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant = "solid",
      size = "md",
      loading = false,
      disabled,
      children,
      type = "button",
      onClick,
      ...props
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        onClick={onClick}
        className={cn(
          "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-ts border font-ts-sans text-[13.5px] font-semibold leading-none tracking-[-0.01em]",
          "transition-[background-color,color,border-color,transform,box-shadow] duration-150",
          "hover:-translate-y-px active:translate-y-0",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ts-ink",
          "disabled:pointer-events-none disabled:opacity-45",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {loading ? (
          <span
            aria-hidden="true"
            className="ts-spinner size-3.5 rounded-full border-2 border-current border-r-transparent"
          />
        ) : null}
        {children}
      </button>
    );
  }
);
