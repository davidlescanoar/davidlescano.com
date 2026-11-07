/**
 * Technical notes. Empty on purpose: the "Notes from building things"
 * section and the /writing route only appear once a published note exists.
 *
 * When you write the first one, the simplest path is adding an entry here
 * plus a `body` of paragraphs. If notes get long, switch to MDX files in
 * src/content/writing/ and keep this file as the index.
 */

export interface Note {
  slug: string;
  title: string;
  summary: string;
  /** ISO date, e.g. "2026-11-15". */
  date: string;
  tags: string[];
  body: string[];
  status: "draft" | "published";
}

export const notes: Note[] = [];
