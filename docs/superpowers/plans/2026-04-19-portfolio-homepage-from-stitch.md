# Portfolio Homepage from Stitch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready, Stitch-aligned homepage (desktop + mobile) with reusable components, global design tokens, light/dark theme toggle, and future-page-ready route structure.

**Architecture:** Implement a token-heavy styling foundation in `globals.css`, then layer reusable `ui` primitives and portfolio-specific `site` composites on top. Assemble the homepage from typed content data so future pages can reuse components and layout conventions. Preserve near pixel-level parity with Stitch references while keeping interactions accessible and minimal.

**Tech Stack:** Next.js App Router (v16), React 19, TypeScript, Tailwind CSS v4, lucide-react icons, ESLint.

---

## File Structure and Responsibilities

### Create
- `DESIGN.md` — Human-readable design decisions from first pass (tokens, spacing, typography, surfaces, light/dark behavior).
- `src/app/(site)/layout.tsx` — Site shell wrapper for desktop/mobile chrome.
- `src/app/(site)/page.tsx` — Homepage composition only.
- `src/app/(site)/work/page.tsx` — Route placeholder.
- `src/app/(site)/journal/page.tsx` — Route placeholder.
- `src/app/(site)/about/page.tsx` — Route placeholder.
- `src/app/(site)/contact/page.tsx` — Route placeholder.
- `src/components/ui/theme-provider.tsx` — Client theme state + persistence.
- `src/components/ui/theme-toggle.tsx` — Reusable toggle button.
- `src/components/ui/button.tsx` — Token-based button variants.
- `src/components/ui/icon-button.tsx` — Token-based icon action button.
- `src/components/ui/card.tsx` — Surface variants for cards/panels.
- `src/components/ui/chip.tsx` — Tag/chip primitive.
- `src/components/ui/section-heading.tsx` — Shared section heading pattern.
- `src/components/ui/nav-item.tsx` — Shared nav row pattern.
- `src/components/site/desktop-sidebar.tsx` — Desktop fixed left navigation.
- `src/components/site/mobile-nav.tsx` — Mobile top bar + expandable menu.
- `src/components/site/top-action-bar.tsx` — Desktop top-right action controls.
- `src/components/site/hero-section.tsx` — Hero section block.
- `src/components/site/assortment-grid.tsx` — Bento assortment section.
- `src/components/site/work-grid.tsx` — Work/project card section.
- `src/components/site/journal-list.tsx` — Journal row-list section.
- `src/components/site/site-footer.tsx` — Footer links and signature.
- `src/lib/site-content.ts` — Typed homepage content source.

### Modify
- `src/app/layout.tsx` — Root metadata, font setup, provider mount.
- `src/app/globals.css` — Semantic tokens and global utility rules.
- `src/app/page.tsx` — Replace default content with redirect/export or remove in favor of route-group homepage.
- `.gitignore` — Add `.superpowers/` to avoid accidentally committing local Stitch/brainstorm artifacts.

### Dependencies
- `package.json` — Add `lucide-react`.

---

### Task 1: Establish global tokens, theme provider, and design documentation

**Files:**
- Create: `DESIGN.md`
- Create: `src/components/ui/theme-provider.tsx`
- Create: `src/components/ui/theme-toggle.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Write failing integration usage in root layout**

```tsx
// src/app/layout.tsx (target change)
import { ThemeProvider } from "@/components/ui/theme-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-surface text-on-surface">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Run build to verify it fails (missing module)**

Run: `pnpm build`  
Expected: FAIL with module resolution error for `@/components/ui/theme-provider`.

- [ ] **Step 3: Write minimal implementation for provider/toggle and token system**

```tsx
// src/components/ui/theme-provider.tsx
"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";
type ThemeContextValue = { theme: Theme; setTheme: (next: Theme) => void; toggleTheme: () => void };
const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  useEffect(() => {
    const stored = window.localStorage.getItem("site-theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored === "dark" || stored === "light" ? stored : systemDark ? "dark" : "light";
    setThemeState(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);
  const setTheme = (next: Theme) => {
    setThemeState(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    window.localStorage.setItem("site-theme", next);
  };
  const value = useMemo(() => ({ theme, setTheme, toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark") }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("useTheme must be used within ThemeProvider");
  return value;
}
```

```tsx
// src/components/ui/theme-toggle.tsx
"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button type="button" aria-label="Toggle theme" onClick={toggleTheme} className="inline-flex h-10 w-10 items-center justify-center rounded-full text-on-surface/70 hover:bg-surface-container">
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
```

