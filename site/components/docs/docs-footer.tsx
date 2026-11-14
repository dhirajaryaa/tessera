import Link from "next/link";
import { PikaIcon } from "@pikaicons/react";
import { GithubIcon } from "@pikaicons/core-free";

export function DocsFooter() {
  return (
    <footer className="border-t border-ts-line">
      <div className="flex flex-col gap-3 py-6 font-mono text-[9px] uppercase tracking-[0.1em] text-ts-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Dhiraj Arya · MIT · Tessera v0.1</p>
        <div className="flex items-center gap-5">
          <Link href="/docs/contributing" className="hover:text-ts-ink">
            Contribute
          </Link>
          <a
            href="https://github.com/dhirajaryaa/tessera"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-ts-ink"
          >
            <PikaIcon icon={GithubIcon} size={11} strokeWidth={1.7} />
            Source
          </a>
        </div>
      </div>
    </footer>
  );
}
