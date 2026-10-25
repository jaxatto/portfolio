# Plan

Goal: make the portfolio as strong as possible for getting Jax hired as a staff-level product designer. Update this file at the end of every slice or session. Keep it short and current.

## Roadmap

Status: `[ ]` not started, `[~]` in progress, `[x]` merged to `redesign`.

- [x] 0. Foundations: tokens (port from `update-content`, light + dark), typography, layout
- [x] 1. Header, footer and mode toggle (nav, icon toggle, Home hero, footer variants, icons, tooltips, 404). Decisions D-014 to D-027. Multi-theme picker deferred to its own later slice
- [x] 2. Home / Work page and study cards (D-028 to D-038, merged to `redesign` with the About page, 2026-10-16)
- [x] 3. Case study template (D-046 to D-066, merged to `redesign` 2026-10-19; Indeed is its first finished page)
- [x] 4. Case study content: Indeed, ActBlue, ServiceNow and Toyota (D-047 to D-086), all merged to `redesign`; verified end to end 2026-10-21 (375, 768, 1280, light and dark: no overflow, one h1, heading order, alt text, links, meta)
- [x] 5. About (D-040 to D-045, merged with slice 2). The Toyota scale number is answered (D-083)
- [x] 6. Resume (D-087 to D-091 and D-123, D-124, merged to `redesign` in PRs #11 and #16, 2026-10-25): page on tokens, legacy global rules and SCSS deleted, then redesigned with strengths cards, gradient split role cards and no skills list

## Now

Slices 0 to 6 are merged into `redesign`, and the Home hero, header role line, footer line and 404 quips are settled (D-133, D-134). Remaining for Jax: review of the Resume role summaries and strength lines (on hold, drafts, `TODO(jax)` in `roles.ts`). SEO copy is settled and dark mode switching is on (D-131). The permanent no-nos are in `CLAUDE.md` (never cite the Toyota token count, never style h1 to h6 directly). The code audit's batches 1 to 4 are merged (D-117 to D-119). Its open items are listed under Audit follow-ups. Standing rule from Jax (2026-10-19): delete anything legacy as we touch it, and fold one-off styles into shared ones where relevant.

## Audit follow-ups (2026-10-25)

All seven audit batches are done and merged (D-117 to D-127): regressions, dead code, tokens, shared components, consistency, performance and SEO, docs and comments. Image width and height come from the file (D-125), fonts are self-hosted (D-127), per-route meta is written at build time (D-122). What is left:

- **Decided (2026-10-25):** keep Floating UI (D-103). Keep the `Image` fallback component and its cat, controller and paw icons.
- **Tested 2026-10-25 (Chromium, emulated):** live OS light/dark switch with no stored theme, `color-scheme` per theme, 320 and 640px reflow on 8 routes in light and dark (no horizontal scroll, 32 of 32), reduced motion (infinite animations stop, card lift off), forced colors (text and links readable). Forced colors keeps the shape of cards, chips and buttons with an outline (D-129).
- **Also tested 2026-10-25 (Chromium):** axe-core 4.10.2 on the production build, 8 routes in light and dark (one real violation, the About photo list had a span as a direct child, fixed). Contrast by computed colors: 1508 text elements across 8 routes, light and dark, 1280 and 375, 0 failures (elements over images are skipped). Keyboard: every focusable element on 8 routes is a Tab stop with a visible ring. Internal links and the PDF resolve. Prerendered routes serve their own title and canonical.
- **Firefox 132 and WebKit 18.2 (Playwright, 2026-10-25):** 8 routes, light and dark, 1280 and 375 (32 combinations each): no console errors, no horizontal scroll, one h1 per page, no broken images, self-hosted fonts load, the study h1 is 56px with line height 1.2. Behaviors match Chromium: focus moves to the h1 after navigation, a live OS light/dark switch updates `data-theme` and `color-scheme`, the card lift is 8px with the palette shadow, lazy images load on scroll. Firefox Tabs through the nav with 3px rings. WebKit's Tab key did not move focus past the skip link in the headless build. Jax checked real Safari keyboard use on 2026-10-25 and it works as expected (settled).
- **Not tested:** real iOS and Android devices. Screen readers are in the Backlog.

## Resume skills area (open, 2026-10-25)

The Resume page has no skills area (D-124 removed the chips). Jax rejected seven layouts: grouped text rows, grouped chips, skills inside the case study cards, one paragraph, a skill by employer grid, a skills timeline and proof-number tiles (all deleted). Jax wants something that reads fast and is visual, and is not wordy. The PDF's four groups and its outcomes (Toyota 40+ teams, Albertsons 20+ teams and 5,000+ stores, ServiceNow 60%, Visa 20% SLAs) are the raw material. Next step is a new direction from Jax.

## Resume PDF (side task, 2026-10-24)

Four resumes build from HTML in [`resume/`](../resume/) (D-110): main, ATS, Design Engineer and Design Engineer ATS. The public PDF is the main build and the only one the site links (decided 2026-10-25). Copies sit in `~/Desktop/resume/`. To revisit with Jax: more Design Engineer framing in the role bullets, the Toyota first bullet, whether the headline should change. Merge to `redesign` only when Jax says so.

## Open questions for Jax

Copy:
- About copy, round one applied (D-044). Earlier-roles paragraph added with links to the three case studies (Visa left out). The Toyota scale is answered in D-083 (680 + 120 tokens, 40 teams, one brand today).
- Titles: "Staff Product Designer" throughout, "Design Engineer" where it fits (D-021). Page titles and meta follow it.

Design / tokens:
1. **Figma is retired.** Ignore it; code and `docs/decisions.md` are the only source of truth (2026-10-25).
2. The card ramp is purple, indigo, sky, teal, and the green group `quinary` now exists (D-123). A fifth study card would take it.
3. Dark card backgrounds were tinted 30% toward the ground; all pages are migrated, so judge them in the dark pass (D-028).
4. Mobile/tablet: no designs exist (D-008). Proposed per slice, agreed in review. The footer tablet layout is settled (2026-10-25).
5. The link arrows are Phosphor bold, so their stroke scales with size (D-026). Revisit if it reads light.
6. Icons: all UI icons are Phosphor bold and the emoji are gone (D-037).
7. ServiceNow's Outcomes rest on what Jax recalls (no metrics exist for the tool).
8. Which case studies are strongest for the hiring goal, and what outcomes/metrics can we state for each? (For the first `portfolio-critique` pass.)

Remaining `TODO(jax)` in the code (2026-10-25):
- The Home SEO copy (`Work.tsx`, D-003, D-016).
- Resume role summaries and strength proof lines are drafts condensed from the PDF bullets and the case studies (`roles.ts`, `Resume.tsx`, D-124).
- Toyota page: no Deliverables image (decided 2026-10-21: none wanted). The sprint board image is 800px and soft on retina (Jax is fine with that).

## Parked: study image component (raised 2026-10-19, return after ServiceNow copy is done)

Jax finds the image approach too fixed. Today: `StudyImage` (3:1 banner, `corners` as a free string), `StudyCompare` (1200 / 740 default box, `aspectRatio` override added in D-078) and `StudyPanels` (300px / 220px box, `sourceWidth`, `sourceHeight`, pixel slice coordinates and hand-computed `weight` in the content files). ServiceNow's hero needed a composite sheet and slices computed by hand. Proposal to discuss: one `StudyMedia` component with a `layout` of `single` (natural or a named ratio, optional surface or clipped inset), `pair` (before / after) and `spread` (several screens in a row with their own `src`, `alt` and fractional `crop`, equal height from their own aspect ratios). Shared: caption as wide as the image, surfaces and padding from tokens only, the 40px spacing, a fixed 16px corner (drop the free-string `corners`). Open: image aspect ratios (declare per item, or have the export script write each size to a generated `images.json`), then migrate Indeed, ActBlue and ServiceNow and compare screenshots, and delete the three old components. Its own slice, not part of the ServiceNow PR. Study copy stays inline in `content.ts` (D-003).

## Backlog

- **Screen reader test (Jax).** VoiceOver on a Mac: Cmd+F5, then Tab through the nav. Check that each page change announces the h1 (D-126), the photo list on About reads as a list with its intro, the card links name their study, the mode toggle states its mode and the tooltips do not double-announce.
- **Token worklist, remaining.** [untokenized-styles.md](untokenized-styles.md): the four first picks are done (D-139). Left are the exact-match literals (use `space-*` tokens), the 2px values and the single-use layout measures. See its last section.
- **`Image` fallback.** Explore how it looks when an About photo fails to load (TODO(jax)).
