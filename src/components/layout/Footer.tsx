import { site } from "@/config/site";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

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
        <SocialLinks includeEmail className="-mr-3" />
      </Container>
    </footer>
  );
}
