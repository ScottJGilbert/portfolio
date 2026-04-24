# Project Detail Viewer Styling Design

Date: 2026-04-23
Status: Approved (design phase)
Scope: `portfolio` app only

## Summary

Style the project slug page as a blended article layout that feels like a blog post, while preserving the existing portfolio visual language. Use `ViewerTheme.css` as the lexical viewer baseline, then apply route-scoped polish on top for typography and rich content presentation.

## Goals

1. Make the project detail page visually consistent with the rest of the site.
2. Keep content reading-focused, with a lightweight post-like layout.
3. Style lexical `Viewer` output according to package documentation, using `ViewerTheme.css` plus scoped overrides.
4. Avoid global styling side effects on other routes.

## Non-Goals

1. No data-model changes for projects.
2. No content transformation pipeline for viewer state.
3. No global redesign of typography or theme tokens.

## Chosen Approach

Recommended and selected approach: Route-scoped polish.

- Keep `ViewerTheme.css` baseline styles for reliable lexical rendering.
- Add local, route-scoped CSS for `ViewerTheme__*` classes under a page wrapper.
- Keep layout shell in page JSX/Tailwind utilities.

## Architecture

Two-layer structure:

1. Page structure layer
- Update the slug page JSX into an article shell:
  - Header: project title, description, timeline line.
  - Compact post-facts panel: dates, categories, skills.
  - Body section: `Viewer` output.

2. Viewer styling layer
- Import lexical baseline:
  - `@scottjgilbert/lexical-blog-editor/styles/ViewerTheme.css`
- Add route-scoped stylesheet (same route folder) for custom polish.
- Scope all viewer overrides below a wrapper class (for example `.project-article`) to prevent bleed.

## Component and Data Flow

1. Slug resolution
- Keep local lookup from `projects` using `params.slug`.

2. Not-found state
- Render styled fallback state consistent with site surfaces.
- Include navigational recovery link back to projects index.

3. Viewer props
- Keep current safe viewer payload:
  - `state: project.content`
  - `sanitize: true`

4. Responsibility split
- Page JSX/Tailwind: structure, spacing, metadata panel.
- Route CSS: lexical viewer internals (`ViewerTheme__*` selectors).

## Viewer Styling Plan (Scoped)

Apply route-scoped polish to the following key hooks from the lexical styling guide:

1. Base/error
- `.LexicalBlogViewer__Error`
- Root viewer container inside `.project-article`

2. Text blocks
- `.ViewerTheme__paragraph`
- `.ViewerTheme__h1`, `.ViewerTheme__h2`, `.ViewerTheme__h3`
- `.ViewerTheme__quote`
- `.ViewerTheme__link` and hover/focus states

3. Lists and separators
- `.ViewerTheme__ul`, `.ViewerTheme__ol1` through `.ViewerTheme__ol5`
- `.ViewerTheme__listItem`
- `.ViewerTheme__hr`

4. Code and emphasis
- `.ViewerTheme__textCode` (inline code)
- `.ViewerTheme__code` (code blocks)
- Keep contrast and readability aligned to current light/dark tokens.

5. Tables and overflow handling
- `.ViewerTheme__tableScrollableWrapper`
- `.ViewerTheme__table`
- `.ViewerTheme__tableCell`

## Error Handling

1. Missing project slug
- Replace plain fallback with styled, accessible message and recovery link.

2. Viewer render issues
- Ensure `.LexicalBlogViewer__Error` is visibly styled and readable.

3. Empty metadata arrays
- Omit empty categories/skills rows without leaving extra separators or gaps.

## Testing and Verification

1. Static checks
- Run lint and type checks for `portfolio` app.

2. Manual checks
- Desktop and mobile layout for article shell.
- Facts panel wrapping behavior for long tags.
- Verify viewer styles are applied for headings, paragraphs, links, lists, quote, code, and tables.

3. Regression checks
- Confirm route-scoped styles do not affect unrelated pages.

## Implementation Boundaries

1. Files expected to change
- Project slug page component file.
- New route-local stylesheet for viewer polish.
- Import line(s) for `ViewerTheme.css` and local stylesheet.

2. Files expected not to change
- Global app theme tokens unless a blocker appears.
- Project content model and data definitions.

## Risks and Mitigations

1. Risk: CSS leakage to other pages.
- Mitigation: strict route wrapper scoping.

2. Risk: lexical default styles fighting custom overrides.
- Mitigation: import order keeps custom CSS after baseline.

3. Risk: edge-case content blocks (tables/code) rendering awkwardly.
- Mitigation: include explicit scoped styles for those selectors and validate manually.

## Acceptance Criteria

1. Project slug page has a coherent article-like layout aligned with existing site style.
2. Metadata appears in a compact post-facts panel above content.
3. Viewer output uses `ViewerTheme.css` baseline.
4. Viewer rich content receives route-scoped polish through `ViewerTheme__*` selectors.
5. Not-found and viewer error states are styled and readable.
6. No observable style regressions on non-project pages.