```css
/* src/app/globals.css (token base) */
@import "tailwindcss";

:root {
  --surface: #f8faf9;
  --surface-container: #f1f4f2;
  --surface-container-high: #ffffff;
  --surface-container-highest: #e1e5e2;
  --on-surface: #041710;
  --on-surface-muted: color-mix(in srgb, var(--on-surface) 60%, transparent);
  --primary: #2c694e;
  --outline-variant: #c1c8c2;
}

.dark {
  --surface: #041710;
  --surface-container: #10231c;
  --surface-container-high: #1a2e26;
  --surface-container-highest: #253931;
  --on-surface: #d1e8dc;
  --on-surface-muted: color-mix(in srgb, var(--on-surface) 65%, transparent);
  --primary: #95d4b3;
  --outline-variant: #414844;
}

@theme inline {
  --color-surface: var(--surface);
  --color-surface-container: var(--surface-container);
  --color-surface-container-high: var(--surface-container-high);
  --color-surface-container-highest: var(--surface-container-highest);
  --color-on-surface: var(--on-surface);
  --color-on-surface-muted: var(--on-surface-muted);
  --color-primary: var(--primary);
  --color-outline-variant: var(--outline-variant);
}
```

- [ ] **Step 4: Run lint/build to verify foundation passes**

Run: `pnpm lint && pnpm build`  
Expected: PASS for lint and production build.

- [ ] **Step 5: Commit**

```bash
git add DESIGN.md src/app/layout.tsx src/app/globals.css src/components/ui/theme-provider.tsx src/components/ui/theme-toggle.tsx package.json pnpm-lock.yaml
git commit -m "feat: add global design tokens and theme infrastructure"
```

---

### Task 2: Create site routing scaffold and shell layout

