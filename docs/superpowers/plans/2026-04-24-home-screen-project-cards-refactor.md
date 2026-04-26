# Home Screen Project Cards Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor home screen project cards to use data from `src/app/(site)/projects/content.ts` and link directly to project detail pages.

**Architecture:** Update `ProjectsGrid` to use the `Project` interface from `content.ts`. Filter the project list in the home page to select the first two non-WIP projects.

**Tech Stack:** Next.js, TypeScript, React

---

## File Structure

- Modify: `src/app/(site)/(home)/page.tsx` - Import projects and filter for the top 2 non-WIP projects.
- Modify: `src/app/(site)/(home)/components/projects-grid.tsx` - Update types and mapping to use `Project` interface from `content.ts`.

---

### Task 1: Update ProjectsGrid Types and Mapping

**Files:**
- Modify: `src/app/(site)/(home)/components/projects-grid.tsx`

- [ ] **Step 1: Import Project interface and update types**

Import `Project` from `@/app/(site)/projects/content` and replace `HomeProject` interface.

```typescript
import { Project } from "@/app/(site)/projects/content";

// Remove HomeProject interface
// Update HomeProjectsContent to use Project[]
export interface HomeProjectsContent {
  eyebrow: string;
  title: string;
  archiveLabel: string;
  archiveHref: string;
  projects: readonly Project[];
}
```

- [ ] **Step 2: Update image and tags mapping**

Replace `project.image.src` with `project.image_url`, `project.image.alt` with `project.title`, and `project.tags` with `project.categories`.

```tsx
// Line 68
<img
  src={project.image_url}
  alt={project.title}
  ...
/>

// Line 91
{project.categories.map((tag) => (
  ...
))}
```

- [ ] **Step 3: Update link mapping**

Update `href` to use the project slug.

```tsx
// Line 57
<Link
  key={project.title}
  href={`/projects/${project.slug}`}
  className="group block"
>
```

- [ ] **Step 4: Verify with lint**

Run: `pnpm lint`
Expected: No errors in `projects-grid.tsx`

- [ ] **Step 5: Commit**

```bash
git add src/app/(site)/(home)/components/projects-grid.tsx
git commit -m "refactor: update ProjectsGrid to use Project interface from content.ts"
```

### Task 2: Integrate Projects Content in Home Page

**Files:**
- Modify: `src/app/(site)/(home)/page.tsx`

- [ ] **Step 1: Import projects and update homeContent**

Import `projects` from `@/app/(site)/projects/content`. Remove the hardcoded `projects` array from `homeContent.projects`.

```typescript
import { projects } from "@/app/(site)/projects/content";

// Inside homeContent.projects:
projects: [], // We will pass the filtered list to the component instead
```

- [ ] **Step 2: Implement non-WIP filtering logic**

Create a filtered list of projects that are not WIP and limit to 2.

```typescript
const featuredProjects = projects
  .filter(p => !p.description.includes("(WIP)"))
  .slice(0, 2);
```

- [ ] **Step 3: Pass filtered projects to ProjectsGrid**

Update the `ProjectsGrid` call to include the filtered projects.

```tsx
<ProjectsGrid 
  content={{
    ...homeContent.projects,
    projects: featuredProjects
  }} 
/>
```

- [ ] **Step 4: Verify with dev server**

Run: `pnpm dev`
Expected: Home page loads, showing 2 projects from `content.ts` (Agri-Sense and ICDA Website), and links lead to their respective slugs.

- [ ] **Step 5: Verify with lint**

Run: `pnpm lint`
Expected: No errors in `page.tsx`

- [ ] **Step 6: Commit**

```bash
git add src/app/(site)/(home)/page.tsx
git commit -m "feat: integrate filtered project content from content.ts on home page"
```
