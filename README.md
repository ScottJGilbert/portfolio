# Verdant Editorial Portfolio

Modernized public portfolio built with Next.js App Router, a semantic token system, and reusable editorial UI primitives.

## Public Route Map

- `/` Home
- `/about` About
- `/projects` Projects
- `/blog` Blog
- `/legal` Legal
- `/attributions` Attributions

## Shell Architecture

- **Shared frame:** `src/components/shell/AppShell.tsx` renders skip link, desktop sidebar, mobile header, theme toggle, main content target, and footer.
- **Sidebar navigation:** `DesktopSidebar` and `MobileHeader` both consume `coreNav` for internal routes and `externalNav` for external links via `SidebarNavGroup` and `ExternalLinksGroup`.
- **Footer composition:** `Footer` renders three columns from `footerColumns` (`Sitemap`, `Legal`, `Elsewhere`) to keep shell navigation contracts centralized in `src/data/navigation.ts`.

## Motion Strategy

- `MotionSection` (`src/components/motion/MotionSection.tsx`) uses Framer Motion for small entrance motion with `initial={false}` to avoid hidden initial states.
- Motion behavior is declarative per section, with static fallback when `useReducedMotion()` is enabled.
- Global reduced-motion handling lives in `src/app/globals.css` under `@media (prefers-reduced-motion: reduce)`, forcing near-zero animation/transition durations and removing motion transforms.

## Architecture Summary

- **Token contract:** `src/lib/design/tokens.ts` defines verdant semantic scales used by global styles and components.
- **Global foundation:** `src/app/globals.css` applies color, focus, skip-link, and reduced-motion behavior.
- **Reusable primitives:** `src/components/primitives` contains shared cards, buttons, headers, chips, metadata rows, and editorial list items.
- **Page/content separation:** route pages in `src/app` are composed from typed content modules in `src/data`.

## Scripts

- `pnpm dev` start the local development server
- `pnpm test` run Vitest suites
- `pnpm test:watch` run Vitest in watch mode
- `pnpm lint` run ESLint
- `pnpm build` create the production build
- `pnpm start` run the production server
