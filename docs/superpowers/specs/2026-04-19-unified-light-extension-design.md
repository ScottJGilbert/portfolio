# Unified Light Extension Design (Verdant Editorial Portfolio)

## 1. Problem and Objective

The current redesign branch established a strong baseline (tokens, shell, primitives, and core routes), but the experience is still structurally minimal relative to the intended Unified Light direction. The next phase should deepen the shell, content density, and interaction quality while preserving the existing route map and component-first architecture.

Primary objective: evolve the current site into a richer editorial product by extending the existing system, not replacing it.

## 2. Scope

### In Scope

- Sidebar redesign into a visually distinct architectural panel.
- External navigation block in sidebar: GitHub, LinkedIn, X/Twitter, Email.
- Expanded three-column footer (sitemap, legal/aux, brand block).
- Contentful enhancements across core and utility pages using existing component patterns.
- Motion and transition upgrades via lightweight animation library plus CSS fallbacks.
- Unified Light fidelity first; dark mode receives targeted refinement after light-mode completion.

### Out of Scope

- Route map changes or major IA expansion beyond existing public routes.
- Backend/data-source integration work.
- Replacing the token system with an unrelated theming approach.

## 3. Chosen Approach

Selected approach: **Shell-first expansion**.

Why:

- It maximizes consistency and reuse across all pages.
- It creates the strongest visual step toward Unified Light fastest.
- It reduces rework risk by establishing final navigation/chrome constraints before deep content expansion.

## 4. Architecture and UI System Design

## 4.1 Shell Architecture

The application shell remains the top-level composition point and is upgraded with a stronger hierarchy:

- Desktop: a featured sidebar rail with tonal layering and subtle glass treatment.
- Mobile: compact header with an equivalent navigation model (including external links) exposed through a compact nav sheet/drawer pattern.
- Footer: three-column global footer for low-priority but important navigation and legal context.

The shell continues to frame all routes and owns cross-page navigation consistency.

## 4.2 Sidebar Structure

Sidebar sections (top to bottom):

1. **Brand block** — identity, role, concise positioning copy.
2. **Core nav block** — Home, About, Projects, Blog.
3. **External block** — GitHub, LinkedIn, X/Twitter, Email.
4. **Action block** — theme toggle and optional resume/primary CTA.

Separation is done through spacing, typography, and tonal containers (no hard divider lines except accessibility-required ghost treatments).

## 4.3 Footer Structure

Three-column footer:

1. **Sitemap** — primary route links and key in-page anchors where appropriate.
2. **Legal/Auxiliary** — legal, attributions, privacy/usage links.
3. **Brand block** — mark/wordmark zone, concise descriptor, optional timestamp/availability line.

Footer should feel supportive and quiet; it should not compete with hero or primary page content.

## 4.4 Component Evolution Strategy

Existing primitives remain the base and gain controlled variants:

- `BentoCard`: feature/metric/timeline/quote variants.
- `EditorialListItem`: project/article/legal-note variants.
- `MetaRow`: adds metrics such as reading time, impact, platform.
- New supporting primitives: `StatPill`, `TimelineItem`, `SocialLinkChip`.

Shell components gain composable children:

- `SidebarPanel`, `SidebarNavGroup`, `ExternalLinksGroup`, `ProfileBadge`, `SidebarActionCluster`
- `FooterColumn`, `FooterLinkList`, `FooterBrandBlock`
- `MobileNavSheet` sharing the same data model as sidebar groups

## 5. Content Model and Page Design

Typed data modules remain the source of content contracts.

## 5.1 Home

- Expanded hero cluster (positioning + CTA set).
- Featured work bento grid with impact snapshots.
- Current focus strip and recent writing preview.
- Credibility row (domains, outcomes, working style).

## 5.2 About

- Principles, approach, and operating model sections.
- Career timeline with milestone entries.
- Tooling/collaboration profile.

## 5.3 Projects

- Case-study oriented cards: challenge, approach, outcome.
- Metrics and stack chips.
- Optional featured case spotlight module.

## 5.4 Blog

- Highlighted lead article.
- Rich list items with topic, date, reading-time metadata.
- Series/topic group affordances.

## 5.5 Legal and Attributions

- Expand from minimal copy to structured sections.
- Ensure legal discoverability from footer and sitemap references.

## 6. Motion and Interaction

Use a lightweight motion library for targeted composition-level behavior:

- Sidebar section entrance sequencing.
- Section-level page-entry transitions.
- Micro-interactions on cards, chips, and controls.

Rules:

- Motion is subtle and editorial (no novelty effects).
- Every animated state has a static equivalent.
- `prefers-reduced-motion` disables nonessential animation.

## 7. Accessibility and UX Constraints

- Preserve WCAG 2.2 AA baseline.
- Maintain semantic landmarks and skip-link continuity.
- Ensure visible focus treatment on all interactive shell regions.
- Validate contrast in Unified Light first, then dark mode refinement pass.
- Preserve keyboard-accessible navigation for desktop and mobile shell patterns.

## 8. Data Flow and Responsibility Boundaries

- Route pages compose content from typed `src/data/*` modules.
- Shell components consume shared navigation + external-link models.
- Primitives remain presentation-focused and variant-driven.
- Motion wrappers are introduced at composition boundaries, not inside every primitive.

This keeps units isolated, easier to test, and safe to evolve independently.

## 9. Testing and Verification Strategy

- Update unit/integration tests for:
  - sidebar sections and external links
  - footer three-column link coverage
  - route-map invariants
  - component variants and metadata rendering
- Add interaction tests for motion fallbacks under reduced-motion preference.
- Retain full suite checks for test/lint/build.

## 10. Risks and Mitigations

- **Risk:** richer shell could overwhelm content.
  - **Mitigation:** keep tonal hierarchy restrained; content area stays visually dominant.
- **Risk:** motion dependency sprawl.
  - **Mitigation:** limit animation library usage to composition wrappers.
- **Risk:** content depth causes component drift.
  - **Mitigation:** enforce variant-based extension over ad hoc one-off components.

## 11. Success Criteria

- Sidebar is visually distinct, functionally richer, and includes external links.
- Footer is expanded and useful without becoming noisy.
- Core and utility pages feel contentful and intentional, not placeholder-like.
- Unified Light visual fidelity is materially closer to the Stitch direction.
- Existing architecture (tokens/shell/primitives/data contracts) remains coherent and reusable.
