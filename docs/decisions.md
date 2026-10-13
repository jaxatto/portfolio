# Decisions

One short entry per decision: what, why, date. Add an entry when a choice sets a pattern (new token, component, copy approach, tooling). Reference by ID in code comments, e.g. `// See docs/decisions.md D-004`. Status: **decided**, **proposed** (discuss with Jax), or **superseded**.

## D-001 Commit identity and workflow — decided, 2026-10-13
Commits are authored as Jax Engel. Work in small slices with frequent small commits; merge in small steps into `redesign` (D-007). Why: Jax wants to move fast while saving work as we go.

## D-002 Adopt the `update-content` token system — decided, 2026-10-13
Use the token pipeline from `origin/update-content` (`src/tokens/`, `scripts/tokens/`, generated `theme.css`, light/dark semantic tokens) as the styling foundation. Keep SCSS only where it earns its place (e.g. `respond()` mixin); components consume tokens as CSS custom properties. Port it as its own foundations slice and re-check values against current Figma. Dark mode ships (see D-006).

## D-003 Where copy lives — decided, 2026-10-13
Short page copy lives inline in components, next to its markup. Case studies get Markdown/JSON files when we build them (slice 3/4). No new `resources/*.ts` copy files. Existing ones are folded in as each component is migrated (Header and Footer done in slice 1).

## D-004 Copy is collaborative — decided, 2026-10-13
Copy can be revised and improved, but through discussion. Claude proposes concrete changes with reasoning aimed at the hiring goal; Jax decides.

## D-005 No one-off styles — decided, 2026-10-13
Anything not covered by existing tokens/components is raised and agreed first, then logged here as a new token, variant or design change.

## D-006 Ship light and dark themes — decided, 2026-10-13
The redesign ships with both themes (Figma has both, desktop only). Tokens are built with light/dark semantic values from the start; the theme switcher and OS-preference behavior are designed in the foundations/header slice. Every component is checked in both themes.

## D-007 `redesign` integration branch — decided, 2026-10-13
All redesign slices merge into `redesign`, only on Jax's approval. `main` (the live site) is untouched until Jax decides to bring `redesign` back. Why: lets us move fast and save work without disturbing the live site.

## D-008 No mobile designs yet — decided, 2026-10-13
Figma contains desktop designs only (light and dark). Responsive behavior is proposed from the desktop system and agreed with Jax per slice, then logged here. Don't invent responsive patterns silently.

## D-009 Review links with every change — decided, 2026-10-13
After each change the dev server is up and Jax gets the exact route/section to review plus a screenshot. Files are always shared as real links.

## D-010 Manrope tops out at 800 — decided, 2026-10-13
Manrope has no 900 weight, so Figma's Manrope "strong"/"extra-strong" (900) renders as 800. Jax is fine with 800. In code, Manrope text that Figma sets to 900 uses 800 (body links, bold body text); Inter keeps 900 for headings (`--font-weight-strong`). No token change needed yet: only heading styles use `strong`. When the Link/body-strong components are built, add a Manrope-specific weight token rather than hard-coding 800 (D-005). Optionally update Figma to 800 so the file matches what ships. Fonts load Inter 400/700/800/900 and Manrope 400/500/700/800 (`_variables.scss`).

## D-011 Dark mode gated until components migrate — decided, 2026-10-13
D-006 stands (ship light and dark). Until the components that use legacy SCSS colors are migrated, `VITE_THEME_SWITCHING=false` pins the site to light so nothing half-restyles. Flip it when Header, Footer, Work and the shared components are on tokens.

## D-012 Token port scope and TypeScript 5 — decided, 2026-10-13
Slice 0 ported the token source, build script, generated `theme.css`, `ThemeProvider` and the pre-paint theme script. Left behind for now: Figma plugin sync (`watcher.ts`, `export-figma-tokens.ts`, `tokens.json`), stylelint, and `theme-bridge.css` (a temporary dark-mode patch for legacy components that the gate makes unnecessary). TypeScript upgraded 4.9 → 5.9 because the token types use `const` type parameters (TS 5.0+); `update-content` shipped with that unresolved typecheck error.

## D-013 Fluid type scale — decided, 2026-10-13
Type sizes may be fluid (`clamp()`), and need not match the token values at every width, as long as the size at desktop (1280px) equals Figma. The ported scale reaches Figma's desktop sizes at about 1280px (title-sm 40, heading-lg 32, body-lg 24, body-md 20). Smaller-screen behavior is still tuned per slice and checked with Jax (D-008).

## D-014 Slice 1 patterns — decided, 2026-10-13
- **Focus ring:** 2px solid `--color-content-default`, 2px offset (the dark ring in Figma). There is no dedicated focus token; if one is wanted later, add it and swap it in everywhere.
- **TextLink** (`src/components/TextLink`) is the token-based Figma Link. The legacy SCSS `Link` stays until its last consumers (study cards, NotFound, Resume) are migrated, then it is deleted.
- **Decorative shapes** are CSS (header ring, footer circle, dot, ring, dashed circle) because Figma's SVG export isn't available to us. Fills are container colors at 50% opacity (verified against light and dark exports); positions and sizes come from Figma. Dashed rings use `content-default`.
- **32px** for the footer email link and the wave emoji (Figma has 28px, which is off the scale). The email link is fluid down to 16px so it fits 375px screens.
- **Footer bottom padding** is `section-xl + 2xl` (104px in Figma, not a token).
- **Header** shows the intro (photo, greeting) on Home only; other pages show brand + nav. Header and Footer are full width; only `<main>` is constrained to the site width.
- **Mode toggle** renders only while theme switching is enabled (D-011). The multi-theme picker (Unicorn, Forest, ...) is a later slice.
- **Page background** now uses `--color-surface-default` (same white in light).
- **Placeholders:** the sun, moon and automation (brand mark) icons are hand-made stand-ins from `update-content` until Figma exports are available.
- **Site metadata** says Staff everywhere (title, description, Open Graph, Work and Resume pages).
