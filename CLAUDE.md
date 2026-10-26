# CLAUDE.md

Jax Engel's portfolio (https://www.jaxengeldesign.com): React 19 + TypeScript SPA, Vite, CSS modules, React Router, deployed to GitHub Pages. This file describes `main`.

**Goal: get Jax hired.** Every change should make the portfolio stronger to a hiring manager or design leader reviewing a staff-level product designer. Polish, clarity, accessibility and craft matter more than feature count.

## Start of every session

1. If a skill named `i-have-adhd` is available, load it and follow it for the whole session. (Jax wants it in every Claude session. It is a user-level skill in `~/.claude/skills`.)
2. Read `docs/plan.md` (where we are, what's next) and skim `docs/decisions.md` (what's already decided). Don't re-ask settled questions.
3. Check `git status` and the current branch. Confirm the git identity (below).
4. **Check GitHub auth is `jaxatto`.** Run `gh auth status`. If the active account is not `jaxatto` (the machine also has `rhya-games`, which is not a collaborator and cannot open PRs here), run `gh auth switch -u jaxatto` and check again before any `gh` or PR step.

## Shared memory across sessions

The repo is the memory. Sessions are ephemeral, so anything worth keeping goes in a file and gets committed.

- `CLAUDE.md` (this file): stable rules and how to work. Short. Change it rarely.
- `docs/plan.md`: goal, roadmap, current slice, open questions, next steps. Update at the end of every slice or session.
- `docs/decisions.md`: the rules in force, by area, with the IDs that hold the reasoning. Add a short entry when a choice sets a pattern, before or with the commit that uses it. `docs/decisions-archive.md` is the full history that code comments (`D-028`) point to.
- `.claude/skills/`: repeatable procedures (see Skills).

Keep all of it lean: current facts and decisions only, no history, no narration. Delete or fold entries that go stale.

## How we work together

- **Collaborate on design and copy.** Jax's designs and drafts are the starting point, not the ceiling. If something in the content or design could be better (weak positioning, vague claims, missing outcomes, inconsistent patterns, accessibility gaps, hierarchy problems), say so plainly with a concrete suggestion and why it helps a hiring manager. Then discuss it. Don't silently rewrite copy and don't silently ship a design deviation; propose, agree, then do. Use the `portfolio-critique` skill for a structured pass.
- **Consistency over one-offs.** Everything draws from the token system and shared components. If something needs a value, size, color, component or pattern that doesn't exist, stop and raise it, agree on whether it's a new token/variant or a design change, and log it in `docs/decisions.md`. No quiet one-off styles.
- **Small slices, small commits, frequent merges.** One page or component per slice. Commit often (one logical change per commit, short imperative subject matching history, e.g. "update about page") and push after each commit so work is saved. Slices merge into the long-lived **`redesign`** branch, not `main`, and only after Jax approves (see Git). `main` stays the live site until Jax decides to bring `redesign` back. Never run `npm run deploy` unless asked.
- **Every change is reviewable.** After any change, make sure the dev server is running (`npm run dev`, port 5173), then give Jax the exact place to look: the route and section, e.g. `http://localhost:5173/about` plus which section and breakpoint. End the reply with that local link. For changes to docs, skills or other files, link the file.
- **Always make file links real.** Whenever you mention a file, give a markdown link with its absolute path, e.g. [CLAUDE.md](/home/user/portfolio/CLAUDE.md), so Jax can open it. Files outside the working directory, scratchpad and memory directories can't be opened by Jax, so copy anything meant for them into the repo or scratchpad first.
- **Foundations before pages.** Tokens, typography, layout, header and footer come first.
- **Don't add features or refactors that weren't asked for;** mention them and leave them alone.
- **Be honest about verification.** Say what was built, what was checked (build, typecheck, viewport widths), and what wasn't.
- **Resume page is a later, joint effort.** Don't change `src/pages/Resume` or the resume PDF until Jax starts that work.
- **Make skills for repeat tasks.** When a procedure comes up a second time (or is obviously going to), write it as a skill in `.claude/skills/<name>/SKILL.md`. Also look for good existing skills or plugins (SearchSkills, SearchPlugins) when a task would benefit, and propose them to Jax rather than installing silently.

## Copy voice

- **Never write "it's not this, it's that" comparisons** in any copy (page text, meta, captions, card outcomes, PR text): no "not X but Y", "X, not Y", "rather than", "instead of", "isn't X, it's Y". State what Jax does directly. Permanent rule from Jax (2026-10-15).
- **No interrupting clauses.** Don't split a subject from its verb with a comma-set clause ("The ICL, which was strict, was replaced by the IDS"). Put the subject and verb together and give the extra detail in its own short sentence. Also no em dashes or semicolons in sentences, and no run-ons. Rules from Jax (2026-10-17).
- **Revise lightly.** Keep the original's specifics, fix only what is weak, and don't reuse phrasing that already appears elsewhere on the site. Ask for facts (outcomes, current employer) instead of inventing them.

