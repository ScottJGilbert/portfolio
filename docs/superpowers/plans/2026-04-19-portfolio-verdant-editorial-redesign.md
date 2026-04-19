# Portfolio Verdant Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the public portfolio as a token-first, accessible, content-rich Verdant Editorial experience while preserving the existing core IA and shell pattern (desktop sidebar, mobile header, global footer).

**Architecture:** Implement a semantic design-token layer first, then build an app shell and reusable primitives against those tokens. Rebuild each public route with shared components and data modules so styling, motion, accessibility, and copy strategy remain consistent across the site. Keep scope frontend-only and thin the runtime by removing unused dependencies after component consolidation.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS 4, clsx, tailwind-merge, Vitest, Testing Library, jsdom.

---

## Scope Check

This is one subsystem (public frontend redesign) and is appropriate for one implementation plan.

---

## File Structure (planned end state)

### App routes
- Modify: `src/app/layout.tsx` — wire app shell, metadata, skip link, and shared structure.
- Modify: `src/app/globals.css` — token-backed CSS variables, typography rhythm, focus styles, reduced-motion defaults.
- Modify: `src/app/page.tsx` — home route.
- Create: `src/app/about/page.tsx`
- Create: `src/app/projects/page.tsx`
- Create: `src/app/blog/page.tsx`
- Create: `src/app/legal/page.tsx`
- Create: `src/app/attributions/page.tsx`

### Shared UI and behavior
- Create: `src/components/shell/AppShell.tsx`
- Create: `src/components/shell/DesktopSidebar.tsx`
- Create: `src/components/shell/MobileHeader.tsx`
- Create: `src/components/shell/Footer.tsx`
- Create: `src/components/shell/ThemeToggle.tsx`
- Create: `src/components/a11y/SkipLink.tsx`
- Create: `src/components/primitives/PageIntro.tsx`
- Create: `src/components/primitives/SectionHeader.tsx`
- Create: `src/components/primitives/BentoCard.tsx`
- Create: `src/components/primitives/EditorialListItem.tsx`
- Create: `src/components/primitives/TagChip.tsx`
- Create: `src/components/primitives/Button.tsx`
- Create: `src/components/primitives/MetaRow.tsx`

### Data and design model
- Modify: `src/data/projects.ts` — rewrite project model/content to editorial format.
- Create: `src/data/navigation.ts`
- Create: `src/data/home.ts`
- Create: `src/data/about.ts`
- Create: `src/data/blog.ts`
- Create: `src/lib/design/tokens.ts`
- Modify: `src/lib/utils.ts` — keep `cn` utility unchanged unless required by tests.

### Test and tooling
- Modify: `package.json` — add test scripts and remove unused frontend deps after migration.
- Modify: `pnpm-lock.yaml` — dependency graph updates.
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/test/smoke.test.ts`
- Create: `src/lib/design/tokens.test.ts`
- Create: `src/components/shell/AppShell.test.tsx`
- Create: `src/components/primitives/primitives.test.tsx`
- Create: `src/app/home-about.test.tsx`
- Create: `src/app/projects-blog.test.tsx`
- Create: `src/app/utility-pages.test.tsx`
- Create: `src/test/dependency-audit.test.ts`

### Documentation
- Modify: `README.md` — update architecture, scripts, and public page map for new structure.

---

### Task 1: Establish Test Harness and Baseline Guardrails

**Files:**
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/test/smoke.test.ts`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Create: `src/lib/design/tokens.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/test/smoke.test.ts
import { describe, it, expect } from "vitest";
import { themeTokens } from "@/lib/design/tokens";

describe("smoke", () => {
  it("loads token module", () => {
    expect(themeTokens).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- src/test/smoke.test.ts`  
Expected: FAIL with `Missing script: test`

- [ ] **Step 3: Write minimal implementation**

```json
// package.json (additions)
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "devDependencies": {
    "vitest": "^3.2.4",
    "jsdom": "^26.1.0",
    "@testing-library/react": "^16.3.0",
    "@testing-library/jest-dom": "^6.8.0"
  }
}
```

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

