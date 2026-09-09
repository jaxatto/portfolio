# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Jax Engel's personal portfolio site (product design case studies, resume, about). React 19 + TypeScript SPA built with Vite, deployed to GitHub Pages at jaxengeldesign.com. Design tokens are synced with a companion Figma plugin (`figma-plugin/`) over a local WebSocket bridge.

## Commands

```bash
npm run dev              # start Vite dev server (opens browser)
npm run build             # production build to dist/
npm run preview           # preview a production build locally
npm run build:theme       # regenerate src/styles/variables.css from src/tokens/*
npm run plugin:watcher    # watch src/tokens/* and push changes to the Figma plugin over ws://127.0.0.1:8080
npm run generate:component -- [Path/ComponentName]   # scaffold a new component (see below)
npm run generate-index                                # regenerate barrel index.ts files under src/components
npm run deploy             # build + publish dist/ to GitHub Pages (gh-pages)
```

There is no test suite and no lint script wired into `package.json`; `stylelint.config.mjs` and `.prettierrc` exist but are run manually/via editor integration, not via an npm script.

## Import aliases

The codebase uses `#`-prefixed subpath imports (defined in both `package.json` `imports` and `tsconfig.json` `paths`) instead of relative paths across directories:

- `#src/*`, `#tokens/*`, `#styles/*`, `#pages/*`, `#components/*`, `#data/*`, `#utils/*`

Use these when importing across top-level `src/` folders (e.g. `import Work from '#pages/Work'`); use relative imports within the same feature folder.

## Component conventions

Every component lives in its own folder with three files, and this shape is what `scripts/generate-component.js` scaffolds:

```
ComponentName/
  ComponentName.tsx
  ComponentName.module.scss   # (or .module.css for some — CSS Modules either way)
  index.ts                    # re-exports: `export { default } from './ComponentName'`
```

`npm run generate:component -- SkillCard` creates `src/components/SkillCard/...`. Nested paths are supported and are auto-routed:
- `npm run generate:component -- Resume/SkillCard` → detects `src/pages/Resume` exists and creates `src/pages/Resume/components/SkillCard`
- `npm run generate:component -- components/Foo/Bar` or `pages/Foo/Bar` → used verbatim under `src/`

Do not hand-write `index.ts` barrels for `src/components/*` — `npm run generate-index` regenerates them by statically parsing each component's main file for named exports (value and type). Re-run it after adding/removing named exports from a component.

## Pages and routing

Routes are declared in `src/App.tsx` (`react-router-dom`, `BrowserRouter`): `/`, `/about`, `/resume`, `/case-studies/:slug`, and a catch-all `NotFound`.

Case studies are **not** file-based routed — `src/pages/Studies/Studies.tsx` hand-maps each `slug` to a `{ content, meta }` module pair imported from `src/pages/Studies/pages/<Study>/`. To add a new case study:
1. Create `src/pages/Studies/pages/<StudyName>/{content.ts, meta.ts, images/}`.
2. Add its slug/path to `src/data/constants/studyLinks.ts`.
3. Register the slug → `{ content, meta }` mapping in the `studies` object in `src/pages/Studies/Studies.tsx`.
4. `content.ts` and `meta.ts` should conform to the shared types in `src/data/commonTypes/study/`.

Each study page renders through the shared `StudyTemplate` component (`src/pages/Studies/components/StudyTemplate`), composed from `HeaderSection`, `StudySection`, `StudyImage`, and `NextStudy` building blocks.

Other pages (`Work`, `About`, `Resume`) follow the same `Page/resources/{content.ts,meta.ts}` pattern for their copy and SEO metadata, rendered by the page's own `.tsx`. `meta.ts` feeds the `Meta` component (`src/components/Meta`), which imperatively sets `document.title` and the meta-description tag — there is no `<head>`-management library.

## Design tokens pipeline

Token source of truth lives in `src/tokens/` (`primitives.ts`, `defaultTheme.ts`, `colorSteps.ts`, `types.ts`, `tokens.json`). These are **not** consumed directly by components; they are compiled:

- `npm run build:theme` (`scripts/tokens/build-theme.ts`, backed by `scripts/tokens/build-theme/*`) resolves primitives + semantic light/dark color/shadow/typography tokens and writes CSS custom properties to `src/styles/variables.css`. Components/CSS should reference the generated `var(--...)` custom properties, not the TS token files directly.
- `npm run plugin:watcher` (`scripts/tokens/watcher.ts`) watches `src/tokens/`, rebuilds the theme CSS on change, and — if the companion Figma plugin (`figma-plugin/`) is connected over `ws://127.0.0.1:8080` — pushes a DTCG-formatted primitives/semantics payload so the Figma plugin stays in sync with code-defined tokens.
- Regenerate `src/styles/variables.css` (`npm run build:theme`) after editing anything under `src/tokens/` — it is a build artifact, not meant to be hand-edited.
- `stylelint.config.mjs` treats `src/styles/variables.css` as the reference file for custom-property validation (`no-unknown-custom-properties`), so new custom properties must originate from the token pipeline rather than being introduced ad hoc in component stylesheets.

## Styling

CSS Modules (`.module.scss` / `.module.css`) scoped per component, plus global stylesheets in `src/styles/` (`reset.css`, `main.css`, `layout.css`, `typography.css`, `iconography.css`, `utilities.css`, and the generated `variables.css`). `postcss-pxtorem-plus` is configured in `vite.config.ts` to convert px → rem at build time. Formatting uses tabs (`.prettierrc`: `useTabs: true`, `singleQuote: true`).
