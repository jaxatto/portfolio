# Jax Engel portfolio

Source for [jaxengeldesign.com](https://jaxengeldesign.com): a staff product designer's portfolio with case studies, an About page and a resume. React 19, TypeScript, Vite, CSS modules and React Router, deployed to GitHub Pages.

## Run it

```bash
npm ci
npm run dev
```

Other commands: `npm run build` (production build plus per-route meta), `npm run preview`, `npm run format`, `npm run build:theme` (regenerates `src/styles/theme.css` from `src/tokens`).

## How it is built

Design tokens in `src/tokens` compile to CSS custom properties, and components are CSS modules that read only those tokens. `CLAUDE.md` holds the working rules and conventions, `docs/decisions.md` the reasons behind them and `docs/plan.md` where the project stands.

## License

The code here is under the [MIT License](LICENSE).
