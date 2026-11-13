import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FeaturedProject } from "@/components/projects/FeaturedProject";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedProjects, getProjects } from "@/lib/content";

/** The home page shows it only once a featured project exists. */
export function FeaturedProjects({ index }: { index: string }) {
  const featured = getFeaturedProjects();
  const hasMore = getProjects().length > featured.length;

  return (
    <section id="work" aria-labelledby="work-title" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="work-title"
          index={index}
          label="Projects"
          title="Selected work"
          intro="A few things I’ve built, explored, and learned along the way."
        />
        <div className="space-y-20 sm:space-y-28">
          {featured.map((project, i) => (
            <FeaturedProject key={project.slug} project={project} index={i} />
          ))}
        </div>
        <div className="mt-16 flex justify-center sm:mt-20">
          <Link
            href="/projects"
            className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 font-medium transition-colors hover:border-accent hover:text-accent"
          >
            {hasMore ? "View all projects" : "Browse the project index"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}
