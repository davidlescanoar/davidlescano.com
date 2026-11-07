import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { GitHubIcon } from "@/components/ui/icons";

/** External links for a project. Renders nothing if none are configured. */
export function ProjectLinks({ project }: { project: Project }) {
  if (!project.repoUrl && !project.liveUrl) return null;
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
      {project.liveUrl ? (
        <li>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 hover:text-accent"
          >
            Live app <ArrowUpRight className="size-4" aria-hidden />
            <span className="sr-only">for {project.name} (opens in a new tab)</span>
          </a>
        </li>
      ) : null}
      {project.repoUrl ? (
        <li>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 hover:text-accent"
          >
            <GitHubIcon className="size-4" /> Source
            <span className="sr-only">code for {project.name} on GitHub (opens in a new tab)</span>
          </a>
        </li>
      ) : null}
    </ul>
  );
}
