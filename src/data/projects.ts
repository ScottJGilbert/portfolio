export type Project = {
  title: string;
  challenge: string;
  approach: string;
  outcome: string;
  year: string;
  category: string;
  tags: string[];
  metrics: {
    label: string;
    value: string;
  }[];
};

export const projects: Project[] = [
  {
    title: "Case Study: Portfolio System Redesign",
    challenge:
      "A growing set of routes drifted in structure and made editorial updates slower than product delivery.",
    approach:
      "Standardized pages around reusable primitives, tokenized surfaces, and route-level regression tests.",
    outcome:
      "Established a durable publishing system where layout, metadata, and style constraints ship as one contract.",
    year: "2026",
    category: "Case Study",
    tags: ["Next.js", "TypeScript", "Accessibility"],
    metrics: [
      { label: "Update Cycle", value: "80% faster" },
      { label: "Critical Escapes", value: "0" },
    ],
  },
  {
    title: "Case Study: Data Reliability Patterns",
    challenge:
      "Background workflows produced stale records during partial outages and made incident diagnosis noisy.",
    approach:
      "Introduced failure taxonomy, retry contracts, and observable checkpoints across ingestion paths.",
    outcome:
      "Reduced incident time-to-resolution while keeping freshness signals visible for product and ops.",
    year: "2025",
    category: "Case Study",
    tags: ["Observability", "Resilience", "Backend"],
    metrics: [
      { label: "Incident Duration", value: "-63%" },
      { label: "Freshness Breaches", value: "-47%" },
    ],
  },
  {
    title: "Case Study: Editorial Operations Console",
    challenge:
      "Publishing and experimentation workflows were fragmented across tools with mismatched metadata rules.",
    approach:
      "Created a shared command surface for release controls, attribution metadata, and experiment states.",
    outcome:
      "Unified editorial decision-making and doubled publishing throughput without adding headcount.",
    year: "2024",
    category: "Case Study",
    tags: ["Product Infrastructure", "Workflow Design", "React"],
    metrics: [
      { label: "Publishing Throughput", value: "2x" },
      { label: "Manual Hand-offs", value: "-54%" },
    ],
  },
];
