import { Cloud, Database, Layout, Server } from "lucide-react";
import { skillGroups, type SkillGroup } from "@/data/skills";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<SkillGroup["id"], typeof Server> = {
  backend: Server,
  frontend: Layout,
  cloud: Cloud,
  data: Database,
};

export function Skills({ index }: { index: string }) {
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-20 sm:py-28">
      <Container>
        <SectionHeading id="skills-title" index={index} label="Toolbox" title="What I work with" />
        <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-2">
          {skillGroups.map((group) => {
            const Icon = icons[group.id];
            return (
              <div key={group.id} className="bg-surface p-6 sm:p-8">
                <Icon className="mb-6 size-5 text-accent" aria-hidden />
                <h3 className="font-display text-xl font-semibold tracking-tight">{group.title}</h3>
                <p className="mt-2 text-[0.95rem] text-muted">{group.description}</p>
                <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[0.8rem]">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span aria-hidden className="size-1 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
