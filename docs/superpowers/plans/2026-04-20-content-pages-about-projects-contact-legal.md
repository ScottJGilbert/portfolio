# Content Pages (About, Projects, Contact, Legal) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add production-ready content pages for About, Projects, Contact, and Legal, while replacing the `/work` route and all user-facing "Work" references with "Projects."

**Architecture:** Use a content-model-first approach: centralize page copy and structured lists in a shared typed module (`src/lib/page-content.ts`), then keep each route file focused on rendering. Reuse existing design-system primitives (`Card`, `Chip`, `Button`, `SectionHeading`) to preserve the current visual language and avoid layout churn. Keep this work on `main`, preserving any existing in-progress file-structure edits rather than resetting or reshaping unrelated files.

**Tech Stack:** Next.js App Router (v16), React 19, TypeScript, Tailwind CSS v4 utility classes, existing UI primitives in `src/components/ui`, lucide-react.

---

## Scope and Constraints

- In scope:
  - Add full content for:
    - `/about` (biography, work experience, education)
    - `/projects` (placeholder project listing + non-functional search/filter UI)
    - `/contact` (static form UI + recommendation to contact by socials/email)
    - `/legal` (Terms of Service + Privacy Policy on one page)
  - Replace `/work` with `/projects` in route-level behavior and user-facing content.
  - Keep first-person voice.
- Out of scope:
  - Backend form submission.
  - Real project filtering logic.
  - Homepage layout restructuring.
  - Journal page content expansion.

## File Structure and Responsibilities

### Create
- `src/lib/page-content.ts`
  - Single source of truth for typed content objects used by About/Projects/Contact/Legal routes.
- `src/app/(site)/projects/page.tsx`
  - Projects page view with placeholder controls and project card grid.
- `src/app/(site)/legal/page.tsx`
  - Legal page with Terms and Privacy sections.

### Rename
- `src/app/(site)/(home)/components/work-grid.tsx` → `src/app/(site)/(home)/components/projects-grid.tsx`
  - Keep existing homepage section structure, but rename component/type/ARIA IDs from Work to Projects.

### Modify
- `src/app/(site)/(home)/page.tsx`
  - Update imports and content keys (`work` → `projects`) and user-facing section labels.
- `src/app/(site)/about/page.tsx`
  - Replace placeholder sections with real biography, experience, and education content.
- `src/app/(site)/contact/page.tsx`
  - Replace placeholder with static form and alternate contact methods.
- `src/components/site/site-footer.tsx`
  - Replace legacy About anchors with Legal links (`/legal#terms`, `/legal#privacy`) and contact shortcut.

### Delete
- `src/app/(site)/work/page.tsx`
  - Remove deprecated route after `/projects` is in place.

---

### Task 1: Build shared content model and rename homepage Work section to Projects

**Files:**
- Create: `src/lib/page-content.ts`
- Rename: `src/app/(site)/(home)/components/work-grid.tsx` → `src/app/(site)/(home)/components/projects-grid.tsx`
- Modify: `src/app/(site)/(home)/page.tsx`

- [ ] **Step 1: Capture baseline and current Work references**

Run: `git --no-pager status --short --branch && rg -n "\bWork\b|/work|work-grid|HomeWork|work-heading" src`  
Expected: `main` branch visible with current in-progress edits preserved; current Work references listed for replacement.

- [ ] **Step 2: Create centralized typed content module**

```ts
// src/lib/page-content.ts
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
```

- [ ] **Step 3: Rename homepage Work grid component to Projects grid and update symbols**

Run: `git mv "src/app/(site)/(home)/components/work-grid.tsx" "src/app/(site)/(home)/components/projects-grid.tsx"`  
Expected: file rename staged by git.

