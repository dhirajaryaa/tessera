import Link from "next/link";
import { PikaIcon } from "@pikaicons/react";
import {
  ArrowRightIcon,
  BotIcon,
  CodeIcon,
  FileIcon,
  GithubIcon,
} from "@pikaicons/core-free";

const files = [
  {
    name: "AGENTS.md",
    icon: FileIcon,
    note: "Repo conventions, install flow and the rules an agent should not break.",
    href: "https://github.com/dhirajaryaa/tessera/blob/main/AGENTS.md",
  },
  {
    name: "SKILL.md",
    icon: CodeIcon,
    note: "A portable skill for Claude Code, Codex and OpenCode. Drop it in and go.",
    href: "https://github.com/dhirajaryaa/tessera/blob/main/skills/tessera/SKILL.md",
  },
  {
    name: "llms.txt",
    icon: BotIcon,
    note: "A short, flat index of the parts, commands and links for model context.",
    href: "https://github.com/dhirajaryaa/tessera/blob/main/llms.txt",
  },
];

export function AgentsSection() {
  return (
    <section className="section" id="agents">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="eyebrow">06 / For agents</p>
            <h2 className="section-heading mt-5 max-w-[13ch]">
              Your agent
              <br />
              <em className="text-ts-accent">already knows.</em>
            </h2>
            <p className="mt-5 max-w-[44ch] text-[14px] leading-relaxed text-ts-muted">
              Tessera ships the context as files, not a prompt. An agent can read
              the same rules you do, install the parts and check its own work.
            </p>

            <div className="mt-7 rounded-[10px] border border-ts-line bg-ts-surface p-4">
              <p className="font-mono text-[8.5px] uppercase tracking-[0.11em] text-ts-muted">
                Install the skill
              </p>
              <div className="mt-2 overflow-x-auto rounded-[6px] border border-ts-line bg-ts-bg p-3 font-mono text-[10px] leading-relaxed text-ts-ink">
                <span className="text-ts-accent">$</span>{" "}
                mkdir -p .claude/skills && cp -r
                <br />
                <span className="pl-4">skills/tessera .claude/skills/</span>
              </div>
              <p className="mt-2.5 text-[11px] leading-relaxed text-ts-muted">
                Codex and OpenCode read <code className="font-mono text-ts-ink">AGENTS.md</code>{" "}
                from the repo root. Claude Code reads{" "}
                <code className="font-mono text-ts-ink">CLAUDE.md</code> and skills.
              </p>
            </div>
          </div>

          <div>
            <div className="rule-label">Three files, one contract</div>
            <div>
              {files.map((file, index) => (
                <a
                  key={file.name}
                  href={file.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid grid-cols-[32px_1fr_auto] items-start gap-3 border-b border-ts-line py-4 first:pt-4"
                >
                  <span className="grid size-8 place-items-center rounded-[5px] border border-ts-line bg-ts-surface text-ts-muted transition-colors group-hover:border-ts-accent/40 group-hover:text-ts-accent">
                    <PikaIcon icon={file.icon} size={14} strokeWidth={1.6} />
                  </span>
                  <span>
                    <span className="flex items-center gap-2 font-mono text-[10.5px] font-medium text-ts-ink">
                      {file.name}
                      <span className="font-mono text-[8px] uppercase tracking-[0.09em] text-ts-muted">
                        {index === 0 ? "root" : index === 1 ? "skill" : "index"}
                      </span>
                    </span>
                    <span className="mt-1 block max-w-[52ch] text-[11.5px] leading-relaxed text-ts-muted">
                      {file.note}
                    </span>
                  </span>
                  <span className="grid size-6 place-items-center rounded-[4px] border border-ts-line text-ts-muted transition-[transform,color,border-color] group-hover:translate-x-0.5 group-hover:border-ts-accent group-hover:text-ts-accent">
                    <PikaIcon icon={ArrowRightIcon} size={11} strokeWidth={1.8} />
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <Link
                href="/docs/agents"
                className="link-quiet inline-flex items-center gap-2 text-[12.5px] font-semibold text-ts-ink"
              >
                Agent guide
                <PikaIcon icon={ArrowRightIcon} size={13} strokeWidth={1.7} />
              </Link>
              <a
                href="https://github.com/dhirajaryaa/tessera"
                target="_blank"
                rel="noreferrer"
                className="link-quiet inline-flex items-center gap-2 text-[12.5px] text-ts-muted hover:text-ts-ink"
              >
                <PikaIcon icon={GithubIcon} size={13} strokeWidth={1.7} />
                Source
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
