---
name: home-screen-project-cards-refactor
description: Refactor home screen project cards to use data from /projects/content.ts
type: project
---

# Home Screen Project Cards Refactor

## Overview
Refactor the project cards on the home screen to use the central project data store in `src/app/(site)/projects/content.ts` instead of hardcoded content in the home page. This is a temporary measure before moving to an external API.

## Goals
- Remove hardcoded project data from `src/app/(site)/(home)/page.tsx`.
- Use `src/app/(site)/projects/content.ts` as the single source of truth.
- Link project cards directly to their respective detail pages.
- Update `ProjectsGrid` components to match the `Project` interface.

## Design

### Data Flow
1. Import `projects` from `src/app/(site)/projects/content.ts` in `src/app/(site)/(home)/page.tsx`.
2. Filter `projects` to find the first two entries that do not contain "(WIP)" in their description.
3. Pass these filtered projects to the `ProjectsGrid` component.

### Component Changes

#### `ProjectsGrid` and Children
- Update prop types to use the `Project` interface from `content.ts`.
- Map the following fields:
    - `image.src` $\rightarrow$ `image_url`
    - `tags` $\rightarrow$ `categories`
    - `href` $\rightarrow$ `/projects/${project.slug}`
- For `image.alt`, use the project `title`.

## Success Criteria
- The home page displays two non-WIP projects from `content.ts`.
- Clicking a project card navigates to `/projects/[slug]`.
- No hardcoded project data remains in `src/app/(site)/(home)/page.tsx`.
