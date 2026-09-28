# CLAUDE.md

Jax Engel's portfolio (jaxengeldesign.com): React 19 + TypeScript SPA, Vite, SCSS modules, deployed to GitHub Pages.

## Commands
- `npm run dev` / `npm run build` / `npm run preview`
- `npm run generate:component -- Name` scaffolds a component; `npm run generate-index` regenerates barrels
- `npm run build:theme` regenerates `src/styles/theme.css` from `src/tokens/*` (never hand-edit it)
- `npm run plugin:watcher` watches tokens and syncs the Figma plugin (`figma-plugin/`) over ws://127.0.0.1:8080
- `npm run lint:css` runs stylelint on plain CSS
- `npm run deploy` publishes `dist/` via gh-pages

## Conventions
- Formatting: tabs, single quotes (`.prettierrc`). Class names: `clsx`.
- Import aliases: legacy `@components/*`, `@pages/*` etc. and new `#components/*`, `#pages/*` etc. both work. Prefer `#` in new code.
- Content currently lives in `resources/content.ts` files next to each page; case studies are in `src/pages/Studies/`.

## Rollout plan (incremental, each slice deployable)
Work is shipped in slices off main, not one big branch. The old big-bang work is archived at `origin/update-content-archive` for reference only.
0 foundations, 1 tokens + light/dark theme, 2 content out of TS (Markdown + JSON), 3 header/footer/Work page, 4 case study template, 5 case study content (incl. Toyota), 6 About, 7 Resume, 8 hidden theme picker.

## Tokens and theming
- Source of truth: `src/tokens/` (`primitives.ts`, `defaultTheme.ts` with light + dark semantic tokens). Compiled to `src/styles/theme.css` (`:root`, `[data-theme='dark']`, and a `prefers-color-scheme` block). It is named `theme.css` (not `variables.css`) because Sass would resolve `@styles/variables` to it instead of `_variables.scss`.
- `src/styles/theme-bridge.css` remaps legacy SCSS custom properties to tokens in dark mode. Temporary; delete once components use tokens.
- `src/providers/Theme` (`ThemeProvider`, `useTheme`) sets `data-theme`, persists the choice in localStorage, and follows the OS when nothing is stored. Theme ids are strings so more themes can be added.
- Theme switching is gated: `VITE_THEME_SWITCHING` in `.env` (false). While off the site is pinned to light and the header toggle is hidden. Preview with `?themePreview=1` (`=0` clears). The inline script in `index.html` mirrors the provider logic. Flip the flag when legacy SCSS components (Link, StudyCard, NotFound, Resume header/footer, which use compile-time colors) are migrated.