**Files:**
- Create: `src/app/(site)/layout.tsx`
- Create: `src/app/(site)/page.tsx`
- Create: `src/app/(site)/work/page.tsx`
- Create: `src/app/(site)/journal/page.tsx`
- Create: `src/app/(site)/about/page.tsx`
- Create: `src/app/(site)/contact/page.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write failing shell imports in route-group layout**

```tsx
// src/app/(site)/layout.tsx
import { DesktopSidebar } from "@/components/site/desktop-sidebar";
import { MobileNav } from "@/components/site/mobile-nav";
import { TopActionBar } from "@/components/site/top-action-bar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <DesktopSidebar />
      <MobileNav />
      <TopActionBar />
      <main className="lg:ml-72">{children}</main>
    </div>
  );
}
```

- [ ] **Step 2: Run build to verify it fails (site components missing)**

Run: `pnpm build`  
Expected: FAIL with missing module errors under `src/components/site/*`.

- [ ] **Step 3: Add minimal route scaffold and root-page handoff**

```tsx
// src/app/page.tsx
import { redirect } from "next/navigation";
export default function RootPage() {
  redirect("/");
}
```

```tsx
// src/app/(site)/work/page.tsx (similar for journal/about/contact)
export default function WorkPage() {
  return <section className="px-6 py-24 lg:px-12">Work page placeholder</section>;
}
```

- [ ] **Step 4: Run lint/build**

Run: `pnpm lint && pnpm build`  
Expected: PASS once site shell placeholders exist.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/app/(site)/layout.tsx src/app/(site)/page.tsx src/app/(site)/work/page.tsx src/app/(site)/journal/page.tsx src/app/(site)/about/page.tsx src/app/(site)/contact/page.tsx
git commit -m "feat: scaffold site route group and placeholder pages"
```

---

### Task 3: Build reusable UI primitives

**Files:**
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/icon-button.tsx`
- Create: `src/components/ui/card.tsx`
- Create: `src/components/ui/chip.tsx`
- Create: `src/components/ui/section-heading.tsx`
- Create: `src/components/ui/nav-item.tsx`

- [ ] **Step 1: Write failing usage in a temporary homepage stub**

```tsx
// src/app/(site)/page.tsx (temporary)
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <section className="px-6 py-24 lg:px-12">
      <SectionHeading label="Assortment" title="The Technical Stack" />
      <Card><p>Stub</p></Card>
      <Button>Learn more</Button>
    </section>
  );
}
```

- [ ] **Step 2: Run build to verify missing primitive modules fail**

Run: `pnpm build`  
Expected: FAIL for unresolved `@/components/ui/*`.

- [ ] **Step 3: Implement primitives with token-only styling**

```tsx
// src/components/ui/button.tsx
import { cva } from "class-variance-authority";
import { type ButtonHTMLAttributes } from "react";

const buttonStyles = cva("inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] transition", {
  variants: {
    variant: {
      primary: "bg-primary text-white hover:opacity-90",
      secondary: "bg-surface-container-high text-on-surface hover:bg-surface-container",
      ghost: "text-primary hover:underline underline-offset-8",
    },
  },
  defaultVariants: { variant: "primary" },
});

export function Button({ className, variant, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  return <button className={buttonStyles({ variant, className })} {...props} />;
}
```

```tsx
// src/components/ui/card.tsx
export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <article className={`rounded-xl border border-outline-variant/15 bg-surface-container-high ${className}`}>{children}</article>;
}
```

- [ ] **Step 4: Run lint/build**

Run: `pnpm lint && pnpm build`  
Expected: PASS with primitives compiled.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/button.tsx src/components/ui/icon-button.tsx src/components/ui/card.tsx src/components/ui/chip.tsx src/components/ui/section-heading.tsx src/components/ui/nav-item.tsx src/app/(site)/page.tsx
git commit -m "feat: add reusable ui primitives for stitch layout"
```

---

### Task 4: Build site-level navigation and shell composites

**Files:**
- Create: `src/components/site/desktop-sidebar.tsx`
- Create: `src/components/site/mobile-nav.tsx`
- Create: `src/components/site/top-action-bar.tsx`
- Create: `src/lib/site-content.ts`
- Modify: `src/app/(site)/layout.tsx`

- [ ] **Step 1: Write failing content contract consumed by shell**

```tsx
// src/app/(site)/layout.tsx
import { navItems, externalLinks } from "@/lib/site-content";

<DesktopSidebar navItems={navItems} externalLinks={externalLinks} />;
<MobileNav navItems={navItems} externalLinks={externalLinks} />;
```

- [ ] **Step 2: Run build to verify missing content contract fails**

Run: `pnpm build`  
Expected: FAIL for unresolved `@/lib/site-content` exports.

- [ ] **Step 3: Implement shell composites and shared data source**

```ts
// src/lib/site-content.ts
export const navItems = [
  { href: "/work", label: "Work", icon: "BriefcaseBusiness" },
  { href: "/assortment", label: "Assortment", icon: "Grid2X2" },
  { href: "/journal", label: "Journal", icon: "NotebookText" },
  { href: "/contact", label: "Contact", icon: "AtSign" },
] as const;

export const externalLinks = [
  { href: "#", label: "GitHub", icon: "Code2" },
  { href: "#", label: "LinkedIn", icon: "UserRound" },
  { href: "#", label: "Email", icon: "Mail" },
  { href: "#", label: "Resume", icon: "FileText" },
] as const;
```

```tsx
// src/components/site/mobile-nav.tsx (shape)
"use client";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-[60] border-b border-outline-variant/10 bg-surface-container-high/80 backdrop-blur-xl lg:hidden">
      {/* top row + expandable panel */}
      <button aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>{open ? <X /> : <Menu />}</button>
      <ThemeToggle />
      <Search />
    </header>
  );
}
```

- [ ] **Step 4: Run lint/build**

Run: `pnpm lint && pnpm build`  
Expected: PASS with shell components wired.

- [ ] **Step 5: Commit**

```bash
git add src/components/site/desktop-sidebar.tsx src/components/site/mobile-nav.tsx src/components/site/top-action-bar.tsx src/lib/site-content.ts src/app/(site)/layout.tsx
git commit -m "feat: add responsive site shell navigation components"
```

---

### Task 5: Implement homepage section composites and assemble homepage

**Files:**
- Create: `src/components/site/hero-section.tsx`
- Create: `src/components/site/assortment-grid.tsx`
- Create: `src/components/site/work-grid.tsx`
- Create: `src/components/site/journal-list.tsx`
- Create: `src/components/site/site-footer.tsx`
- Modify: `src/app/(site)/page.tsx`
- Modify: `src/lib/site-content.ts`

- [ ] **Step 1: Write failing homepage assembly with missing section components**

```tsx
// src/app/(site)/page.tsx
import { HeroSection } from "@/components/site/hero-section";
import { AssortmentGrid } from "@/components/site/assortment-grid";
import { WorkGrid } from "@/components/site/work-grid";
import { JournalList } from "@/components/site/journal-list";
import { SiteFooter } from "@/components/site/site-footer";
import { homeContent } from "@/lib/site-content";

export default function HomePage() {
  return (
    <>
      <HeroSection content={homeContent.hero} />
      <AssortmentGrid content={homeContent.assortment} />
      <WorkGrid content={homeContent.work} />
      <JournalList content={homeContent.journal} />
      <SiteFooter content={homeContent.footer} />
    </>
  );
}
```

- [ ] **Step 2: Run build to verify missing section modules fail**

Run: `pnpm build`  
Expected: FAIL with unresolved imports for section composites.

- [ ] **Step 3: Implement section composites with Stitch-aligned structure**

```tsx
// src/components/site/hero-section.tsx (shape)
import { Button } from "@/components/ui/button";

