import { projects, type Project } from "@/content/projects";
import { notes, type Note } from "@/content/writing";
import { experience } from "@/data/experience";
import { showDrafts } from "@/lib/drafts";

const byOrder = (a: Project, b: Project) => a.order - b.order;

/** Whether content is final. Drafts can still be visible in `npm run dev`; only published content is indexed. */
export function isPublished(item: { status: "draft" | "published" }): boolean {
  return item.status === "published";
}

/** Projects shown anywhere on the site (cards are factual even when the case study is a draft). */
export function getProjects(): Project[] {
  return [...projects].sort(byOrder);
}

export function getFeaturedProjects(): Project[] {
  return getProjects()
    .filter((p) => p.featured)
    .slice(0, 3);
}

/** Whether a project's case-study page exists in this build. */
export function hasCaseStudy(project: Project): boolean {
  return isPublished(project) || showDrafts;
}

export function getCaseStudyProjects(): Project[] {
  return getProjects().filter(hasCaseStudy);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Notes visible in this build, newest first: published ones, plus drafts in `npm run dev`. */
export function getNotes(): Note[] {
  return notes.filter((n) => isPublished(n) || showDrafts).sort((a, b) => b.date.localeCompare(a.date));
}

export function getNote(slug: string): Note | undefined {
  return getNotes().find((n) => n.slug === slug);
}

export function hasExperience(): boolean {
  return experience.length > 0;
}

export interface NavItem {
  label: string;
  href: string;
}

/** Navigation adapts to what content actually exists. */
export function getNavItems(): NavItem[] {
  const items: NavItem[] = [];
  if (getFeaturedProjects().length > 0) items.push({ label: "Projects", href: "/#work" });
  if (hasExperience()) items.push({ label: "Experience", href: "/#experience" });
  items.push({ label: "Skills", href: "/#skills" });
  items.push({ label: "About", href: "/about" });
  if (getNotes().length > 0) items.push({ label: "Notes", href: "/writing" });
  items.push({ label: "Contact", href: "/#contact" });
  return items;
}
