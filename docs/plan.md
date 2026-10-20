# Plan

Goal: make the portfolio as strong as possible for getting Jax hired as a staff-level product designer. Update this file at the end of every slice or session. Keep it short and current.

## Roadmap

Status: `[ ]` not started, `[~]` in progress, `[x]` merged to `redesign`.

- [x] 0. Foundations: tokens (port from `update-content`, light + dark), typography, layout
- [x] 1. Header, footer and mode toggle (nav, icon toggle, Home hero, footer variants, icons, tooltips, 404). Decisions D-014 to D-027. Multi-theme picker deferred to its own later slice
- [x] 2. Home / Work page and study cards (D-028 to D-038, merged to `redesign` with the About page, 2026-10-16)
- [x] 3. Case study template (D-046 to D-066, merged to `redesign` 2026-10-19; Indeed is its first finished page)
- [~] 4. Case study content: Indeed done (copy, images, D-047 to D-066). ActBlue done (D-067 to D-075, final pass 2026-10-19, ready for Jax to merge) and Indeed updated alongside it. ServiceNow done (D-077, D-078, waiting for Jax's review). Next Toyota (page does not exist yet)
- [x] 5. About (D-040 to D-045, merged with slice 2; only a scale number for the Toyota token work is open)
- [ ] 6. Resume (do together with Jax, later)

Order is a proposal; confirm before starting slice 0.

## Now

Slice 3 (case study template) is merged into `redesign`. Next: Toyota (ActBlue, Indeed and ServiceNow are done). Bring each page to the Indeed pattern: left-aligned 40rem reading column (D-066), images with 40px around them (D-053), the template's hero and image components, `legacy={false}` already set by the template, and copy per the Copy voice rules (use the `copy-check` skill). Standing rule from Jax (2026-10-19): delete anything legacy as we touch it, and fold one-off styles into shared ones where that is relevant. The global `.legacy` rules (Link.module.scss) and the D-027 TEMP dark-mode rule stay until Resume is migrated (slice 6), since only Resume still uses them. Dark mode is still gated for production (D-011) but shows in the dev server (`.env.development`).

## Open questions for Jax

Copy (all marked `TODO(jax)`, provisional):
- About copy, round one applied (D-044). Earlier-roles paragraph added with links to the three case studies (Visa left out). Still open: a scale number for the Toyota token work (brands, products or token count). Toyota's meta is drafted in D-045 and waits for its page.
- Hero: add one proof point (metric or shipped outcome) and one concrete AI example (D-016). Revisit later if needed.
- Footer line: "Open to remote Staff Product Designer and Design Engineer roles." (D-021, D-024).
- 404 quips: seven phrases in `src/pages/NotFound/resources/content.ts`, picked at random (D-022).
- Titles: "Staff Product Designer" throughout, "Design Engineer" where it fits (D-021). Other pages' titles and meta still say "Staff Product Designer – Scalable UX…" and "at ServiceNow" (the About design says Toyota); each page's slice updates its own.

Design / tokens:
1. **Toyota case study page** doesn't exist: its Home card links to `/case-studies/toyota` (the 404 for now). Add the content before launch, then drop `ready: false` in `StudyCardGrid.tsx` (D-028).
2. **Figma is a reference only.** It is out of date for Home, About and the focus ring, and Jax won't update it; code and `docs/decisions.md` are the source of truth (2026-10-15).
3. The card ramp ends at teal (container teal 100); a fifth study would continue with green (not built, D-030).
4. Dark card backgrounds were tinted 30% toward the ground; check against the rest of the dark pages when they migrate (D-028).
5. Mobile/tablet: no designs exist (D-008). Proposed per slice, agreed in review. There is no tablet design for the footer (stacks at 640px).
6. The link arrows are Phosphor bold, so their stroke scales with size (D-026). Revisit if it reads light.
7. Icons: all UI icons are Phosphor bold and the emoji are gone (D-037).
8. ServiceNow's Outcomes rest on what Jax recalls (no metrics exist for the tool). The Toyota frame's footer says "Design Technologist" where the site says "Design Engineer".
9. Which case studies are strongest for the hiring goal, and what outcomes/metrics can we state for each? (For the first `portfolio-critique` pass.)

## Parked: study image component (raised 2026-10-19, return after ServiceNow copy is done)

Jax finds the image approach too fixed. Today: `StudyImage` (3:1 banner, `corners` as a free string), `StudyCompare` (1200 / 740 default box, `aspectRatio` override added in D-078) and `StudyPanels` (300px / 220px box, `sourceWidth`, `sourceHeight`, pixel slice coordinates and hand-computed `weight` in the content files). ServiceNow's hero needed a composite sheet and slices computed by hand. Proposal to discuss: one `StudyMedia` component with a `layout` of `single` (natural or a named ratio, optional surface or clipped inset), `pair` (before / after) and `spread` (several screens in a row with their own `src`, `alt` and fractional `crop`, equal height from their own aspect ratios). Shared: caption as wide as the image, surfaces and padding from tokens only, the 40px spacing, a fixed 16px corner (drop the free-string `corners`). Open: image aspect ratios (declare per item, or have the export script write each size to a generated `images.json`), then migrate Indeed, ActBlue and ServiceNow and compare screenshots, and delete the three old components. Its own slice, not part of the ServiceNow PR. Also decided not to move study copy to Markdown (inline `content.ts` stays, D-003); CLAUDE.md's "will use Markdown/JSON" line should be removed when this is picked up.

## Setup still needed

- **`i-have-adhd` skill:** it isn't visible to Claude in the cloud sessions so far (not in the claude.ai skills list, not in this repo). To get it into every session across Claude, enable it in your claude.ai skills settings, or paste its contents to a session and it can be added at `.claude/skills/i-have-adhd/SKILL.md` for this repo. `CLAUDE.md` already tells every session to load it when present.
- **Design screenshots:** done. They're in `screens/` (light `Name.png`, dark `Name-1.png`, plus component crops).
- **Local preview:** the dev server runs in the cloud container. Each change comes with a route to review and a screenshot, since `localhost` links may not open from Jax's browser. Tell me if they do.
