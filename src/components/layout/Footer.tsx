import Link from "next/link";
import { site } from "@/config/site";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();
  const legal = [
    site.legal.impressumReady && { href: "/impressum", label: "Impressum" },
    site.legal.privacyReady && { href: "/datenschutz", label: "Privacy" },
  ].filter((l): l is { href: string; label: string } => Boolean(l));

  return (
    <footer className="mt-24 border-t border-line">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="font-medium">
            © {year} {site.name}
          </p>
          <p className="font-mono text-xs text-muted">
            Designed and built in München
            <span aria-hidden className="ml-2 inline-block size-1.5 rounded-full bg-accent align-middle" />
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {legal.length > 0 ? (
            <ul className="flex gap-5 text-sm text-muted">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
          <SocialLinks includeEmail className="-mr-3" />
        </div>
      </Container>
    </footer>
  );
}
