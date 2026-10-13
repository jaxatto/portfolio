# Plan

Goal: make the portfolio as strong as possible for getting Jax hired as a staff-level product designer. Update this file at the end of every slice or session. Keep it short and current.

## Roadmap

Status: `[ ]` not started, `[~]` in progress, `[x]` merged to `redesign`.

- [ ] 0. Foundations: tokens (port from `update-content`, light + dark), typography, layout
- [ ] 1. Header and footer
- [ ] 2. Home / Work page and study cards
- [ ] 3. Case study template
- [ ] 4. Case study content: Indeed, ActBlue, ServiceNow, Toyota (copy + design review for each)
- [ ] 5. About
- [ ] 6. Resume (do together with Jax, later)

Order is a proposal; confirm before starting slice 0.

## Now

Setup done: `CLAUDE.md`, this plan, `docs/decisions.md`, project skills, `redesign` branch created from `main`. Waiting on Jax to approve merging this setup into `redesign`, then slice 0 (foundations).

## Open questions for Jax

1. Where should copy live (D-003)? Leaning: Markdown for case studies, inline for short page copy. Confirm at the first page slice.
2. Mobile/tablet: no designs exist (D-008). Plan: propose breakpoints from the desktop system per slice and agree before building.
3. Which case studies are strongest for the hiring goal, and what outcomes/metrics can we state for each? (Used by the first `portfolio-critique` pass.)

## Setup still needed

- **`i-have-adhd` skill:** it isn't visible to Claude in the cloud sessions so far (not in the claude.ai skills list, not in this repo). To get it into every session across Claude, enable it in your claude.ai skills settings, or paste its contents to a session and it can be added at `.claude/skills/i-have-adhd/SKILL.md` for this repo. `CLAUDE.md` already tells every session to load it when present.
- **Design screenshots:** Jax put them in `temp/`, which is gitignored, so cloud sessions can't see them. Figma is the source of truth, so this is optional. If wanted, add them under `design/screens/`.
- **Local preview:** the dev server runs in the cloud container. Each change comes with a route to review and a screenshot, since `localhost` links may not open from Jax's browser. Tell me if they do.
