import { ArrowDown, FileText } from "lucide-react";
import { site } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { SystemDiagram } from "@/components/sections/SystemDiagram";
import { getFeaturedProjects } from "@/lib/content";

export function Hero() {
  const hasProjects = getFeaturedProjects().length > 0;

  return (
    <section aria-labelledby="hero-title" className="relative pt-10 pb-20 sm:pt-20 sm:pb-28">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <div className="min-w-0">
          <p className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.72rem] tracking-[0.14em] text-muted uppercase">
            <span>{site.title}</span>
            <span aria-hidden className="text-line">
              /
            </span>
            <span>{site.focus}</span>
            <span aria-hidden className="text-line">
              /
            </span>
            <span>{site.location}</span>
          </p>

          <h1 id="hero-title" className="font-display font-semibold tracking-[-0.035em]">
            <span className="block text-[3.1rem] leading-[1] sm:text-7xl lg:text-[5rem]">
              Hey, I&rsquo;m {site.firstName}.
            </span>
            <span className="mt-3 block text-[2.05rem] leading-[1.1] text-muted sm:text-5xl lg:text-[3.4rem]">
              I build software <span className="marker marker-draw whitespace-nowrap text-ink">end to end</span>.
            </span>
          </h1>

          <p className="mt-7 max-w-[34rem] text-lg leading-relaxed text-muted sm:text-[1.15rem]">
            Full-stack engineer since 2019, building web applications and backend services with .NET, React and
            TypeScript: insurance quoting platforms built from scratch, a Blazor-to-React migration, and an analytics
            dashboard for Rheinmetall.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href={hasProjects ? "/#work" : "/#experience"}>
              {hasProjects ? "Explore my work" : "See my experience"}
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
            </ButtonLink>
            {site.resumeUrl ? (
              <ButtonLink href={site.resumeUrl} variant="secondary" download>
                <FileText className="size-4" aria-hidden />
                Download CV
              </ButtonLink>
            ) : null}
            <SocialLinks className="ml-1" />
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-1 gap-x-8 gap-y-4 border-t border-line pt-6 text-sm sm:grid-cols-3">
            {site.availability ? (
              <div>
                <dt className="font-mono text-[0.68rem] tracking-[0.12em] text-muted uppercase">Status</dt>
                <dd className="mt-1 flex items-center gap-2 font-medium">
                  <span
                    className="pulse-dot relative inline-block size-2 rounded-full bg-accent text-accent"
                    aria-hidden
                  />
                  {site.availability}
                </dd>
              </div>
            ) : null}
            <div>
              <dt className="font-mono text-[0.68rem] tracking-[0.12em] text-muted uppercase">Work rights</dt>
              <dd className="mt-1 font-medium">{site.workAuthorization}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.68rem] tracking-[0.12em] text-muted uppercase">Languages</dt>
              <dd className="mt-1 font-medium">
                {site.languages.map((l) => `${l.name} ${l.level.split(",")[0]}`).join(" · ")}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mx-auto w-full max-w-[440px] min-w-0 lg:mx-0 lg:justify-self-end">
          <SystemDiagram />
        </div>
      </Container>
    </section>
  );
}
