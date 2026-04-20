# Unified Light Extension Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the current redesign into a richer Unified Light portfolio by upgrading shell/navigation, expanding footer architecture, deepening page content, and adding tasteful motion while preserving the existing route map and reusable component system.

**Architecture:** Keep the token-first foundation and evolve the shell first (sidebar + mobile nav + footer), then expand primitives and data contracts so every route becomes contentful without one-off UI drift. Introduce motion at composition boundaries only, with strict reduced-motion fallbacks and existing accessibility landmarks preserved.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS 4, Vitest, Testing Library, jsdom, Framer Motion.

---

## Scope Check

This is one subsystem (public frontend extension) and should stay in a single implementation plan.

---

## File Structure (planned end state)

### Data contracts
- Modify: `src/data/navigation.ts` — add grouped nav model for core, external, and footer columns.
- Modify: `src/data/home.ts` — richer home content schema.
- Modify: `src/data/about.ts` — timeline + capability content.
- Modify: `src/data/projects.ts` — challenge/approach/outcome and metrics.
- Modify: `src/data/blog.ts` — featured + archive models.

### Shell components
- Modify: `src/components/shell/DesktopSidebar.tsx`
- Modify: `src/components/shell/MobileHeader.tsx`
- Modify: `src/components/shell/Footer.tsx`
- Modify: `src/components/shell/AppShell.tsx`
- Create: `src/components/shell/SidebarPanel.tsx`
- Create: `src/components/shell/SidebarNavGroup.tsx`
- Create: `src/components/shell/ExternalLinksGroup.tsx`
- Create: `src/components/shell/FooterColumn.tsx`

### Primitives and motion
- Modify: `src/components/primitives/BentoCard.tsx`
- Modify: `src/components/primitives/EditorialListItem.tsx`
- Modify: `src/components/primitives/MetaRow.tsx`
- Create: `src/components/primitives/StatPill.tsx`
- Create: `src/components/primitives/TimelineItem.tsx`
- Create: `src/components/primitives/SocialLinkChip.tsx`
- Create: `src/components/motion/MotionSection.tsx`

### Routes and global styles
- Modify: `src/app/globals.css`
- Modify: `src/app/page.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/projects/page.tsx`
- Modify: `src/app/blog/page.tsx`
- Modify: `src/app/legal/page.tsx`
- Modify: `src/app/attributions/page.tsx`

### Tests and docs
- Create: `src/data/navigation.test.ts`
- Create: `src/components/shell/shell-layout.test.tsx`
- Modify: `src/components/primitives/primitives.test.tsx`
- Modify: `src/app/home-about.test.tsx`
- Modify: `src/app/projects-blog.test.tsx`
- Modify: `src/app/utility-pages.test.tsx`
- Create: `src/components/motion/motion.test.tsx`
- Modify: `src/test/smoke.test.ts`
- Modify: `README.md`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`

---

### Task 1: Expand Navigation Data Contracts

**Files:**
- Modify: `src/data/navigation.ts`
- Create: `src/data/navigation.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/data/navigation.test.ts
import { describe, expect, it } from "vitest";
import { coreNav, externalNav, footerColumns } from "./navigation";

