# Plan

Goal: make the portfolio as strong as possible for getting Jax hired as a staff-level product designer. Update this file at the end of every slice or session. Keep it short and current.

## Roadmap

Status: `[ ]` not started, `[~]` in progress, `[x]` merged to `redesign`.

- [~] 0. Foundations: tokens (port from `update-content`, light + dark), typography, layout. Built; awaiting Jax's review and merge into `redesign`
- [ ] 1. Header and footer
- [ ] 2. Home / Work page and study cards
- [ ] 3. Case study template
- [ ] 4. Case study content: Indeed, ActBlue, ServiceNow, Toyota (copy + design review for each)
- [ ] 5. About
- [ ] 6. Resume (do together with Jax, later)

Order is a proposal; confirm before starting slice 0.

## Now

Slice 0 (foundations) is built on branch `claude/admiring-goodall-b1qiwh`, awaiting review. Tokens verified against Figma in light and dark; site renders pixel-identical to before. Next: slice 1 (header and footer, including the mode toggle / theme picker).

## Open questions for Jax

1. Component-level values in Figma (study card padding 48/56, link gap 4, border offset 2) aren't tokens yet. Decide at the Header/Footer and Home slices whether they become tokens.
2. Where should copy live (D-003)? Leaning: Markdown for case studies, inline for short page copy. Confirm at the first page slice.
3. Mobile/tablet: no designs exist (D-008). Plan: propose breakpoints from the desktop system per slice and agree before building.
4. Which case studies are strongest for the hiring goal, and what outcomes/metrics can we state for each? (Used by the first `portfolio-critique` pass.)

## Setup still needed

- **`i-have-adhd` skill:** it isn't visible to Claude in the cloud sessions so far (not in the claude.ai skills list, not in this repo). To get it into every session across Claude, enable it in your claude.ai skills settings, or paste its contents to a session and it can be added at `.claude/skills/i-have-adhd/SKILL.md` for this repo. `CLAUDE.md` already tells every session to load it when present.
- **Design screenshots:** done. They're in `screens/` (light `Name.png`, dark `Name-1.png`, plus component crops).
- **Local preview:** the dev server runs in the cloud container. Each change comes with a route to review and a screenshot, since `localhost` links may not open from Jax's browser. Tell me if they do.
