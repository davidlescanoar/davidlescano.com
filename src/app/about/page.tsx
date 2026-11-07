import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { site } from "@/config/site";
import { Postcard } from "@/components/sections/AboutTeaser";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { pad2 } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is a ${site.title.toLowerCase()} based in ${site.location}. Background, how he works, and what he is looking for.`,
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Understand the problem first",
    body: "I like knowing why something is needed before deciding how to build it. Most good technical decisions start there.",
  },
  {
    title: "Own the whole thing",
    body: "From the database schema to the button someone presses, I care about how the parts fit together, not only my slice of it.",
  },
  {
    title: "Leave code easy to change",
    body: "Clear names, small pieces, and tests where they matter. The next person to touch the code is often me.",
  },
];

const label = "font-mono text-[0.68rem] tracking-[0.12em] text-muted uppercase";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            Software engineer, curious by default, based in <span className="marker">Munich</span>.
          </>
        }
      />

      <Container className="grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <div className="max-w-[640px] space-y-5 text-[1.08rem] leading-relaxed">
          <p>
            I&rsquo;m {site.firstName}, a full-stack software engineer. I&rsquo;ve been building software professionally
            since 2019, mostly web applications with .NET backends and React frontends, and I like owning features from
            the first commit to production.
          </p>
          <p>
            At Grupo Sancor Seguros, one of Argentina&rsquo;s leading insurance groups, I built two quoting applications
            from scratch: one for insurance agents and a public portal where customers get a quote online. I also led a
            team of four developers there, doing code reviews, onboarding, training and estimation.
          </p>
          <p>
            At Oversoft I worked on dealer management software for car dealerships across Latin America and built a
            reusable React component library. Today, at Glofy, I work with US clients: I migrated an insurance web
            application from Blazor to React, built its new .NET REST API, and built a full-stack analytics dashboard
            for Rheinmetall.
          </p>
          <p>
            I studied Computer Science at the University of Buenos Aires, where I competed in the ICPC Latin America
            Regional. Before that, in high school, I reached the national level of the Argentinian Olympiad in
            Informatics. What stayed with me is the habit of learning something new and putting it into practice right
            away.
          </p>

          <h2 className="pt-8 font-display text-2xl font-semibold tracking-tight">How I like to work</h2>
          <ul className="space-y-5">
            {principles.map((p, i) => (
              <li key={p.title} className="grid grid-cols-[2.5rem_1fr]">
                <span className="pt-1 font-mono text-sm text-accent">{pad2(i + 1)}</span>
                <div>
                  <h3 className="font-medium">{p.title}</h3>
                  <p className="mt-1 text-muted">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <h2 className="pt-8 font-display text-2xl font-semibold tracking-tight">What I&rsquo;m looking for</h2>
          <p className="text-muted">
            A permanent, English-speaking software engineering role in Munich or elsewhere in Germany: backend,
            full-stack or cloud. I&rsquo;m a German citizen, so no visa is needed, and I can start immediately.
          </p>

          <div className="flex flex-wrap gap-x-6 pt-4">
            <Link
              href="/#experience"
              className="group inline-flex min-h-11 items-center gap-1.5 font-medium text-accent"
            >
              See my experience{" "}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
            <Link href="/#contact" className="group inline-flex min-h-11 items-center gap-1.5 font-medium text-accent">
              Get in touch <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
        </div>

        <aside className="space-y-10">
          <Postcard />
          <dl className="space-y-5 rounded-[var(--radius-card)] border border-line bg-surface p-6 text-sm">
            <div>
              <dt className={label}>Based in</dt>
              <dd className="mt-1 font-medium">{site.location}</dd>
            </div>
            <div>
              <dt className={label}>Work rights</dt>
              <dd className="mt-1 font-medium">{site.workAuthorization}</dd>
            </div>
            {site.availability ? (
              <div>
                <dt className={label}>Availability</dt>
                <dd className="mt-1 font-medium">{site.availability}</dd>
              </div>
            ) : null}
          </dl>
        </aside>
      </Container>
    </>
  );
}
