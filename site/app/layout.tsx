import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter-tight";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site/site-header";

const themeScript = `(function(){try{var p=localStorage.getItem("tessera-theme")||"system";var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var t=p==="system"?(d?"ink":"paper"):p;document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t==="paper"?"light":"dark";}catch(e){document.documentElement.dataset.theme="paper";}})();`;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = `https://dhirajaryaa.github.io${basePath || "/tessera"}`;
const socialImage = `${siteUrl}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tessera · small parts, sharp edges",
    template: "%s · Tessera",
  },
  description:
    "A small, original UI kit for React. Fourteen components, three themes, zero runtime dependencies. Copy the source into your project and own it.",
  keywords: [
    "React",
    "UI components",
    "Tailwind CSS",
    "design system",
    "copy paste",
    "Next.js",
    "theme switcher",
  ],
  authors: [{ name: "Dhiraj Arya" }],
  creator: "Dhiraj Arya",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Tessera · small parts, sharp edges",
    description:
      "Fourteen careful React components, three themes, zero runtime dependencies. Copy the source in and make it yours.",
    siteName: "Tessera",
    images: [{ url: socialImage, width: 1200, height: 630, alt: "Tessera UI kit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tessera · small parts, sharp edges",
    description:
      "A small UI kit for React with 14 components, three themes and no runtime.",
    images: [socialImage],
  },
  icons: {
    icon: [{ url: `${basePath}/favicon.svg`, type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2ece1" },
    { media: "(prefers-color-scheme: dark)", color: "#121110" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[100] rounded-ts border border-ts-line bg-ts-surface px-3 py-2 font-sans text-sm text-ts-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Providers>
          <SiteHeader />
          <div id="main">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