```tsx
// src/app/(site)/(home)/components/projects-grid.tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { SectionHeading } from "@/components/ui/section-heading";

interface HomeProject {
  title: string;
  description: string;
  tags: readonly string[];
  href: string;
  image: {
    src: string;
    alt: string;
  };
}

export interface HomeProjectsContent {
  eyebrow: string;
  title: string;
  archiveLabel: string;
  archiveHref: string;
  projects: readonly HomeProject[];
}

interface ProjectsGridProps {
  content: HomeProjectsContent;
}

export function ProjectsGrid({ content }: ProjectsGridProps) {
  return (
    <section
      className="px-6 py-20 md:px-12 md:py-24"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          level="h2"
          className="[&>div>h2]:text-2xl [&>div>h2]:font-bold"
          action={
            <Link
              href={content.archiveHref}
              className="text-sm font-bold uppercase tracking-[0.16em] text-primary transition-colors hover:underline hover:underline-offset-8"
            >
              {content.archiveLabel}
            </Link>
          }
          id="projects-heading"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {content.projects.map((project) => (
            <Link key={project.title} href={project.href} className="group block">
              <Card
                variant="surface"
                padding="none"
                className="overflow-hidden border-outline-ghost/80 bg-surface/85 transition-colors hover:bg-surface-alt/80"
              >
                <div className="aspect-video overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element -- intentional plain image to avoid unoptimized next/image usage */}
                  <img
                    src={project.image.src}
                    alt={project.image.alt}
                    width={1280}
                    height={720}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-6 p-8">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-bold leading-tight">{project.title}</h3>
                    <ArrowUpRight
                      className="mt-1 size-5 shrink-0 text-muted/85 transition-colors group-hover:text-primary"
                      aria-hidden
                    />
                  </div>
                  <p className="leading-relaxed text-muted">{project.description}</p>
                  <ul className="flex flex-wrap gap-3">
                    {project.tags.map((tag) => (
                      <li key={tag}>
                        <Chip
                          variant="outline"
                          className="text-[0.7rem] font-bold uppercase tracking-[0.14em]"
                        >
                          {tag}
                        </Chip>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Update homepage import/types/content key from Work to Projects**

```tsx
// src/app/(site)/(home)/page.tsx (replace imports)
import { HomeProjectsContent, ProjectsGrid } from "./components/projects-grid";

// src/app/(site)/(home)/page.tsx (replace interface block)
interface HomeContent {
  hero: HomeHeroContent;
  assortment: HomeAssortmentContent;
  projects: HomeProjectsContent;
  journal: HomeJournalContent;
}

// src/app/(site)/(home)/page.tsx (replace `work:` object with this `projects:` object)
projects: {
  eyebrow: "Projects",
  title: "Selected Projects",
  archiveLabel: "View Archive",
  archiveHref: "/projects",
  projects: [
    {
      title: "Vector Engine v2.0",
      description:
        "A custom-built physics engine for 2D spatial simulations, written entirely in Rust for maximum throughput.",
      tags: ["Rust", "WASM"],
      href: "/projects",
      image: {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVirNabt4MGo8NdfcP7iE-zUWP6LXFij6g7M-gWG0YYq2Q5TkRFqwrEa1HiY96vFctwk-VQy9YHDStBgu0DJjG54XduSmpOtp9-1G-jkVvY64SLL7bzkKgKmQRJVcVlXmH4jHoJxUhGB9OIPlhs63iyPE7zL9f2m7F0foKmgbw0iAjfDHeq2aWWc-8iqbGyqXRNpRPmjbpFg3tFcR3PxSMWSzwVpPkbs9FhQ7QsQNawWAiV7kqB0srviN5WZ1ULIF2EWgOwSuuC39o",
        alt: "Abstract visualization of complex data structures and nodes glowing with emerald green light against a dark background",
      },
    },
    {
      title: "Chlorophyll.ui",
      description:
        "An organic-inspired design system focusing on sustainability and high-performance frontend rendering.",
      tags: ["React", "Tailwind"],
      href: "/projects",
      image: {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkkPrTjWS_EESzZGm-VgnoTdgY7S4ynmtOpACPZfPJr8w07_sP_UNxbjxJIoX3vHAzywZpVuU7kd8lTZR-ve3KvTDsDrarbAlj-T9Rjrfs-GcS52HBOzYyejhBdEUeA0JxyV26x_xjYgDcjM4LqzMMRgP-fCz3YuhRWmV_iZinjDEAnPK4gcfZua52eXehZYIhg6wZkC-LDSXpB94G4LcLpsyC499GiBwpLuF-MESxlLqQWxFqKNylwUS6IeYGF0UNIyLtMnzUTVAr",
        alt: "Sleek user interface wireframe on a high-resolution display with soft green accents and minimalist design elements",
      },
    },
  ],
},

