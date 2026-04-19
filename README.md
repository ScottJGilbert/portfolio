# Verdant Editorial Portfolio

Modernized public portfolio built with Next.js App Router, a semantic token system, and reusable editorial UI primitives.

## Public Route Map

- `/` Home
- `/about` About
- `/projects` Projects
- `/blog` Blog
- `/legal` Legal
- `/attributions` Attributions

## Architecture Summary

- **Token contract:** `src/lib/design/tokens.ts` defines the verdant semantic scales used by global styles and components.
- **Global foundation:** `src/app/globals.css` applies color/motion/focus rules, skip-link behavior, and accessibility helpers.
- **Shell composition:** `src/components/shell` provides the shared layout frame (desktop sidebar, mobile header, footer, theme toggle, skip link target).
- **Reusable primitives:** `src/components/primitives` contains shared cards, buttons, headers, chips, metadata rows, and editorial list items used across pages.
- **Page/content separation:** Route pages in `src/app` are composed from typed content modules in `src/data`.

## Scripts

- `pnpm dev` start the local development server
- `pnpm test` run Vitest suites
- `pnpm lint` run ESLint
- `pnpm build` create the production build
- `pnpm start` run the production server
