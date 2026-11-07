import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { site } from "@/config/site";
import { getNavItems } from "@/lib/content";
import "@/styles/globals.css";

const display = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  variable: "--font-display-face",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.seo.title, template: `%s | ${site.name}` },
  description: site.seo.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.seo.locale,
    url: site.url,
    siteName: site.name,
    title: site.seo.title,
    description: site.seo.description,
  },
  twitter: { card: "summary_large_image", title: site.seo.title, description: site.seo.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f7f2" },
    { media: "(prefers-color-scheme: dark)", color: "#111a17" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // Language is English today. For German later, move routes under app/[lang]/
    // and read copy from per-locale dictionaries; content files are already isolated.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${display.variable}`}
    >
      <body>
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only z-50 rounded-full bg-accent px-4 py-2 text-accent-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          <Header items={getNavItems()} resumeUrl={site.resumeUrl} />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
        {/* Cookieless page-view counts; only reports on Vercel deployments. */}
        <Analytics />
      </body>
    </html>
  );
}
