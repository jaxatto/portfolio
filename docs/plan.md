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

Order is a proposal; confirm before starting slice 0.

## Now

Slices 0 to 6 are merged into `redesign`. Remaining: Jax's Resume refinements (skills layout), the `TODO(jax)` copy below, then flip `VITE_THEME_SWITCHING` when Jax is ready to ship dark mode (D-006, D-011). The code audit's batches 1 to 4 are merged (D-117 to D-119). Its open items are listed under Audit follow-ups. Standing rule from Jax (2026-10-19): delete anything legacy as we touch it, and fold one-off styles into shared ones where relevant. Dark mode is gated for production but shows in the dev server (`.env.development`).

## Audit follow-ups (2026-10-25)

Batches 1 to 4 are done (regressions, dead code, tokens, shared components). Not handled yet, in the order proposed:

- **Batch 5, consistency:** move every `@` import to `#` and delete the `@` aliases in vite, tsconfig and `package.json`. `moduleResolution` Node to Bundler. Colocate `commonTypes/study` with Studies. Fix indentation drift in Resume.tsx, NotFound.tsx, StudyTemplate.tsx. Tooltip reads `refs.domReference.current` during render.
- **Batch 6, performance and SEO:** done except two items. Image width and height are set from the file (D-123). Self-hosting the fonts is not done (two third-party connections, not measured). Home PNG samples with alpha were left as they are.
- **Batch 7, docs and comments:** stale CLAUDE.md lines, the plan.md Setup section and dated TODOs, decisions.md ordering (D-082 holds text from D-081 and D-067, D-085 before D-083, D-038 has no heading), README. Remove change-log comments ("was 24 / 32, +8px per Jax" and similar). Write the comment convention into CLAUDE.md.
- **Decided (2026-10-25):** keep Floating UI (D-103). Keep the `Image` fallback component and its cat, controller and paw icons.
- **TODO(jax):** explore what the `Image` fallback looks like when a photo fails to load, and whether the About page should use it differently.
- **Held:** the dark-mode override dedupe (item 11) and the token worklist. The cheaper route is to have the inline script and ThemeProvider always set `data-theme` to the resolved theme (the OS setting when nothing is stored), which makes the `prefers-color-scheme` blocks in `theme.css` and about 13 component sites redundant.
- **Fonts, measured:** Google's stylesheet is 21 kB (58 `@font-face` rules, 3 used in latin) and blocks first paint. A visit then downloads 3 variable latin files, 86 kB (Inter 48 kB, Manrope 25 kB, Roboto Mono 13 kB). Self-hosting keeps the 86 kB, drops the 21 kB stylesheet and both third-party connections (about 100 to 180 ms of handshakes and a stylesheet-then-font chain in the render path, measured from one fast connection). Not done, awaiting Jax.
- **Token worklist:** [untokenized-styles.md](untokenized-styles.md), 101 declarations. First candidates are icon sizes, state washes, layer order and the `theme-color` pair.
- **Not tested:** screen readers, 200% and 400% zoom, forced colors, Safari and Firefox. Route changes do not move focus or announce (D-115 TODO).

## Resume PDF (side task, 2026-10-24)

Four resumes build from HTML in [`resume/`](../resume/) (D-110): main, ATS, Design Engineer and Design Engineer ATS. The public PDF is the main build. Copies sit in `~/Desktop/resume/`. To revisit with Jax: more Design Engineer framing in the role bullets, the Toyota first bullet, whether the headline should change. Merge to `redesign` only when Jax says so.

## Open questions for Jax

Copy (all marked `TODO(jax)`, provisional):
- About copy, round one applied (D-044). Earlier-roles paragraph added with links to the three case studies (Visa left out). The Toyota scale is answered in D-083 (680 + 120 tokens, 40 teams, one brand today).
- Hero: add one proof point (metric or shipped outcome) and one concrete AI example (D-016). Revisit later if needed.
- Footer line: "Open to remote Staff Product Designer and Design Engineer roles." (D-021, D-024).
- 404 quips: seven phrases in `src/pages/NotFound/resources/content.ts`, picked at random (D-022).
- Titles: "Staff Product Designer" throughout, "Design Engineer" where it fits (D-021). Other pages' titles and meta still say "Staff Product Designer – Scalable UX…" and "at ServiceNow" (the About design says Toyota); each page's slice updates its own.

