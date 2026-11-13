import type { ReactNode } from "react";
import { site } from "@/config/site";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { Notes } from "@/components/sections/Notes";
import { Skills } from "@/components/sections/Skills";
import { getHomeSections, type HomeSectionId } from "@/lib/content";

const sectionComponents: Record<HomeSectionId, (props: { index: string }) => ReactNode> = {
  work: FeaturedProjects,
  experience: Experience,
  skills: Skills,
  about: AboutTeaser,
  notes: Notes,
  contact: Contact,
};

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
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }} />
      <Hero />
      {getHomeSections().map(({ id, index }) => {
        const Section = sectionComponents[id];
        return <Section key={id} index={index} />;
      })}
    </>
  );
}
