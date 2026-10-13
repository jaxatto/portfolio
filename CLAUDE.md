# CLAUDE.md

Jax Engel's portfolio (https://jaxengeldesign.com): React 19 + TypeScript SPA, Vite, SCSS modules, React Router, deployed to GitHub Pages. This file describes `main`. Keep it current: when a change alters a convention or command below, update this file in the same commit.

## Working agreement

- **Jax decides design and copy.** The Figma file is the design source of truth. Final copy comes from Jax. Never rewrite, shorten or "improve" copy, and never invent placeholder copy that could ship. If copy or a design detail is missing, ask.
- **Work in small slices.** One page or one component per slice, each ending in something Jax can look at, and each leaving the site deployable. Don't start the next slice until Jax has reviewed the last.
- **Foundations first.** Tokens, typography, layout, header and footer land before any page uses them.
- **Match the design exactly, then stop.** Read values from Figma (see below), not from screenshots or by eye. Don't add features, sections, animations or refactors that weren't asked for. Mention anything you notice and leave it alone.
- **Never** push to `main`, open a PR, or run `npm run deploy` unless Jax asks. `deploy` publishes the live site.
- Be honest about verification: say what you built, what you checked (build, typecheck, a screenshot at which widths), and what you did not.

## Git

- Commit as Jax: `Jax Engel <6673768+jaxatto@users.noreply.github.com>`. Check `git config user.name` and `user.email` before the first commit of a session and set them locally (`git config user.name "Jax Engel"`, `git config user.email "6673768+jaxatto@users.noreply.github.com"`) if they say anything else.
- Short imperative commit subjects, matching history ("update about page", "fix spacing in about"). One logical change per commit.
- Branch from the latest `main` for each slice. Keep slices small enough to review in one sitting.
- The branch `update-content` is an earlier attempt, kept as reference only (see below). Don't merge it and don't build on top of it.

## Design source: Figma

