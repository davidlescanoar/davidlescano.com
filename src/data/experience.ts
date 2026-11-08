/**
 * Professional experience, newest first.
 *
 * Keep this in sync with the CV. Same rules: no metrics, no client names
 * except Rheinmetall, no gaps in the timeline.
 */

export interface ExperienceEntry {
  role: string;
  company: string;
  companyUrl?: string;
  location?: string;
  /** "MM/YYYY". */
  start: string;
  /** "MM/YYYY" or "Present". */
  end: string;
  summary: string;
  highlights: string[];
  tech: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "Full-Stack Developer",
    company: "Glofy LLC",
    companyUrl: "https://glofy.co/",
    location: "Remote",
    start: "07/2024",
    end: "Present",
    summary: "US software consultancy serving insurance, financial-services and defence clients.",
    highlights: [
      "Migrated an insurance web application from Blazor to React and built its new .NET REST API.",
      "Built a full-stack analytics dashboard for Rheinmetall, with charts and user-configurable theming.",
      "Built and deployed backend microservices and REST APIs with .NET Core, Python and Node.js.",
      "Improved backend performance and reliability through async processing, caching and database indexing.",
      "Deployed and supported production apps on Microsoft Azure via GitLab CI/CD pipelines.",
    ],
    tech: [".NET Core", "React", "TypeScript", "PostgreSQL", "Material UI", "Azure", "GitLab CI/CD"],
  },
  {
    role: "Full-Stack Developer",
    company: "Oversoft",
    companyUrl: "https://oversoft.net/",
    location: "Argentina",
    start: "12/2022",
    end: "06/2024",
    summary: "Dealer management software for car dealerships and importers across Latin America.",
    highlights: [
      "Built internal .NET and React multi-service apps on SQL Server, improving data visibility.",
      "Built a reusable React UI component library, reducing frontend development time.",
      "Optimised frontend performance across React and Next.js applications.",
      "Wrote Jest unit tests and introduced SonarQube to raise code quality.",
      "Managed AWS deployments and application versioning for stable production releases.",
    ],
    tech: [".NET", "React", "Next.js", "TypeScript", "SQL Server", "AWS", "Jest", "SonarQube"],
  },
  {
    role: "Software Engineer",
    company: "Grupo Sancor Seguros",
    companyUrl: "https://www.sancorseguros.com.ar/",
    location: "Argentina",
    start: "11/2019",
    end: "12/2022",
    summary: "One of Argentina's leading insurance groups.",
    highlights: [
      "Built an internal quoting web app for insurance agents (car, home and more) from scratch.",
      "Built a public customer portal for instant online insurance quotes.",
      "Developed the .NET backend and APIs, consuming Guidewire APIs for quote details.",
      "Led a team of 4 developers: code reviews, onboarding, training and task estimation.",
      "Implemented secure authentication and authorization with OAuth, JWT and RBAC.",
      "Automated deployments with GitLab CI/CD and supported the apps in production.",
    ],
    tech: [".NET", "React", "TypeScript", "SQL Server", "OAuth", "JWT", "GitLab CI/CD"],
  },
  {
    role: "Full-Stack Developer",
    company: "IBM",
    companyUrl: "https://www.ibm.com/",
    location: "Argentina",
    start: "04/2019",
    end: "11/2019",
    summary: "IBM consulting project for a major Argentine telecom provider.",
    highlights: [
      "Fixed bugs in Salesforce Apex code for a large telecom client.",
      "Tested and documented fixes within IBM's enterprise delivery processes.",
    ],
    tech: ["Salesforce", "Apex"],
  },
];
