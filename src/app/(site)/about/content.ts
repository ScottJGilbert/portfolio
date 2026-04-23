export interface AboutExperienceEntry {
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  highlights: readonly string[];
}

export interface EducationEntry {
  credential: string;
  institution: string;
  period: string;
  details: string;
}

export const aboutPageContent = {
  title: "About",
  intro: [
    "I'm a systems-focused software engineer who enjoys building software that remains clear under pressure: products with resilient architecture, sharp interfaces, and practical developer ergonomics.",
    "My work tends to sit at the intersection of backend reliability and user-facing experience. I care deeply about maintainability, observability, and thoughtful product details that make tools easier to trust and use.",
  ] as const,
  experience: [
    {
      role: "Senior Systems Engineer",
      company: "Independent / Contract",
      location: "Remote",
      period: "2022 - Present",
      summary:
        "Designing and delivering full-stack platforms with an emphasis on robust backend workflows and clean frontend systems.",
      highlights: [
        "Built fault-tolerant service layers with strong runtime diagnostics and health instrumentation.",
        "Partnered with product and design to align architecture decisions with user outcomes.",
        "Standardized delivery workflows to reduce regression risk and improve release confidence.",
      ],
    },
    {
      role: "Software Engineer",
      company: "Product Engineering Team",
      location: "United States",
      period: "2019 - 2022",
      summary:
        "Contributed to internal and customer-facing products across web interfaces, service integrations, and platform reliability.",
      highlights: [
        "Delivered iterative frontend improvements that increased clarity and reduced support load.",
        "Improved backend service observability and incident response readiness.",
        "Introduced reusable UI and API patterns that sped up cross-team delivery.",
      ],
    },
  ] as const satisfies readonly AboutExperienceEntry[],
  education: [
    {
      credential: "B.S. in Computer Science",
      institution: "State University",
      period: "2015 - 2019",
      details:
        "Focused on systems programming, distributed systems fundamentals, and human-computer interaction.",
    },
    {
      credential: "Professional Coursework: Cloud & DevOps",
      institution: "Continuing Education",
      period: "Ongoing",
      details:
        "Applied studies in cloud architecture, container orchestration, and production operations.",
    },
  ] as const satisfies readonly EducationEntry[],
} as const;
