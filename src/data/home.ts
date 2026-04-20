export const homeContent = {
  title: "Systems Engineer. Digital Curator.",
  summary:
    "I design resilient software and editorial-grade interfaces that make technical work understandable at a glance.",
  cta: "View Selected Work",
  selectedWorkHeading: "Selected Work",
  selectedWorkSubtitle:
    "Representative delivery across architecture, product systems, and operational reliability.",
  selectedWork: [
    {
      title: "Portfolio System Redesign",
      summary:
        "Rebuilt a multi-route Next.js system with token-driven primitives and regression coverage for every core page.",
      year: "2026",
      category: "Case Study",
      impact: "80% faster content updates",
      platform: "Next.js 16",
    },
    {
      title: "Reliability Playbook for Data Workflows",
      summary:
        "Introduced retry contracts, failure taxonomy, and alert thresholds that reduced recovery time in background jobs.",
      year: "2025",
      category: "Systems Engineering",
      impact: "63% drop in incident duration",
      platform: "Node + Postgres",
    },
    {
      title: "Editorial Operations Console",
      summary:
        "Designed a content command center combining publishing controls, experiment tracking, and metadata governance.",
      year: "2024",
      category: "Product Infrastructure",
      impact: "2x publishing throughput",
      platform: "React + API Platform",
    },
  ],
  impactHeading: "Impact Metrics",
  impactSubtitle:
    "Signals that matter in production: recovery speed, delivery cadence, and editorial quality consistency.",
  metrics: [
    {
      label: "Availability",
      value: "99.95%",
      detail: "Sustained across customer-facing releases.",
    },
    {
      label: "Lead Time",
      value: "2.1 days",
      detail: "From scoped change to production deployment.",
    },
    {
      label: "Regression Escape",
      value: "0 critical",
      detail: "After introducing page-level contract tests.",
    },
  ],
  highlightsHeading: "Operational Focus",
  highlights: [
    {
      title: "Backend Resilience",
      body: "Design APIs and background workers around graceful degradation, rollback paths, and fast diagnosis.",
    },
    {
      title: "Interface Systems",
      body: "Model UI as composable primitives so editorial intent remains consistent across routes and release cycles.",
    },
    {
      title: "Execution Discipline",
      body: "Use targeted tests, dependency boundaries, and design tokens to keep implementation quality predictable.",
    },
  ],
} as const;
