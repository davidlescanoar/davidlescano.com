import { projects, type Project } from "@/content/projects";
import { notes, type Note } from "@/content/writing";
import { experience } from "@/data/experience";
import { showDrafts } from "@/lib/drafts";
import { pad2 } from "@/lib/utils";

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

export type HomeSectionId = "work" | "experience" | "skills" | "about" | "notes" | "contact";

export interface NavItem {
  label: string;
  href: string;
}

export interface HomeSection extends NavItem {
  id: HomeSectionId;
  /** Section number shown in the heading, e.g. "01". */
  index: string;
}

const homeSections: (Omit<HomeSection, "index"> & { visible?: () => boolean })[] = [
  { id: "work", label: "Projects", href: "/#work", visible: () => getFeaturedProjects().length > 0 },
  { id: "experience", label: "Experience", href: "/#experience", visible: hasExperience },
  { id: "skills", label: "Skills", href: "/#skills" },
  { id: "about", label: "About", href: "/about" },
  { id: "notes", label: "Notes", href: "/writing", visible: () => getNotes().length > 0 },
  { id: "contact", label: "Contact", href: "/#contact" },
];

/**
 * Home page sections that have content, in order. The single source for both
 * the home page and the navigation, so numbers stay sequential when a section is hidden.
 */
export function getHomeSections(): HomeSection[] {
  return homeSections
    .filter((s) => s.visible?.() ?? true)
    .map(({ id, label, href }, i) => ({ id, label, href, index: pad2(i + 1) }));
}

export function getNavItems(): NavItem[] {
  return getHomeSections().map(({ label, href }) => ({ label, href }));
}
