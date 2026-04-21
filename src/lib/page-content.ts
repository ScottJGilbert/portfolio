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

export interface ProjectListingEntry {
  title: string;
  summary: string;
  category: "Systems" | "Frontend" | "Infrastructure" | "Data";
  stack: readonly string[];
  status: "Shipped" | "In Progress" | "Concept";
  href: string;
}

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: readonly string[];
}

export const aboutPageContent = {
  title: "About",
  intro: [
    "I’m a systems-focused software engineer who enjoys building software that remains clear under pressure: products with resilient architecture, sharp interfaces, and practical developer ergonomics.",
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

export const projectsPageContent = {
  title: "Projects",
  intro:
    "A curated snapshot of projects I’ve worked on. Search and filtering controls are staged for expansion and currently serve as layout placeholders.",
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

export const contactPageContent = {
  title: "Contact",
  intro:
    "If you’d like to collaborate, ask a question, or discuss a project, send me a message here or reach out directly through email or social channels.",
  directChannels: [
    { label: "Email", href: "mailto:hello@scottgilbert.dev" },
    { label: "GitHub", href: "https://github.com/ScottJGilbert" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/scottjgilbert" },
  ] as const,
} as const;

export const legalPageContent = {
  title: "Legal",
  lastUpdated: "April 20, 2026",
  terms: [
    {
      id: "terms-use",
      title: "Use of This Site",
      paragraphs: [
        "This website is provided for informational and professional portfolio purposes. You may browse, reference, and share public pages as long as attribution and context are preserved.",
        "You agree not to misuse the site through automated abuse, security probing, or unlawful activity.",
      ],
    },
    {
      id: "terms-content",
      title: "Content and Intellectual Property",
      paragraphs: [
        "Unless stated otherwise, written content and project descriptions are original works owned by the site author.",
        "Third-party names, trademarks, and platforms remain the property of their respective owners.",
      ],
    },
  ] as const satisfies readonly LegalSection[],
  privacy: [
    {
      id: "privacy-collection",
      title: "Information Collection",
      paragraphs: [
        "This site does not intentionally collect sensitive personal data through public pages.",
        "If you contact me directly, any details you provide are used only to respond and continue that conversation.",
      ],
    },
    {
      id: "privacy-retention",
      title: "Data Use and Retention",
      paragraphs: [
        "Contact messages are retained only as needed for ongoing communication and project follow-up.",
        "I do not sell personal data and do not use contact submissions for unrelated marketing lists.",
      ],
    },
  ] as const satisfies readonly LegalSection[],
} as const;
