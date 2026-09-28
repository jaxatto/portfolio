# CLAUDE.md

Jax Engel's portfolio (jaxengeldesign.com): React 19 + TypeScript SPA, Vite, SCSS modules, deployed to GitHub Pages.

## Commands
- `npm run dev` / `npm run build` / `npm run preview`
- `npm run generate:component -- Name` scaffolds a component; `npm run generate-index` regenerates barrels
- `npm run deploy` publishes `dist/` via gh-pages

## Conventions
- Formatting: tabs, single quotes (`.prettierrc`). Class names: `clsx`.
- Import aliases: legacy `@components/*`, `@pages/*` etc. and new `#components/*`, `#pages/*` etc. both work. Prefer `#` in new code.
- Content currently lives in `resources/content.ts` files next to each page; case studies are in `src/pages/Studies/`.

## Rollout plan (incremental, each slice deployable)
Work is shipped in slices off main, not one big branch. The old big-bang work is archived at `origin/update-content-archive` for reference only.
0 foundations, 1 tokens + light/dark theme, 2 content out of TS (Markdown + JSON), 3 header/footer/Work page, 4 case study template, 5 case study content (incl. Toyota), 6 About, 7 Resume, 8 hidden theme picker.
