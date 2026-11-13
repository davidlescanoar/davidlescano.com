import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { site } from "@/config/site";
import { projects } from "@/content/projects";
import { notes } from "@/content/writing";
import { experience } from "@/data/experience";
import { skillGroups } from "@/data/skills";
import { formatDate, isoMonth, pad2 } from "@/lib/utils";

/**
 * Guard rails that keep the public site honest and unbroken.
 * Run with `npm test`.
 */

const isUrl = (value: string) => {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
};

const publicFile = (path: string) => existsSync(join(process.cwd(), "public", path));

/** Every piece of text a visitor can read, for the wording rules below. */
const allCopy = [
  site.seo.title,
  site.seo.description,
  ...experience.flatMap((e) => [e.summary, ...e.highlights]),
  ...skillGroups.map((g) => g.description),
  ...projects.flatMap((p) => [p.summary, p.description]),
].join("\n");

describe("site config", () => {
  it("uses the canonical https domain without a trailing slash", () => {
    expect(site.url).toBe("https://davidlescano.com");
  });

  it("only contains real-looking profile URLs when set", () => {
    for (const value of [site.githubUrl, site.linkedinUrl]) {
      if (value !== null) expect(isUrl(value)).toBe(true);
    }
  });

  it("has a valid email when set", () => {
    if (site.email !== null) expect(site.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("points the CV at a file that exists in /public", () => {
    if (site.resumeUrl !== null) expect(publicFile(site.resumeUrl), site.resumeUrl).toBe(true);
  });
});

describe("CV rules", () => {
  it("never claims a degree", () => {
    expect(allCopy).not.toMatch(/\b(bachelor|master'?s|degree|thesis|graduated)\b/i);
  });

  it("never shows achievement percentages", () => {
    expect(allCopy).not.toMatch(/\d+\s?%/);
  });

  // Client names stay off the site (see AGENTS.md); this guards the employer list itself.
  it("only lists confirmed employers", () => {
    const employers = ["Glofy LLC", "Oversoft", "Grupo Sancor Seguros", "IBM"];
    for (const e of experience) expect(employers, e.company).toContain(e.company);
  });

  it("never publishes a street address or phone number", () => {
    expect(allCopy).not.toMatch(/\b\p{L}+(straße|strasse|str\.)\s*\d+/iu);
    expect(allCopy).not.toMatch(/\+\d{2}[\d\s/-]{8,}/);
  });
});

describe("experience", () => {
  it("entries are complete and use MM/YYYY dates", () => {
    for (const e of experience) {
      expect(e.role && e.company && e.summary).toBeTruthy();
      expect(e.start).toMatch(/^\d{2}\/\d{4}$/);
      expect(e.end).toMatch(/^(\d{2}\/\d{4}|Present)$/);
    }
  });

  it("is newest first and has no gaps between jobs", () => {
    for (let i = 0; i < experience.length - 1; i++) {
      const newer = experience[i]!;
      const older = experience[i + 1]!;
      const [startMonth, startYear] = newer.start.split("/").map(Number);
      const [endMonth, endYear] = older.end.split("/").map(Number);
      const monthsBetween = startYear! * 12 + startMonth! - (endYear! * 12 + endMonth!);
      expect(monthsBetween, `${older.company} → ${newer.company}`).toBeGreaterThanOrEqual(0);
      expect(monthsBetween, `${older.company} → ${newer.company}`).toBeLessThanOrEqual(1);
    }
  });
});

describe("skills", () => {
  it("groups are non-empty, unique and free of duplicates", () => {
    const ids = skillGroups.map((g) => g.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const g of skillGroups) {
      expect(g.items.length).toBeGreaterThan(0);
      expect(new Set(g.items).size, g.id).toBe(g.items.length);
    }
  });
});

describe("projects", () => {
  it("have unique, URL-safe slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9-]+$/);
  });

  it("feature at most three on the homepage", () => {
    expect(projects.filter((p) => p.featured).length).toBeLessThanOrEqual(3);
  });

  it("only publish case studies that have their core sections written", () => {
    for (const p of projects.filter((x) => x.status === "published")) {
      expect(p.caseStudy.overview?.length, `${p.slug}: overview`).toBeGreaterThan(0);
      expect(p.caseStudy.role?.length, `${p.slug}: role`).toBeGreaterThan(0);
      expect(p.caseStudy.architecture?.length, `${p.slug}: architecture`).toBeGreaterThan(0);
    }
  });

  it("only reference screenshots that exist", () => {
    for (const p of projects) {
      for (const shot of [p.cover, ...(p.caseStudy.screenshots ?? [])].filter((s) => s !== undefined)) {
        expect(publicFile(shot.src), `${p.slug}: ${shot.src}`).toBe(true);
        expect(shot.alt.length, `${p.slug}: alt text`).toBeGreaterThan(0);
      }
    }
  });

  it("use https for external links", () => {
    for (const p of projects) {
      if (p.repoUrl) expect(isUrl(p.repoUrl)).toBe(true);
      if (p.liveUrl) expect(isUrl(p.liveUrl)).toBe(true);
    }
  });
});

describe("notes", () => {
  it("published notes have a body and an ISO date", () => {
    for (const n of notes.filter((x) => x.status === "published")) {
      expect(n.body.length).toBeGreaterThan(0);
      expect(n.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});

describe("utils", () => {
  it("pads section numbers to two digits", () => {
    expect(pad2(1)).toBe("01");
    expect(pad2(12)).toBe("12");
  });

  it("converts CV months to machine-readable dates", () => {
    expect(isoMonth("07/2024")).toBe("2024-07");
  });

  it("formats dates without shifting the day across timezones", () => {
    expect(formatDate("2026-01-01")).toBe("1 Jan 2026");
  });
});
