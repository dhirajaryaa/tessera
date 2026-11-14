"use client";

import { PikaIcon } from "@pikaicons/react";
import { CheckTickSquareIcon } from "@pikaicons/core-free";
import { Badge } from "@/components/tessera/badge";
import { ThemeGlyph, ThemeSwitcher } from "@/components/tessera/theme-switcher";
import {
  themeOptions,
  useTheme,
  type ThemeName,
} from "@/components/tessera/theme";
import { cn } from "@/lib/utils";

const previewThemes: {
  name: ThemeName;
  label: string;
  note: string;
  glyph: "paper" | "ink" | "moss";
  swatches: string[];
}[] = [
  {
    name: "paper",
    label: "Paper",
    note: "Warm light · the default",
    glyph: "paper",
    swatches: ["#f2ece1", "#fbf7ee", "#1a1712", "#e24a21"],
  },
  {
    name: "ink",
    label: "Ink",
    note: "Near black · low glare",
    glyph: "ink",
    swatches: ["#121110", "#1a1815", "#f2ece2", "#ff6b3d"],
  },
  {
    name: "moss",
    label: "Moss",
    note: "Deep green · amber edge",
    glyph: "moss",
    swatches: ["#0d1712", "#14221a", "#e8f0e3", "#e9b44c"],
  },
];

export function ThemeShowcase() {
  const { preference, setPreference } = useTheme();

  return (
    <section className="section" id="themes">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow">04 / Themes</p>
            <h2 className="section-heading mt-5 max-w-[15ch]">
              Three moods.
              <br />
              <em className="text-ts-accent">One switch.</em>
            </h2>
            <p className="mt-5 max-w-[46ch] text-[14px] leading-relaxed text-ts-muted">
              Paper is warm and readable. Ink turns the lights down. Moss is a
              deeper green with an amber edge. Auto follows the operating system.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 lg:items-end">
            <ThemeSwitcher variant="rail" />
            <p className="font-mono text-[8.5px] uppercase tracking-[0.11em] text-ts-muted">
              Current: {preference === "system" ? "auto" : preference}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {previewThemes.map((theme) => {
            const active = preference === theme.name;
            return (
              <button
                key={theme.name}
                type="button"
                data-theme={theme.name}
                aria-pressed={active}
                onClick={() => setPreference(theme.name)}
                className={cn(
                  "group relative overflow-hidden rounded-[12px] border bg-ts-bg p-4 text-left transition-[border-color,transform,box-shadow] duration-200",
                  "hover:-translate-y-0.5",
                  active
                    ? "border-ts-accent shadow-ts"
                    : "border-ts-line hover:border-ts-line-strong"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-8 place-items-center rounded-[6px] border border-ts-line bg-ts-surface text-ts-ink">
                      <ThemeGlyph theme={theme.glyph} />
                    </span>
                    <span>
                      <span className="block text-[13px] font-semibold leading-tight text-ts-ink">
                        {theme.label}
                      </span>
                      <span className="mt-0.5 block font-mono text-[8.5px] uppercase tracking-[0.08em] text-ts-muted">
                        {theme.note}
                      </span>
                    </span>
                  </div>
                  {active ? (
                    <span className="grid size-5 place-items-center rounded-full bg-ts-accent text-ts-accent-ink">
                      <PikaIcon icon={CheckTickSquareIcon} size={10} strokeWidth={2} />
                    </span>
                  ) : null}
                </div>

                <div className="mt-4 rounded-[8px] border border-ts-line bg-ts-surface p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono text-[7.5px] uppercase tracking-[0.1em] text-ts-muted">
                        Preview
                      </p>
                      <p className="mt-1 text-[12.5px] font-semibold leading-tight text-ts-ink">
                        A small room
                      </p>
                    </div>
                    <Badge tone="accent" dot>
                      Live
                    </Badge>
                  </div>
                  <div className="mt-3 flex items-center gap-2 border-t border-ts-line pt-3">
                    <span className="inline-flex select-none items-center justify-center rounded-ts border border-transparent bg-ts-accent font-sans text-[10.5px] font-medium text-ts-accent-ink pointer-events-none h-7 px-2.5">
                      Save
                    </span>
                    <span className="inline-flex select-none items-center justify-center rounded-ts border border-ts-line-strong bg-transparent font-sans text-[10.5px] font-medium text-ts-ink pointer-events-none h-7 px-2.5">
                      Discard
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex gap-1">
                    {theme.swatches.map((color) => (
                      <span
                        key={color}
                        className="size-3 rounded-[2px] border border-black/10"
                        style={{ background: color }}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.09em] text-ts-muted">
                    data-theme=&quot;{theme.name}&quot;
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 border-t border-ts-line pt-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex items-start gap-4">
            <div className="flex -space-x-1">
              {(["paper", "ink", "moss", "system"] as const).map((theme) => (
                <span
                  key={theme}
                  className="grid size-9 place-items-center rounded-[6px] border border-ts-line bg-ts-surface text-ts-ink"
                >
                  <ThemeGlyph theme={theme} className="size-4" />
                </span>
              ))}
            </div>
            <div>
              <h3 className="text-[13px] font-semibold tracking-[-0.01em] text-ts-ink">
                Four tile glyphs. No sun, no moon.
              </h3>
              <p className="mt-1 max-w-[62ch] text-[12px] leading-relaxed text-ts-muted">
                Each mark is a window: solid, cut, folded, split. They read at
                14px and belong to the same grid as the components.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {themeOptions.map((theme) => (
              <span
                key={theme.value}
                className="inline-flex items-center gap-1.5 rounded-[4px] border border-ts-line px-2 py-1 font-mono text-[8.5px] uppercase tracking-[0.08em] text-ts-muted"
              >
                <ThemeGlyph theme={theme.value} className="size-3" />
                {theme.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
