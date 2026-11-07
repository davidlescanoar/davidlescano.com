/**
 * Projects and their case studies.
 *
 * Empty until a project is finished. The Projects section, the /projects
 * route, the nav link and the sitemap entries all appear automatically once
 * this array has an entry.
 *
 * Rules that keep the site honest:
 * - Only list technologies and features that are actually implemented.
 * - A case study stays `status: "draft"` until its sections are written.
 *   Draft pages are not built, linked, or indexed in production.
 * - Screenshots are real screenshots of the running app, nothing mocked up.
 */

export interface Screenshot {
  /** Path under /public, e.g. "/projects/spendo/home.png". */
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface CaseStudy {
  overview?: string[];
  role?: string[];
  architecture?: string[];
  challenges?: { title: string; body: string }[];
  lessons?: string[];
  screenshots?: Screenshot[];
}

export interface Project {
  slug: string;
  name: string;
  type: string;
  /** One sentence, shown on cards and in metadata. */
  summary: string;
  /** Two or three sentences for the featured card. */
  description: string;
  tech: string[];
  /** Shown on cards; falls back to a neutral blueprint panel. */
  cover?: Screenshot;
  featured: boolean;
  order: number;
  repoUrl?: string;
  liveUrl?: string;
  status: "draft" | "published";
  caseStudy: CaseStudy;
}

export const projects: Project[] = [];
