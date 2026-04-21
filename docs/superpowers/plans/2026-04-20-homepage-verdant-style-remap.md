# Homepage Verdant Style Remap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Realign the existing Stitch-built homepage to the approved green, organic non-layout styling (colors, surfaces, borders, depth, and control styling) from `DESIGN.md` only where those styles match Stitch references, while preserving current layout/structure.

**Architecture:** Execute a strict four-pass style workflow. First, produce a conflict matrix from `DESIGN.md` cross-checked against Stitch desktop/mobile exports. Second, remap global tokens and shared UI primitives so styles flow top-down. Third, patch homepage-only section components for remaining non-global style mismatches without changing layout. Fourth, run a final harmonization pass and explicitly log any judgment-based style overrides made for visual coherence.

**Tech Stack:** Next.js App Router (v16), React 19, TypeScript, Tailwind CSS v4 token mapping (`@theme inline`), lucide-react, ESLint.

---

## Scope and Non-Negotiables

- Preserve homepage layout and structure exactly as currently implemented (no section reordering, no nav/sidebar/footer repositioning, no structural breakpoint changes).
- Apply only non-layout style updates: color, surface treatment, border/outline behavior, shadows, opacity, radii, and interaction tones.
- Cross-check `DESIGN.md` rules against Stitch references:
  - Keep only rules that align with Stitch screens.
  - Reject rules that conflict with Stitch screens.
- Bias final style toward subtle low-saturation editorial greens in both light and dark themes.
- Keep implementation isolated in a **new worktree from `feature/portfolio-homepage-stitch`**.

## File Structure and Responsibilities

### Modify (Global foundation)
- `src/app/globals.css` — canonical semantic color/surface/border/elevation tokens for light/dark.
- `src/app/layout.tsx` — global font family alignment and root theme scaffolding compatibility.
- `src/components/ui/button.tsx` — primary/secondary/ghost treatment aligned to ghost-border and tonal hover.
- `src/components/ui/icon-button.tsx` — icon action visual treatment aligned to surface layering.
- `src/components/ui/card.tsx` — remove hard-border default and move to tonal + ghost-border semantics.
- `src/components/ui/chip.tsx` — chip backgrounds and text contrast aligned to verdant neutrals.
- `src/components/ui/nav-item.tsx` — active/inactive navigation color hierarchy.
- `src/components/ui/theme-toggle.tsx` — floating/frosted control styling alignment.
- `src/components/ui/section-heading.tsx` — heading/eyebrow color hierarchy alignment.

### Modify (Homepage-level only)
- `src/components/site/desktop-sidebar.tsx` — frosted glass surface and ghost-border tuning.
- `src/components/site/mobile-nav.tsx` — top bar/dropdown surface and ghost-border tuning.
- `src/components/site/top-action-bar.tsx` — frosted action bar tonal layering.
- `src/components/site/hero-section.tsx` — CTA and hero accent treatment (non-layout).
- `src/components/site/assortment-grid.tsx` — bento card surface/border depth treatment.
- `src/components/site/work-grid.tsx` — card/chip tonal adjustments only.
- `src/components/site/journal-list.tsx` — list-row hover/active tonal treatment.
- `src/components/site/site-footer.tsx` — footer separator/link tone treatment.

### Create (Session artifact, not committed)
- `C:\Users\scott\.copilot\session-state\72746c4b-315e-456e-b16e-daafb9730d11\files\verdant-style-conflict-matrix.md` — accepted vs rejected `DESIGN.md` style directives with file impact map.

---

### Task 1: Set up isolated worktree and produce cross-checked style conflict matrix

**Files:**
- Create: `C:\Users\scott\.copilot\session-state\72746c4b-315e-456e-b16e-daafb9730d11\files\verdant-style-conflict-matrix.md`
- Read-only inputs: `DESIGN.md`, `.superpowers/stitch/portfolio-mobile-refined-nav.html`, `.superpowers/stitch/portfolio-unified-light-v3.html`

- [ ] **Step 1: Create a new worktree from the completed homepage branch**

```bash
git worktree add .worktrees/feature-portfolio-verdant-style-remap feature/portfolio-homepage-stitch -b feature/portfolio-verdant-style-remap
```

- [ ] **Step 2: Verify worktree branch and baseline health**

Run: `git -C .worktrees/feature-portfolio-verdant-style-remap --no-pager status --short --branch && pnpm -C .worktrees/feature-portfolio-verdant-style-remap lint && pnpm -C .worktrees/feature-portfolio-verdant-style-remap build`  
Expected: clean branch status on `feature/portfolio-verdant-style-remap`, lint/build PASS.

