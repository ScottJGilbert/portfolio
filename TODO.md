# Known follow-ups

Things intentionally deferred during the September 2026 finishing pass, not gaps that were missed.

### Content

- [ ] Org logo images for Illini Solar Car, Illini Redstone Computing, UIUC CHP, Team2Go, and Scouting America — the About page falls back to initials avatars (`OrgLogo`/`getInitials`) until real logo assets are supplied.
- [ ] Full write-ups for the still-WIP projects (Agri-Sense, Clouds and Computers, Miracle Makers) — they currently render through the `[slug]` fallback with a "coming soon" message. Clouds and Computers in particular already has partial narrative content that was never migrated off the old Lexical system; it needs a proper JSX pass, not just a copy-paste of what existed before.
- [ ] More company/role-specific recruiter-link codes as roles firm up — `spacex-swe-intern`, `ibm-quantum-intern`, `ibm-cloud-intern`, and `arm-hardware` are in `src/lib/recruiter-links.ts` now; Northrop Grumman, Google, NVIDIA, AbbVie, Broadcom, and Synopsys are being looked into but don't have locked-down roles/categories yet.

### Icons

- [ ] Vivado, MCUxpresso, and UPBGE have no icon in either react-icons or devicons-react (confirmed by inspecting both libraries' full export lists, not by guessing — see `REFERENCES.md`). They currently use a closer-fitting generic icon (`FaMicrochip`/`FaGamepad`). Revisit if either library adds real coverage, or if it's worth commissioning/finding a proper logo asset for one of them.

### Performance

- [ ] The home page and `/projects` read `cookies()` for recruiter personalization, which opts them into dynamic (uncached) rendering and disables the back/forward cache (`Cache-Control: no-store`). This is an accepted tradeoff (see `DESIGN.md`), but if personalization traffic ever matters enough, revisit whether it can move to a narrower server island instead of opting the whole route.
- [ ] Lighthouse performance-category insights (render-blocking CSS chunk, LCP) were reviewed during the accessibility pass but not addressed — they're framework/build-output-level, not something worth chasing without a concrete performance target.

### Infrastructure

- [ ] Containerization / self-hosting: intentionally left undecided. The site currently deploys to Vercel from this repo; `next.config.ts`'s `output: "standalone"` is a leftover Docker-oriented setting Vercel ignores, not a signal either way.
