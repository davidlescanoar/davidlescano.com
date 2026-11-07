import { site } from "@/config/site";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { Notes } from "@/components/sections/Notes";
import { Skills } from "@/components/sections/Skills";
import { getFeaturedProjects, getPublishedNotes, hasExperience } from "@/lib/content";
import { pad2 } from "@/lib/utils";

/** Person structured data, using only configured, true facts. */
function personJsonLd() {
  const sameAs = [site.githubUrl, site.linkedinUrl].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.title,
    url: site.url,
    ...(site.email ? { email: `mailto:${site.email}` } : {}),
    address: { "@type": "PostalAddress", addressLocality: "Munich", addressCountry: "DE" },
    knowsLanguage: site.languages.map((l) => l.name),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export default function HomePage() {
  // Section numbers stay sequential when optional sections are hidden.
  const sections = [
    getFeaturedProjects().length > 0 && "work",
    hasExperience() && "experience",
    "skills",
    "about",
    getPublishedNotes().length > 0 && "notes",
    "contact",
  ].filter(Boolean) as string[];
  const n = (id: string) => pad2(sections.indexOf(id) + 1);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }} />
      <Hero />
      <FeaturedProjects index={n("work")} />
      <Experience index={n("experience")} />
      <Skills index={n("skills")} />
      <AboutTeaser index={n("about")} />
      <Notes index={n("notes")} />
      <Contact index={n("contact")} />
    </>
  );
}