- [ ] **Step 3: Write the accepted/rejected style matrix from DESIGN.md cross-checked with Stitch**

```markdown
# Verdant Style Conflict Matrix

## Accepted (DESIGN.md + Stitch aligned)
- Surface hierarchy with subtle tonal layering (surface / container / inset variants)
- Ghost borders at very low opacity instead of hard 1px separators
- Frosted navigation chrome with backdrop blur
- Deep, subdued green primaries and soft neutral text contrasts
- Primary CTA using darker green family with gentle hover tier shift

## Rejected (DESIGN.md conflicts with Stitch)
- Epilogue + Manrope typography mandate (Stitch screens use Inter)
- Removing Work/Journal card backgrounds entirely (Stitch keeps tonal card containers)
- Any layout asymmetry instruction that would alter current homepage structure

## Impact Map
- Global tokens/components: globals.css, button/card/chip/nav-item/theme-toggle
- Homepage-only components: sidebar/nav/action bar + hero/assortment/work/journal/footer
```

- [ ] **Step 4: Re-run baseline health after audit artifact creation**

Run: `pnpm -C .worktrees/feature-portfolio-verdant-style-remap lint && pnpm -C .worktrees/feature-portfolio-verdant-style-remap build`  
Expected: PASS (audit file is outside repo and does not affect build).

- [ ] **Step 5: Commit only if tracked repo files changed in this task**

```bash
git -C .worktrees/feature-portfolio-verdant-style-remap add -A
git -C .worktrees/feature-portfolio-verdant-style-remap commit -m "chore: prepare verdant style remap worktree"
```

---

### Task 2: Pass 2 global remap — update base tokens, color system, and font baseline

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Capture baseline token mismatch before edits**

```css
/* Current mismatch example in globals.css */
:root {
  --primary: #2563eb;
  --surface: #ffffff;
  --border: #dbe3ee;
}
```

- [ ] **Step 2: Run baseline checks before remap**

Run: `pnpm -C .worktrees/feature-portfolio-verdant-style-remap lint && pnpm -C .worktrees/feature-portfolio-verdant-style-remap build`  
Expected: PASS (baseline before token changes).

- [ ] **Step 3: Replace global tokens with verdant semantic palette (light + dark) and align root font to Stitch-compatible Inter**

```css
/* src/app/globals.css */
:root {
  color-scheme: light;
  --background: #f8faf9;
  --foreground: #041710;
  --surface: #f8faf9;
  --surface-alt: #f1f4f2;
  --surface-inset: #ffffff;
  --primary: #2c694e;
  --primary-container: #1b4332;
  --primary-foreground: #ffffff;
  --muted: #4b6357;
  --border: color-mix(in srgb, #c1c8c2 15%, transparent);
  --ring: #2c694e;
  --accent: #eef2f0;
  --accent-foreground: #253931;
  --ambient-shadow: 0 10px 30px rgba(25, 28, 27, 0.04), 0 2px 8px rgba(25, 28, 27, 0.02);
}

.dark {
  color-scheme: dark;
  --background: #041710;
  --foreground: #dbe5df;
  --surface: #0b1f18;
  --surface-alt: #132a22;
  --surface-inset: #10231c;
  --primary: #95d4b3;
  --primary-container: #2c694e;
  --primary-foreground: #041710;
  --muted: #bfc9c3;
  --border: color-mix(in srgb, #414844 25%, transparent);
  --ring: #95d4b3;
  --accent: #1a2e26;
  --accent-foreground: #dbe5df;
}
```

```tsx
// src/app/layout.tsx
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
```

- [ ] **Step 4: Verify global remap compiles cleanly**

Run: `pnpm -C .worktrees/feature-portfolio-verdant-style-remap lint && pnpm -C .worktrees/feature-portfolio-verdant-style-remap build`  
Expected: PASS with no type/lint/build regressions.

- [ ] **Step 5: Commit token/foundation remap**

```bash
git -C .worktrees/feature-portfolio-verdant-style-remap add src/app/globals.css src/app/layout.tsx
git -C .worktrees/feature-portfolio-verdant-style-remap commit -m "feat: remap global verdant tokens and font baseline"
```

---

### Task 3: Pass 2 global remap — align shared UI primitives to ghost-border and tonal layering

**Files:**
- Modify: `src/components/ui/button.tsx`
- Modify: `src/components/ui/icon-button.tsx`
- Modify: `src/components/ui/card.tsx`
- Modify: `src/components/ui/chip.tsx`
- Modify: `src/components/ui/nav-item.tsx`
- Modify: `src/components/ui/theme-toggle.tsx`
- Modify: `src/components/ui/section-heading.tsx`

