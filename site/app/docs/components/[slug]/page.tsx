import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PikaIcon } from "@pikaicons/react";
import {
  ArrowRightIcon,
  CheckTickSquareIcon,
  MultipleCrossCancelIcon,
} from "@pikaicons/core-free";
import { DocsPageHeader } from "@/components/docs/page-header";
import { DemoFrame } from "@/components/docs/demo-frame";
import { ComponentDemo } from "@/components/docs/demos";
import { InstallCommand } from "@/components/site/install-command";
import { componentDocs, getComponentDoc } from "@/lib/component-docs";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return componentDocs.map((component) => ({ slug: component.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const component = getComponentDoc(slug);
  if (!component) return {};

  return {
    title: component.name,
    description: component.description,
    openGraph: {
      title: `${component.name} · Tessera`,
      description: component.description,
    },
  };
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const component = getComponentDoc(slug);
  if (!component) notFound();

  const index = componentDocs.findIndex((item) => item.slug === component.slug);
  const previous = index > 0 ? componentDocs[index - 1] : null;
  const next = index < componentDocs.length - 1 ? componentDocs[index + 1] : null;

  return (
    <>
      <DocsPageHeader
        eyebrow={`Components / ${component.category}`}
        title={component.name}
        description={component.description}
      >
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
          <InstallCommand command={component.install} className="max-w-[460px]" />
          <a
            href={component.editUrl}
            target="_blank"
            rel="noreferrer"
            className="link-quiet inline-flex shrink-0 items-center gap-1.5 self-start sm:self-auto sm:mb-2.5 text-[13px] font-medium text-ts-muted hover:text-ts-ink"
          >
            Read the source
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[8.5px] uppercase tracking-[0.09em] text-ts-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-1 bg-ts-accent" />
            {component.files.join(" · ")}
          </span>
          {component.deps?.length ? (
            <span>needs {component.deps.join(", ")}</span>
          ) : (
            <span>no component deps</span>
          )}
          <span>no runtime package</span>
        </div>
      </DocsPageHeader>

      <DemoFrame code={component.code} filename={`${component.slug}.tsx`}>
        <ComponentDemo slug={component.slug} />
      </DemoFrame>

      <div className="prose-tessera mt-10">
        <h2>Anatomy</h2>
        <p>{component.anatomy}</p>
      </div>

      <section className="mt-10">
        <div className="rule-label">Props</div>
        <div className="mt-3 overflow-hidden rounded-[9px] border border-ts-line">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-ts-line bg-ts-surface-2">
                  <th className="px-3 py-2.5 font-mono text-[8.5px] font-medium uppercase tracking-[0.09em] text-ts-muted">
                    Name
                  </th>
                  <th className="px-3 py-2.5 font-mono text-[8.5px] font-medium uppercase tracking-[0.09em] text-ts-muted">
                    Type
                  </th>
                  <th className="px-3 py-2.5 font-mono text-[8.5px] font-medium uppercase tracking-[0.09em] text-ts-muted">
                    Default
                  </th>
                  <th className="px-3 py-2.5 font-mono text-[8.5px] font-medium uppercase tracking-[0.09em] text-ts-muted">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {component.props.map((prop) => (
                  <tr key={`${prop.name}-${prop.type}`} className="border-b border-ts-line last:border-b-0">
                    <td className="whitespace-nowrap px-3 py-3 align-top">
                      <code className="font-mono text-[10.5px] text-ts-ink">{prop.name}</code>
                    </td>
                    <td className="px-3 py-3 align-top">
                      <code className="break-all font-mono text-[10px] text-ts-muted">
                        {prop.type}
                      </code>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 align-top">
                      {prop.default ? (
                        <code className="font-mono text-[10px] text-ts-muted">
                          {prop.default}
                        </code>
                      ) : (
                        <span className="text-[11px] text-ts-muted/60">None</span>
                      )}
                    </td>
                    <td className="px-3 py-3 align-top text-[11.5px] leading-relaxed text-ts-muted">
                      {prop.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <section className="rounded-[9px] border border-ts-line bg-ts-surface p-4">
          <h2 className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.1em] text-ts-ink">
            <PikaIcon icon={CheckTickSquareIcon} size={11} strokeWidth={2} className="text-ts-success" />
            Reach for it
          </h2>
          <ul className="mt-3 grid gap-2.5">
            {component.use.map((item) => (
              <li key={item} className="flex gap-2.5 text-[11.5px] leading-relaxed text-ts-muted">
                <span className="mt-[7px] size-1 shrink-0 bg-ts-success" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[9px] border border-ts-line bg-ts-surface p-4">
          <h2 className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.1em] text-ts-ink">
            <PikaIcon
              icon={MultipleCrossCancelIcon}
              size={11}
              strokeWidth={2}
              className="text-ts-danger"
            />
            Leave it out
          </h2>
          <ul className="mt-3 grid gap-2.5">
            {component.avoid.map((item) => (
              <li key={item} className="flex gap-2.5 text-[11.5px] leading-relaxed text-ts-muted">
                <span className="mt-[7px] size-1 shrink-0 bg-ts-danger" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-4 rounded-[9px] border border-ts-line bg-ts-surface p-4">
        <h2 className="rule-label">Accessibility</h2>
        <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {component.a11y.map((item) => (
            <li key={item} className="flex gap-2.5 text-[11.5px] leading-relaxed text-ts-muted">
              <span className="mt-[7px] size-1 shrink-0 bg-ts-accent" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-6 rounded-[8px] border-l-2 border-ts-line-strong bg-ts-surface-2/50 px-4 py-3">
        <p className="text-[12px] leading-relaxed text-ts-muted">
          This file is yours once it is in your project. Rename it, split it, or
          delete the variants you do not use. If the change would help every
          project, send it back to the registry.
        </p>
      </div>

      <nav
        aria-label="Component pages"
        className="mt-10 grid gap-3 border-t border-ts-line pt-5 sm:grid-cols-2"
      >
        {previous ? (
          <Link
            href={`/docs/components/${previous.slug}`}
            className="group rounded-[8px] border border-ts-line bg-ts-surface p-3.5 transition-colors hover:border-ts-line-strong"
          >
            <span className="font-mono text-[8.5px] uppercase tracking-[0.09em] text-ts-muted">
              Previous
            </span>
            <span className="mt-1 flex items-center gap-2 text-[13px] font-semibold text-ts-ink">
              <PikaIcon
                icon={ArrowRightIcon}
                size={12}
                strokeWidth={1.7}
                className="rotate-180"
              />
              {previous.name}
            </span>
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link
            href={`/docs/components/${next.slug}`}
            className="group rounded-[8px] border border-ts-line bg-ts-surface p-3.5 text-right transition-colors hover:border-ts-line-strong sm:col-start-2"
          >
            <span className="font-mono text-[8.5px] uppercase tracking-[0.09em] text-ts-muted">
              Next
            </span>
            <span className="mt-1 flex items-center justify-end gap-2 text-[13px] font-semibold text-ts-ink">
              {next.name}
              <PikaIcon
                icon={ArrowRightIcon}
                size={12}
                strokeWidth={1.7}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        ) : null}
      </nav>
    </>
  );
}
