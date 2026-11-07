import { Mail } from "lucide-react";
import { site } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { DraftNote } from "@/components/ui/DraftNote";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";

export function Contact({ index }: { index: string }) {
  const profiles = [
    site.linkedinUrl && { href: site.linkedinUrl, label: "LinkedIn", Icon: LinkedInIcon },
    site.githubUrl && { href: site.githubUrl, label: "GitHub", Icon: GitHubIcon },
  ].filter((p): p is { href: string; label: string; Icon: typeof GitHubIcon } => Boolean(p));

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-surface px-6 py-14 sm:px-14 sm:py-20">
          <div
            aria-hidden
            className="blueprint absolute inset-0 [mask-image:linear-gradient(to_left,black,transparent_70%)]"
          />
          <div className="relative max-w-2xl">
            <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.14em] text-muted uppercase">
              <span className="text-accent">{index}</span>
              <span aria-hidden className="h-px w-8 bg-line" />
              Contact
            </p>
            <h2
              id="contact-title"
              className="font-display text-[2.3rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl"
            >
              Let&rsquo;s build something <span className="marker">together</span>.
            </h2>
            <p className="mt-5 text-lg text-muted">
              I&rsquo;m always interested in meaningful engineering challenges, interesting products, and opportunities
              to work with great teams.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              {site.email ? (
                <>
                  <ButtonLink href={`mailto:${site.email}`}>
                    <Mail className="size-4" aria-hidden />
                    Get in touch
                  </ButtonLink>
                  <CopyEmail email={site.email} />
                </>
              ) : null}
              {profiles.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 font-medium text-muted transition-colors hover:text-accent"
                >
                  <Icon className="size-4" />
                  {label}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ))}
            </div>
            {!site.email ? (
              <DraftNote className="mt-4">
                Set email in src/config/site.ts to enable “Get in touch” and “Copy email”.
              </DraftNote>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
