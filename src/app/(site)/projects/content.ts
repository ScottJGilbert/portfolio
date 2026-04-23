export interface ProjectListingEntry {
  title: string;
  summary: string;
  category: "Systems" | "Frontend" | "Infrastructure" | "Data";
  stack: readonly string[];
  status: "Shipped" | "In Progress" | "Concept";
  href: string;
}

export const projectsPageContent = {
  title: "Projects",
  intro:
    "A curated snapshot of projects I've worked on. Search and filtering controls are staged for expansion and currently serve as layout placeholders.",
  filterOptions: {
    categories: ["All", "Systems", "Frontend", "Infrastructure", "Data"] as const,
    status: ["All", "Shipped", "In Progress", "Concept"] as const,
    sort: ["Most Recent", "Alphabetical", "Category"] as const,
  },
  projects: [
    {
      title: "Vector Runtime Toolkit",
      summary:
        "A high-throughput simulation runtime focused on deterministic updates and predictable memory behavior.",
      category: "Systems",
      stack: ["Rust", "WASM", "Profiling"],
      status: "Shipped",
      href: "#",
    },
    {
      title: "Verdant UI System",
      summary:
        "A token-driven interface system for building cohesive, responsive product surfaces with minimal style drift.",
      category: "Frontend",
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      status: "In Progress",
      href: "#",
    },
    {
      title: "Signal Relay Control Plane",
      summary:
        "A service orchestration layer for distributed workloads with health-aware routing strategies.",
      category: "Infrastructure",
      stack: ["Go", "PostgreSQL", "Observability"],
      status: "Concept",
      href: "#",
    },
    {
      title: "Journal Insight Pipeline",
      summary:
        "An ingestion and categorization pipeline for structured content retrieval and lightweight analytics.",
      category: "Data",
      stack: ["Python", "SQLite", "ETL"],
      status: "Shipped",
      href: "#",
    },
  ] as const satisfies readonly ProjectListingEntry[],
} as const;
