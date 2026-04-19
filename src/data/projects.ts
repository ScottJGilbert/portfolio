export type Project = {
  title: string;
  summary: string;
  year: string;
  category: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    title: "Case Study: Portfolio System Redesign",
    summary: "Token-first UI architecture for consistent multi-page delivery.",
    year: "2026",
    category: "Case Study",
    tags: ["Next.js", "TypeScript", "Accessibility"],
  },
  {
    title: "Case Study: Data Reliability Patterns",
    summary: "Operational safeguards for data freshness and fault isolation.",
    year: "2025",
    category: "Case Study",
    tags: ["Observability", "Resilience", "Backend"],
  },
];
