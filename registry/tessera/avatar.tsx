import * as React from "react";
import { cn } from "@/lib/utils";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt: string;
  fallback?: string;
  size?: AvatarSize;
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: "size-6 text-[9px]",
  md: "size-8 text-[10px]",
  lg: "size-10 text-xs",
};

function initials(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}

export function Avatar({
  className,
  src,
  alt,
  fallback,
  size = "md",
  ...props
}: AvatarProps) {
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => setFailed(false), [src]);

  return (
    <span
      className={cn(
        "inline-grid shrink-0 place-items-center overflow-hidden rounded-full",
        "bg-ts-surface-2 font-ts-mono font-medium uppercase tracking-tight text-ts-muted",
        "ring-2 ring-ts-surface",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src && !failed ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="size-full object-cover"
        />
      ) : (
        <span role="img" aria-label={alt}>
          {fallback || initials(alt)}
        </span>
      )}
    </span>
  );
}

export function AvatarGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center -space-x-1.5", className)}
      {...props}
    />
  );
}
