"use client";

import * as React from "react";
import { PikaIcon } from "@pikaicons/react";
import { CheckTickSquareIcon, CopyIcon } from "@pikaicons/core-free";
import { cn } from "@/lib/utils";

const tokenPattern =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|\b(import|from|export|function|return|const|let|var|if|else|for|while|type|interface|extends|new|default|true|false|null|undefined|as|async|await|satisfies|use client)\b|(<\/?[A-Za-z][\w.]*)|(\b\d+(?:\.\d+)?\b)/g;

function tokenClass(token: string) {
  if (token.startsWith("//") || token.startsWith("/*")) return "text-[#7f766a]";
  if (token.startsWith('"') || token.startsWith("'")) return "text-[#b7d28b]";
  if (token.startsWith("<")) return "text-[#ff8a66]";
  if (/^\d/.test(token)) return "text-[#8ec5b4]";
  return "text-[#e9b44c]";
}

function Highlighted({ code }: { code: string }) {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  const pattern = new RegExp(tokenPattern.source, tokenPattern.flags);

  while ((match = pattern.exec(code)) !== null) {
    if (match.index > last) nodes.push(code.slice(last, match.index));
    nodes.push(
      <span key={key++} className={tokenClass(match[0])}>
        {match[0]}
      </span>
    );
    last = match.index + match[0].length;
  }

  if (last < code.length) nodes.push(code.slice(last));
  return <>{nodes}</>;
}

export function CodeBlock({
  code,
  filename,
  className,
  showHeader = true,
}: {
  code: string;
  filename?: string;
  className?: string;
  showHeader?: boolean;
}) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[9px] border border-white/10 bg-[#171411] text-[#f2ece2]",
        className
      )}
    >
      {showHeader ? (
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#a79b8b]">
            {filename ?? "tsx"}
          </span>
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? "Copied" : "Copy code"}
            className="inline-flex h-6 items-center gap-1.5 rounded-[4px] border border-white/10 px-2 font-mono text-[8.5px] uppercase tracking-[0.08em] text-[#a79b8b] transition-colors hover:border-white/20 hover:text-[#f2ece2]"
          >
            <PikaIcon
              icon={copied ? CheckTickSquareIcon : CopyIcon}
              size={10}
              strokeWidth={1.8}
            />
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      ) : null}
      <div className="code-scroll overflow-x-auto p-4">
        <pre className="font-mono text-[11px] leading-[1.85]">
          <code>
            <Highlighted code={code} />
          </code>
        </pre>
      </div>
    </div>
  );
}
