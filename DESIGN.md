# Design Foundation (Task 1)

## Goals
- Establish a semantic, reusable token system for the portfolio UI.
- Support explicit light/dark theme switching with system-default behavior.
- Keep primitives implementation-ready for upcoming homepage sections.

## Global Tokens
The token layer is intentionally semantic and avoids tying component styles to raw color values:
- **Core surface tokens**: `background`, `surface`, `surface-alt`
- **Content tokens**: `foreground`, `muted`
- **Interaction tokens**: `primary`, `primary-foreground`, `accent`, `accent-foreground`
- **Structure tokens**: `border`, `ring`

These are authored as CSS variables and mapped into Tailwind v4 via `@theme inline` so utilities such as `bg-background`, `text-foreground`, `border-border`, and `ring-ring` stay token-driven.

## Spacing
A compact spacing scale supports responsive composition and consistent rhythm:
- `--space-2xs`: 0.25rem
- `--space-xs`: 0.5rem
- `--space-sm`: 0.75rem
- `--space-md`: 1rem
- `--space-lg`: 1.5rem
- `--space-xl`: 2rem
- `--space-2xl`: 3rem

## Typography
- Primary text stack uses Geist Sans via `--font-geist-sans`.
- Mono stack remains available via Geist Mono.
- Body defaults:
  - `--text-body`: 1rem
  - `--line-height-body`: 1.6
- Heading defaults:
  - `--text-heading`: `clamp(1.75rem, 1.3rem + 1.4vw, 2.5rem)`
  - `--line-height-heading`: 1.2

## Surfaces
- **Light mode** emphasizes high-clarity reading surfaces (light slate background + white cards).
- **Dark mode** uses deep navy surfaces with softened contrast for long-form readability.
- Border and ring tokens are tuned per mode for visible, accessible focus states.

## Light/Dark Behavior
- Theme modes: `light`, `dark`, `system`.
- Default mode is `system`, resolved via `prefers-color-scheme`.
- Selection is persisted in `localStorage` (`portfolio-theme` key).
- Resolved mode updates:
  - `document.documentElement.classList` (`.dark`)
  - `document.documentElement.style.colorScheme`

This keeps CSS, browser native controls, and utility classes aligned with the active theme.
