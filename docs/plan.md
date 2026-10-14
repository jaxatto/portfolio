# Plan

Goal: make the portfolio as strong as possible for getting Jax hired as a staff-level product designer. Update this file at the end of every slice or session. Keep it short and current.

## Roadmap

Status: `[ ]` not started, `[~]` in progress, `[x]` merged to `redesign`.

- [x] 0. Foundations: tokens (port from `update-content`, light + dark), typography, layout
- [x] 1. Header, footer and mode toggle (nav, icon toggle, Home hero, footer variants, icons, tooltips, 404). Decisions D-014 to D-027. Multi-theme picker deferred to its own later slice
- [~] 2. Home / Work page and study cards (built, D-028; awaiting Jax review)
- [ ] 3. Case study template
- [ ] 4. Case study content: Indeed, ActBlue, ServiceNow, Toyota (copy + design review for each)
- [ ] 5. About
- [ ] 6. Resume (do together with Jax, later)

Order is a proposal; confirm before starting slice 0.

## Now

Slice 1 is done and merged to `redesign` (PR #3, 2026-10-14). Next: slice 2 (Home / Work page and study cards). Dark mode is still gated for production (D-011) but shows in the dev server (`.env.development`). Until each page is migrated to tokens, About, the case studies and Resume use a TEMP white-text rule in dark mode (D-027, `main.scss`); delete it per page as each slice lands.

## Open questions for Jax

Copy (all marked `TODO(jax)`, provisional):
- Hero: add one proof point (metric or shipped outcome) and one concrete AI example (D-016). Revisit later if needed.
- Footer line: "Open to remote Staff Product Designer and Design Engineer roles." (D-021, D-024).
- 404 quips: seven phrases in `src/pages/NotFound/resources/content.ts`, picked at random (D-022).
- Titles: "Staff Product Designer" throughout, "Design Engineer" where it fits (D-021). Other pages' titles and meta still say "Staff Product Designer – Scalable UX…" and "at ServiceNow" (the About design says Toyota); each page's slice updates its own.

Design / tokens:
1. Tokens study card is inert ("Case study coming soon") until that study exists; write it or drop the card (D-028).
2. Mobile/tablet: no designs exist (D-008). Propose per slice, agree before building. There is no tablet design for the footer (stacks at 640px).
3. The link arrows are Phosphor bold, so their stroke scales with size (slimmer at small sizes than the old hand-drawn ones). Revisit if it reads light (D-026).
4. Unused icons `file.svg` and `download.svg` are still in the icon set; remove when their last consumer is migrated.
5. Which case studies are strongest for the hiring goal, and what outcomes/metrics can we state for each? (For the first `portfolio-critique` pass.)

## Setup still needed

- **`i-have-adhd` skill:** it isn't visible to Claude in the cloud sessions so far (not in the claude.ai skills list, not in this repo). To get it into every session across Claude, enable it in your claude.ai skills settings, or paste its contents to a session and it can be added at `.claude/skills/i-have-adhd/SKILL.md` for this repo. `CLAUDE.md` already tells every session to load it when present.
- **Design screenshots:** done. They're in `screens/` (light `Name.png`, dark `Name-1.png`, plus component crops).
- **Local preview:** the dev server runs in the cloud container. Each change comes with a route to review and a screenshot, since `localhost` links may not open from Jax's browser. Tell me if they do.
