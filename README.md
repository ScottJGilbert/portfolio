# scottgilbert.dev

Scott Gilbert's personal portfolio — a fully static-content Next.js site covering About, Projects, and Contact, deployed on Vercel.

## Stack

- **Next.js 16** (App Router, Turbopack) — see [AGENTS.md](./AGENTS.md) for this version's breaking changes vs. older Next.js docs/training data (`middleware.ts` → `proxy.ts`, async `cookies()`, etc.)
- **React 19**, **TypeScript**
- **Tailwind CSS v4** (`@theme inline`, CSS custom properties) — see [DESIGN.md](./DESIGN.md) for the token system
- **react-icons** + **devicons-react** for tech-stack/brand icons
- **Vercel Analytics**, **Motion** (animation), **typewriter-effect**
- Hosted on **Vercel**

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

```bash
pnpm lint       # eslint
pnpm build      # production build + typecheck
```

Note: `next.config.ts` sets `output: "standalone"`, which Vercel handles automatically but which breaks `next start` locally — for a local production-mode check, run `node .next/standalone/server.js` after copying `public/` and `.next/static/` into `.next/standalone/` (see Next.js's standalone output docs), or just use `pnpm dev` for day-to-day work.

## Project structure

```
src/app/(site)/          route groups sharing the sidebar/footer chrome
  about/                 About page + content.ts (experience, education, certifications)
  projects/               Projects listing, search/filter, and per-project routes
    delos/                example of a project with sub-routes (dash/array/mppts)
    <slug>/page.tsx        one hand-authored JSX route per project with a real write-up
    [slug]/page.tsx         fallback for WIP/metadata-only projects + 404
    components/             ProjectShell (facts panel), ProjectsExplorer (search/filter), tabs
  contact/, legal/, attributions/
src/app/r/[code]/route.ts  recruiter-tracking vanity redirects (sets a cookie, see below)
src/app/sitemap.ts, robots.ts
src/lib/
  projects/content.ts      single source of truth for project metadata (dates, stack, categories, links)
  projects/select-featured.ts  picks featured projects, personalized by the recruiter cookie
  recruiter-links.ts        /r/<code> → category config
  site-content.ts            nav items, external links (GitHub/LinkedIn/etc.) — the canonical source
  tech-stack.ts               name → icon/color map for stack badges
src/components/
  ui/                    generic primitives (Card, Chip, SectionHeading, OrgLogo, TechStackComponent, ...)
  site/                  site chrome (sidebar, mobile nav, footer, top action bar)
```

## Content architecture

Each page's copy lives in a co-located `content.ts` next to its `page.tsx` (e.g. `about/content.ts`, `contact/content.ts`). The Projects section is a hybrid:

- **Metadata** (dates, categories, stack, recruiter categories, role/team/contribution/links) lives centrally in `src/lib/projects/content.ts` — this is what drives the listing page, search/filter, the home page's featured picks, the sitemap, and each project's facts panel.
- **Body content** (the actual write-up) is hand-authored JSX directly in each project's own route folder, not stored as data. A project with real content gets a literal route folder (`src/app/(site)/projects/<slug>/page.tsx`); Next.js resolves that ahead of the `[slug]` catch-all automatically, so no routing config is needed. Projects without a write-up yet fall through to `[slug]/page.tsx`, which renders a "coming soon" placeholder from the metadata alone.

## Recruiter-tracking links

`/r/<code>` (see `src/lib/recruiter-links.ts` for the code → category map) redirects to `/` and sets a first-party, httpOnly `recruiter_categories` cookie (90-day expiry, no third-party tracker involved — disclosed on the [Legal](https://scottgilbert.dev/legal) page). `src/lib/projects/select-featured.ts` reads that cookie to reorder featured projects on the home page and `/projects`; with no cookie, it falls back to the static default order.

## Deployment

Deployed on Vercel from this repository. Whether the site stays on Vercel or moves to self-hosted/containerized infrastructure long-term is an open decision — nothing here assumes either outcome.

## For AI coding agents

Read [AGENTS.md](./AGENTS.md) first — this Next.js version has breaking changes from what most training data assumes. See [DESIGN.md](./DESIGN.md) for the token/component system, [REFERENCES.md](./REFERENCES.md) for sources checked while verifying APIs/icon coverage, and [TODO.md](./TODO.md) for known follow-ups.
