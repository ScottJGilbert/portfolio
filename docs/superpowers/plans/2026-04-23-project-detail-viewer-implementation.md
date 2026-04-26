# Project Detail Viewer Styling Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a blog-like, route-scoped styled project detail page that uses lexical `ViewerTheme.css` plus local viewer polish without affecting other routes.

**Architecture:** Keep a two-layer implementation. The page component defines the article shell (header, compact facts panel, content body) and handles missing-project UX. A route-local stylesheet, imported after lexical baseline styles, applies scoped rules under `.project-article` to target `ViewerTheme__*` hooks (headings, paragraphs, links, lists, quote, code, tables, and error state).

**Tech Stack:** Next.js App Router (v16), React 19, TypeScript, Tailwind CSS v4, `@scottjgilbert/lexical-blog-editor` Viewer.

---

## File Structure and Responsibilities

### Create

- `src/app/(site)/projects/[slug]/project-viewer.css`
  - Route-scoped viewer polish for lexical output (`ViewerTheme__*`) and `.LexicalBlogViewer__Error`.

### Modify

- `src/app/(site)/projects/[slug]/page.tsx`
  - Blog-like article layout, metadata facts panel, styled not-found state, and style imports (`ViewerTheme.css` + local CSS).

### Test/Verification

- No dedicated test suite currently exists in this app. Verification uses lint/type-check + manual route checks documented below.

---

### Task 1: Convert Project Detail Page To Article Shell

**Files:**

- Modify: `src/app/(site)/projects/[slug]/page.tsx`

- [ ] **Step 1: Capture baseline behavior before edits**

Run: `git -C "c:\Users\scott\Code\Web Projects\personal-content-system\portfolio" --no-pager diff -- src/app/(site)/projects/[slug]/page.tsx`
Expected: Shows current minimal project page markup with unstyled `<div>`, simple spans, and `<Viewer {...content} />`.

- [ ] **Step 2: Replace page with article layout and styled not-found state**

```tsx
import Link from "next/link";
import { projects, type Project } from "./content";
import Viewer, {
  type ViewerProps,
} from "@scottjgilbert/lexical-blog-editor/viewer";
import "@scottjgilbert/lexical-blog-editor/styles/ViewerTheme.css";
import "./project-viewer.css";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project: Project | undefined = projects.find(
    (p) => p.slug === params.slug,
  );

  if (!project) {
    return (
      <section className="px-6 py-12 md:px-10 lg:px-12">
        <div className="mx-auto max-w-3xl rounded-2xl border border-outline-ghost bg-surface px-6 py-8 shadow-ambient">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Projects
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Project not found
          </h1>
          <p className="mt-3 text-sm leading-7 text-muted">
            The requested project does not exist or is not currently published.
          </p>
          <Link
            href="/projects"
            className="mt-5 inline-flex text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  const content: ViewerProps = {
    state: project.content,
    sanitize: true,
  };

  const hasCategories = project.categories.length > 0;
  const hasSkills = project.skills.length > 0;

  return (
    <section className="px-6 py-10 md:px-10 lg:px-12">
      <article className="project-article mx-auto max-w-3xl space-y-8">
        <header className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Project
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {project.title}
          </h1>
          <p className="text-sm leading-7 text-muted md:text-base">
            {project.description}
          </p>
        </header>

        <section
          aria-label="Project facts"
          className="rounded-2xl border border-outline-ghost bg-surface-alt/75 p-5 md:p-6"
        >
          <dl className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">
                Timeline
              </dt>
              <dd className="text-sm text-foreground">
                {project.start_date}
                {project.end_date ? ` - ${project.end_date}` : " - Present"}
              </dd>
            </div>

            {hasCategories ? (
              <div className="space-y-2">
                <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">
                  Categories
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {project.categories.map((category) => (
                    <span
                      key={category}
                      className="rounded-full border border-outline-ghost bg-surface px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted"
                    >
                      {category}
                    </span>
                  ))}
                </dd>
              </div>
            ) : null}

            {hasSkills ? (
              <div className="space-y-2 md:col-span-2">
                <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">
                  Skills
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-outline-ghost bg-surface px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </dd>
              </div>
            ) : null}
          </dl>
        </section>

        <section aria-label="Project content" className="space-y-4">
          <Viewer {...content} />
        </section>
      </article>
    </section>
  );
}
```

