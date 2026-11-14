import { DocsSidebar } from "@/components/docs/sidebar";
import { DocsFooter } from "@/components/docs/docs-footer";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="shell-wide">
      <div className="docs-grid py-8 lg:py-12">
        <DocsSidebar />
        <div className="min-w-0">
          <div className="mx-auto w-full max-w-[820px] pb-16">{children}</div>
          <DocsFooter />
        </div>
      </div>
    </div>
  );
}
