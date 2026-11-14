import * as React from "react";

export function DocsPageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-ts-line pb-8">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-4 text-[clamp(2.4rem,5vw,3.9rem)] font-medium leading-[0.98] tracking-[-0.06em] text-ts-ink">
        {title}
      </h1>
      {description ? (
        <p className="mt-4 max-w-[62ch] text-[14.5px] leading-relaxed text-ts-muted">
          {description}
        </p>
      ) : null}
      {children}
    </header>
  );
}
