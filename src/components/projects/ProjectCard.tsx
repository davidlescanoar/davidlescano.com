import Link from "next/link";
import type { Project } from "@/content/projects";
import { ProjectLinks } from "@/components/projects/ProjectLinks";
import { ProjectPreview } from "@/components/projects/ProjectPreview";
import { TagList } from "@/components/ui/Tag";
import { hasCaseStudy } from "@/lib/content";

/** Compact card for the /projects grid. The whole card links when a case study exists. */
export function ProjectCard({ project }: { project: Project }) {
  const linked = hasCaseStudy(project);
  return (
    <article className="group relative flex flex-col rounded-[calc(var(--radius-card)+6px)] border border-line bg-surface p-3 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-accent/60">
      <ProjectPreview project={project} />
      <div className="flex flex-1 flex-col px-2 pt-5 pb-2">
        <p className="mb-2 font-mono text-[0.68rem] tracking-[0.12em] text-muted uppercase">{project.type}</p>
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          {linked ? (
            <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:rounded-[inherit]">
              {project.name}
            </Link>
          ) : (
            project.name
          )}
        </h2>
        <p className="mt-2 flex-1 text-muted">{project.summary}</p>
        <div className="mt-4">
          <TagList items={project.tech} label={`${project.name} technologies`} />
        </div>
        <div className="relative z-10 mt-2">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}
