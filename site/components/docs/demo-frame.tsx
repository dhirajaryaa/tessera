"use client";

import * as React from "react";
import { PikaIcon } from "@pikaicons/react";
import { CodeIcon, EyeOnIcon } from "@pikaicons/core-free";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tessera/tabs";
import { CodeBlock } from "@/components/docs/code-block";

export function DemoFrame({
  code,
  filename,
  children,
}: {
  code: string;
  filename?: string;
  children: React.ReactNode;
}) {
  return (
    <Tabs defaultValue="preview" className="mt-8">
      <div className="flex items-center justify-between gap-3">
        <TabsList aria-label="Demo and code">
          <TabsTrigger value="preview" className="gap-1.5">
            <PikaIcon icon={EyeOnIcon} size={11} strokeWidth={1.7} />
            Preview
          </TabsTrigger>
          <TabsTrigger value="code" className="gap-1.5">
            <PikaIcon icon={CodeIcon} size={11} strokeWidth={1.7} />
            Code
          </TabsTrigger>
        </TabsList>
        <span className="hidden font-mono text-[8.5px] uppercase tracking-[0.09em] text-ts-muted sm:inline">
          Live · React
        </span>
      </div>

      <TabsContent value="preview" className="mt-3">
        <div className="preview-grid grid min-h-[260px] place-items-center overflow-hidden rounded-[10px] border border-ts-line bg-ts-bg p-6 sm:p-10">
          <div className="w-full max-w-[560px]">{children}</div>
        </div>
      </TabsContent>

      <TabsContent value="code" className="mt-3">
        <CodeBlock code={code} filename={filename} />
      </TabsContent>
    </Tabs>
  );
}