export function HeroSection({ content }: { content: { title: string; description: string; cta: string } }) {
  return (
    <section className="max-w-6xl px-6 pb-20 pt-32 md:px-12 lg:pt-40">
      <h1 className="mb-8 text-5xl font-extrabold tracking-tighter text-on-surface md:text-[5rem] md:leading-[0.9]">{content.title}</h1>
      <p className="mb-10 max-w-3xl text-lg font-medium leading-relaxed text-on-surface/70 md:text-2xl">{content.description}</p>
      <Button>{content.cta}</Button>
    </section>
  );
}
```

```tsx
// src/components/site/assortment-grid.tsx (shape)
export function AssortmentGrid() {
  return <section id="assortment" className="max-w-7xl px-6 py-20 md:px-12 md:py-24">{/* bento cells */}</section>;
}
```

```ts
// src/lib/site-content.ts (home data shape)
export const homeContent = {
  hero: { title: "I'm Scott Gilbert", description: "A systems engineer building resilient backends and high-fidelity gaming experiences. Bridging the gap between kernel-level performance and user-centric design.", cta: "Learn More" },
  assortment: { /* chips, quote, lab bullets, beyond-code copy */ },
  work: { /* section title + 2 cards */ },
  journal: { /* 3 entries */ },
  footer: { /* labels + links */ },
} as const;
```

- [ ] **Step 4: Run lint/build**

Run: `pnpm lint && pnpm build`  
Expected: PASS with homepage fully composed.

- [ ] **Step 5: Commit**

```bash
git add src/app/(site)/page.tsx src/components/site/hero-section.tsx src/components/site/assortment-grid.tsx src/components/site/work-grid.tsx src/components/site/journal-list.tsx src/components/site/site-footer.tsx src/lib/site-content.ts
git commit -m "feat: assemble stitch-aligned homepage sections"
```

---

### Task 6: Match visual details, ensure accessibility, and finalize hygiene

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/site/*.tsx` (as needed for spacing/typography parity)
- Modify: `.gitignore`

- [ ] **Step 1: Write failing parity checklist against Stitch references**

```md
Checklist:
- Sidebar width and fixed positioning match desktop reference
- Mobile top bar + dropdown behavior match mobile reference
- Hero typography/spacing match both references
- Assortment card spans and section rhythm match
- Work/Journal/Footer spacing and typography match
- Theme toggle visible in desktop + mobile chrome
```

- [ ] **Step 2: Run lint/build and capture current mismatch notes**

Run: `pnpm lint && pnpm build`  
Expected: PASS code health, with manual parity notes identifying required spacing/typography tweaks.

- [ ] **Step 3: Apply final polish + artifact ignore**

```gitignore
# local brainstorming and stitch captures
.superpowers/
```

```css
/* globals.css fine-tuning examples */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 1.5rem;
}
```

- [ ] **Step 4: Run final validation**

Run: `pnpm lint && pnpm build`  
Expected: PASS with final desktop/mobile parity acceptable to reference screens.

- [ ] **Step 5: Commit**

```bash
git add .gitignore src/app/globals.css src/components/site
git commit -m "chore: finalize stitch parity polish and repo hygiene"
```

---

## Final Verification Sequence

- [ ] Run `pnpm lint`
- [ ] Run `pnpm build`
- [ ] Run `pnpm dev` and visually compare homepage at:
  - Mobile width (`390px`-equivalent)
  - Desktop width (`1280px` and wider)
- [ ] Confirm theme persistence across refresh.
- [ ] Confirm route placeholders resolve without 404.

---

## Self-Review (Plan Quality)

### 1. Spec coverage check
- Global style/token pass: covered in Task 1 and Task 6.
- Reusable components pass: covered in Tasks 3 and 4.
- Homepage assembly pass: covered in Task 5.
- DESIGN.md requirement: covered in Task 1.
- Light/dark toggle + persistence: covered in Task 1 and shell usage in Task 4.
- Route placeholders for future pages: covered in Task 2.

### 2. Placeholder scan
- No `TBD`, `TODO`, “implement later”, or empty implementation directives remain.
- Each task includes concrete files, code snippets, and explicit commands.

### 3. Type/contract consistency
- Theme contracts: `ThemeProvider`/`useTheme`/`ThemeToggle` names are consistent.
- Site content import path and export names (`homeContent`, `navItems`, `externalLinks`) are consistent across tasks.
- Route-group layout and homepage composition paths align with App Router structure.

