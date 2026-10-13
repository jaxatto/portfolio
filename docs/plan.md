# Plan

Goal: make the portfolio as strong as possible for getting Jax hired as a staff-level product designer. Update this file at the end of every slice or session. Keep it short and current.

## Roadmap

Status: `[ ]` not started, `[~]` in progress, `[x]` merged to `redesign`.

- [x] 0. Foundations: tokens (port from `update-content`, light + dark), typography, layout
- [~] 1. Header and footer (incl. nav, mode toggle, theme picker)
- [ ] 2. Home / Work page and study cards
- [ ] 3. Case study template
- [ ] 4. Case study content: Indeed, ActBlue, ServiceNow, Toyota (copy + design review for each)
- [ ] 5. About
- [ ] 6. Resume (do together with Jax, later)

Order is a proposal; confirm before starting slice 0.

## Now

Slice 0 merged into `redesign` (PR 2). Slice 1 (header, footer, nav, mode toggle) is planned, not built: waiting on Jax's answers to the slice 1 questions below. Findings from Figma:
- Header = nav (Work/About/Resume + mode toggle) + intro banner (photo, "Hello, I'm Jax!"). Figma's `hasIntro` variant means the intro shows on Home only; confirm what other pages show.
- Footer = "Let's work together" card + email, then Resume / LinkedIn / GitHub links, on decorative shapes.
- Theme Picker is bigger than light/dark: five named themes (Unicorn, Forest, Cyberpunk, Cotton Candy, Racetrack) plus a Switch Mode row. The nav only shows the mode toggle.
- Footer email link and the wave emoji are 28px, which is off the type scale (24/32).
- Figma asset downloads are blocked in the cloud sandbox, so the footer decor SVG (node `2844:23672`) can't be fetched; Jax can export it to the repo, or we approximate in CSS.
- `index.html`, Work and Resume meta still say "Senior Product Designer" while the hero/footer target Staff roles.

## Open questions for Jax

Slice 1:
- Multi-theme picker (Unicorn, Forest, ...): ship it, and when? Proposal: slice 1 builds the light/dark mode toggle only; the picker is its own later slice.
- 28px (footer email link, wave emoji): add 28 to the type scale, or change the design to 24/32?
- Footer decor SVG: export to `src/assets/decor/`, or approximate in CSS?
- Meta title/description: change "Senior" to "Staff" site-wide?

Other:

1. Component-level values in Figma (study card padding 48/56, link gap 4, border offset 2) aren't tokens yet. Decide at the Header/Footer and Home slices whether they become tokens.
2. Where should copy live (D-003)? Leaning: Markdown for case studies, inline for short page copy. Confirm at the first page slice.
3. Mobile/tablet: no designs exist (D-008). Plan: propose breakpoints from the desktop system per slice and agree before building.
4. Which case studies are strongest for the hiring goal, and what outcomes/metrics can we state for each? (Used by the first `portfolio-critique` pass.)

## Setup still needed

- **`i-have-adhd` skill:** it isn't visible to Claude in the cloud sessions so far (not in the claude.ai skills list, not in this repo). To get it into every session across Claude, enable it in your claude.ai skills settings, or paste its contents to a session and it can be added at `.claude/skills/i-have-adhd/SKILL.md` for this repo. `CLAUDE.md` already tells every session to load it when present.
- **Design screenshots:** done. They're in `screens/` (light `Name.png`, dark `Name-1.png`, plus component crops).
- **Local preview:** the dev server runs in the cloud container. Each change comes with a route to review and a screenshot, since `localhost` links may not open from Jax's browser. Tell me if they do.
