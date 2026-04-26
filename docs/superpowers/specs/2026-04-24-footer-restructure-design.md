---
name: footer-restructure-design
description: Design for restructuring the site footer into a multi-column grid navigation system.
type: design-spec
date: 2026-04-24
---

# Footer Restructure Design

## Goal
Transform the minimal footer into a comprehensive site map with three distinct navigation sections to improve site discoverability and provide a professional, structured bottom-of-page experience.

## Visual & Layout Design

### Constraints
- Must remain within the existing `max-w-5xl` container for alignment.
- Must maintain existing color palette and typography (muted text, uppercase tracking for headers).

### Layout Structure
The footer will use a responsive grid system:

- **Mobile:** Single column, center-aligned. Sections stack vertically with generous spacing.
- **Desktop (md+):** A grid layout.
    - **Column 1:** Branding and Copyright.
    - **Column 2:** Site Navigation.
    - **Column 3:** External Links.
    - **Column 4:** Auxiliary Links.

### Styling Details
- **Top Border:** `border-t border-outline-ghost/70`
- **Section Headers:** `text-xs uppercase tracking-[0.16em] text-muted font-medium`
- **Links:** `text-sm text-muted transition-colors hover:text-primary`
- **Spacing:** Consistent vertical gap between link items and section headers.

## Content Mapping

### Section 1: Site Navigation
- Home (`/`)
- About (`/about`)
- Projects (`/projects`)
- Contact (`/contact`)

### Section 2: External Links
- Blog (External/Internal TBD based on content)
- Resume (`/resume` or external)
- GitHub (External)
- LinkedIn (External)
- Email (mailto:)

### Section 3: Auxiliary Links
- Attributions (New page: `/attributions`)
- Terms (`/legal#terms`)
- Privacy (`/legal#privacy`)
- Sitemap (New page: `/sitemap`)
- RSS (New page: `/rss` - marked as WIP)

## Implementation Notes
- Create new page components for `/attributions`, `/sitemap`, and `/rss`.
- Ensure the `SiteFooter` component is refactored to use a data-driven approach for the link lists to keep the JSX clean.
- Verify alignment with the main content area by sticking to the existing `max-w-5xl` and `px-6 md:px-12` constraints.
