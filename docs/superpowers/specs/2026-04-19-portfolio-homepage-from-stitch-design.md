# Portfolio Homepage Design Spec (Stitch-Aligned)

## Problem Statement
Build a production-ready portfolio homepage in the existing Next.js app that closely matches two Stitch references (desktop + mobile) while staying faithful to the selected design system. The implementation must prioritize visual parity with the Stitch screens, establish reusable foundations for future pages, and support both light and dark themes with a visible toggle.

## Inputs and References
- **Project:** `Website UX Redesign` (`10654248307498357332`)
- **Required references:**
  - Design system asset: `assets/2daf181d6c3a41c8b61e979628c216f5` (`Verdant Architect`)
  - Mobile screen: `60bb1fe8f70a46788d8f9f3a9a40acac` (`Portfolio Mobile - Refined Nav`)
  - Desktop screen: `8aa3f342352f43c9b7f90f788efc115e` (`Portfolio - Unified Light (V3)`)
- **Downloaded with `curl -L` to:** `.superpowers/stitch/`
  - `portfolio-mobile-refined-nav.html`
  - `portfolio-mobile-refined-nav.png`
  - `portfolio-unified-light-v3.html`
  - `portfolio-unified-light-v3.png`

## Confirmed Constraints
- Mirror Stitch content/copy for this phase.
- Include a visible theme toggle, with system preference default and user override persistence.
- Create route placeholders now (`/work`, `/journal`, `/about`, `/contact`) for future expansion.
- Aim for near pixel-match with only subtle improvements (accessibility + restrained motion).
- Prioritize Stitch screens over design-system prose when conflicts appear.

## Recommended Implementation Strategy (Selected)
**Token-heavy system-first**, then homepage assembly:
1. Define a robust semantic token layer first (colors, radii, spacing, typography, elevation, interaction states).
2. Build reusable primitives and composites that consume tokens only.
3. Assemble homepage from those components and tune spacing/typography for desktop + mobile parity.

---

## Section 1: Architecture

### App Structure
- Use App Router with a site route group:
  - `src/app/layout.tsx` for global providers and root HTML/body setup
  - `src/app/(site)/layout.tsx` for site shell orchestration
  - `src/app/(site)/page.tsx` for homepage
  - Placeholder pages:
    - `src/app/(site)/work/page.tsx`
    - `src/app/(site)/journal/page.tsx`
    - `src/app/(site)/about/page.tsx`
    - `src/app/(site)/contact/page.tsx`

### Theme System
- Use class-based dark mode (`.dark`) with:
  - Initial state from system (`prefers-color-scheme`)
  - User override persisted in `localStorage`
  - Client theme controller to avoid hydration mismatch and maintain predictable transitions

### Styling Foundation
- `src/app/globals.css` becomes the canonical token source:
  - Semantic CSS custom properties for surfaces, text, accents, borders, radii, spacing, and elevation
  - Light/dark token sets aligned with Stitch references and DS intent
  - Utility-compatible variables for Tailwind usage patterns

### Content Modeling
- Homepage content represented as typed data objects (hero copy, stack chips, work cards, journal entries, footer links) to keep components declarative and reusable.

---

## Section 2: Global Styling System (First Pass)

### Color and Surface Model
Design tokens will follow a layered surface system inspired by Stitch + DS:
- Base canvas (`surface`)
- Layered containers (`surface-container-low`, `surface-container`, `surface-container-high`, `surface-container-highest`)
- Low-contrast outlines (`outline-variant` at reduced opacity)
- Primary accent scale for active nav, chips, CTA, and hover state emphasis

### Typography
- Primary font: Inter.
- Hierarchy:
  - Hero display (very large, tight tracking)
  - Section labels (uppercase, high letter spacing)
  - Section headings/body with editorial spacing
  - Metadata and nav labels at smaller scales

### Corners, Borders, Depth
- Rounded corners primarily `8px`, `16px`, and full-pill.
- Soft boundaries only; avoid heavy lines.
- Use tonal layering + subtle shadowing rather than hard borders.

### Light and Dark Modes
- Light mode aligns to Stitch references as primary visual target.
- Dark mode uses the same semantic token map with shifted values for contrast and brand continuity.
- Component styles must remain semantic (no direct hardcoded color values inside components).

### Global Layout Rules
- Desktop:
  - Fixed left sidebar (`w-72`)
  - Main content offset to accommodate sidebar
  - Top-right action bar
- Mobile:
  - Fixed top nav
  - Expandable menu panel
  - Main flow spacing reduced but proportional

---

## Section 3: Reusable Components (Second Pass)

### `src/components/ui` (General Purpose)
- `Button` (primary, secondary, ghost/tertiary)
- `IconButton`
- `ThemeToggle`
- `Card` (surface variants)
- `Chip`
- `SectionHeading`
- `NavItem`
- `SurfacePanel`
- `Container`

### `src/components/site` (Portfolio-Specific)
- `DesktopSidebar`
- `MobileNav`
- `TopActionBar`
- `HeroSection`
- `AssortmentGrid`
- `WorkGrid`
- `JournalList`
- `SiteFooter`

### Icon Strategy
- Use local icon components (e.g., `lucide-react`) instead of remote icon fonts to improve reliability and keep rendering deterministic.
- Preserve icon semantics from Stitch (work, grid, journal, contact, connect, theme/search actions).

---

## Section 4: Homepage Assembly (Third Pass)

### Exact Section Sequence
1. Hero
2. Assortment / Technical Stack (bento-style layout)
3. Work / Selected Projects
4. Journal / Thought list
5. Footer

### Hero
- Large introductory headline
- Supporting description
- Primary CTA button
- Desktop and mobile scale adjustments mirror Stitch typography behavior

### Assortment Bento
- Four key cells:
  - Core Stack chips
  - Philosophy quote panel
  - Lab bullet list
  - Beyond Code media card
- Preserve asymmetric span behavior and spacing rhythm

### Work
- Section heading + archive CTA
- Two featured project cards with image, headline, summary, tags, directional icon

### Journal
- Three list rows with index, title, short description, date
- Hover/active states stay subtle and tonal

### Footer
- Identity text + utility links (Privacy, Accessibility, Colophon)
- Responsive stacking on smaller breakpoints

---

## Interaction and Behavior
- Theme toggle in desktop and mobile chrome; both reflect shared state.
- Mobile nav menu:
  - Open/close interaction
  - Keyboard-accessible trigger
  - Close on navigation selection
- Hover transitions:
  - Brief, subtle, non-distracting
  - Emphasis through tonal shift/scale instead of dramatic movement

## Accessibility and Semantics
- Landmarks: `header`, `nav`, `main`, `section`, `footer`.
- Clear heading structure (`h1` then section-level headings).
- Focus-visible styles for interactive elements.
- Contrast values preserved through token pairs (`on-*` against surface tokens).
- Buttons and toggles include explicit accessible labels.

## Error Handling and Edge Cases
- Theme storage read failures gracefully fall back to system mode.
- Missing image states use robust object-fit + safe fallback containers.
- Long text protection with wrapping rules in cards/list rows.

## Verification Criteria
- Homepage structure visually matches Stitch desktop + mobile references.
- Theme toggle works and persists.
- Navigation placeholders resolve to route stubs.
- Reusable components are used (not duplicated one-offs).
- Token system is centralized and used consistently.

## Out of Scope (This Spec)
- Building full content-rich secondary pages beyond placeholders.
- CMS/data backend integration.
- Advanced search implementation.

