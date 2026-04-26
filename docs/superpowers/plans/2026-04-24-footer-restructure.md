# Footer Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the site footer into a multi-column grid with site navigation, external links, and auxiliary links.

**Architecture:** A responsive grid layout in `SiteFooter` using Tailwind CSS, supported by three new pages for the auxiliary links.

**Tech Stack:** Next.js (App Router), Tailwind CSS, React.

---

### Task 1: Create Attributions Page

**Files:**
- Create: `src/app/(site)/attributions/page.tsx`

- [ ] **Step 1: Implement the Attributions page**

```tsx
import { SiteLayout } from "@/components/site/site-layout"; // Assuming SiteLayout exists based on project structure

export default function AttributionsPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-5xl px-6 py-12 md:px-12">
        <h1 className="text-2xl font-bold mb-4">Attributions</h1>
        <p className="text-muted">Content for attributions will be added here.</p>
      </div>
    </SiteLayout>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/(site)/attributions/page.tsx
git commit -m "feat: add attributions page"
```

### Task 2: Create Sitemap Page

**Files:**
- Create: `src/app/(site)/sitemap/page.tsx`

- [ ] **Step 1: Implement the Sitemap page**

```tsx
import { SiteLayout } from "@/components/site/site-layout";

export default function SitemapPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-5xl px-6 py-12 md:px-12">
        <h1 className="text-2xl font-bold mb-4">Sitemap</h1>
        <p className="text-muted">Sitemap content will be added here.</p>
      </div>
    </SiteLayout>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/(site)/sitemap/page.tsx
git commit -m "feat: add sitemap page"
```

### Task 3: Create RSS WIP Page

**Files:**
- Create: `src/app/(site)/rss/page.tsx`

- [ ] **Step 1: Implement the RSS WIP page**

```tsx
import { SiteLayout } from "@/components/site/site-layout";

export default function RSSPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-5xl px-6 py-12 md:px-12">
        <h1 className="text-2xl font-bold mb-4">RSS Feed</h1>
        <p className="text-muted">This page is currently a work in progress.</p>
      </div>
    </SiteLayout>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/(site)/rss/page.tsx
git commit -m "feat: add rss wip page"
```

### Task 4: Refactor SiteFooter Component

**Files:**
- Modify: `src/components/site/site-footer.tsx`

- [ ] **Step 1: Update the content object and implement the multi-column grid**

```tsx
import Link from "next/link";

const content = {
  name: "Scott Gilbert",
  statement: "© 2026 Scott Gilbert.",
  sections: [
    {
      title: "Navigation",
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Projects", href: "/projects" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "External",
      links: [
        { label: "Blog", href: "https://blog.scottgilbert.dev" }, // Example external link
        { label: "Resume", href: "/resume" },
        { label: "GitHub", href: "https://github.com/scottgilbert" },
        { label: "LinkedIn", href: "https://linkedin.com/in/scottgilbert" },
        { label: "Email", href: "mailto:scott@gilbert.dev" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Attributions", href: "/attributions" },
        { label: "Terms", href: "/legal#terms" },
        { label: "Privacy", href: "/legal#privacy" },
        { label: "Sitemap", href: "/sitemap" },
        { label: "RSS", href: "/rss" },
      ],
    },
  ],
};

export function SiteFooter() {
  return (
    <footer className="px-6 py-12 md:px-12" aria-label="Site footer">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 border-t border-outline-ghost/70 px-2 pt-10 text-center backdrop-blur md:grid md:grid-cols-4 md:text-left md:gap-x-8">
        <div className="space-y-2">
          <p className="font-medium text-foreground">{content.name}</p>
          <p className="text-xs uppercase tracking-[0.16em] text-muted">
            {content.statement}
          </p>
        </div>
        {content.sections.map((section) => (
          <div key={section.title} className="flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-[0.16em] text-muted font-medium">
              {section.title}
            </h3>
            <ul className="flex flex-col gap-2">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/site/site-footer.tsx
git commit -m "feat: restructure footer into multi-column grid"
```
