<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project conventions

- **Content vs. data**: page copy lives in a co-located `content.ts` next to its `page.tsx`. The Projects section is the exception/model to follow for anything similar in the future: structured metadata lives centrally in `src/lib/projects/content.ts`, while each project's actual write-up is hand-authored JSX in its own route folder. See `README.md`'s "Content architecture" section before changing how projects are represented.
- **New project route**: add an entry to `src/lib/projects/content.ts` (`ProjectMeta`), then either let it render through the `[slug]` fallback (metadata-only, "coming soon") or add a literal `src/app/(site)/projects/<slug>/page.tsx` with real JSX body content and `export const metadata = projectMetadata("<slug>")`. Literal folders always win over `[slug]` automatically — no routing config needed.
- **Tech-stack icons**: add new names to `src/lib/tech-stack.ts`'s `iconMap`/`colorMap`, not inline per-component. Check react-icons first; devicons-react is the fallback for the few names react-icons lacks (see `DESIGN.md`'s "Icon strategy"). Don't add a third icon library without checking both existing ones' actual export lists first (see `REFERENCES.md` for how to do that without guessing).
- **Links**: `github.com/ScottJGilbert` and `linkedin.com/in/scott-j-gilbert` are canonical — `src/lib/site-content.ts` is the single source of truth for them (and for nav items). Don't hardcode a second copy elsewhere; import from there instead.
- **CSS**: any bare/global selector added to `globals.css` outside `@theme`/`:root`/`.dark` should be wrapped in `@layer base` (or another Tailwind layer) unless you specifically want it to beat every utility class regardless of specificity — see `DESIGN.md`'s contrast note for what happens when that's gotten wrong.
- **Verification**: `next start` does not work with this project's `output: "standalone"` config — use `pnpm dev` for iteration, or `node .next/standalone/server.js` (after copying `public/` and `.next/static/` into `.next/standalone/`) for a production-accurate check, e.g. before running Lighthouse.
