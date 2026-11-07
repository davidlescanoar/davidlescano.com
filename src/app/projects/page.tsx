import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Applications and tools built by David Lescano.",
  alternates: { canonical: "/projects" },
};

/** Returns 404 until the first project exists, so there is never an empty index. */
export default function ProjectsPage() {
  const projects = getProjects();
  if (projects.length === 0) notFound();
  return (
    <>
      <PageHeader
        eyebrow="Project index"
        title={
          <>
            Things I&rsquo;ve <span className="marker">built</span>.
          </>
        }
        intro="Products, tools, and experiments. Each one taught me something about building software people can rely on."
      />
      <Container>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </>
  );
}