- [ ] **Step 3: Run lint to catch JSX/classname/type issues**

Run: `pnpm --dir "c:\Users\scott\Code\Web Projects\personal-content-system\portfolio" lint`
Expected: ESLint completes with no errors in `src/app/(site)/projects/[slug]/page.tsx`.

- [ ] **Step 4: Commit Task 1**

```bash
git -C "c:\Users\scott\Code\Web Projects\personal-content-system\portfolio" add "src/app/(site)/projects/[slug]/page.tsx"
git -C "c:\Users\scott\Code\Web Projects\personal-content-system\portfolio" commit -m "feat: style project detail page as article shell"
```

---

### Task 2: Add Route-Scoped Lexical Viewer Polish

**Files:**

- Create: `src/app/(site)/projects/[slug]/project-viewer.css`
- Modify: `src/app/(site)/projects/[slug]/page.tsx` (already imports this file from Task 1)

- [ ] **Step 1: Add route-scoped viewer stylesheet**

```css
.project-article {
  --article-body-size: 1rem;
  --article-body-line: 1.75;
  --article-heading-line: 1.2;
}

.project-article .LexicalBlogViewer__Error {
  border: 1px solid var(--outline-ghost);
  border-radius: 0.875rem;
  background: color-mix(in srgb, var(--surface-alt) 70%, transparent);
  color: var(--foreground);
  padding: 0.875rem 1rem;
  font-size: 0.9rem;
}

.project-article .ViewerTheme__paragraph {
  color: var(--foreground);
  font-size: var(--article-body-size);
  line-height: var(--article-body-line);
  margin: 0 0 1rem;
}

.project-article .ViewerTheme__h1,
.project-article .ViewerTheme__h2,
.project-article .ViewerTheme__h3 {
  color: var(--foreground);
  line-height: var(--article-heading-line);
  letter-spacing: -0.015em;
  margin: 2rem 0 0.75rem;
}

.project-article .ViewerTheme__h1 {
  font-size: clamp(1.75rem, 1.5rem + 1vw, 2.2rem);
}

.project-article .ViewerTheme__h2 {
  font-size: clamp(1.35rem, 1.2rem + 0.7vw, 1.75rem);
}

.project-article .ViewerTheme__h3 {
  font-size: clamp(1.1rem, 1.05rem + 0.45vw, 1.35rem);
}

.project-article .ViewerTheme__quote {
  margin: 1.25rem 0;
  border-left: 3px solid var(--primary);
  padding: 0.625rem 0 0.625rem 1rem;
  color: var(--muted);
  font-style: italic;
  background: color-mix(in srgb, var(--primary-container) 45%, transparent);
  border-radius: 0.4rem;
}

.project-article .ViewerTheme__ul,
.project-article .ViewerTheme__ol1,
.project-article .ViewerTheme__ol2,
.project-article .ViewerTheme__ol3,
.project-article .ViewerTheme__ol4,
.project-article .ViewerTheme__ol5 {
  margin: 0 0 1rem;
  padding-left: 1.5rem;
}

.project-article .ViewerTheme__listItem {
  margin: 0.35rem 0;
  line-height: 1.7;
}

.project-article .ViewerTheme__link {
  color: var(--primary);
  text-decoration: underline;
  text-decoration-thickness: 0.08em;
  text-underline-offset: 0.18em;
  transition: color 140ms ease;
}

.project-article .ViewerTheme__link:hover,
.project-article .ViewerTheme__link:focus-visible {
  color: color-mix(in srgb, var(--primary) 75%, var(--foreground));
}

.project-article .ViewerTheme__textCode {
  font-family:
    var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Consolas,
    monospace;
  font-size: 0.88em;
  background: var(--surface-alt);
  border: 1px solid var(--outline-ghost);
  border-radius: 0.35rem;
  padding: 0.1rem 0.35rem;
}

.project-article .ViewerTheme__code {
  margin: 1.25rem 0;
  border: 1px solid var(--outline-ghost);
  border-radius: 0.9rem;
  background: var(--surface-inset);
  color: var(--foreground);
  overflow-x: auto;
}

.project-article .ViewerTheme__code code,
.project-article .ViewerTheme__code pre {
  font-family:
    var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Consolas,
    monospace;
  font-size: 0.9rem;
  line-height: 1.6;
}

.project-article .ViewerTheme__hr {
  border: 0;
  border-top: 1px solid var(--outline-ghost);
  margin: 2rem 0;
}

.project-article .ViewerTheme__tableScrollableWrapper {
  margin: 1.25rem 0;
  overflow-x: auto;
  border: 1px solid var(--outline-ghost);
  border-radius: 0.75rem;
  background: var(--surface);
}

.project-article .ViewerTheme__table {
  width: 100%;
  border-collapse: collapse;
  min-width: 36rem;
}

.project-article .ViewerTheme__tableCell,
.project-article .ViewerTheme__table th,
.project-article .ViewerTheme__table td {
  border: 1px solid var(--outline-ghost);
  padding: 0.55rem 0.65rem;
  vertical-align: top;
}

.project-article .ViewerTheme__table th {
  background: var(--surface-alt);
  text-align: left;
}
```