Design / tokens:
1. **Figma is a reference only.** It is out of date for Home, About and the focus ring, and Jax won't update it; code and `docs/decisions.md` are the source of truth (2026-10-15).
2. The card ramp ends at teal (container teal 100); a fifth study would continue with green (not built, D-030).
3. Dark card backgrounds were tinted 30% toward the ground; check against the rest of the dark pages when they migrate (D-028).
4. Mobile/tablet: no designs exist (D-008). Proposed per slice, agreed in review. There is no tablet design for the footer (stacks at 640px).
5. The link arrows are Phosphor bold, so their stroke scales with size (D-026). Revisit if it reads light.
6. Icons: all UI icons are Phosphor bold and the emoji are gone (D-037).
7. ServiceNow's Outcomes rest on what Jax recalls (no metrics exist for the tool). The Toyota frame's footer says "Design Technologist" where the site says "Design Engineer".
8. Which case studies are strongest for the hiring goal, and what outcomes/metrics can we state for each? (For the first `portfolio-critique` pass.)

Remaining `TODO(jax)` in the code (2026-10-21, all provisional copy or design, none block the studies):
- Footer line copy (`Footer.tsx`, D-021) and no tablet design for the footer (`Footer.module.css`, D-008, D-024).
- Header role line and H1 treatment are provisional (`Header.tsx`, content pass).
- 404 quips (`NotFound/resources/content.ts`) and the Home SEO copy (`Work.tsx`, D-003, D-016).
- Toyota page: no Deliverables image (decided 2026-10-21: none wanted). The sprint board image is 800px and soft on retina (Jax is fine with that).

## Parked: study image component (raised 2026-10-19, return after ServiceNow copy is done)

Jax finds the image approach too fixed. Today: `StudyImage` (3:1 banner, `corners` as a free string), `StudyCompare` (1200 / 740 default box, `aspectRatio` override added in D-078) and `StudyPanels` (300px / 220px box, `sourceWidth`, `sourceHeight`, pixel slice coordinates and hand-computed `weight` in the content files). ServiceNow's hero needed a composite sheet and slices computed by hand. Proposal to discuss: one `StudyMedia` component with a `layout` of `single` (natural or a named ratio, optional surface or clipped inset), `pair` (before / after) and `spread` (several screens in a row with their own `src`, `alt` and fractional `crop`, equal height from their own aspect ratios). Shared: caption as wide as the image, surfaces and padding from tokens only, the 40px spacing, a fixed 16px corner (drop the free-string `corners`). Open: image aspect ratios (declare per item, or have the export script write each size to a generated `images.json`), then migrate Indeed, ActBlue and ServiceNow and compare screenshots, and delete the three old components. Its own slice, not part of the ServiceNow PR. Also decided not to move study copy to Markdown (inline `content.ts` stays, D-003); CLAUDE.md's "will use Markdown/JSON" line should be removed when this is picked up.

## Setup still needed

- **`i-have-adhd` skill:** it isn't visible to Claude in the cloud sessions so far (not in the claude.ai skills list, not in this repo). To get it into every session across Claude, enable it in your claude.ai skills settings, or paste its contents to a session and it can be added at `.claude/skills/i-have-adhd/SKILL.md` for this repo. `CLAUDE.md` already tells every session to load it when present.
- **Design screenshots:** done. They're in `screens/` (light `Name.png`, dark `Name-1.png`, plus component crops).
- **Local preview:** the dev server runs in the cloud container. Each change comes with a route to review and a screenshot, since `localhost` links may not open from Jax's browser. Tell me if they do.
