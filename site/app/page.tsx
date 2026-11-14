import { Hero } from "@/components/site/hero";
import { Manifesto } from "@/components/site/manifesto";
import { Gallery } from "@/components/site/gallery";
import { InstallSection } from "@/components/site/install-section";
import { ThemeShowcase } from "@/components/site/theme-showcase";
import { PrinciplesSection } from "@/components/site/principles-section";
import { AgentsSection } from "@/components/site/agents-section";
import { SiteFooter } from "@/components/site/site-footer";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <Gallery />
      <InstallSection />
      <ThemeShowcase />
      <PrinciplesSection />
      <AgentsSection />
      <SiteFooter />
    </main>
  );
}
