# Plan

Goal: make the portfolio as strong as possible for getting Jax hired as a staff-level product designer. Update this file at the end of every slice or session. Keep it short and current.

## Roadmap

Status: `[ ]` not started, `[~]` in progress, `[x]` merged to `redesign`.

- [x] 0. Foundations: tokens (port from `update-content`, light + dark), typography, layout
- [~] 1. Header and footer (nav, mode toggle, Home intro). Header, hero and mobile header approved by Jax; footer next (Jax is doing it); dark mode reviewed per page as each slice lands. Multi-theme picker deferred to its own later slice
- [ ] 2. Home / Work page and study cards
- [ ] 3. Case study template
- [ ] 4. Case study content: Indeed, ActBlue, ServiceNow, Toyota (copy + design review for each)
- [ ] 5. About
- [ ] 6. Resume (do together with Jax, later)

Order is a proposal; confirm before starting slice 0.

## Now

Slice 1 (header, toggle) is built and Jax is happy with the Home header and hero (2026-10-13). The header was reworked from the Figma design through review; the decisions are D-014 to D-017. Footer circles are removed (D-020); the footer is next to design. Home meta is updated (provisional); other pages' meta still old. Next: slice 2 (Home / Work page and study cards). Dark mode is still gated for production (D-011) but shows in the dev server (`.env.development`).

## Open questions for Jax

Header / hero:
- Hero copy: add one proof point (metric or shipped outcome) and one concrete AI example (D-016). Provisional until then.
- Page title and meta description still say "Staff Product Designer – Scalable UX, Systems Thinking, Inclusive Design" and "at ServiceNow" (the About design says Toyota). Update with the hero copy; the footer says "Design Technologist", which the research shows few people use as a label (`docs/research/portfolio-landscape.md`): consider "Design Engineer".
- Mobile and tablet are not checked yet. Nav wraps below 640px; the hero sentence is fluid. Propose and agree before building (D-008).
- Dark mode review of the header and hero (selection box, pointer, chip, toggle, selection color).
- The footer's circles and dashed ring vs the circle-free header: keep, or bring in line?
- Pointer motion: the hero loop is 8s drag plus 4s pause; a mono token and a hover-offset token exist only as CSS variables (D-015, D-017).

Other:
1. Component-level values in Figma (study card padding 48/56, link gap 4, border offset 2) aren't tokens yet. Decide at the Home slice.
2. Mobile/tablet: no designs exist (D-008). Propose per slice, agree before building.
3. Which case studies are strongest for the hiring goal, and what outcomes/metrics can we state for each? (For the first `portfolio-critique` pass.)
4. GitHub link in the footer points to `https://github.com/jaxatto`. Correct?
5. Icons: the brand mark is gone from the header; the arrows, sun and moon are drawn in code. Export final icons from Figma if wanted.

## Setup still needed

- **`i-have-adhd` skill:** it isn't visible to Claude in the cloud sessions so far (not in the claude.ai skills list, not in this repo). To get it into every session across Claude, enable it in your claude.ai skills settings, or paste its contents to a session and it can be added at `.claude/skills/i-have-adhd/SKILL.md` for this repo. `CLAUDE.md` already tells every session to load it when present.
- **Design screenshots:** done. They're in `screens/` (light `Name.png`, dark `Name-1.png`, plus component crops).
- **Local preview:** the dev server runs in the cloud container. Each change comes with a route to review and a screenshot, since `localhost` links may not open from Jax's browser. Tell me if they do.