- [ ] **Step 1: Record current conflicting global primitive styles**

```tsx
// Conflict examples
// button.tsx: primary uses bg-primary (#blue baseline before remap)
// card.tsx: hard border on every card by default
// nav-item.tsx: inactive state too cool/gray for verdant hierarchy
```

- [ ] **Step 2: Run baseline checks before primitive edits**

Run: `pnpm -C .worktrees/feature-portfolio-verdant-style-remap lint && pnpm -C .worktrees/feature-portfolio-verdant-style-remap build`  
Expected: PASS.

- [ ] **Step 3: Update primitives to verdant non-layout styling**

```tsx
// src/components/ui/button.tsx (variant intent)
const buttonVariantClassName = {
  primary: "border border-transparent bg-[linear-gradient(135deg,var(--primary),var(--primary-container))] text-primary-foreground hover:opacity-95",
  secondary: "border border-border bg-transparent text-primary hover:bg-accent",
  ghost: "border border-transparent bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
};
```

```tsx
// src/components/ui/card.tsx (base intent)
const cardBaseClassName = "rounded-xl border border-border bg-surface text-foreground shadow-[var(--ambient-shadow)]";
```

```tsx
// src/components/ui/nav-item.tsx (active/inactive intent)
active ? "font-bold text-primary" : "text-foreground/70 hover:text-foreground hover:bg-accent";
```

- [ ] **Step 4: Validate global primitive behavior after remap**

Run: `pnpm -C .worktrees/feature-portfolio-verdant-style-remap lint && pnpm -C .worktrees/feature-portfolio-verdant-style-remap build`  
Expected: PASS; primitives remain type-safe and reusable.

- [ ] **Step 5: Commit primitive style remap**

```bash
git -C .worktrees/feature-portfolio-verdant-style-remap add src/components/ui/button.tsx src/components/ui/icon-button.tsx src/components/ui/card.tsx src/components/ui/chip.tsx src/components/ui/nav-item.tsx src/components/ui/theme-toggle.tsx src/components/ui/section-heading.tsx
git -C .worktrees/feature-portfolio-verdant-style-remap commit -m "feat: align shared ui primitives to verdant style system"
```

---

### Task 4: Pass 3 homepage remap — patch homepage-specific components without layout changes

**Files:**
- Modify: `src/components/site/desktop-sidebar.tsx`
- Modify: `src/components/site/mobile-nav.tsx`
- Modify: `src/components/site/top-action-bar.tsx`
- Modify: `src/components/site/hero-section.tsx`
- Modify: `src/components/site/assortment-grid.tsx`
- Modify: `src/components/site/work-grid.tsx`
- Modify: `src/components/site/journal-list.tsx`
- Modify: `src/components/site/site-footer.tsx`

- [ ] **Step 1: Capture non-layout mismatches in homepage-specific components**

```tsx
// Example targets:
// - sidebar/nav chrome should read as frosted glass + ghost borders
// - hero CTA should feel deep verdant rather than flat accent
// - bento/work/journal hover and separators should use tonal shifts, not hard lines
```

- [ ] **Step 2: Run baseline checks before homepage component edits**

Run: `pnpm -C .worktrees/feature-portfolio-verdant-style-remap lint && pnpm -C .worktrees/feature-portfolio-verdant-style-remap build`  
Expected: PASS.

- [ ] **Step 3: Apply homepage non-layout style patches while preserving structure**

```tsx
// src/components/site/desktop-sidebar.tsx (style intent)
className="... border-r border-border bg-surface/80 backdrop-blur-xl ..."
```

```tsx
// src/components/site/hero-section.tsx (CTA intent)
className="... bg-[linear-gradient(135deg,var(--primary),var(--primary-container))] text-primary-foreground shadow-[var(--ambient-shadow)] ..."
```

```tsx
// src/components/site/journal-list.tsx (row intent)
className="... hover:bg-accent active:bg-accent/80 ..."
```

- [ ] **Step 4: Validate homepage component pass**

Run: `pnpm -C .worktrees/feature-portfolio-verdant-style-remap lint && pnpm -C .worktrees/feature-portfolio-verdant-style-remap build`  
Expected: PASS.

- [ ] **Step 5: Commit homepage-specific style updates**

```bash
git -C .worktrees/feature-portfolio-verdant-style-remap add src/components/site/desktop-sidebar.tsx src/components/site/mobile-nav.tsx src/components/site/top-action-bar.tsx src/components/site/hero-section.tsx src/components/site/assortment-grid.tsx src/components/site/work-grid.tsx src/components/site/journal-list.tsx src/components/site/site-footer.tsx
git -C .worktrees/feature-portfolio-verdant-style-remap commit -m "feat: restyle homepage components with verdant non-layout treatment"
```

