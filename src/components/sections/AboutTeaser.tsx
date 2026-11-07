import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Typographic "postcard" from Munich: the site's personal detail. */
export function Postcard() {
  return (
    <div className="relative mx-auto w-full max-w-[360px] rotate-[-2deg] rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-[var(--shadow-card)] transition-transform duration-500 hover:rotate-0">
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-[0.66rem] tracking-[0.12em] text-muted uppercase">Greetings from</p>
        <span
          aria-hidden
          className="grid size-12 place-items-center rounded-md border-2 border-dashed border-peach font-mono text-[0.6rem] text-peach-ink"
        >
          DE
        </span>
      </div>
      <p className="mt-3 font-display text-5xl font-semibold tracking-tight">
        München<span className="text-accent">.</span>
      </p>
      <p className="mt-1 font-mono text-xs text-muted">48.137° N · 11.575° E</p>
      <ul aria-label="Languages" className="mt-6 space-y-2 border-t border-dashed border-line pt-5 text-sm">
        {site.languages.map((l) => (
          <li key={l.name} className="flex items-center gap-3">
            <span aria-hidden className="size-1.5 rounded-full bg-peach" />
            <span className="font-medium">{l.name}</span>
            <span className="text-muted">{l.level}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AboutTeaser({ index }: { index: string }) {
  return (
    <section id="about" aria-labelledby="about-title" className="py-20 sm:py-28">
      <Container className="grid items-center gap-14 md:grid-cols-[1.2fr_1fr]">
        <div>
          <SectionHeading id="about-title" index={index} label="Person" title="A little about me" />
          <div className="-mt-4 max-w-xl space-y-4 text-lg text-muted">
            <p>
              I&rsquo;m {site.firstName}, a software engineer based in Munich. I like owning a feature from the database
              to the screen, and I&rsquo;ve done it for <span className="marker text-ink">insurance</span>, automotive
              and defence products.
            </p>
            <p>
              I also did competitive programming: the national level of the Argentinian Olympiad in Informatics in high
              school, and later the ICPC Latin America Regional.
            </p>
          </div>
          <Link href="/about" className="group mt-8 inline-flex min-h-11 items-center gap-1.5 font-medium text-accent">
            More about me
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
        <Postcard />
      </Container>
    </section>
  );
}
