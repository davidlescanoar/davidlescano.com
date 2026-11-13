/**
 * Central personal configuration.
 *
 * Every piece of personal information shown on the site comes from here.
 * Leave a value as `null` until you have the real one: components hide
 * anything that is not configured, so the public site never shows a dead
 * link or a fake address.
 */

export interface SiteConfig {
  name: string;
  firstName: string;
  title: string;
  /** Short stack line shown next to the title. */
  focus: string;
  location: string;
  /** Canonical origin, no trailing slash. */
  url: string;
  email: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  /** Path under /public, e.g. "/david-lescano-cv.pdf". */
  resumeUrl: string | null;
  /** Shows the availability indicator in the hero. Set to null when not looking. */
  availability: string | null;
  workAuthorization: string;
  languages: { name: string; level: string }[];
  seo: {
    title: string;
    description: string;
    locale: string;
  };
}

export const site: SiteConfig = {
  name: "David Lescano",
  firstName: "David",
  title: "Full-Stack Software Engineer",
  focus: ".NET & React",
  location: "Munich, Germany",
  url: "https://davidlescano.com",

  email: "davidlescanoar@gmail.com",
  githubUrl: "https://github.com/davidlescanoar",
  linkedinUrl: "https://www.linkedin.com/in/davidlescanop/",
  // Public copy of the CV, without street address and phone number.
  resumeUrl: "/david-lescano-cv.pdf",

  availability: "Available immediately",
  workAuthorization: "German citizen, no visa required",
  languages: [
    { name: "English", level: "C1" },
    { name: "German", level: "B1, B2 in progress" },
    { name: "Spanish", level: "Native" },
  ],

  seo: {
    title: "David Lescano | Full-Stack Software Engineer, .NET & React",
    description:
      "David Lescano is a Full-Stack Software Engineer in Munich, Germany, building web applications and backend services with .NET, React and TypeScript since 2019.",
    locale: "en_US",
  },
};
