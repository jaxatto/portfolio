# Plan

Goal: make the portfolio as strong as possible for getting Jax hired as a staff-level product designer. Update this file at the end of every slice or session. Keep it short and current.

## Roadmap

Status: `[ ]` not started, `[~]` in progress, `[x]` merged to `main`.

- [ ] 0. Foundations: tokens (port from `update-content`), typography, layout
- [ ] 1. Header and footer
- [ ] 2. Home / Work page and study cards
- [ ] 3. Case study template
- [ ] 4. Case study content: Indeed, ActBlue, ServiceNow, Toyota (copy + design review for each)
- [ ] 5. About
- [ ] 6. Resume (do together with Jax, later)

Order is a proposal; confirm before starting slice 0.

## Now

Nothing in progress. `CLAUDE.md`, this plan and `docs/decisions.md` are set up.

## Open questions for Jax

1. Where should copy live (D-003)? Decide before the first page slice.
2. Light/dark theming: ship it, or build the tokens with dark support and keep it switched off (as `update-content` did)?
3. Which frames in Figma `Screens` are mobile? Are the adjacent-id frames the mobile versions?
4. Which case studies are strongest for the hiring goal, and what outcomes/metrics can we state for each? (Used by the first `portfolio-critique` pass.)
5. Merge protocol: do you want a PR per slice, or direct fast-forward merges to `main` after you approve?

## Setup still needed

- **`i-have-adhd` skill:** it isn't visible to Claude in the cloud sessions so far (not in the claude.ai skills list, not in this repo). To get it into every session across Claude, enable it in your claude.ai skills settings, or paste its contents to a session and it can be added at `.claude/skills/i-have-adhd/SKILL.md` for this repo. `CLAUDE.md` already tells every session to load it when present.
- **Design screenshots:** `~/desktop/screens` is on Jax's machine and not visible to cloud sessions. Either rely on Figma (preferred, exact values) or add the images to the repo under `design/screens/` in a small commit.
