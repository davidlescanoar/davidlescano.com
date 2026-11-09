import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Impressum",
  alternates: { canonical: "/impressum" },
};

/**
 * LEGAL PLACEHOLDER — not legal advice and not reviewed.
 * Replace the content below with a reviewed Impressum (e.g. generated with
 * eRecht24 and checked), then set site.legal.impressumReady = true. Until
 * then this page returns 404 in production and is not linked.
 */
export default function ImpressumPage() {
  if (!site.legal.impressumReady) notFound();
  return (
    <Container className="max-w-2xl py-16">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Impressum</h1>
      <div className="mt-8 space-y-4 rounded-[var(--radius-card)] border border-dashed border-peach p-6 font-mono text-sm">
        <p>[PLACEHOLDER — needs review before publishing]</p>
        <p>Angaben gemäß § 5 DDG</p>
        <p>
          {site.name}
          <br />
          [Ladungsfähige Anschrift: Straße, Hausnummer]
          <br />
          [PLZ] München
        </p>
        <p>Kontakt: [E-Mail-Adresse]</p>
        <p>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV: [Name, Anschrift]</p>
      </div>
    </Container>
  );
}
