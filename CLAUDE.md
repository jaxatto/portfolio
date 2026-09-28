# CLAUDE.md

Jax Engel's portfolio (jaxengeldesign.com): React 19 + TypeScript SPA, Vite, SCSS modules, deployed to GitHub Pages.

## Commands
- `npm run dev` / `npm run build` / `npm run preview`
- `npm run generate:component -- Name` scaffolds a component; `npm run generate-index` regenerates barrels
- `npm run build:theme` regenerates `src/styles/theme.css` from `src/tokens/*` (never hand-edit it)
- `npm run plugin:watcher` watches tokens and syncs the Figma plugin (`figma-plugin/`) over ws://127.0.0.1:8080
- `npm run lint:css` runs stylelint on plain CSS
- `npm run check:content` validates case study Markdown (parses, slug registered, images exist, alt text present)
- `npm run deploy` publishes `dist/` via gh-pages

## Conventions
- Formatting: tabs, single quotes (`.prettierrc`). Class names: `clsx`.
- Import aliases: legacy `@components/*`, `@pages/*` etc. and new `#components/*`, `#pages/*` etc. both work. Prefer `#` in new code.

## Rollout plan (incremental, each slice deployable)
Work is shipped in slices off main, not one big branch. The old big-bang work is archived at `origin/update-content-archive` for reference only.
0 foundations, 1 tokens + light/dark theme, 2 content out of TS (Markdown + JSON), 3 header/footer/Work page, 4 case study template, 5 case study content (incl. Toyota), 6 About, 7 Resume, 8 hidden theme picker.

## Tokens and theming
- Source of truth: `src/tokens/` (`primitives.ts`, `defaultTheme.ts` with light + dark semantic tokens). Compiled to `src/styles/theme.css` (`:root`, `[data-theme='dark']`, and a `prefers-color-scheme` block). It is named `theme.css` (not `variables.css`) because Sass would resolve `@styles/variables` to it instead of `_variables.scss`.
- `src/styles/theme-bridge.css` remaps legacy SCSS custom properties to tokens in dark mode. Temporary; delete once components use tokens.
- `src/providers/Theme` (`ThemeProvider`, `useTheme`) sets `data-theme`, persists the choice in localStorage, and follows the OS when nothing is stored. Theme ids are strings so more themes can be added.
- Theme switching is gated: `VITE_THEME_SWITCHING` in `.env` (false). While off the site is pinned to light and the header toggle is hidden. Preview with `?themePreview=1` (`=0` clears). The inline script in `index.html` mirrors the provider logic. Flip the flag when legacy SCSS components (Link, StudyCard, NotFound, Resume header/footer, which use compile-time colors) are migrated.

## Content
Copy lives in content files, not in components. TypeScript only wires content to links and bundled images.
- **Case studies**: `src/pages/Studies/pages/<Study>/index.md` + `images/`. Loaded by `src/pages/Studies/studies.ts` (Vite `import.meta.glob`) and parsed by `src/utils/content/study.ts`. The folder name lowercased is the URL slug and must be in `src/constants/studyLinks.ts`. Format:
  - YAML frontmatter: `title`, `seo` (`title`, `description`, `keywords`), `roles` (`role`, `startDate`, `endDate`), `chips` (`label`, `theme`).
  - Body: paragraphs before the first `##` are the header intro; an image there is the hero. Each `## <emoji> Title` is a section, in document order. Paragraphs, `- ` bullets and `![alt](images/file.png "caption"){corners=square}` images are supported (see `src/utils/content/markdown.ts`).
- **Everything else**: `resources/*.json` next to the component or page (`content.json`, `meta.json`, `roles.json`). Shared URLs stay in `src/constants/*` and are merged in by the sibling `content.ts`. Image imports and icon/logo maps stay in TS.
- To add a case study: create the folder with `index.md` and `images/`, add the slug to `studyLinks`, run `npm run check:content`.