File: `Portfolio-2026`, key `MqsYPIWOx9imJtSiXidiww` (https://www.figma.com/design/MqsYPIWOx9imJtSiXidiww/Portfolio-2026).

- Use the Figma MCP: `get_design_context` for layout and values, `get_variable_defs` for tokens, `get_metadata` for structure. Load the `figma-design-to-code` skill first. Its output is a reference to adapt to this codebase's components and tokens, not code to paste.
- Current designs are on the **Screens** page (`0:1`). Ignore **Old Screens** and the Sandbox/Presi pages unless asked.
- Frames (desktop frames are 1280px wide, content column 912px):

| Page | Node |
| --- | --- |
| Home (Work) | `2839:21650` |
| About | `2850:26579` |
| Indeed study | `2853:27124` |
| ActBlue study | `2860:33875` |
| ServiceNow study | `2860:34444` |
| Toyota study | `2948:40398` |

  Each page has a second frame with an adjacent id (Home `2839:21652`, About `2850:26578`, Indeed `2853:27125`, ActBlue `2860:33874`, ServiceNow `2860:34445`, Toyota `2951:40612`). These are probably the mobile versions. Confirm with Jax before relying on that, and check actual frame widths.
- Shared pieces on Home: Header (`2844:24831`), Footer (`2844:23717`), Study Card.
- If Figma and the live site disagree, Figma wins. If a design can't be built as drawn (accessibility, behavior), say so before deviating.

## Commands

```
npm ci                 # install
npm run dev            # runs build-scripts (generate-index, sync-icons) then vite
npm run build          # vite build; postbuild copies index.html to 404.html (SPA fallback on Pages)
npm run preview        # serve dist/
npm run generate:component -- Name          # scaffold src/components/Name
npm run generate:component -- Page/Name     # scaffold src/pages/Page/components/Name
npm run generate-index # regenerate index.ts barrels
npm run sync-icons     # regenerate icon list from src/assets/icons
npm run deploy         # publishes dist/ to GitHub Pages. Only when Jax asks.
```

There is no test runner and no lint script. Verify with `npm run build` plus a visual check.

Known baseline: `npx tsc --noEmit` reports one existing error (`src/index.tsx`: unused `@ts-expect-error`). Don't treat it as caused by your change, and don't fix it unless asked.

## Structure

```
src/
  components/     shared components: Name/{Name.tsx, Name.module.scss, index.ts, resources/}
  pages/          Work, About, Resume, Studies, NotFound; page-local parts in pages/<Page>/components
  pages/Studies/pages/<Study>/   per-study content.ts, meta.ts, images/
  constants/      shared links and icon names (mainLinks, studyLinks, contactInfo, iconNames)
  providers/      SiteConfig context
  commonTypes/    shared types (study header/section/image/meta)
  styles/         _variables, _typography, _mixins, _functions, _utilities, main.scss
  assets/         icons, logos, about and sample images
```

- Routes live in `src/App.tsx`. A new case study needs a route-reachable slug in `src/constants/studyLinks.ts` and a card in `StudyCardGrid/resources/content.ts`.
- Import aliases (`vite.config.ts` and `tsconfig.json` must stay in sync): `@components`, `@pages`, `@styles`, `@assets`, `@constants`, `@commonTypes`, `@providers`.
- `src/styles/_all.scss` is injected into every SCSS module (`additionalData` in `vite.config.ts`), so don't `@use` it manually.
- Each component folder exports through an `index.ts` barrel. Use the generator instead of hand-creating folders.

## Conventions

- **Content out of components.** Copy lives in `resources/content.ts` (or `meta.ts`) next to the component or page. Components render it. This keeps copy changes reviewable apart from layout changes.
- **Styling.** SCSS modules per component. Use the existing tokens and helpers in `src/styles/` (`font-size()`, `respond()`, spacing/radius maps, CSS custom properties like `--color-dark`). Don't hard-code colors, sizes or breakpoints that have a token. If Figma has a value with no token, say so and propose one rather than inlining it.
- **Responsive.** Breakpoints are in `$breakpoints` (`xs` 340, `sm` 640, `md` 900, site width 960). Check every slice at desktop (1280), tablet and mobile (about 375) widths.
- **Accessibility is a core part of this portfolio's pitch.** Semantic HTML, one `h1` per page, a sensible heading order, visible focus states, real `alt` text (empty only for decorative images), `aria-hidden` on decorative emoji, sufficient contrast, keyboard operable. Treat regressions here as bugs.
- **Style.** TypeScript strict. Function components with `React.FC`. Match the surrounding file for quotes and semicolons (the codebase mixes them; don't reformat files you aren't otherwise changing).
- **Images** are named `*-min.png` and are already compressed. Keep descriptive names and add alt text where they're rendered.
- **Fonts.** Inter (headings) and Manrope (body) load from Google Fonts in `_variables.scss`. Make sure the weights requested cover the weights the design uses.
- **SEO and meta.** Per-page `title` and `description` live in each page's `resources/meta.ts` and render through `Meta`/`Layout`. Site-wide defaults are in `index.html`.

## Reference branch: `update-content`

An earlier, larger attempt at the redesign, committed under a different identity. It is useful as a quarry, not a base. It contains slices for a design-token pipeline with light/dark theming, case study content moved to Markdown/JSON, and new Header/Footer/Work page/study cards, plus its own longer `CLAUDE.md`.

- Read it with `git show origin/update-content:<path>` or `git diff main...origin/update-content -- <path>`.
- Port a piece only when Jax has chosen to adopt it for the slice at hand. Reimplement against the current Figma values rather than cherry-picking whole commits, and carry over only the conventions Jax has approved.
- Its `CLAUDE.md` mentions an `origin/update-content-archive` branch that does not exist on the remote.

## Slice log

Update this as slices land so a fresh session knows where things stand.

- [ ] Foundations (tokens, typography, layout)
- [ ] Header and footer
- [ ] Home / Work page and study cards
- [ ] Case study template and content (Indeed, ActBlue, ServiceNow, Toyota)
- [ ] About
- [ ] Resume
