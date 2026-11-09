import { ArrowUpRight } from "lucide-react";
import { experience } from "@/data/experience";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagList } from "@/components/ui/Tag";

/** Timeline of roles. Hidden until src/data/experience.ts has entries. */
export function Experience({ index }: { index: string }) {
  if (experience.length === 0) return null;

  return (
    <section id="experience" aria-labelledby="experience-title" className="py-20 sm:py-28">
      <Container>
        <SectionHeading id="experience-title" index={index} label="Career" title="Experience" />

        <ol className="relative space-y-12">
          {experience.map((job) => (
            <li key={`${job.company}-${job.start}`} className="grid gap-3 md:grid-cols-[200px_1fr] md:gap-10">
              <p className="pt-1 font-mono text-sm text-muted">
                <time>{job.start}</time> — <time>{job.end}</time>
                {job.location ? <span className="mt-1 block text-xs">{job.location}</span> : null}
              </p>
              <div className="border-l border-line pl-6 md:border-l-0 md:pl-0">
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  {job.role} ·{" "}
                  {job.companyUrl ? (
                    <a
                      href={job.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-accent hover:underline"
                    >
                      {job.company}
                      <ArrowUpRight className="size-4" aria-hidden />
                    </a>
                  ) : (
                    <span className="text-accent">{job.company}</span>
                  )}
                </h3>
                <p className="mt-2 text-muted">{job.summary}</p>
                {job.highlights.length > 0 ? (
                  <ul className="mt-4 space-y-2">
                    {job.highlights.map((h) => (
                      <li key={h} className="flex gap-3">
                        <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="mt-5">
                  <TagList items={job.tech} label={`Technologies at ${job.company}`} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