---

### Task 5: Pass 4 harmonization — resolve clashes and publish judgment-change log

**Files:**
- Modify: `src/app/globals.css` (if final token nudges needed)
- Modify: `src/components/ui/*.tsx` and `src/components/site/*.tsx` (only where clash fixes are required)
- Create (session artifact): `C:\Users\scott\.copilot\session-state\72746c4b-315e-456e-b16e-daafb9730d11\files\verdant-pass4-judgment-changes.md`

- [ ] **Step 1: Enumerate visual clashes discovered after passes 2 and 3**

```markdown
# Pass 4 Clash List
- [ ] Any ghost-border too faint/too strong against adjacent surfaces
- [ ] Any accent hover that reads blue/neutral instead of verdant
- [ ] Any component pair with mismatched elevation language
- [ ] Any text contrast that drifts from editorial softness
```

- [ ] **Step 2: Run checks before harmonization edits**

Run: `pnpm -C .worktrees/feature-portfolio-verdant-style-remap lint && pnpm -C .worktrees/feature-portfolio-verdant-style-remap build`  
Expected: PASS.

- [ ] **Step 3: Apply final harmonization fixes and write explicit judgment-change log**

```markdown
# Pass 4 Judgment-Based Style Changes

1. Increased ghost-border opacity from 15% to 18% in dark mode for sidebar readability.
2. Reduced hero CTA gradient contrast by one tone to match editorial/subtle green direction.
3. Softened journal row hover tint to avoid competing with primary action color.
```

- [ ] **Step 4: Execute full quality gate**

Run: `pnpm -C .worktrees/feature-portfolio-verdant-style-remap lint && pnpm -C .worktrees/feature-portfolio-verdant-style-remap build`  
Expected: PASS with no regressions.

- [ ] **Step 5: Commit harmonization pass**

```bash
git -C .worktrees/feature-portfolio-verdant-style-remap add src/app/globals.css src/components/ui src/components/site
git -C .worktrees/feature-portfolio-verdant-style-remap commit -m "fix: harmonize verdant style clashes and finalize polish"
```

---

### Task 6: Final delivery notes and DESIGN.md update gate

**Files:**
- (No immediate repo edits required)
- Potential follow-up (only after user confirms visual result): `DESIGN.md`

- [ ] **Step 1: Prepare delivery summary**

```markdown
- Confirmed no layout changes were introduced.
- Confirmed style remap applied across both light and dark themes.
- Included Pass 4 judgment-change list in final handoff message.
```

- [ ] **Step 2: Run final project checks**

Run: `pnpm -C .worktrees/feature-portfolio-verdant-style-remap lint && pnpm -C .worktrees/feature-portfolio-verdant-style-remap build`  
Expected: PASS.

- [ ] **Step 3: Ask user whether to proceed with DESIGN.md synchronization**

```text
"The style remap is complete and polished. If this looks good, I can now update DESIGN.md so it reflects the project's actual implemented style state."
```

- [ ] **Step 4: If approved, update DESIGN.md to match implemented reality (no layout instructions)**

```markdown
Update only:
- token palette
- border/ghost-border rules
- elevation language
- component visual treatment

Do not reintroduce outdated layout directives.
```

- [ ] **Step 5: Commit DESIGN.md update only when approved**

```bash
git -C .worktrees/feature-portfolio-verdant-style-remap add DESIGN.md
git -C .worktrees/feature-portfolio-verdant-style-remap commit -m "docs: sync design guidance with implemented verdant styling"
```

---

## Spec Coverage Self-Review

1. **First pass (identify/cross-check/non-layout conflicts):** Covered by Task 1 conflict matrix with accepted/rejected directives and impact map.
2. **Second pass (global files from ground up):** Covered by Tasks 2 and 3 (`globals.css` then shared UI primitives).
3. **Third pass (homepage-specific non-global updates):** Covered by Task 4.
4. **Fourth pass (resolve clashes + notify at end):** Covered by Task 5 with explicit judgment-change artifact and final reporting requirement.
5. **Worktree isolation from previous implementation branch:** Covered by Task 1 Step 1.
6. **No layout/font-size/structure churn:** Enforced in scope constraints and task descriptions.

## Placeholder / Ambiguity Scan

- No TODO/TBD placeholders remain.
- Every task includes exact file paths and exact run commands.
- Rejected style directives (font-family mandate and no-card Work/Journal rule) are explicitly documented due to Stitch conflicts.


