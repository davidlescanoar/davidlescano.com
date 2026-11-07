import Image from "next/image";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

/**
 * The project's cover screenshot, or its first case-study screenshot.
 * Without either, a neutral blueprint panel with the project name: never a
 * mocked-up interface.
 */
export function ProjectPreview({
  project,
  className,
  priority,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
}) {
  const shot = project.cover ?? project.caseStudy.screenshots?.[0];

  return (
    <div
      className={cn(
        "blueprint relative aspect-[4/3.4] max-w-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface-2 sm:aspect-[16/11]",
        className,
      )}
    >
      {shot ? (
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          priority={priority}
          sizes="(min-width: 1024px) 560px, 100vw"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
      ) : (
        <div aria-hidden className="grid h-full place-items-center p-8">
          <span className="font-display text-4xl font-semibold tracking-tight text-muted/60">{project.name}</span>
        </div>
      )}
    </div>
  );
}
