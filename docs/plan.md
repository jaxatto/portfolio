# Plan

Goal: make the portfolio as strong as possible for getting Jax hired as a staff-level product designer. Update this file at the end of every slice or session. Keep it short and current.

## Roadmap

Status: `[ ]` not started, `[~]` in progress, `[x]` merged to `redesign`.

- [x] 0. Foundations: tokens (port from `update-content`, light + dark), typography, layout
- [x] 1. Header, footer and mode toggle (nav, icon toggle, Home hero, footer variants, icons, tooltips, 404). Decisions D-014 to D-027. Multi-theme picker deferred to its own later slice
- [x] 2. Home / Work page and study cards (D-028 to D-038, merged to `redesign` with the About page, 2026-10-16)
- [x] 3. Case study template (D-046 to D-066, merged to `redesign` 2026-10-19; Indeed is its first finished page)
- [x] 4. Case study content: Indeed, ActBlue, ServiceNow and Toyota (D-047 to D-086), all merged to `redesign` or ready on the slice 3 branch; verified end to end 2026-10-21 (375, 768, 1280, light and dark: no overflow, one h1, heading order, alt text, links, meta)
- [x] 5. About (D-040 to D-045, merged with slice 2). The Toyota scale number is answered (D-083)
- [x] 6. Resume (D-087 to D-091, merged to `redesign` in PR #11, 2026-10-25): page, roles and skills on tokens, legacy global rules and SCSS deleted. Skills layout still to revisit with Jax

## Now

Slices 0 to 6 are merged into `redesign`. Resume redesign (D-124) is merged: strengths cards, gradient split role cards, no skills list. Remaining: Jax's review and role summaries, the Design Engineer PDF download, the `TODO(jax)` copy below, then flip `VITE_THEME_SWITCHING` when Jax is ready to ship dark mode (D-006, D-011). The code audit's batches 1 to 4 are merged (D-117 to D-119). Its open items are listed under Audit follow-ups. Standing rule from Jax (2026-10-19): delete anything legacy as we touch it, and fold one-off styles into shared ones where relevant. Dark mode is gated for production but shows in the dev server (`.env.development`).

## Audit follow-ups (2026-10-25)

Batches 1 to 4 are done (regressions, dead code, tokens, shared components). Not handled yet, in the order proposed:

- **Batch 5, consistency:** move every `@` import to `#` and delete the `@` aliases in vite, tsconfig and `package.json`. `moduleResolution` Node to Bundler. Colocate `commonTypes/study` with Studies. Fix indentation drift in Resume.tsx, NotFound.tsx, StudyTemplate.tsx. Tooltip reads `refs.domReference.current` during render.
- **Batch 6, performance and SEO:** done except two items. Image width and height are set from the file (D-125). Fonts are self-hosted (D-127). Home PNG samples with alpha were left as they are.
- **Batch 7, docs and comments:** stale CLAUDE.md lines, the plan.md Setup section and dated TODOs, decisions.md ordering (D-082 holds text from D-081 and D-067, D-085 before D-083, D-038 has no heading), README. Remove change-log comments ("was 24 / 32, +8px per Jax" and similar). Write the comment convention into CLAUDE.md.
- **Decided (2026-10-25):** keep Floating UI (D-103). Keep the `Image` fallback component and its cat, controller and paw icons.
- **TODO(jax):** explore what the `Image` fallback looks like when a photo fails to load, and whether the About page should use it differently.
- **Held:** the dark-mode override dedupe (item 11) and the token worklist. The cheaper route is to have the inline script and ThemeProvider always set `data-theme` to the resolved theme (the OS setting when nothing is stored), which makes the `prefers-color-scheme` blocks in `theme.css` and about 13 component sites redundant.
- **Fonts:** self-hosted (D-127). Measured before: a 21 kB Google stylesheet and two third-party connections on the render path (about 100 to 180 ms from one fast connection). The 86 kB of font files is unchanged.
- **Token worklist:** [untokenized-styles.md](untokenized-styles.md), 101 declarations. First candidates are icon sizes, state washes, layer order and the `theme-color` pair.
- **Not tested:** screen readers, 200% and 400% zoom, forced colors, Safari and Firefox. Route changes now move focus to the h1 (D-126), checked without a screen reader.

## Resume PDF (side task, 2026-10-24)

Four resumes build from HTML in [`resume/`](../resume/) (D-110): main, ATS, Design Engineer and Design Engineer ATS. The public PDF is the main build. Copies sit in `~/Desktop/resume/`. To revisit with Jax: more Design Engineer framing in the role bullets, the Toyota first bullet, whether the headline should change. Merge to `redesign` only when Jax says so.

## Open questions for Jax

Copy (all marked `TODO(jax)`, provisional):
- About copy, round one applied (D-044). Earlier-roles paragraph added with links to the three case studies (Visa left out). The Toyota scale is answered in D-083 (680 + 120 tokens, 40 teams, one brand today).
- Hero: add one proof point (metric or shipped outcome) and one concrete AI example (D-016). Revisit later if needed.
- Footer line: "Open to remote Staff Product Designer and Design Engineer roles." (D-021, D-024).
- 404 quips: seven phrases in `src/pages/NotFound/resources/content.ts`, picked at random (D-022).
- Titles: "Staff Product Designer" throughout, "Design Engineer" where it fits (D-021).

Design / tokens:
1. **Figma is a reference only.** It is out of date for Home, About and the focus ring, and Jax won't update it; code and `docs/decisions.md` are the source of truth (2026-10-15).
2. The card ramp ends at teal (container teal 100); a fifth study would continue with green (not built, D-030).
3. Dark card backgrounds were tinted 30% toward the ground; check against the rest of the dark pages when they migrate (D-028).
4. Mobile/tablet: no designs exist (D-008). Proposed per slice, agreed in review. There is no tablet design for the footer (stacks at 640px).
5. The link arrows are Phosphor bold, so their stroke scales with size (D-026). Revisit if it reads light.
6. Icons: all UI icons are Phosphor bold and the emoji are gone (D-037).
7. ServiceNow's Outcomes rest on what Jax recalls (no metrics exist for the tool). The Toyota frame's footer says "Design Technologist" where the site says "Design Engineer".
8. Which case studies are strongest for the hiring goal, and what outcomes/metrics can we state for each? (For the first `portfolio-critique` pass.)

`TODO(jax)` in the code (all provisional copy or design, none block anything): footer line and tablet footer (`Footer.tsx`, `Footer.module.css`, D-021, D-008, D-024), header role line and H1 treatment (`Header.tsx`), 404 quips (`NotFound/resources/content.ts`), Home SEO copy (`Work.tsx`), Resume role summaries (`Resume/resources/roles.ts`, D-124). Toyota has no Deliverables image by choice (2026-10-21).

## Parked: study image component (raised 2026-10-19, return after ServiceNow copy is done)

Jax finds the image approach too fixed. Today: `StudyImage` (3:1 banner, `corners` as a free string), `StudyCompare` (1200 / 740 default box, `aspectRatio` override added in D-078) and `StudyPanels` (300px / 220px box, `sourceWidth`, `sourceHeight`, pixel slice coordinates and hand-computed `weight` in the content files). ServiceNow's hero needed a composite sheet and slices computed by hand. Proposal to discuss: one `StudyMedia` component with a `layout` of `single` (natural or a named ratio, optional surface or clipped inset), `pair` (before / after) and `spread` (several screens in a row with their own `src`, `alt` and fractional `crop`, equal height from their own aspect ratios). Shared: caption as wide as the image, surfaces and padding from tokens only, the 40px spacing, a fixed 16px corner (drop the free-string `corners`). Open: image aspect ratios (declare per item, or have the export script write each size to a generated `images.json`), then migrate Indeed, ActBlue and ServiceNow and compare screenshots, and delete the three old components. Its own slice, not part of the ServiceNow PR. Study copy stays inline in `content.ts` (D-003).
