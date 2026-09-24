# Design & Architecture

## Design tokens

A semantic, reusable token system avoids tying component styles to raw color values:
- **Core surface tokens**: `background`, `surface`, `surface-alt`, `surface-inset`
- **Content tokens**: `foreground`, `muted`
- **Interaction tokens**: `primary`, `primary-foreground`, `primary-container`, `accent`, `accent-foreground`
- **Structure tokens**: `border`, `ring`, `outline-ghost`

These are authored as CSS variables in `src/app/globals.css` (`:root` for light, `.dark` for dark) and mapped into Tailwind v4 via `@theme inline`, so utilities like `bg-background`, `text-foreground`, `border-border`, and `text-primary` stay token-driven rather than hardcoded.

**Contrast note:** when styling an `<a>` with a Tailwind color utility, remember that `globals.css` also has `a { color: inherit }` wrapped in `@layer base` specifically so utility classes (which live in Tailwind's utilities layer) can override it. If that rule is ever moved back out of a layer, every colored link silently reverts to inherited text color regardless of specificity — CSS Cascade Layers make unlayered rules win over layered ones no matter how specific the layered selector is. This bit the Delos project-tabs component once already (see `REFERENCES.md`).

## Spacing
- `--space-2xs` 0.25rem · `--space-xs` 0.5rem · `--space-sm` 0.75rem · `--space-md` 1rem · `--space-lg` 1.5rem · `--space-xl` 2rem · `--space-2xl` 3rem

## Typography
- Body/UI text: **Inter** (`--font-inter`, mapped to `--font-sans`)
- Monospace: **Geist Mono** (`--font-geist-mono`, mapped to `--font-mono`)
- Body defaults: `--text-body` 1rem, `--line-height-body` 1.6
- Heading defaults: `--text-heading` `clamp(1.75rem, 1.3rem + 1.4vw, 2.5rem)`, `--line-height-heading` 1.15

## Light/Dark behavior
- Theme modes: `light`, `dark`, `system` (default), resolved via `prefers-color-scheme` and persisted in `localStorage`.
- Resolved mode toggles `document.documentElement.classList` (`.dark`) and `document.documentElement.style.colorScheme`, keeping CSS, native browser controls, and utility classes aligned.

## Component patterns

Generic primitives live in `src/components/ui/`:
- **`Card`** — the base surface for nearly everything (`surface`/`alt`/`outline` variants, `padding` scale).
- **`Chip`** — small pill labels for categories/tags.
- **`SectionHeading`** — eyebrow + title + optional action, used across home/about/projects sections.
- **`OrgLogo`** — a 48px (configurable) logo box that falls back to initials (via `getInitials()`) when no logo asset is supplied. Used for both the About page's education/experience entries and left as the pattern to follow for any future org-branded UI.
- **`TechStackComponent`** + **`fetchStack()`** (`src/lib/tech-stack.ts`) — renders a stack badge (icon + name) for any tech name in the shared `iconMap`/`colorMap`. The icon is `aria-hidden` since the adjacent name already labels it.
- The `<details>/<summary>` disclosure pattern (native HTML, styled) is used for "More projects" on the listing page, grouped certifications on About, and the Delos-style project sub-navigation groundwork — prefer it over a JS-driven accordion when the content doesn't need animation.

## Icon strategy

`src/lib/tech-stack.ts` maps a closed list of technology names to `{ icon, color }`. Primary source is **react-icons** (mostly the `si` simple-icons set). Two names — **Matplotlib** and **libGDX** — have no react-icons equivalent, so they're sourced from **devicons-react** (the Devicon project) instead; its component types don't line up with react-icons' `IconType` under React 19, so they're cast at the two call sites with a comment explaining why (see `REFERENCES.md` for how this was verified rather than guessed). **Vivado**, **MCUxpresso**, and **UPBGE** have no icon in either library — they use the closest semantically-fitting generic icon (`FaMicrochip` for hardware/IDE tools, `FaGamepad` for the game engine) rather than a fully generic code-brackets icon.

## Content architecture

Each page's copy lives in a co-located `content.ts` (e.g. `about/content.ts`). The Projects section splits this further — see the README's "Content architecture" section for the full metadata/body-content split and why `recruiterCategories` is kept separate from the display `categories` field.

## Recruiter-tracking architecture

`/r/<code>` is a Route Handler (`src/app/r/[code]/route.ts`), not `proxy.ts` and not a `next.config.ts` redirect — a Route Handler is the right tool because it needs to set a cookie per-request, which static config redirects can't do, and a full proxy/middleware layer running on every request would be overkill for a handful of low-traffic vanity links. It sets a validated, first-party `recruiter_categories` cookie and redirects home; `src/lib/projects/select-featured.ts` reads it (via `cookies()`, which is async in this Next.js version) to personalize which projects are featured. Reading `cookies()` opts the home page and `/projects` into dynamic (uncached) rendering — an accepted, deliberate tradeoff over a client-side swap-after-mount, which would cause a visible flash of the wrong projects.
