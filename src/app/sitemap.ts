import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getProjects, getNotes, isPublished } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, lastModified = now) => ({ url: `${site.url}${path}`, lastModified });

  // Only published content is indexable, regardless of draft mode.
  const projects = getProjects();
  const caseStudies = projects.filter(isPublished).map((p) => page(`/projects/${p.slug}`));
  const notes = getNotes()
    .filter(isPublished)
    .map((n) => page(`/writing/${n.slug}`, new Date(`${n.date}T00:00:00Z`)));

  return [
    page(""),
    page("/about"),
    ...(projects.length > 0 ? [page("/projects"), ...caseStudies] : []),
    ...(notes.length > 0 ? [page("/writing"), ...notes] : []),
  ];
}
