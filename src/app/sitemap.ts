import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getNotes, getProjects, isPublished } from "@/lib/content";

/**
 * Only published content is indexable, regardless of draft mode. `lastModified`
 * is set only where a real date exists: a build timestamp on every page would
 * claim everything changes on each deploy, and search engines ignore that.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, lastModified?: Date) => ({
    url: `${site.url}${path}`,
    ...(lastModified ? { lastModified } : {}),
  });

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
