# Decisions

One short entry per decision: what, why, date. Add an entry when a choice sets a pattern (new token, component, copy approach, tooling). Reference by ID in code comments, e.g. `// See docs/decisions.md D-004`. Status: **decided**, **proposed** (discuss with Jax), or **superseded**.

## D-001 Commit identity and workflow — decided, 2026-10-13
Commits are authored as Jax Engel. Work in small slices with frequent small commits; merge to `main` in small steps so it stays deployable. Why: Jax wants to move fast while saving work as we go.

## D-002 Adopt the `update-content` token system — decided, 2026-10-13
Use the token pipeline from `origin/update-content` (`src/tokens/`, `scripts/tokens/`, generated `theme.css`, light/dark semantic tokens) as the styling foundation. Keep SCSS only where it earns its place (e.g. `respond()` mixin); components consume tokens as CSS custom properties. Port it as its own foundations slice and re-check values against current Figma. Open: ship dark mode or keep it gated.

## D-003 Where copy lives — proposed, 2026-10-13
Not settled. Options:
- (a) `resources/*.ts` next to each component (current `main`). Copy is separated from layout, but hard to read in context and adds boilerplate.
- (b) Markdown/JSON files (what `update-content` did). Good for long-form case studies, heavy for short page copy.
- (c) Inline in components. Easiest to read and edit alongside layout.

Lean to discuss: Markdown for case studies, inline for short page copy, retire `resources/` for new work. Until decided, edit copy where it already lives and add no new copy files.

## D-004 Copy is collaborative — decided, 2026-10-13
Copy can be revised and improved, but through discussion. Claude proposes concrete changes with reasoning aimed at the hiring goal; Jax decides.

## D-005 No one-off styles — decided, 2026-10-13
Anything not covered by existing tokens/components is raised and agreed first, then logged here as a new token, variant or design change.
