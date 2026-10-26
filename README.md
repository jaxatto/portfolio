# Jax Engel portfolio

Source for [www.jaxengeldesign.com](https://www.jaxengeldesign.com): a staff product designer's portfolio with case studies, an About page and a resume. React 19, TypeScript, Vite, CSS modules and React Router, deployed to GitHub Pages.

![Home page of the portfolio](docs/home-preview.jpg)

## Run it

```bash
npm ci
npm run dev
```

Other commands: `npm run build` (client build, server build, then every route pre-rendered to HTML with its own meta tags and a sitemap), `npm run preview` (serves `dist/`), `npm run lint` (ESLint with `jsx-a11y`), `npm run typecheck`, `npm test` (unit tests), `npm run test:e2e` (axe accessibility and hydration checks against the production build, run `npx playwright install chromium` once), `npm run format`, `npm run build:theme` (regenerates `src/styles/theme.css` from `src/tokens`). CI runs lint, typecheck, build, unit tests and the e2e tests on every pull request.

## What to look at

- **Accessibility.** Semantic headings, visible focus, focus moved to the `h1` on route change, forced-colors outlines, reduced-motion handling and `jsx-a11y` linting.
- **Design tokens.** One TypeScript source compiles to light and dark CSS custom properties. Components read only those tokens.
- **Performance and SEO.** Every route is pre-rendered to HTML and React attaches to it, so a page paints before any script runs. Routes load as separate chunks. Fonts are self-hosted, the card previews are WebP and image sizes are read from the files. Each route has its own meta tags, and the site has a sitemap and `robots.txt`.

## How it is built

Design tokens in `src/tokens` compile to CSS custom properties, and components are CSS modules that read only those tokens. `CLAUDE.md` holds the working rules and conventions, `docs/decisions.md` the reasons behind them and `docs/plan.md` where the project stands.

## License

The code here is under the [MIT License](LICENSE).
