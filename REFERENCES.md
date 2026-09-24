# References

Sources checked while verifying API behavior, icon coverage, and other claims made during the September 2026 finishing pass — recorded so future agents don't have to re-derive them, per this repo's own instruction (`AGENTS.md`) not to trust training data about this Next.js version.

## Next.js 16 API behavior

Read directly from the vendored docs at `node_modules/next/dist/docs/`, not from training data:

- `01-app/01-getting-started/16-proxy.md` — confirms `middleware.ts` was renamed to `proxy.ts` (same mechanism, new convention) in this version.
- `01-app/03-api-reference/04-functions/cookies.md` — confirms `cookies()` is async, and that `.set()`/`.delete()` only work in Server Functions or Route Handlers (not plain Server Components) — this is why `src/app/r/[code]/route.ts` is a Route Handler rather than reading/writing cookies from a page component.
- `01-app/03-file-conventions/route.md` and `dynamic-routes.md` — Route Handler conventions (`GET`/`POST`/etc. exports, `NextRequest`/`NextResponse`, dynamic segment `params` as a `Promise`).

Also empirically confirmed (not just from docs) that a literal route segment (e.g. `app/(site)/projects/delos/`) is always resolved ahead of a sibling dynamic segment (`app/(site)/projects/[slug]/`) with no config — verified by building the site with both present and checking the build's route table (`○`/`ƒ` route list in `next build` output) shows `/projects/delos` as its own static route, separate from `/projects/[slug]`.

## Icon library coverage (Phase 3)

Before adding a second icon library, actually checked what each one exports rather than assuming:

- **react-icons** version installed: check `node_modules/react-icons/package.json`. Confirmed via `node_modules/react-icons/si/index.d.ts` (grep for the export name) which `Si*` icons exist — this is how `SiNumpy`, `SiScipy`, `SiPhpmyadmin`, `SiZod`, `SiWolframmathematica`, and `SiWolframlanguage` were confirmed to exist (they weren't being used previously despite being available).
- **devicons-react**: added as a second library specifically because react-icons has no `Matplotlib` or `libGDX` icon. Confirmed by downloading the package tarball directly (`npm pack devicons-react@<version>` — `unpkg.com` was blocked by this environment's egress proxy, `registry.npmjs.org` was not) and grepping the extracted `lib/index.d.ts` (1873 exports total) for candidate names. This same process confirmed **Vivado**, **MCUxpresso**, and **UPBGE** have no icon in either library — a real, checked gap, not an oversight.
- devicons-react's component type (`React.FunctionComponent<Props extends React.SVGProps<SVGElement>>`) doesn't structurally satisfy react-icons' `IconType` under this project's React 19 types (`next build`'s TypeScript pass fails with a `ReactNode`/`Promise<ReactNode>` mismatch), so the two icons sourced from it are cast (`as unknown as IconType`) at their definition site in `src/lib/tech-stack.ts`, with a comment explaining why — this is a type-level incompatibility only; the components render identically to react-icons ones at runtime (verified visually).

## Accessibility / contrast

- Contrast ratios were computed using the WCAG 2 relative-luminance formula (not eyeballed), and cross-checked against Lighthouse's own `color-contrast` audit (axe-core) before and after each fix.
- Lighthouse (`lighthouse` npm package) was run against a **production build served via `node .next/standalone/server.js`**, not `next dev` or `next start` — `next start` doesn't correctly serve static assets when `output: "standalone"` is set (Next.js prints its own warning saying so), and dev-mode HMR overhead skews performance-category results.

## Design token / CSS cascade

The `a { color: inherit }` cascade bug (see `DESIGN.md`) was diagnosed by comparing a Lighthouse-flagged element's computed `color` against the Tailwind utility class actually present in its `className`, then checking whether the relevant CSS rules were inside a `@layer` block in the compiled output — per the CSS Cascade Layers spec (unlayered rules always win over layered ones regardless of specificity), not by guessing at a Tailwind-specific explanation.
