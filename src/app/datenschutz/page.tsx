import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { showDrafts } from "@/lib/drafts";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  alternates: { canonical: "/datenschutz" },
};

/**
 * LEGAL PLACEHOLDER — not legal advice and not reviewed.
 * The site sets no cookies and loads no third-party scripts. Fonts are
 * self-hosted by next/font. It uses Vercel Web Analytics (cookieless,
 * anonymised page views), and Vercel as host processes server logs; the
 * policy must cover both.
 * Replace with a reviewed text, then set site.legal.privacyReady = true.
 */
export default function DatenschutzPage() {
  if (!site.legal.privacyReady && !showDrafts) notFound();
  return (
    <Container className="max-w-2xl py-16">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Datenschutzerklärung</h1>
      <div className="mt-8 space-y-4 rounded-[var(--radius-card)] border border-dashed border-peach p-6 font-mono text-sm">
        <p>[PLACEHOLDER — needs review before publishing]</p>
        <p>1. Verantwortlicher: [Name, Anschrift, E-Mail]</p>
        <p>2. Hosting und Server-Logfiles: [Anbieter, Zweck, Rechtsgrundlage, Speicherdauer]</p>
        <p>3. Reichweitenmessung mit Vercel Web Analytics (ohne Cookies): [Zweck, Rechtsgrundlage, Speicherdauer]</p>
        <p>4. Kontakt per E-Mail: [Zweck, Rechtsgrundlage, Speicherdauer]</p>
        <p>5. Ihre Rechte: [Auskunft, Berichtigung, Löschung, Beschwerde bei der Aufsichtsbehörde]</p>
      </div>
    </Container>
  );
}
