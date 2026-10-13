# Plan

Goal: make the portfolio as strong as possible for getting Jax hired as a staff-level product designer. Update this file at the end of every slice or session. Keep it short and current.

## Roadmap

Status: `[ ]` not started, `[~]` in progress, `[x]` merged to `redesign`.

- [x] 0. Foundations: tokens (port from `update-content`, light + dark), typography, layout
- [~] 1. Header and footer (nav, mode toggle, Home intro). Built; awaiting Jax's review. Multi-theme picker deferred to its own later slice
- [ ] 2. Home / Work page and study cards
- [ ] 3. Case study template
- [ ] 4. Case study content: Indeed, ActBlue, ServiceNow, Toyota (copy + design review for each)
- [ ] 5. About
- [ ] 6. Resume (do together with Jax, later)

Order is a proposal; confirm before starting slice 0.

## Now

Slice 1 (Header, Footer, ModeToggle, TextLink) is built on `claude/admiring-goodall-b1qiwh`, awaiting Jax's review. Light and dark header/footer match the Figma exports (about 1.5% of header pixels differ, text anti-aliasing). Next: slice 2 (Home / Work page and study cards), after review. Dark mode stays gated until slice 2 lands (D-011).

## Open questions for Jax

Slice 1 review:
- Hero line: discuss a more specific version (scale, domain, outcomes). Send details and I'll draft options.
- Mobile proposal (D-008): nav wraps under the brand, photo stacks above the greeting card, dashed ring shrinks to clear the nav, footer card tightens. OK?
- GitHub link in the footer points to `https://github.com/jaxatto`. Correct?
- Icons: sun, moon and the brand mark are placeholders. Export them from Figma into the repo, or allow `www.figma.com` in the cloud environment's network settings so I can download assets.
- Site description says "at ServiceNow", but the About design says current role is Toyota. Update the description?
- Header intro appears on Home only. What should case study pages show (brand + nav only)?

Other:
1. Component-level values in Figma (study card padding 48/56, link gap 4, border offset 2) aren't tokens yet. Decide at the Home slice.
2. Mobile/tablet: no designs exist (D-008). Propose per slice, agree before building.
3. Which case studies are strongest for the hiring goal, and what outcomes/metrics can we state for each? (For the first `portfolio-critique` pass.)

## Setup still needed

- **`i-have-adhd` skill:** it isn't visible to Claude in the cloud sessions so far (not in the claude.ai skills list, not in this repo). To get it into every session across Claude, enable it in your claude.ai skills settings, or paste its contents to a session and it can be added at `.claude/skills/i-have-adhd/SKILL.md` for this repo. `CLAUDE.md` already tells every session to load it when present.
- **Design screenshots:** done. They're in `screens/` (light `Name.png`, dark `Name-1.png`, plus component crops).
- **Local preview:** the dev server runs in the cloud container. Each change comes with a route to review and a screenshot, since `localhost` links may not open from Jax's browser. Tell me if they do.