## No-nos (permanent, from Jax)

- **Never raise the Toyota token count ("680 tokens" and similar) as a proof point, a suggestion or an example.** Jax says it is irrelevant (2026-10-25). Leave it where it already sits in his study content unless he asks.
- **h1 to h6 are semantic only.** The tag is for structure, screen readers and the DOM. Never style a heading element directly (no `h1 {}`, `.x h2 {}` or `section > h2 + *` selectors). Choose the tag for the outline and the look from a class (compose a step from `type.module.css`), so any tag can look like any step (2026-10-25).
- **Don't bring up the code audit** or ask for its approvals. It runs on its own.

## Code comments

Comments say *why*, never what the code already says: a design or accessibility reason, a workaround, a known limitation. Two lines at most. Cite a decision (`D-004`) only when it adds a pointer a reader needs. Use `// NOTE:` for context and `// TODO(jax):` for an open question that needs a design or copy decision. No change-log wording ("was 24, now 32", "+8px per Jax"): git history and `docs/decisions.md` hold that. Keep comments true; update or delete them when the code changes.

## Git

- Commit as Jax: `Jax Engel <6673768+jaxatto@users.noreply.github.com>`. At the start of a session check `git config user.name` / `user.email`; set them locally if they say anything else.
- **Branches.** `main` = live site. `redesign` = integration branch for all redesign work (created from `main`, 2026-10-13). Work happens on the session's designated branch, which is branched from the latest `redesign`. Merge into `redesign` only when Jax has approved the slice; never merge to or push to `main`, and never merge to `redesign` unprompted. When Jax says redesign is ready, bringing it into `main` is a separate, explicit step.
- Merging: after approval, open a PR from the working branch into `redesign` and merge it. Keep PRs one slice each.

## Design source

Figma is retired (2026-10-25, D-132). Don't open the file or the MCP unless Jax asks. The code and `docs/decisions.md` are the only source of truth. There are no mobile designs: propose mobile and tablet behavior from the desktop system, get Jax's OK, and log it.

## Tokens and styling

Token system (D-002): `src/tokens/` (`primitives.ts`, `defaultTheme.ts` semantic light/dark, `colorSteps.ts`, `types.ts`) compiles with `npm run build:theme` into `src/styles/theme.css`. **Never hand-edit `theme.css`**; edit the TS and rebuild, and commit both. Semantic tokens are CSS custom properties (`--color-brand-default`, `--space-md`, `--font-style-body-md-size`, ...). Components use these, never primitives or raw values. Every semantic token references a primitive, and none is named for a value (`--font-size-display`, never `--font-size-56`). The generator and `scripts/tokens/token-layers.test.ts` enforce it (D-149). Light is `:root`, dark is `[data-theme='dark']`. `data-theme` always holds the theme being shown, the OS setting when nothing is stored, so there are no `prefers-color-scheme` blocks (D-128).

- `src/providers/Theme` sets `data-theme`, persists the choice and follows the OS when nothing is stored. The header toggle is always on (D-139). The inline script in `index.html` must mirror the provider's logic.
- Type sizes are fluid `clamp()`s that reach the desktop sizes at about 1280px, smaller sizes are tuned per slice (D-013). One `--font-weight-strong` serves both families: Inter renders 900 and Manrope's face stops at 800, so it renders 800 (D-154).
- Components are plain CSS modules on tokens, no SCSS (D-091). Breakpoints are literal `@media` widths: 640 (phone, 641 up) and 900 (desktop), and any other width carries a comment (D-118). Motion, shadows, state washes, layers and tap targets (40 and 44px) are tokens from `src/tokens/effects.ts` and `defaultTheme.ts`, so no raw durations, easings, shadows or target sizes in component CSS. Fixed icon glyphs use `--size-icon-*`. The browser bar color is generated into `src/tokens/themeColor.ts`, never typed by hand.
- Colored surfaces take a palette from one class in `src/styles/palette.module.css` and read `--palette-*`. A section that re-colors the semantic tokens is a tone in `src/styles/tone.css` (`data-tone`). Every button is `#components/Button` and every link `TextLink` (D-119).
- Import aliases are `#src`, `#tokens`, `#styles`, `#pages`, `#components`, `#assets`, `#constants` and `#providers` (`vite.config.ts`, `tsconfig.json` and `package.json` `imports` must stay in sync).