- [ ] **Step 2: Type-check to catch CSS import or TS config regressions**

Run: `pnpm --dir "c:\Users\scott\Code\Web Projects\personal-content-system\portfolio" exec tsc --noEmit`
Expected: TypeScript completes with no errors.

- [ ] **Step 3: Commit Task 2**

```bash
git -C "c:\Users\scott\Code\Web Projects\personal-content-system\portfolio" add "src/app/(site)/projects/[slug]/project-viewer.css" "src/app/(site)/projects/[slug]/page.tsx"
git -C "c:\Users\scott\Code\Web Projects\personal-content-system\portfolio" commit -m "feat: add route-scoped lexical viewer styles"
```

---

### Task 3: Validate Visual Behavior and Route Isolation

**Files:**

- Verify behavior in: `src/app/(site)/projects/[slug]/page.tsx`
- Verify isolation across unrelated routes under: `src/app/(site)/**`

- [ ] **Step 1: Start dev server for manual verification**

Run: `pnpm --dir "c:\Users\scott\Code\Web Projects\personal-content-system\portfolio" dev`
Expected: Next.js starts and serves a local URL.

- [ ] **Step 2: Validate acceptance criteria on representative project page**

Manual checklist:

- Confirm article shell spacing and typography align with existing site pages.
- Confirm compact facts panel appears above content with timeline, categories, and skills.
- Confirm lexical content styles render for headings, paragraph rhythm, links, lists, quotes, inline code, code blocks, and tables.
- Confirm long skill/category tags wrap cleanly on narrow viewport widths.

Expected: All checks pass without overlap, clipping, or unreadable contrast.

- [ ] **Step 3: Validate fallback and isolation behavior**

Manual checklist:

- Open a missing slug path and confirm styled not-found recovery state.
- Open at least two non-project routes (e.g., home and about) and confirm no viewer style bleed.

Expected: Not-found state is styled and clear; unrelated routes remain visually unchanged.

- [ ] **Step 4: Final verification command set and commit**

Run: `pnpm --dir "c:\Users\scott\Code\Web Projects\personal-content-system\portfolio" lint && pnpm --dir "c:\Users\scott\Code\Web Projects\personal-content-system\portfolio" exec tsc --noEmit`
Expected: Both commands complete successfully.

```bash
git -C "c:\Users\scott\Code\Web Projects\personal-content-system\portfolio" add "src/app/(site)/projects/[slug]/page.tsx" "src/app/(site)/projects/[slug]/project-viewer.css"
git -C "c:\Users\scott\Code\Web Projects\personal-content-system\portfolio" commit -m "chore: verify project detail viewer styling rollout"
```

---

## Spec Coverage Check

- Article-like layout: covered in Task 1 Step 2.
- Compact facts panel above content: covered in Task 1 Step 2.
- `ViewerTheme.css` baseline import: covered in Task 1 Step 2.
- Route-scoped `ViewerTheme__*` polish: covered in Task 2 Step 1.
- Styled missing-project and viewer error handling: covered in Task 1 Step 2 and Task 2 Step 1.
- Regression prevention on non-project routes: covered in Task 3 Step 3.

## Placeholder Scan

- No `TODO`, `TBD`, or unspecified "appropriate" behavior remains.
- All code-changing steps include concrete code blocks.
- All run steps include exact commands and expected outcomes.

## Type/Signature Consistency Check

- `ProjectPage` signature remains `({ params }: { params: { slug: string } })`.
- Viewer props remain `ViewerProps` with `state` and `sanitize`.
- CSS scope anchor `.project-article` is used consistently across JSX and stylesheet.