```ts
// src/test/setup.ts
import "@testing-library/jest-dom/vitest";
```

```ts
// src/lib/design/tokens.ts
export const themeTokens = {
  light: { surface: "#F8FAF8" },
  dark: { surface: "#041710" },
} as const;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- src/test/smoke.test.ts`  
Expected: PASS with `1 passed`

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml vitest.config.ts src/test/setup.ts src/test/smoke.test.ts src/lib/design/tokens.ts
git commit -m "test: add vitest harness and smoke baseline"
```

---

### Task 2: Implement Semantic Tokens and Global Theme Contract

**Files:**
- Modify: `src/lib/design/tokens.ts`
- Create: `src/lib/design/tokens.test.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/design/tokens.test.ts
import { describe, it, expect } from "vitest";
import { themeTokens, semanticScale } from "./tokens";

const forbidden = new Set(["#000000", "#808080", "#7f7f7f"]);

describe("design tokens", () => {
  it("exposes required semantic scales", () => {
    expect(semanticScale.surface.base).toBe("surface");
    expect(semanticScale.typography.display).toBeDefined();
  });

  it("does not contain forbidden neutrals", () => {
    const all = [...Object.values(themeTokens.light), ...Object.values(themeTokens.dark)];
    for (const value of all) {
      expect(forbidden.has(value.toLowerCase())).toBe(false);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- src/lib/design/tokens.test.ts`  
Expected: FAIL with missing export errors for `semanticScale`

- [ ] **Step 3: Write minimal implementation**

```ts
// src/lib/design/tokens.ts
export const themeTokens = {
  light: {
    surface: "#F8FAF8",
    surfaceLow: "#F2F4F2",
    surfaceHigh: "#FFFFFF",
    text: "#191C1B",
    primary: "#012D1D",
    primaryStrong: "#1B4332",
    accent: "#C1ECD4",
    outlineGhost: "rgba(65, 72, 68, 0.2)",
  },
  dark: {
    surface: "#041710",
    surfaceLow: "#01110B",
    surfaceHigh: "#1A2E26",
    text: "#D1E8DC",
    primary: "#95D4B3",
    primaryStrong: "#253931",
    accent: "#414844",
    outlineGhost: "rgba(65, 72, 68, 0.25)",
  },
} as const;

export const semanticScale = {
  surface: {
    base: "surface",
    section: "surfaceLow",
    card: "surfaceHigh",
  },
  typography: {
    display: "clamp(2.25rem, 6vw, 4rem)",
    headline: "clamp(1.5rem, 4vw, 2.25rem)",
    body: "1rem",
    label: "0.75rem",
  },
  radius: {
    md: "0.75rem",
    xl: "1.5rem",
    pill: "9999px",
  },
} as const;
```

```css
/* src/app/globals.css */
@import "tailwindcss";

:root {
  --surface: #F8FAF8;
  --surface-low: #F2F4F2;
  --surface-high: #FFFFFF;
  --text: #191C1B;
  --primary: #012D1D;
  --primary-strong: #1B4332;
  --accent: #C1ECD4;
  --outline-ghost: rgba(65, 72, 68, 0.2);
}

:root.dark {
  --surface: #041710;
  --surface-low: #01110B;
  --surface-high: #1A2E26;
  --text: #D1E8DC;
  --primary: #95D4B3;
  --primary-strong: #253931;
  --accent: #414844;
  --outline-ghost: rgba(65, 72, 68, 0.25);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}

body {
  background: var(--surface);
  color: var(--text);
  line-height: 1.6;
}

a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- src/lib/design/tokens.test.ts`  
Expected: PASS with `2 passed`

- [ ] **Step 5: Commit**

```bash
git add src/lib/design/tokens.ts src/lib/design/tokens.test.ts src/app/globals.css
git commit -m "feat: add semantic verdant token system"
```

---

### Task 3: Build Shared Navigation Model and App Shell

**Files:**
- Create: `src/data/navigation.ts`
- Create: `src/components/a11y/SkipLink.tsx`
- Create: `src/components/shell/ThemeToggle.tsx`
- Create: `src/components/shell/DesktopSidebar.tsx`
- Create: `src/components/shell/MobileHeader.tsx`
- Create: `src/components/shell/Footer.tsx`
- Create: `src/components/shell/AppShell.tsx`
- Modify: `src/app/layout.tsx`
- Test: `src/components/shell/AppShell.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/shell/AppShell.test.tsx
import { render, screen } from "@testing-library/react";
import { AppShell } from "./AppShell";

describe("AppShell", () => {
  it("renders core landmarks and core links", () => {
    render(<AppShell><div>Body</div></AppShell>);
    expect(screen.getByRole("navigation", { name: "Desktop Navigation" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Mobile Navigation" })).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Home" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "About" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Projects" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Blog" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Legal" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Attributions" }).length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- src/components/shell/AppShell.test.tsx`  
Expected: FAIL with `Cannot find module './AppShell'`

- [ ] **Step 3: Write minimal implementation**

```ts
// src/data/navigation.ts
export type NavItem = { label: string; href: string };

export const coreNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
];

export const utilityNav: NavItem[] = [
  { label: "Legal", href: "/legal" },
  { label: "Attributions", href: "/attributions" },
];
```

```tsx
// src/components/a11y/SkipLink.tsx
export function SkipLink() {
  return (
    <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]">
      Skip to main content
    </a>
  );
}
```

```tsx
// src/components/shell/ThemeToggle.tsx
"use client";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle("dark", next);
      }}
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}
```

```tsx
// src/components/shell/DesktopSidebar.tsx
import Link from "next/link";
import { coreNav } from "@/data/navigation";

export function DesktopSidebar() {
  return (
    <aside className="hidden md:block w-64 p-6" aria-label="Desktop Navigation">
      <nav aria-label="Desktop Navigation">
        <ul className="space-y-3">
          {coreNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
```

```tsx
// src/components/shell/MobileHeader.tsx
import Link from "next/link";
import { coreNav } from "@/data/navigation";

export function MobileHeader() {
  return (
    <header className="md:hidden p-4" aria-label="Mobile Navigation">
      <nav aria-label="Mobile Navigation">
        <ul className="flex gap-4">
          {coreNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
```

```tsx
// src/components/shell/Footer.tsx
import Link from "next/link";
import { utilityNav } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="p-6" role="contentinfo">
      <ul className="flex gap-4 flex-wrap">
        {utilityNav.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
```

```tsx
// src/components/shell/AppShell.tsx
import { ReactNode } from "react";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileHeader } from "./MobileHeader";
import { Footer } from "./Footer";
import { ThemeToggle } from "./ThemeToggle";
import { SkipLink } from "@/components/a11y/SkipLink";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen md:grid md:grid-cols-[16rem_1fr]">
      <SkipLink />
      <DesktopSidebar />
      <div className="min-w-0">
        <MobileHeader />
        <div className="p-4">
          <ThemeToggle />
        </div>
        <main id="main-content">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
```

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/shell/AppShell";

export const metadata: Metadata = {
  title: {
    default: "Scott Gilbert",
    template: "%s | Scott Gilbert",
  },
  description: "Verdant Editorial portfolio for Scott Gilbert.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- src/components/shell/AppShell.test.tsx`  
Expected: PASS with `1 passed`

- [ ] **Step 5: Commit**

```bash
git add src/data/navigation.ts src/components/a11y/SkipLink.tsx src/components/shell src/app/layout.tsx src/components/shell/AppShell.test.tsx
git commit -m "feat: add shared app shell with sidebar header and footer"
```

---

### Task 4: Implement Reusable Primitives and State Variants

**Files:**
- Create: `src/components/primitives/Button.tsx`
- Create: `src/components/primitives/BentoCard.tsx`
- Create: `src/components/primitives/TagChip.tsx`
- Create: `src/components/primitives/SectionHeader.tsx`
- Create: `src/components/primitives/PageIntro.tsx`
- Create: `src/components/primitives/EditorialListItem.tsx`
- Create: `src/components/primitives/MetaRow.tsx`
- Test: `src/components/primitives/primitives.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/primitives/primitives.test.tsx
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";
import { BentoCard } from "./BentoCard";
import { TagChip } from "./TagChip";

describe("primitives", () => {
  it("renders variant classes and semantics", () => {
    render(
      <>
        <Button variant="primary">Action</Button>
        <BentoCard title="Card title">Body</BentoCard>
        <TagChip>Rust</TagChip>
      </>
    );
    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Card title" })).toBeInTheDocument();
    expect(screen.getByText("Rust")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- src/components/primitives/primitives.test.tsx`  
Expected: FAIL with missing primitive modules

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/components/primitives/Button.tsx
import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({ variant = "primary", className, ...props }: Props) {
  return (
    <button
      className={cn(
        "rounded-full px-4 py-2 text-sm transition",
        variant === "primary" && "bg-[var(--primary)] text-[var(--surface)]",
        variant === "ghost" && "bg-transparent border border-[var(--outline-ghost)] text-[var(--primary)]",
        className
      )}
      {...props}
    />
  );
}
```

```tsx
// src/components/primitives/BentoCard.tsx
import { ReactNode } from "react";

export function BentoCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="rounded-3xl p-6 bg-[var(--surface-high)]">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="mt-3">{children}</div>
    </article>
  );
}
```

```tsx
// src/components/primitives/TagChip.tsx
import { ReactNode } from "react";

export function TagChip({ children }: { children: ReactNode }) {
  return <span className="inline-flex rounded-full px-3 py-1 text-xs bg-[var(--surface-low)]">{children}</span>;
}
```

```tsx
// src/components/primitives/SectionHeader.tsx
export function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="space-y-2">
      <h2 className="text-3xl font-semibold">{title}</h2>
      <p className="text-sm opacity-80">{subtitle}</p>
    </header>
  );
}
```

```tsx
// src/components/primitives/PageIntro.tsx
export function PageIntro({ title, summary }: { title: string; summary: string }) {
  return (
    <section className="space-y-3">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="max-w-2xl">{summary}</p>
    </section>
  );
}
```

```tsx
// src/components/primitives/MetaRow.tsx
export function MetaRow({ date, category }: { date: string; category: string }) {
  return (
    <p className="text-xs uppercase tracking-[0.08em] opacity-70">
      {category} · {date}
    </p>
  );
}
```

```tsx
// src/components/primitives/EditorialListItem.tsx
import { MetaRow } from "./MetaRow";

export function EditorialListItem({
  title,
  summary,
  date,
  category,
}: {
  title: string;
  summary: string;
  date: string;
  category: string;
}) {
  return (
    <article className="space-y-2">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <MetaRow date={date} category={category} />
      <p>{summary}</p>
    </article>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- src/components/primitives/primitives.test.tsx`  
Expected: PASS with `1 passed`

- [ ] **Step 5: Commit**

```bash
git add src/components/primitives src/components/primitives/primitives.test.tsx
git commit -m "feat: add reusable editorial primitive components"
```

---

### Task 5: Rebuild Home and About with New Content Strategy

**Files:**
- Create: `src/data/home.ts`
- Create: `src/data/about.ts`
- Modify: `src/app/page.tsx`
- Create: `src/app/about/page.tsx`
- Test: `src/app/home-about.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/app/home-about.test.tsx
import { render, screen } from "@testing-library/react";
import HomePage from "./page";
import AboutPage from "./about/page";

describe("home and about", () => {
  it("renders home editorial headline and CTA", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: /systems engineer/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /view selected work/i })).toBeInTheDocument();
  });

  it("renders about story sections", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { name: /about scott gilbert/i })).toBeInTheDocument();
    expect(screen.getByText(/engineering discipline and editorial clarity/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- src/app/home-about.test.tsx`  
Expected: FAIL because current pages do not render expected content

- [ ] **Step 3: Write minimal implementation**

```ts
// src/data/home.ts
export const homeContent = {
  title: "Systems Engineer. Digital Curator.",
  summary:
    "I design resilient software and editorial-grade interfaces that make technical work understandable at a glance.",
  cta: "View Selected Work",
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
  lead:
    "I work at the intersection of engineering discipline and editorial clarity.",
  sections: [
    {
      heading: "Principles",
      body: "I favor systems that are testable, observable, and understandable under pressure.",
    },
    {
      heading: "Practice",
      body: "I combine backend architecture with interface systems so product behavior and presentation stay aligned.",
    },
  ],
} as const;
```

```tsx
// src/app/page.tsx
import { homeContent } from "@/data/home";
import { Button } from "@/components/primitives/Button";
import { BentoCard } from "@/components/primitives/BentoCard";
import { PageIntro } from "@/components/primitives/PageIntro";

export default function HomePage() {
  return (
    <div className="space-y-10 p-6">
      <PageIntro title={homeContent.title} summary={homeContent.summary} />
      <Button variant="primary">View Selected Work</Button>
      <section className="grid gap-4 md:grid-cols-3">
        {homeContent.highlights.map((item) => (
          <BentoCard key={item} title="Highlight">
            <p>{item}</p>
          </BentoCard>
        ))}
      </section>
    </div>
  );
}
```

```tsx
// src/app/about/page.tsx
import { aboutContent } from "@/data/about";
import { PageIntro } from "@/components/primitives/PageIntro";
import { SectionHeader } from "@/components/primitives/SectionHeader";

export default function AboutPage() {
  return (
    <div className="space-y-10 p-6">
      <PageIntro title={aboutContent.title} summary={aboutContent.lead} />
      {aboutContent.sections.map((section) => (
        <section key={section.heading} className="space-y-2">
          <SectionHeader title={section.heading} subtitle="" />
          <p>{section.body}</p>
        </section>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- src/app/home-about.test.tsx`  
Expected: PASS with `2 passed`

- [ ] **Step 5: Commit**

```bash
git add src/data/home.ts src/data/about.ts src/app/page.tsx src/app/about/page.tsx src/app/home-about.test.tsx
git commit -m "feat: rebuild home and about with verdant editorial content"
```

---

### Task 6: Rebuild Projects and Blog Pages with Shared Primitives

**Files:**
- Modify: `src/data/projects.ts`
- Create: `src/data/blog.ts`
- Create: `src/app/projects/page.tsx`
- Create: `src/app/blog/page.tsx`
- Test: `src/app/projects-blog.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/app/projects-blog.test.tsx
import { render, screen } from "@testing-library/react";
import ProjectsPage from "./projects/page";
import BlogPage from "./blog/page";

describe("projects and blog", () => {
  it("renders project list with metadata", () => {
    render(<ProjectsPage />);
    expect(screen.getByRole("heading", { name: /projects/i })).toBeInTheDocument();
    expect(screen.getAllByText(/case study/i).length).toBeGreaterThan(0);
  });

  it("renders blog list with category and date", () => {
    render(<BlogPage />);
    expect(screen.getByRole("heading", { name: /blog/i })).toBeInTheDocument();
    expect(screen.getAllByText(/engineering notes/i).length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- src/app/projects-blog.test.tsx`  
Expected: FAIL because routes/data are missing

- [ ] **Step 3: Write minimal implementation**

```ts
// src/data/projects.ts
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
```

```ts
// src/data/blog.ts
export type BlogPost = {
  title: string;
  summary: string;
  date: string;
  category: string;
};

export const blogPosts: BlogPost[] = [
  {
    title: "Engineering Notes: Designing for Recovery",
    summary: "Recovery-first thinking for APIs and background workflows.",
    date: "2026-04-01",
    category: "Engineering Notes",
  },
  {
    title: "Engineering Notes: UI Systems That Scale",
    summary: "Design token boundaries and component contracts that hold up.",
    date: "2026-03-15",
    category: "Engineering Notes",
  },
];
```

```tsx
// src/app/projects/page.tsx
import { projects } from "@/data/projects";
import { PageIntro } from "@/components/primitives/PageIntro";
import { EditorialListItem } from "@/components/primitives/EditorialListItem";
import { TagChip } from "@/components/primitives/TagChip";

export default function ProjectsPage() {
  return (
    <div className="space-y-8 p-6">
      <PageIntro title="Projects" summary="Selected implementation work and architecture outcomes." />
      {projects.map((project) => (
        <article key={project.title} className="space-y-3">
          <EditorialListItem
            title={project.title}
            summary={project.summary}
            date={project.year}
            category={project.category}
          />
          <div className="flex gap-2 flex-wrap">
            {project.tags.map((tag) => (
              <TagChip key={tag}>{tag}</TagChip>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
```

```tsx
// src/app/blog/page.tsx
import { blogPosts } from "@/data/blog";
import { PageIntro } from "@/components/primitives/PageIntro";
import { EditorialListItem } from "@/components/primitives/EditorialListItem";

export default function BlogPage() {
  return (
    <div className="space-y-8 p-6">
      <PageIntro title="Blog" summary="Writing on engineering systems, product clarity, and frontend architecture." />
      {blogPosts.map((post) => (
        <EditorialListItem
          key={post.title}
          title={post.title}
          summary={post.summary}
          date={post.date}
          category={post.category}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- src/app/projects-blog.test.tsx`  
Expected: PASS with `2 passed`

- [ ] **Step 5: Commit**

```bash
git add src/data/projects.ts src/data/blog.ts src/app/projects/page.tsx src/app/blog/page.tsx src/app/projects-blog.test.tsx
git commit -m "feat: rebuild projects and blog pages with shared editorial list patterns"
```

---

### Task 7: Add Legal/Attributions Pages and Accessibility Hardening

**Files:**
- Create: `src/app/legal/page.tsx`
- Create: `src/app/attributions/page.tsx`
- Modify: `src/components/shell/AppShell.tsx`
- Modify: `src/app/globals.css`
- Test: `src/app/utility-pages.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/app/utility-pages.test.tsx
import { render, screen } from "@testing-library/react";
import LegalPage from "./legal/page";
import AttributionsPage from "./attributions/page";

describe("utility pages", () => {
  it("renders legal page with policy sections", () => {
    render(<LegalPage />);
    expect(screen.getByRole("heading", { name: /legal/i })).toBeInTheDocument();
    expect(screen.getByText(/privacy/i)).toBeInTheDocument();
  });

  it("renders attributions with source list", () => {
    render(<AttributionsPage />);
    expect(screen.getByRole("heading", { name: /attributions/i })).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- src/app/utility-pages.test.tsx`  
Expected: FAIL due missing route modules

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/app/legal/page.tsx
import { PageIntro } from "@/components/primitives/PageIntro";

export default function LegalPage() {
  return (
    <div className="space-y-8 p-6">
      <PageIntro title="Legal" summary="Terms, privacy, and public site usage notes." />
      <section className="space-y-2">
        <h2>Privacy</h2>
        <p>This site does not sell personal information and does not run ad tracking scripts.</p>
      </section>
      <section className="space-y-2">
        <h2>Usage</h2>
        <p>Content is provided for portfolio review and professional discussion.</p>
      </section>
    </div>
  );
}
```

```tsx
// src/app/attributions/page.tsx
import { PageIntro } from "@/components/primitives/PageIntro";

const sources = [
  "Next.js documentation",
  "Tailwind CSS documentation",
  "Hero and icon assets credited per source license",
];

export default function AttributionsPage() {
  return (
    <div className="space-y-8 p-6">
      <PageIntro title="Attributions" summary="Libraries and references used in this public portfolio." />
      <ul className="list-disc pl-6 space-y-2">
        {sources.map((source) => (
          <li key={source}>{source}</li>
        ))}
      </ul>
    </div>
  );
}
```

```tsx
// src/components/shell/AppShell.tsx (main landmark and skip-link target)
// ensure this main id and focus support exist
<main id="main-content" tabIndex={-1}>{children}</main>
```

```css
/* src/app/globals.css (append) */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.focus\:not-sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  clip: auto;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- src/app/utility-pages.test.tsx`  
Expected: PASS with `2 passed`

- [ ] **Step 5: Commit**

```bash
git add src/app/legal/page.tsx src/app/attributions/page.tsx src/components/shell/AppShell.tsx src/app/globals.css src/app/utility-pages.test.tsx
git commit -m "feat: add legal and attributions routes with accessibility hardening"
```

---

### Task 8: Thin Frontend Stack and Add Dependency Guard Test

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Create: `src/test/dependency-audit.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/test/dependency-audit.test.ts
import { describe, it, expect } from "vitest";
import pkg from "../../package.json";

describe("dependency audit", () => {
  it("removes unused Radix packages from public stack", () => {
    const deps = pkg.dependencies ?? {};
    expect(deps["@radix-ui/react-dialog"]).toBeUndefined();
    expect(deps["@radix-ui/react-dropdown-menu"]).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- src/test/dependency-audit.test.ts`  
Expected: FAIL because both Radix packages are currently present

- [ ] **Step 3: Write minimal implementation**

```json
// package.json (dependency removals)
{
  "dependencies": {
    "clsx": "^2.1.1",
    "next": "16.2.4",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "tailwind-merge": "^3.5.0"
  }
}
```

Run after edit: `pnpm install`

- [ ] **Step 4: Run tests and quality checks**

Run: `pnpm test && pnpm lint && pnpm build`  
Expected: all commands exit 0

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml src/test/dependency-audit.test.ts
git commit -m "chore: thin public frontend dependency surface"
```

---

### Task 9: Documentation and Final QA Gate

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Write the failing test (documentation gate)**

```ts
// add this assertion to src/test/smoke.test.ts
import { readFileSync } from "node:fs";

it("documents the public page map", () => {
  const readme = readFileSync("README.md", "utf8");
  expect(readme.includes("/about")).toBe(true);
  expect(readme.includes("/projects")).toBe(true);
  expect(readme.includes("/blog")).toBe(true);
  expect(readme.includes("/legal")).toBe(true);
  expect(readme.includes("/attributions")).toBe(true);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- src/test/smoke.test.ts`  
Expected: FAIL because README does not document page map

- [ ] **Step 3: Write minimal implementation**

```md
<!-- README.md add/update sections -->
## Public Routes

- `/` Home
- `/about` About
- `/projects` Projects
- `/blog` Blog
- `/legal` Legal
- `/attributions` Attributions

## Architecture

- Token-first design system in `src/lib/design/tokens.ts`
- Shared shell in `src/components/shell/*`
- Reusable editorial primitives in `src/components/primitives/*`

## Scripts

- `pnpm dev`
- `pnpm test`
- `pnpm lint`
- `pnpm build`
```

- [ ] **Step 4: Run final checks**

Run: `pnpm test && pnpm lint && pnpm build`  
Expected: all commands exit 0 with no failures

- [ ] **Step 5: Commit**

```bash
git add README.md src/test/smoke.test.ts
git commit -m "docs: capture redesigned public architecture and route map"
```

---

## Self-Review

1. **Spec coverage:**  
   - Token-first theming: Tasks 1-2  
   - Shell + structure preservation: Task 3  
   - Reusable components: Task 4  
   - Core pages (home/about/projects/blog/legal/attributions): Tasks 5-7  
   - Accessibility and reduced motion: Tasks 2, 3, 7  
   - Content strategy rewrite: Tasks 5-7  
   - Frontend stack thinning: Task 8  
   - Documentation handoff: Task 9  
   No coverage gaps identified.

2. **Placeholder scan:**  
   Checked for `TBD`, `TODO`, and vague implementation phrases in task steps. None remain.

3. **Type consistency:**  
   Component names, data exports, and route filenames are consistent across tasks.