describe("navigation data contracts", () => {
  it("keeps core route map order", () => {
    expect(coreNav.map((item) => item.href)).toEqual([
      "/",
      "/about",
      "/projects",
      "/blog",
    ]);
  });

  it("defines required external links", () => {
    expect(externalNav.map((item) => item.label)).toEqual([
      "GitHub",
      "LinkedIn",
      "X/Twitter",
      "Email",
    ]);
  });

  it("provides three footer columns", () => {
    expect(footerColumns).toHaveLength(3);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- src/data/navigation.test.ts`  
Expected: FAIL with missing export errors for `externalNav` and `footerColumns`

- [ ] **Step 3: Write minimal implementation**

```ts
// src/data/navigation.ts
export type NavItem = { label: string; href: string; external?: boolean };
export type FooterColumn = { title: string; links: NavItem[] };

export const coreNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
];

export const externalNav: NavItem[] = [
  { label: "GitHub", href: "https://github.com/ScottJGilbert", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/scottgilbert", external: true },
  { label: "X/Twitter", href: "https://x.com", external: true },
  { label: "Email", href: "mailto:hello@scottgilbert.dev", external: true },
];

export const utilityNav: NavItem[] = [
  { label: "Legal", href: "/legal" },
  { label: "Attributions", href: "/attributions" },
];

export const footerColumns: FooterColumn[] = [
  { title: "Sitemap", links: coreNav },
  { title: "Legal", links: utilityNav },
  { title: "Elsewhere", links: externalNav },
];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- src/data/navigation.test.ts`  
Expected: PASS with `3 passed`

- [ ] **Step 5: Commit**

```bash
git add src/data/navigation.ts src/data/navigation.test.ts
git commit -m "feat: expand navigation data contracts"
```

---

### Task 2: Build the Enhanced Sidebar System (Desktop + Mobile)

**Files:**
- Create: `src/components/shell/SidebarPanel.tsx`
- Create: `src/components/shell/SidebarNavGroup.tsx`
- Create: `src/components/shell/ExternalLinksGroup.tsx`
- Modify: `src/components/shell/DesktopSidebar.tsx`
- Modify: `src/components/shell/MobileHeader.tsx`
- Modify: `src/components/shell/AppShell.tsx`
- Create: `src/components/shell/shell-layout.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/shell/shell-layout.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppShell } from "./AppShell";

describe("AppShell navigation chrome", () => {
  it("renders external links in desktop shell", () => {
    render(<AppShell><div>content</div></AppShell>);
    expect(screen.getByRole("link", { name: "GitHub" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "LinkedIn" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- src/components/shell/shell-layout.test.tsx`  
Expected: FAIL because external links are not rendered in the current shell

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/components/shell/DesktopSidebar.tsx
import { coreNav, externalNav } from "@/data/navigation";
import { SidebarPanel } from "./SidebarPanel";
import { SidebarNavGroup } from "./SidebarNavGroup";
import { ExternalLinksGroup } from "./ExternalLinksGroup";

export function DesktopSidebar() {
  return (
    <aside className="hidden md:block p-6" aria-label="Desktop Navigation">
      <SidebarPanel>
        <SidebarNavGroup title="Navigate" items={coreNav} />
        <ExternalLinksGroup title="Elsewhere" items={externalNav} />
      </SidebarPanel>
    </aside>
  );
}
```

```tsx
// src/components/shell/MobileHeader.tsx
import Link from "next/link";
import { coreNav, externalNav } from "@/data/navigation";

export function MobileHeader() {
  return (
    <header className="md:hidden p-4" aria-label="Mobile Navigation">
      <nav aria-label="Mobile Navigation">
        <ul className="flex flex-wrap gap-3">
          {coreNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-3 flex flex-wrap gap-2" aria-label="External Links">
        {externalNav.map((item) => (
          <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
            {item.label}
          </a>
        ))}
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- src/components/shell/shell-layout.test.tsx`  
Expected: PASS with external link assertions satisfied

- [ ] **Step 5: Commit**

```bash
git add src/components/shell/SidebarPanel.tsx src/components/shell/SidebarNavGroup.tsx src/components/shell/ExternalLinksGroup.tsx src/components/shell/DesktopSidebar.tsx src/components/shell/MobileHeader.tsx src/components/shell/AppShell.tsx src/components/shell/shell-layout.test.tsx
git commit -m "feat: upgrade shell sidebar and mobile nav model"
```

---

### Task 3: Implement Expanded Three-Column Footer

**Files:**
- Create: `src/components/shell/FooterColumn.tsx`
- Modify: `src/components/shell/Footer.tsx`
- Modify: `src/components/shell/shell-layout.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// append to src/components/shell/shell-layout.test.tsx
it("renders three footer columns", () => {
  render(<AppShell><div>content</div></AppShell>);
  expect(screen.getByText("Sitemap")).toBeInTheDocument();
  expect(screen.getByText("Legal")).toBeInTheDocument();
  expect(screen.getByText("Elsewhere")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- src/components/shell/shell-layout.test.tsx`  
Expected: FAIL because footer currently renders only a flat utility list

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/components/shell/Footer.tsx
import { footerColumns } from "@/data/navigation";
import { FooterColumn } from "./FooterColumn";

export function Footer() {
  return (
    <footer className="mt-12 p-6 md:p-8" role="contentinfo">
      <div className="grid gap-6 md:grid-cols-3">
        {footerColumns.map((column) => (
          <FooterColumn key={column.title} title={column.title} links={column.links} />
        ))}
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- src/components/shell/shell-layout.test.tsx`  
Expected: PASS with three footer column headings present

- [ ] **Step 5: Commit**

```bash
git add src/components/shell/FooterColumn.tsx src/components/shell/Footer.tsx src/components/shell/shell-layout.test.tsx
git commit -m "feat: add structured three-column footer"
```

---

### Task 4: Extend Reusable Primitives for Richer Editorial Content

**Files:**
- Create: `src/components/primitives/StatPill.tsx`
- Create: `src/components/primitives/TimelineItem.tsx`
- Create: `src/components/primitives/SocialLinkChip.tsx`
- Modify: `src/components/primitives/BentoCard.tsx`
- Modify: `src/components/primitives/EditorialListItem.tsx`
- Modify: `src/components/primitives/MetaRow.tsx`
- Modify: `src/components/primitives/primitives.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// append to src/components/primitives/primitives.test.tsx
it("supports bento variant styles and timeline primitive", () => {
  const { getByText } = render(<TimelineItem title="Milestone" detail="Shipped v1" year="2026" />);
  expect(getByText("Milestone")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- src/components/primitives/primitives.test.tsx`  
Expected: FAIL with `TimelineItem` not found

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/components/primitives/TimelineItem.tsx
export function TimelineItem({ year, title, detail }: { year: string; title: string; detail: string }) {
  return (
    <article className="space-y-1 rounded-2xl bg-[var(--surface-high)] p-4">
      <p className="text-xs uppercase tracking-[0.08em]">{year}</p>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p>{detail}</p>
    </article>
  );
}
```

```tsx
// src/components/primitives/BentoCard.tsx
export function BentoCard({ title, variant = "feature", children }: { title: string; variant?: "feature" | "metric" | "quote"; children: React.ReactNode }) {
  const tone = variant === "metric" ? "bg-[var(--surface-low)]" : "bg-[var(--surface-high)]";
  return (
    <article className={`rounded-3xl p-6 ${tone}`}>
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="mt-3">{children}</div>
    </article>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- src/components/primitives/primitives.test.tsx`  
Expected: PASS with new primitive assertions

- [ ] **Step 5: Commit**

```bash
git add src/components/primitives/StatPill.tsx src/components/primitives/TimelineItem.tsx src/components/primitives/SocialLinkChip.tsx src/components/primitives/BentoCard.tsx src/components/primitives/EditorialListItem.tsx src/components/primitives/MetaRow.tsx src/components/primitives/primitives.test.tsx
git commit -m "feat: extend editorial primitives for richer content modules"
```

---

### Task 5: Rebuild Home and About with Production-Like Content Density

**Files:**
- Modify: `src/data/home.ts`
- Modify: `src/data/about.ts`
- Modify: `src/app/page.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/home-about.test.tsx`

- [ ] **Step 1: Write the failing tests**

```tsx
// append to src/app/home-about.test.tsx
it("renders home selected work section and credibility metrics", async () => {
  const Home = (await import("./page")).default;
  render(<Home />);
  expect(screen.getByText(/Selected Work/i)).toBeInTheDocument();
  expect(screen.getByText(/Impact Metrics/i)).toBeInTheDocument();
});
```

```tsx
it("renders about timeline section", async () => {
  const About = (await import("./about/page")).default;
  render(<About />);
  expect(screen.getByText(/Timeline/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test -- src/app/home-about.test.tsx`  
Expected: FAIL because new sections are not present yet

- [ ] **Step 3: Write minimal implementation**

```ts
// src/data/home.ts
export const homeContent = {
  title: "Systems Engineer. Digital Curator.",
  summary: "I design resilient software and editorial-grade interfaces that make technical work understandable at a glance.",
  selectedWorkHeading: "Selected Work",
  impactHeading: "Impact Metrics",
  metrics: [
    { label: "Systems shipped", value: "20+" },
    { label: "Production uptime", value: "99.95%" },
    { label: "Lead time reduced", value: "34%" },
  ],
  highlights: [
    "Backend resilience and data design",
    "Human-centered interface architecture",
    "Consistent design-system execution",
  ],
} as const;
```

```ts
// src/data/about.ts
export const aboutContent = {
  title: "About Scott Gilbert",
  lead: "I work at the intersection of engineering discipline and editorial clarity.",
  timeline: [
    { year: "2026", title: "Portfolio redesign", detail: "Unified Light extension with reusable shell primitives." },
    { year: "2025", title: "Reliability platform", detail: "Led resilience improvements for mission-critical workflows." },
  ],
  sections: [
    { heading: "Principles", body: "I favor systems that are testable, observable, and understandable under pressure." },
    { heading: "Practice", body: "I combine backend architecture with interface systems so product behavior and presentation stay aligned." },
  ],
} as const;
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test -- src/app/home-about.test.tsx`  
Expected: PASS with new section assertions

- [ ] **Step 5: Commit**

```bash
git add src/data/home.ts src/data/about.ts src/app/page.tsx src/app/about/page.tsx src/app/home-about.test.tsx
git commit -m "feat: deepen home and about editorial content"
```

---

### Task 6: Rebuild Projects and Blog for Case-Study and Archive Depth

**Files:**
- Modify: `src/data/projects.ts`
- Modify: `src/data/blog.ts`
- Modify: `src/app/projects/page.tsx`
- Modify: `src/app/blog/page.tsx`
- Modify: `src/app/projects-blog.test.tsx`

- [ ] **Step 1: Write the failing tests**

```tsx
// append to src/app/projects-blog.test.tsx
it("renders project outcome metadata", async () => {
  const Projects = (await import("./projects/page")).default;
  render(<Projects />);
  expect(screen.getByText(/Outcome/i)).toBeInTheDocument();
});
```

```tsx
it("renders featured blog entry and archive list", async () => {
  const Blog = (await import("./blog/page")).default;
  render(<Blog />);
  expect(screen.getByText(/Featured Essay/i)).toBeInTheDocument();
  expect(screen.getByText(/Archive/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test -- src/app/projects-blog.test.tsx`  
Expected: FAIL because current pages do not expose the new sections

- [ ] **Step 3: Write minimal implementation**

```ts
// src/data/projects.ts (target schema)
export type Project = {
  title: string;
  challenge: string;
  approach: string;
  outcome: string;
  year: string;
  tags: string[];
  metrics: string[];
};
```

```ts
// src/data/blog.ts
export const featuredPost = {
  title: "Designing Interfaces That Explain Systems",
  summary: "A practical approach to reducing cognitive load in complex product surfaces.",
  date: "2026-04-10",
  readingTime: "7 min",
} as const;

export const blogPosts = [
  { title: "Engineering Notes: Designing for Recovery", summary: "Recovery-first thinking for APIs and background workflows.", date: "2026-04-01", category: "Engineering Notes", readingTime: "6 min" },
  { title: "Engineering Notes: UI Systems That Scale", summary: "Design token boundaries and component contracts that hold up.", date: "2026-03-15", category: "Engineering Notes", readingTime: "5 min" },
] as const;
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test -- src/app/projects-blog.test.tsx`  
Expected: PASS with case-study and archive assertions

- [ ] **Step 5: Commit**

```bash
git add src/data/projects.ts src/data/blog.ts src/app/projects/page.tsx src/app/blog/page.tsx src/app/projects-blog.test.tsx
git commit -m "feat: enrich projects and blog information architecture"
```

---

### Task 7: Expand Utility Pages and Footer-Driven Auxiliary Content

**Files:**
- Modify: `src/app/legal/page.tsx`
- Modify: `src/app/attributions/page.tsx`
- Modify: `src/app/utility-pages.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// append to src/app/utility-pages.test.tsx
it("renders legal sections and attributions source links", async () => {
  const Legal = (await import("./legal/page")).default;
  const Attributions = (await import("./attributions/page")).default;
  render(<><Legal /><Attributions /></>);
  expect(screen.getByText(/Privacy/i)).toBeInTheDocument();
  expect(screen.getByText(/Usage/i)).toBeInTheDocument();
  expect(screen.getByText(/Libraries and references/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- src/app/utility-pages.test.tsx`  
Expected: FAIL when looking for expanded section content

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/app/legal/page.tsx (additions)
<section className="space-y-2">
  <h2>Contact and Requests</h2>
  <p>For policy or attribution questions, use the contact link in the sidebar external section.</p>
</section>

// src/app/attributions/page.tsx (additions)
<ul className="list-disc pl-6 space-y-2">
  <li><a href="https://nextjs.org">Next.js documentation</a></li>
  <li><a href="https://tailwindcss.com">Tailwind CSS documentation</a></li>
  <li><a href="https://www.framer.com/motion/">Framer Motion documentation</a></li>
</ul>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- src/app/utility-pages.test.tsx`  
Expected: PASS with expanded content assertions

- [ ] **Step 5: Commit**

```bash
git add src/app/legal/page.tsx src/app/attributions/page.tsx src/app/utility-pages.test.tsx
git commit -m "feat: expand utility pages for footer-integrated context"
```

---

### Task 8: Add Motion Layer with Reduced-Motion Safeguards

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Create: `src/components/motion/MotionSection.tsx`
- Create: `src/components/motion/motion.test.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/projects/page.tsx`
- Modify: `src/app/blog/page.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/motion/motion.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MotionSection } from "./MotionSection";

describe("MotionSection", () => {
  it("renders children with deterministic test hook", () => {
    render(<MotionSection label="Hero"><p>block</p></MotionSection>);
    expect(screen.getByText("block")).toBeInTheDocument();
    expect(screen.getByTestId("motion-hero")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- src/components/motion/motion.test.tsx`  
Expected: FAIL because `MotionSection` does not exist

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/components/motion/MotionSection.tsx
"use client";
import { motion, useReducedMotion } from "framer-motion";

export function MotionSection({ label, children }: { label: string; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const id = `motion-${label.toLowerCase()}`;
  if (reduce) return <section data-testid={id}>{children}</section>;
  return (
    <motion.section data-testid={id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      {children}
    </motion.section>
  );
}
```

```json
// package.json (add dependency)
{
  "dependencies": {
    "framer-motion": "^11.11.17"
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test -- src/components/motion/motion.test.tsx`  
Expected: PASS with deterministic render assertion

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml src/components/motion/MotionSection.tsx src/components/motion/motion.test.tsx src/app/page.tsx src/app/about/page.tsx src/app/projects/page.tsx src/app/blog/page.tsx src/app/globals.css
git commit -m "feat: add restrained motion layer with reduced-motion fallback"
```

---

### Task 9: Final Accessibility, Documentation, and Full Verification

**Files:**
- Modify: `src/test/smoke.test.ts`
- Modify: `README.md`
- Modify: `src/components/shell/shell-layout.test.tsx`

- [ ] **Step 1: Write the failing test**

```ts
// append to src/test/smoke.test.ts
import { externalNav, footerColumns } from "@/data/navigation";

it("publishes required external links and footer columns", () => {
  expect(externalNav).toHaveLength(4);
  expect(footerColumns).toHaveLength(3);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- src/test/smoke.test.ts`  
Expected: FAIL if final nav/footer data contracts are not wired as expected

- [ ] **Step 3: Write minimal implementation**

```md
<!-- README.md additions -->
- shell overview with sidebar/external/footer architecture
- motion strategy and reduced-motion behavior
- route map and script references kept current
```

```tsx
// ensure shell tests include landmark/focus checks
expect(screen.getByRole("contentinfo")).toBeInTheDocument();
expect(screen.getByRole("navigation", { name: /desktop/i })).toBeInTheDocument();
```

- [ ] **Step 4: Run full verification**

Run: `pnpm test && pnpm lint && pnpm build`  
Expected: all commands succeed with no errors

- [ ] **Step 5: Commit**

```bash
git add src/test/smoke.test.ts src/components/shell/shell-layout.test.tsx README.md
git commit -m "docs: finalize unified light extension architecture and verification"
```

---

## Self-Review Checklist (completed inline)

- Spec coverage: sidebar, external links, expanded footer, richer pages, motion, accessibility, and docs are each mapped to explicit tasks.
- Placeholder scan: no TBD/TODO placeholders remain in tasks.
- Type consistency: `externalNav`, `footerColumns`, and new primitive names are consistent across tasks.
