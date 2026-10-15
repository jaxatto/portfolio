# Plan

Goal: make the portfolio as strong as possible for getting Jax hired as a staff-level product designer. Update this file at the end of every slice or session. Keep it short and current.

## Roadmap

Status: `[ ]` not started, `[~]` in progress, `[x]` merged to `redesign`.

- [x] 0. Foundations: tokens (port from `update-content`, light + dark), typography, layout
- [x] 1. Header, footer and mode toggle (nav, icon toggle, Home hero, footer variants, icons, tooltips, 404). Decisions D-014 to D-027. Multi-theme picker deferred to its own later slice
- [~] 2. Home / Work page and study cards (built, D-028 to D-034; PR #4 awaiting Jax's approval to merge)
- [ ] 3. Case study template
- [ ] 4. Case study content: Indeed, ActBlue, ServiceNow, Toyota (copy + design review for each)
- [~] 5. About (built on tokens with the 960 column, hero marks, chips and pet photos with name tags, D-040 to D-043; same branch and PR as slice 2; About copy pass held)
- [ ] 6. Resume (do together with Jax, later)

Order is a proposal; confirm before starting slice 0.

## Now

Slice 2 and the About page are built on `claude/slice-2-home-study-cards` (PR #4 into `redesign`; the PR description is stale and still describes only the first version). About: one column on the 960 grid, hero with the Home selection box and caret chips, `HeroMarks` shared with the Home header, four pet photos with Figma-style name tags and captions (D-040 to D-043). Slice 2 proper: study cards and the Home grid (D-028), the 960px content column (D-029), the card color ramp with a teal palette (D-030), card link behavior (D-031), focus ring tokens (D-032), type scale half steps and a medium weight (D-033), pretty wrapping (D-034). Not yet merged. Checked in Chrome at 1280 (light and dark) and 375 (light); 768 and 375 in dark are not re-checked since the later passes, and the "next study" row under case studies is deliberately untouched until slice 3. Dark mode is still gated for production (D-011) but shows in the dev server (`.env.development`). Until each page is migrated to tokens, About, the case studies and Resume use a TEMP white-text rule in dark mode (D-027, `main.scss`) and the old global link styles; both are scoped to `Layout`'s `legacy` prop (D-036). Set `legacy={false}` on a page when its slice lands, and delete the rules with the last page.

## Open questions for Jax

Copy (all marked `TODO(jax)`, provisional):
- About copy pass (held): paragraph 1 may be missing a word ("enterprise tokens"), there are no outcomes or metrics, and the pet captions are Jax's flavor text. Page meta title and description still say "Staff Product Designer – Scalable UX…".
- Hero: add one proof point (metric or shipped outcome) and one concrete AI example (D-016). Revisit later if needed.
- Footer line: "Open to remote Staff Product Designer and Design Engineer roles." (D-021, D-024).
- 404 quips: seven phrases in `src/pages/NotFound/resources/content.ts`, picked at random (D-022).
- Titles: "Staff Product Designer" throughout, "Design Engineer" where it fits (D-021). Other pages' titles and meta still say "Staff Product Designer – Scalable UX…" and "at ServiceNow" (the About design says Toyota); each page's slice updates its own.

Design / tokens:
1. **Toyota case study page** doesn't exist: its Home card links to `/case-studies/toyota` (the 404 for now). Add the content before launch, then drop `ready: false` in `StudyCardGrid.tsx` (D-028).
2. **Figma is out of date** for the Home frame (960 column, card anatomy, sample window, color ramp) and for the focus ring (3px / 3px in code).
3. The card ramp ends at teal (container teal 100); a fifth study would continue with green (not built, D-030).
4. Dark card backgrounds were tinted 30% toward the ground; check against the rest of the dark pages when they migrate (D-028).
5. Mobile/tablet: no designs exist (D-008). Proposed per slice, agreed in review. There is no tablet design for the footer (stacks at 640px).
6. The link arrows are Phosphor bold, so their stroke scales with size (D-026). Revisit if it reads light.
7. Icons: all UI icons are Phosphor bold and the emoji are gone (D-037).
8. ServiceNow's Outcomes section is thin after the demo and testing claims were cut (slice 4). The Toyota frame's footer says "Design Technologist" where the site says "Design Engineer".
9. Which case studies are strongest for the hiring goal, and what outcomes/metrics can we state for each? (For the first `portfolio-critique` pass.)

## Setup still needed

- **`i-have-adhd` skill:** it isn't visible to Claude in the cloud sessions so far (not in the claude.ai skills list, not in this repo). To get it into every session across Claude, enable it in your claude.ai skills settings, or paste its contents to a session and it can be added at `.claude/skills/i-have-adhd/SKILL.md` for this repo. `CLAUDE.md` already tells every session to load it when present.
- **Design screenshots:** done. They're in `screens/` (light `Name.png`, dark `Name-1.png`, plus component crops).
- **Local preview:** the dev server runs in the cloud container. Each change comes with a route to review and a screenshot, since `localhost` links may not open from Jax's browser. Tell me if they do.
