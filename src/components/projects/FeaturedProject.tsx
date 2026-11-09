import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { ProjectLinks } from "@/components/projects/ProjectLinks";
import { ProjectPreview } from "@/components/projects/ProjectPreview";
import { TagList } from "@/components/ui/Tag";
import { hasCaseStudy } from "@/lib/content";
import { cn, pad2 } from "@/lib/utils";

/** Large editorial project row. Alternates sides on desktop. */
export function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const linked = hasCaseStudy(project);
  const flip = index % 2 === 1;
  const href = `/projects/${project.slug}`;

  return (
    <article
      aria-labelledby={`p-${project.slug}`}
      className="group grid items-center gap-7 md:grid-cols-[1.15fr_1fr] md:gap-12"
    >
      <div className={cn(flip && "md:order-2")}>
        {linked ? (
          <Link href={href} tabIndex={-1} aria-hidden className="block">
            <ProjectPreview
              project={project}
              className="transition-shadow duration-300 group-hover:shadow-[var(--shadow-card)]"
            />
          </Link>
        ) : (
          <ProjectPreview project={project} />
        )}
      </div>

      <div className={cn(flip && "md:order-1")}>
        <p className="mb-3 font-mono text-[0.72rem] tracking-[0.12em] text-muted uppercase">
          <span className="text-accent">{pad2(index + 1)}</span> · {project.type}
        </p>
        <h3
          id={`p-${project.slug}`}
          className="font-display text-[1.75rem] leading-tight font-semibold tracking-tight sm:text-[2rem]"
        >
          {linked ? (
            <Link
              href={href}
              className="bg-linear-to-r from-accent to-accent bg-[length:0%_2px] bg-bottom-left bg-no-repeat transition-[background-size] duration-300 hover:bg-[length:100%_2px]"
            >
              {project.name}
            </Link>
          ) : (
            project.name
          )}
        </h3>
        <p className="mt-3 text-muted">{project.description}</p>
        <div className="mt-5">
          <TagList items={project.tech} label={`${project.name} technologies`} />
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-x-6">
          {linked ? (
            <Link href={href} className="inline-flex min-h-11 items-center gap-1.5 font-medium text-accent">
              Read the case study
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          ) : null}
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}
