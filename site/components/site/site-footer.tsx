import Link from "next/link";
import { PikaIcon } from "@pikaicons/react";
import { ArrowRightIcon, GithubIcon } from "@pikaicons/core-free";
import { Mark } from "@/components/site/logo";

const columns = [
  {
    title: "Library",
    links: [
      { label: "Components", href: "/docs/components" },
      { label: "Themes", href: "/docs/theming" },
      { label: "Installation", href: "/docs/installation" },
      { label: "Principles", href: "/docs/principles" },
    ],
  },
  {
    title: "Use it",
    links: [
      { label: "For agents", href: "/docs/agents" },
      { label: "Contributing", href: "/docs/contributing" },
      { label: "GitHub", href: "https://github.com/dhirajaryaa/tessera" },
      { label: "Issues", href: "https://github.com/dhirajaryaa/tessera/issues" },
    ],
  },
  {
    title: "Files",
    links: [
      {
        label: "AGENTS.md",
        href: "https://github.com/dhirajaryaa/tessera/blob/main/AGENTS.md",
      },
      {
        label: "SKILL.md",
        href: "https://github.com/dhirajaryaa/tessera/blob/main/skills/tessera/SKILL.md",
      },
      {
        label: "llms.txt",
        href: "https://github.com/dhirajaryaa/tessera/blob/main/llms.txt",
      },
      {
        label: "License",
        href: "https://github.com/dhirajaryaa/tessera/blob/main/LICENSE",
      },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-ts-line">
      <div className="shell">
        <div className="grid gap-10 py-14 md:grid-cols-[1.3fr_2fr] md:gap-16">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 text-ts-ink">
              <Mark className="size-8" />
              <span className="text-[24px] font-semibold tracking-[-0.05em]">
                tessera
              </span>
            </Link>
            <p className="mt-4 max-w-[240px] font-display text-[24px] leading-[1.1] tracking-[-0.01em] text-ts-muted">
              Small parts.
              <br />
              <em className="text-ts-ink">Sharp edges.</em>
            </p>
            <a
              href="https://github.com/dhirajaryaa/tessera"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex h-9 items-center gap-2 rounded-ts border border-ts-line bg-ts-surface px-3 text-[12px] font-medium text-ts-ink transition-colors hover:border-ts-line-strong hover:bg-ts-surface-2"
            >
              <PikaIcon icon={GithubIcon} size={14} strokeWidth={1.6} />
              Star the repo
              <PikaIcon icon={ArrowRightIcon} size={12} strokeWidth={1.7} />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="font-mono text-[9.5px] font-medium uppercase tracking-[0.13em] text-ts-muted">
                  {column.title}
                </p>
                <ul className="mt-4 grid gap-2.5">
                  {column.links.map((link) => {
                    const external = link.href.startsWith("http");
                    const className =
                      "link-quiet inline-flex text-[12.5px] text-ts-ink/75 transition-colors hover:text-ts-ink";
                    return (
                      <li key={link.label}>
                        {external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className={className}
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link href={link.href} className={className}>
                            {link.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-ts-line py-5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-ts-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Dhiraj Arya · MIT</p>
          <p>
            Icons by{" "}
            <a
              href="https://pikaicons.com"
              target="_blank"
              rel="noreferrer"
              className="text-ts-ink underline decoration-ts-line-strong underline-offset-2 hover:decoration-ts-accent"
            >
              Pikaicons
            </a>{" "}
            · Set in Instrument Serif &amp; Inter Tight
          </p>
        </div>
      </div>
    </footer>
  );
}
