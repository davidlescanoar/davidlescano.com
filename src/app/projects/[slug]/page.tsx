import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/projects/CaseStudy";
import { getCaseStudyProjects, getProject, hasCaseStudy, isPublished } from "@/lib/content";

type Params = { slug: string };

// Only published case studies are built in production.
export function generateStaticParams(): Params[] {
  return getCaseStudyProjects().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: project.name, description: project.summary, type: "article" },
    robots: isPublished(project) ? undefined : { index: false, follow: false },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !hasCaseStudy(project)) notFound();
  return <CaseStudy project={project} isDraft={!isPublished(project)} />;
}