export default function SiteHomePage() {
  return (
    <>
      <HeroSection content={homeContent.hero} />
      <AssortmentGrid content={homeContent.assortment} />
      <ProjectsGrid content={homeContent.projects} />
      <JournalList content={homeContent.journal} />
    </>
  );
}
```

- [ ] **Step 5: Validate and commit**

Run: `pnpm lint && pnpm build`  
Expected: PASS.

```bash
git add src/lib/page-content.ts "src/app/(site)/(home)/page.tsx" "src/app/(site)/(home)/components/projects-grid.tsx"
git commit -m "refactor: rename homepage work section to projects and centralize content model"
```

---

### Task 2: Implement About page content (biography, experience, education)

**Files:**
- Modify: `src/app/(site)/about/page.tsx`
- Read: `src/lib/page-content.ts`

- [ ] **Step 1: Confirm current About page is placeholder-only**

Run: `rg -n "Placeholder|Privacy|Accessibility|Colophon" "src/app/(site)/about/page.tsx"`  
Expected: existing placeholder sections found.

- [ ] **Step 2: Replace About page with structured first-person content rendering**

```tsx
// src/app/(site)/about/page.tsx
import { Card } from "@/components/ui/card";
import { aboutPageContent } from "@/lib/page-content";

export default function AboutPage() {
  return (
    <section className="px-6 py-10 md:px-10 lg:px-12">
      <div className="mx-auto max-w-5xl space-y-10">
        <header className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight">{aboutPageContent.title}</h1>
          <div className="space-y-3 text-sm leading-7 text-muted">
            {aboutPageContent.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </header>

        <section className="space-y-4" aria-labelledby="about-experience-heading">
          <h2 id="about-experience-heading" className="text-xl font-semibold tracking-tight">
            Work Experience
          </h2>
          <div className="space-y-4">
            {aboutPageContent.experience.map((entry) => (
              <Card key={`${entry.company}-${entry.role}`} variant="surface" padding="lg" className="space-y-4">
                <div className="space-y-1">
                  <p className="text-base font-semibold text-foreground">{entry.role}</p>
                  <p className="text-xs uppercase tracking-[0.14em] text-muted">
                    {entry.company} · {entry.location} · {entry.period}
                  </p>
                </div>
                <p className="text-sm leading-7 text-muted">{entry.summary}</p>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-muted">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4" aria-labelledby="about-education-heading">
          <h2 id="about-education-heading" className="text-xl font-semibold tracking-tight">
            Education
          </h2>
          <div className="space-y-4">
            {aboutPageContent.education.map((entry) => (
              <Card key={`${entry.institution}-${entry.credential}`} variant="surface" padding="lg" className="space-y-2">
                <p className="text-base font-semibold text-foreground">{entry.credential}</p>
                <p className="text-xs uppercase tracking-[0.14em] text-muted">
                  {entry.institution} · {entry.period}
                </p>
                <p className="text-sm leading-7 text-muted">{entry.details}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Validate route build and lint**

Run: `pnpm lint && pnpm build`  
Expected: PASS.

- [ ] **Step 4: Manual route sanity**

Run: `pnpm dev`  
Expected: `/about` renders three distinct sections (intro, experience, education) with no console/runtime errors.

- [ ] **Step 5: Commit About page**

```bash
git add "src/app/(site)/about/page.tsx"
git commit -m "feat: add full about page biography experience and education"
```

---

### Task 3: Implement Projects page and remove deprecated /work route

**Files:**
- Create: `src/app/(site)/projects/page.tsx`
- Delete: `src/app/(site)/work/page.tsx`
- Read: `src/lib/page-content.ts`

- [ ] **Step 1: Confirm `/projects` route does not exist and `/work` route exists**

Run: `git ls-files "src/app/(site)/projects/page.tsx" "src/app/(site)/work/page.tsx"`  
Expected: `/work` file listed, `/projects` not yet listed.

- [ ] **Step 2: Create Projects page with placeholder controls (non-functional) and sample project cards**

```tsx
// src/app/(site)/projects/page.tsx
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { projectsPageContent } from "@/lib/page-content";

export default function ProjectsPage() {
  return (
    <section className="px-6 py-10 md:px-10 lg:px-12">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">{projectsPageContent.title}</h1>
          <p className="max-w-3xl text-sm leading-7 text-muted">{projectsPageContent.intro}</p>
        </header>

        <Card variant="surface" padding="lg" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-muted">
              Search
              <input
                type="text"
                placeholder="Search projects (coming soon)"
                disabled
                className="w-full rounded-md border border-outline-ghost bg-surface-alt px-3 py-2 text-sm text-muted"
              />
            </label>
            <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-muted">
              Category
              <select
                disabled
                defaultValue="All"
                className="w-full rounded-md border border-outline-ghost bg-surface-alt px-3 py-2 text-sm text-muted"
              >
                {projectsPageContent.filterOptions.categories.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-muted">
              Sort
              <select
                disabled
                defaultValue="Most Recent"
                className="w-full rounded-md border border-outline-ghost bg-surface-alt px-3 py-2 text-sm text-muted"
              >
                {projectsPageContent.filterOptions.sort.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <p className="text-xs uppercase tracking-[0.14em] text-muted">
            Filtering controls are staged for a future interactive release.
          </p>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {projectsPageContent.projects.map((project) => (
            <Card key={project.title} variant="surface" padding="lg" className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold tracking-tight">{project.title}</h2>
                <p className="text-sm leading-7 text-muted">{project.summary}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Chip variant="solid">{project.category}</Chip>
                <Chip variant="outline">{project.status}</Chip>
                {project.stack.map((item) => (
                  <Chip key={`${project.title}-${item}`} variant="outline">
                    {item}
                  </Chip>
                ))}
              </div>
              <Link
                href={project.href}
                className="inline-flex text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                View Project
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Delete deprecated Work route**

Run: `git rm "src/app/(site)/work/page.tsx"`  
Expected: Work page removed and tracked as deleted.

- [ ] **Step 4: Validate route replacement and references**

Run: `rg -n "/work|work-grid|HomeWork|WorkGrid|work-heading" src/app src/lib src/components && pnpm lint && pnpm build`  
Expected: no route/component naming references remain for legacy Work identifiers; lint/build PASS.

- [ ] **Step 5: Commit Projects route migration**

```bash
git add "src/app/(site)/projects/page.tsx"
git commit -m "feat: replace work route with projects page and placeholder project index"
```

---

### Task 4: Implement Contact page with static form and direct channel recommendations

**Files:**
- Modify: `src/app/(site)/contact/page.tsx`
- Read: `src/lib/page-content.ts`

- [ ] **Step 1: Confirm Contact page is currently placeholder**

Run: `rg -n "Coming soon|Contact" "src/app/(site)/contact/page.tsx"`  
Expected: placeholder content found.

- [ ] **Step 2: Replace with static contact form UI and direct channel links**

```tsx
// src/app/(site)/contact/page.tsx
import { Card } from "@/components/ui/card";
import { contactPageContent } from "@/lib/page-content";

export default function ContactPage() {
  return (
    <section className="px-6 py-10 md:px-10 lg:px-12">
      <div className="mx-auto max-w-4xl space-y-10">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">{contactPageContent.title}</h1>
          <p className="text-sm leading-7 text-muted">{contactPageContent.intro}</p>
        </header>

        <Card variant="surface" padding="lg" className="space-y-6">
          <form className="space-y-5" aria-describedby="contact-form-note">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm text-foreground">
                <span className="text-xs uppercase tracking-[0.14em] text-muted">Name</span>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full rounded-md border border-outline-ghost bg-surface-alt px-3 py-2 text-sm text-foreground"
                  placeholder="Your name"
                />
              </label>
              <label className="space-y-2 text-sm text-foreground">
                <span className="text-xs uppercase tracking-[0.14em] text-muted">Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-md border border-outline-ghost bg-surface-alt px-3 py-2 text-sm text-foreground"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label className="space-y-2 text-sm text-foreground">
              <span className="text-xs uppercase tracking-[0.14em] text-muted">Message</span>
              <textarea
                name="message"
                required
                rows={6}
                className="w-full rounded-md border border-outline-ghost bg-surface-alt px-3 py-2 text-sm text-foreground"
                placeholder="Tell me a bit about what you’d like to discuss."
              />
            </label>

            <button
              type="button"
              className="inline-flex items-center rounded-md border border-outline-ghost bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Send Message (submission coming soon)
            </button>

            <p id="contact-form-note" className="text-xs uppercase tracking-[0.14em] text-muted">
              This form is currently static. For fastest response, use one of the direct channels below.
            </p>
          </form>
        </Card>

        <Card variant="surface" padding="lg" className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">Direct Channels</h2>
          <ul className="space-y-2">
            {contactPageContent.directChannels.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={channel.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  {channel.label}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Validate Contact route**

Run: `pnpm lint && pnpm build`  
Expected: PASS.

- [ ] **Step 4: Manual route sanity**

Run: `pnpm dev`  
Expected: `/contact` renders form fields and direct channel links without requiring backend code.

- [ ] **Step 5: Commit Contact page**

```bash
git add "src/app/(site)/contact/page.tsx"
git commit -m "feat: add static contact form and direct social email guidance"
```

---

### Task 5: Implement Legal page and align footer links

**Files:**
- Create: `src/app/(site)/legal/page.tsx`
- Modify: `src/components/site/site-footer.tsx`
- Read: `src/lib/page-content.ts`

- [ ] **Step 1: Create Legal page with Terms and Privacy sections**

```tsx
// src/app/(site)/legal/page.tsx
import { Card } from "@/components/ui/card";
import { legalPageContent } from "@/lib/page-content";

export default function LegalPage() {
  return (
    <section className="px-6 py-10 md:px-10 lg:px-12">
      <div className="mx-auto max-w-5xl space-y-10">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">{legalPageContent.title}</h1>
          <p className="text-xs uppercase tracking-[0.14em] text-muted">
            Last updated {legalPageContent.lastUpdated}
          </p>
        </header>

        <section id="terms" aria-labelledby="terms-heading" className="space-y-4">
          <h2 id="terms-heading" className="text-xl font-semibold tracking-tight">
            Terms of Service
          </h2>
          <div className="space-y-4">
            {legalPageContent.terms.map((section) => (
              <Card key={section.id} variant="surface" padding="lg" className="space-y-3">
                <h3 className="text-base font-semibold tracking-tight">{section.title}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-7 text-muted">
                    {paragraph}
                  </p>
                ))}
              </Card>
            ))}
          </div>
        </section>

        <section id="privacy" aria-labelledby="privacy-heading" className="space-y-4">
          <h2 id="privacy-heading" className="text-xl font-semibold tracking-tight">
            Privacy Policy
          </h2>
          <div className="space-y-4">
            {legalPageContent.privacy.map((section) => (
              <Card key={section.id} variant="surface" padding="lg" className="space-y-3">
                <h3 className="text-base font-semibold tracking-tight">{section.title}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-7 text-muted">
                    {paragraph}
                  </p>
                ))}
              </Card>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update footer links to point to Legal and Contact**

```tsx
// src/components/site/site-footer.tsx (content object)
const content = {
  name: "Scott Gilbert",
  statement: "© 2026 Scott Gilbert. Built for Systems.",
  links: [
    { label: "Terms", href: "/legal#terms" },
    { label: "Privacy", href: "/legal#privacy" },
    { label: "Contact", href: "/contact" },
  ],
};
```

- [ ] **Step 3: Validate legal route + footer navigation**

Run: `pnpm lint && pnpm build`  
Expected: PASS.

- [ ] **Step 4: Manual route sanity**

Run: `pnpm dev`  
Expected: `/legal` renders both Terms and Privacy sections; footer links navigate correctly.

- [ ] **Step 5: Commit Legal and footer updates**

```bash
git add "src/app/(site)/legal/page.tsx" "src/components/site/site-footer.tsx"
git commit -m "feat: add legal page with terms privacy and wire footer links"
```

---

### Task 6: Final route hygiene, stitch-reference refresh, and release checks

**Files:**
- Verify: `src/app/(site)/**`, `src/lib/**`, `src/components/site/**`
- Optional local artifacts: `.superpowers/stitch/*` (reference-only)

- [ ] **Step 1: Refresh Stitch reference exports for style parity checks**

Run:

```bash
curl -L "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2U3OWFkNTFhNDlkMTRjOTI4N2FlZDgxOTNmMWUxYTFlEgsSBxDK18-AnQwYAZIBJAoKcHJvamVjdF9pZBIWQhQxMDY1NDI0ODMwNzQ5ODM1NzMzMg&filename=&opi=89354086" -o ".superpowers/stitch/portfolio-mobile-refined-nav.html"
curl -L "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzMwZjZhMDY2OGNkOTQ2ZGI5NjQwYTJkNTdiMTU4MzIxEgsSBxDK18-AnQwYAZIBJAoKcHJvamVjdF9pZBIWQhQxMDY1NDI0ODMwNzQ5ODM1NzMzMg&filename=&opi=89354086" -o ".superpowers/stitch/portfolio-unified-light-v3.html"
curl -L "https://lh3.googleusercontent.com/aida/ADBb0ughLsske4y4dd3jMEjvR5khfNv-CGDicSBRyWpgF1H1bcwJLnWi8zbL1sLJKEcpsEE9WAql5rh8HAcKV5tE2C74ZnSNzWYo7UeSav3YjQ-UZ7KjYIr5Ub41dr7CV3x5oME0h6dXCZXdzce6sK166ALVM852NBEbZBlo-oAfVqh2S8dcljM9ii7fJRlvMKg4sP9EjJfVudTFwBL2WVa4DQAm8un4rJ3yPBi7bn6XIDJaV7uD56sfwKWxtZH5" -o ".superpowers/stitch/portfolio-unified-light-v3.png"
```

Expected: two Stitch HTML exports and one desktop screenshot downloaded successfully.

Note: the Design System entry (`assets-2daf181d6c3a41c8b61e979628c216f5-1775966299243`) is a Stitch asset instance, not a downloadable screen HTML export, so it is consumed via Stitch project/design-system metadata instead of `curl`.

- [ ] **Step 2: Confirm no `/work` route references remain in site pages/navigation**

Run: `rg -n "/work|work page|Work\b" src/app src/components src/lib`  
Expected: no remaining route-level references that should now read as Projects.

- [ ] **Step 3: Run full repository quality gate**

Run: `pnpm lint && pnpm build`  
Expected: PASS.

- [ ] **Step 4: Review staged diff and keep unrelated user edits untouched**

Run: `git --no-pager status --short && git --no-pager diff -- src/app src/components src/lib`  
Expected: only intended files changed; no reversions of unrelated in-progress edits.

- [ ] **Step 5: Final commit for hygiene-only adjustments**

```bash
git add src/app src/components src/lib
git commit -m "chore: finalize projects routing and content-page integration checks"
```

---

## Spec Coverage Self-Review

1. **About page with biography, work experience, education:** Covered by Task 2 with structured rendered sections from `aboutPageContent`.
2. **Projects page replacing Work + placeholder listing and future filter space:** Covered by Task 1 (Work→Projects naming) and Task 3 (full `/projects` page with disabled controls + listing cards and placeholder links).
3. **Contact page with simple form and social/email recommendation:** Covered by Task 4.
4. **Legal page containing Terms and Privacy:** Covered by Task 5.
5. **Replace everything `/work` with `/projects`:** Covered by Task 1 + Task 3 + Task 6 route hygiene scan.
6. **Preserve in-progress edits on `main`:** Enforced in Architecture statement and Task 6 Step 4.
7. **Stitch refresh instruction using `curl -L`:** Covered by Task 6 Step 1.

## Placeholder / Ambiguity Scan

- No `TBD`/`TODO` placeholders in implementation tasks.
- All target files are explicit and repository-local.
- Route-level decision is explicit: `/projects` replaces `/work`.
- Contact submission behavior is explicit: static form UI only.
- Projects filtering behavior is explicit: controls are present but intentionally non-functional.

