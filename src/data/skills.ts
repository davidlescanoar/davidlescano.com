export interface SkillGroup {
  id: "backend" | "frontend" | "cloud" | "data";
  title: string;
  description: string;
  items: string[];
}

/** Mirrors the CV's skill rows. Order is display order. No percentages, by design. */
export const skillGroups: SkillGroup[] = [
  {
    id: "backend",
    title: "Backend & APIs",
    description:
      "REST APIs and services in C# and .NET, used for insurance quoting, dealer management and analytics products.",
    items: [
      "C#",
      ".NET Core",
      "EF Core",
      "LINQ",
      "Python (FastAPI, Flask)",
      "Node.js (Express)",
      "REST APIs",
      "Microservices",
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    description:
      "React and TypeScript interfaces, from public quoting portals to chart-heavy dashboards and shared component libraries.",
    items: ["TypeScript", "React", "Redux", "Next.js", "Angular", "Vue", "Material UI", "Tailwind CSS", "DevExpress"],
  },
  {
    id: "cloud",
    title: "Cloud & Delivery",
    description: "Shipping and running applications in production, with automated pipelines from commit to deployment.",
    items: ["Azure", "AWS", "Vercel", "Docker", "Kubernetes", "GitLab CI/CD", "Dynatrace", "Jest", "SonarQube"],
  },
  {
    id: "data",
    title: "Data & Security",
    description: "Relational data models behind the apps, and authentication and authorization that keep them safe.",
    items: ["PostgreSQL", "SQL Server", "MongoDB", "Supabase", "OAuth", "JWT", "Auth0", "RBAC"],
  },
];