## Commands

```
npm ci                                   # install
npm run dev                              # vite
npm run build:theme                      # regenerate src/styles/theme.css from src/tokens
npm run build                            # client build, server build (.ssr), then scripts/prerender.ts pre-renders each route, 404.html and sitemap.xml into dist/ (D-159)
npm run preview                          # serve dist/
npm run lint                             # eslint with jsx-a11y
npm run typecheck                        # tsc --noEmit
npm test                                 # vitest unit tests (*.test.ts beside the code)
npm run test:e2e                         # playwright + axe on every route, light/dark, desktop/phone (builds first)
npm run format                           # prettier on src, scripts and config (.prettierrc.json)
npm run generate:component -- Name       # scaffold src/components/Name
npm run generate:component -- Page/Name  # scaffold src/pages/Page/components/Name
npm run deploy                           # publishes to GitHub Pages. Only when Jax asks.
```

Prettier decides formatting and CI runs `lint`, `typecheck`, `build`, `test` and `test:e2e`. A new route goes in the list in `e2e/a11y.spec.ts`. Verify with `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` plus a visual check at desktop (1280), tablet and mobile (~375). TypeScript is 5.x.

## Structure and conventions

```
src/components/        shared components: Name/{Name.tsx, Name.module.css, index.ts}. Layout is full-width, only <main> is constrained
src/pages/             Work, About, Resume, Studies, NotFound (+ pages/<Page>/components and resources)
src/pages/Studies/pages/<Study>/   content.ts, meta.ts, images/
src/pages/Studies/types/           study content types
src/constants/         shared links and icon names
src/providers/         Theme context
src/styles/            fonts, theme (generated), tone, palette, type and line modules, main
src/tokens/            token source, compiled into theme.css
scripts/               generate-component, prerender, vite-image-size, tokens/
```

- Routes: `src/App.tsx`. A new case study needs a slug in `src/constants/studyLinks.ts`, a card in `StudyCardGrid/StudyCardGrid.tsx` and an entry in `scripts/prerender.ts`.
- Index barrels and the icon list are written by hand. To add an icon, put the SVG in `src/assets/icons` and add its name to `src/constants/iconNames.ts` and the map in `Icon.tsx` (the types enforce both).
- Scaffold with `generate:component` instead of hand-making folders.
- **Copy lives inline** in components for short page copy (D-003). Case study copy stays in each study's inline `content.ts`. Don't add new `resources/*.ts` copy files for short page copy.
- **Accessibility is part of the pitch.** Semantic HTML, one `h1` per page, sensible heading order, visible focus, real `alt` text (empty only for decorative images), `aria-hidden` on decorative emoji, enough contrast, keyboard operable. Treat regressions as bugs.
- Run `npm run format` before committing (single quotes, semicolons, 2 spaces, 100 columns). TypeScript strict, function components with `React.FC`.
- Images are `*-min.png`, `*-min.jpg` or `*-min.webp`, already compressed (the Home card previews are WebP, D-158). Import them with `?size` (`import x from './x.jpg?size'` gives `{ src, width, height }`, D-125) and put the size on the `<img>`. Below the fold they load lazy. Every rendered image gets meaningful `alt` text.
- Fonts: Inter (headings), Manrope (body) and Roboto Mono are self-hosted latin variable files in `public/fonts`, declared in `src/styles/fonts.css`, with Inter and Manrope preloaded in `index.html` (D-127). A character outside Google's latin range falls back to a system font.
- Per-page SEO title and description live in `resources/meta.ts`; site defaults are in `index.html`. A new About-style page or study must also be listed in `scripts/prerender.ts`, which renders the route to HTML and writes its title, description, canonical and og tags into `dist/` (D-122, D-159). Render nothing that differs between server and browser on the first render (`window`, storage, time, `Math.random`), or hydration breaks.

## Reference branches

`origin/update-content` and its siblings (`update-content-archive`, `update-content-collab`, `figma-home-work-update`, `agents/shared-logic-for-variant-colors`, `test`) are earlier attempts, kept as quarries and committed under a different identity. Look there before reinventing something, read with `git show origin/update-content:<path>`, and port a piece only as part of a slice Jax has chosen and only with conventions recorded in `docs/decisions.md`. Don't merge them or build on them.

## Skills

Project skills live in `.claude/skills/`. Current: `copy-check` (lint and read copy against the Copy voice rules), `ship-slice` (verify, commit, push, review links, merge to `redesign` on approval) and `portfolio-critique` (structured content/design review for hiring impact).
