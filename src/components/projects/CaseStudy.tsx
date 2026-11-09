import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Project } from "@/content/projects";
import { ProjectLinks } from "@/components/projects/ProjectLinks";
import { ProjectPreview } from "@/components/projects/ProjectPreview";
import { Container } from "@/components/ui/Container";
import { TagList } from "@/components/ui/Tag";
import { getCaseStudyProjects } from "@/lib/content";
import { pad2 } from "@/lib/utils";

interface Section {
  id: string;
  title: string;
  render: () => ReactNode | null;
}

function Paragraphs({ items }: { items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="space-y-4 text-[1.05rem] leading-relaxed">
      {items.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

export function CaseStudy({ project, isDraft }: { project: Project; isDraft: boolean }) {
  const cs = project.caseStudy;
  const related = getCaseStudyProjects()
    .filter((p) => p.slug !== project.slug)
    .slice(0, 2);

  const sections: Section[] = [
    {
      id: "overview",
      title: "Overview",
      render: () => <Paragraphs items={cs.overview} />,
    },
    {
      id: "role",
      title: "My role",
      render: () => <Paragraphs items={cs.role} />,
    },
    {
      id: "architecture",
      title: "Technical architecture",
      render: () => <Paragraphs items={cs.architecture} />,
    },
    {
      id: "challenges",
      title: "Challenges & decisions",
      render: () =>
        cs.challenges && cs.challenges.length > 0 ? (
          <div className="space-y-6">
            {cs.challenges.map((c) => (
              <div key={c.title} className="rounded-[var(--radius-card)] border border-line bg-surface p-6">
                <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-muted">{c.body}</p>
              </div>
            ))}
          </div>
        ) : null,
    },
    {
      id: "showcase",
      title: "Showcase",
      render: () =>
        cs.screenshots && cs.screenshots.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {cs.screenshots.map((s) => (
              <figure
                key={s.src}
                className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface"
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={s.width}
                  height={s.height}
                  sizes="(min-width: 640px) 380px, 100vw"
                  className="h-auto w-full"
                />
                {s.caption ? <figcaption className="px-4 py-3 text-sm text-muted">{s.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        ) : null,
    },
    {
      id: "lessons",
      title: "Lessons learned",
      render: () => <Paragraphs items={cs.lessons} />,
    },
  ];

  const rendered = sections.map((s) => ({ ...s, content: s.render() })).filter((s) => s.content !== null);

  return (
    <article>
      <header className="pt-10 pb-12 sm:pt-16">
        <Container>
          <Link
            href="/projects"
            className="group mb-10 inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-ink"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden />
            All projects
          </Link>
          {isDraft ? (
            <p className="mb-8 w-fit rounded-full border border-dashed border-peach px-3 py-1 font-mono text-xs text-peach-ink">
              Draft · only visible in npm run dev
            </p>
          ) : null}
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="mb-4 font-mono text-xs tracking-[0.14em] text-muted uppercase">{project.type}</p>
              <h1 className="font-display text-5xl leading-none font-semibold tracking-[-0.03em] sm:text-7xl">
                {project.name}
              </h1>
              <p className="mt-6 max-w-xl text-xl text-muted">{project.summary}</p>
              <div className="mt-6">
                <TagList items={project.tech} label={`${project.name} technologies`} />
              </div>
              <div className="mt-4">
                <ProjectLinks project={project} />
              </div>
            </div>
            <ProjectPreview project={project} priority />
          </div>
        </Container>
      </header>

      <Container className="grid gap-12 border-t border-line pt-14 lg:grid-cols-[200px_1fr] lg:gap-16">
        <nav aria-label="On this page" className="hidden lg:block">
          <ol className="sticky top-24 space-y-1 font-mono text-[0.8rem]">
            {rendered.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="flex min-h-9 items-center gap-3 text-muted transition-colors hover:text-accent"
                >
                  <span className="text-accent">{pad2(i + 1)}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="max-w-[680px] space-y-16">
          {rendered.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`}>
              <h2
                id={`${s.id}-title`}
                className="mb-5 flex items-baseline gap-4 font-display text-[1.75rem] font-semibold tracking-tight"
              >
                <span className="font-mono text-sm text-accent">{pad2(i + 1)}</span>
                {s.title}
              </h2>
              {s.content}
            </section>
          ))}

          {related.length > 0 ? (
            <section aria-labelledby="related-title" className="border-t border-line pt-10">
              <h2 id="related-title" className="mb-5 font-mono text-xs tracking-[0.14em] text-muted uppercase">
                More projects
              </h2>
              <ul className="space-y-3">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="group flex items-baseline justify-between gap-6 border-b border-line py-3"
                    >
                      <span className="font-display text-xl font-semibold group-hover:text-accent">{p.name}</span>
                      <span className="text-right text-sm text-muted">{p.type}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </Container>
    </article>
  );
}
