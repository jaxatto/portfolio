# CLAUDE.md

Jax Engel's portfolio (https://jaxengeldesign.com): React 19 + TypeScript SPA, Vite, CSS modules, React Router, deployed to GitHub Pages. This file describes `main`.

**Goal: get Jax hired.** Every change should make the portfolio stronger to a hiring manager or design leader reviewing a staff-level product designer. Polish, clarity, accessibility and craft matter more than feature count.

## Start of every session

1. If a skill named `i-have-adhd` is available, load it and follow it for the whole session. (Jax wants it in every Claude session. See `docs/plan.md` → Setup.)
2. Read `docs/plan.md` (where we are, what's next) and skim `docs/decisions.md` (what's already decided). Don't re-ask settled questions.
3. Check `git status` and the current branch. Confirm the git identity (below).
4. **Check GitHub auth is `jaxatto`.** Run `gh auth status`. If the active account is not `jaxatto` (the machine also has `rhya-games`, which is not a collaborator and cannot open PRs here), run `gh auth switch -u jaxatto` and check again before any `gh` or PR step.

## Shared memory across sessions

The repo is the memory. Sessions are ephemeral, so anything worth keeping goes in a file and gets committed.

- `CLAUDE.md` (this file): stable rules and how to work. Short. Change it rarely.
- `docs/plan.md`: goal, roadmap, current slice, open questions, next steps. Update at the end of every slice or session.
- `docs/decisions.md`: one short entry per design/architecture/copy decision (what, why, date). If a choice sets a pattern, log it before or with the commit that uses it.
- `.claude/skills/`: repeatable procedures (see Skills).

Keep all of it lean: current facts and decisions only, no history, no narration. Delete or fold entries that go stale.

## How we work together

- **Collaborate on design and copy.** Jax's designs and drafts are the starting point, not the ceiling. If something in the content or design could be better (weak positioning, vague claims, missing outcomes, inconsistent patterns, accessibility gaps, hierarchy problems), say so plainly with a concrete suggestion and why it helps a hiring manager. Then discuss it. Don't silently rewrite copy and don't silently ship a design deviation; propose, agree, then do. Use the `portfolio-critique` skill for a structured pass.
- **Consistency over one-offs.** Everything draws from the token system and shared components. If something needs a value, size, color, component or pattern that doesn't exist, stop and raise it, agree on whether it's a new token/variant or a design change, and log it in `docs/decisions.md`. No quiet one-off styles.
- **Small slices, small commits, frequent merges.** One page or component per slice. Commit often (one logical change per commit, short imperative subject matching history, e.g. "update about page") and push after each commit so work is saved. Slices merge into the long-lived **`redesign`** branch, not `main`, and only after Jax approves (see Git). `main` stays the live site until Jax decides to bring `redesign` back. Never run `npm run deploy` unless asked.
- **Every change is reviewable.** After any change, make sure the dev server is running (`npm run dev -- --no-open --host 0.0.0.0`, port 5173), then give Jax the exact place to look: the route and section, e.g. `http://localhost:5173/about` plus which section/breakpoint, and a screenshot of that area sent with `SendUserFile` (Playwright with `/opt/pw-browsers/chromium`; it works from the scratchpad). The cloud container's localhost may not open from Jax's browser, so the screenshot is the dependable part. For changes to docs, skills or other files, link the file.
- **Always make file links real.** Whenever you mention a file, give a markdown link with its absolute path, e.g. [CLAUDE.md](/home/user/portfolio/CLAUDE.md), so Jax can open it. Files outside the working directory, scratchpad and memory directories can't be opened by Jax, so copy anything meant for them into the repo or scratchpad first.
- **Foundations before pages.** Tokens, typography, layout, header and footer come first.
- **Match Figma where it is still current, then stop.** Read exact values from Figma, not from screenshots, but check `docs/decisions.md` first: later decisions override the frames. Don't add features or refactors that weren't asked for; mention them and leave them alone.
- **Be honest about verification.** Say what was built, what was checked (build, typecheck, viewport widths), and what wasn't.
- **Resume page is a later, joint effort.** Don't change `src/pages/Resume` or the resume PDF until Jax starts that work.
- **Make skills for repeat tasks.** When a procedure comes up a second time (or is obviously going to), write it as a skill in `.claude/skills/<name>/SKILL.md`. Also look for good existing skills or plugins (SearchSkills, SearchPlugins) when a task would benefit, and propose them to Jax rather than installing silently.

## Copy voice

- **Never write "it's not this, it's that" comparisons** in any copy (page text, meta, captions, card outcomes, PR text): no "not X but Y", "X, not Y", "rather than", "instead of", "isn't X, it's Y". State what Jax does directly. Permanent rule from Jax (2026-10-15).
- **No interrupting clauses.** Don't split a subject from its verb with a comma-set clause ("The ICL, which was strict, was replaced by the IDS"). Put the subject and verb together and give the extra detail in its own short sentence. Also no em dashes or semicolons in sentences, and no run-ons. Rules from Jax (2026-10-17).
- **Revise lightly.** Keep the original's specifics, fix only what is weak, and don't reuse phrasing that already appears elsewhere on the site. Ask for facts (outcomes, current employer) instead of inventing them.

## Code comments

Add comments where they help the next reader or session: *why* something is the way it is, a design/accessibility reason, a non-obvious Figma-to-code mapping, a workaround, a known limitation, or a pointer to a decision (`// See docs/decisions.md D-004`). Use `// NOTE:` for context and `// TODO(jax):` for an open question that needs a design or copy decision. Don't narrate obvious code. Keep comments true; update or delete them when the code changes.

## Git

- Commit as Jax: `Jax Engel <6673768+jaxatto@users.noreply.github.com>`. At the start of a session check `git config user.name` / `user.email`; set them locally if they say anything else.
- **Branches.** `main` = live site. `redesign` = integration branch for all redesign work (created from `main`, 2026-10-13). Work happens on the session's designated branch, which is branched from the latest `redesign`. Merge into `redesign` only when Jax has approved the slice; never merge to or push to `main`, and never merge to `redesign` unprompted. When Jax says redesign is ready, bringing it into `main` is a separate, explicit step.
- Merging: after approval, open a PR from the working branch into `redesign` and merge it. Keep PRs one slice each.
- `origin/update-content` and its siblings are earlier attempts, kept as quarries (see below). Don't merge them or build on top of them.

## Design source: Figma

File `Portfolio-2026`, key `MqsYPIWOx9imJtSiXidiww` (https://www.figma.com/design/MqsYPIWOx9imJtSiXidiww/Portfolio-2026).

- Use the Figma MCP: `get_design_context` (layout and values), `get_variable_defs` (tokens), `get_metadata` (structure). Load the `figma-design-to-code` skill before `get_design_context`. Its output is a reference to adapt to this codebase, not code to paste.
- Current designs are on the **Screens** page (`0:1`). Ignore **Old Screens** and the Sandbox/Presi pages unless asked. Desktop frames are 1280px wide with a 912px content column; the site itself uses a 960px content column (D-029), so Figma spacing is a reference, not a pixel spec.

| Page | Node |
| --- | --- |
| Home (Work) | `2839:21650` |
| About | `2850:26579` |
| Indeed study | `2853:27124` |
| ActBlue study | `2860:33875` |
| ServiceNow study | `2860:34444` |
| Toyota study | `2948:40398` |

  Each page has a second frame with an adjacent id (Home `2839:21652`, About `2850:26578`, Indeed `2853:27125`, ActBlue `2860:33874`, ServiceNow `2860:34445`, Toyota `2951:40612`), probably the mobile versions. Confirm with Jax and check frame widths before relying on that.
- Figma has **desktop designs only**, in light and dark. There are no mobile designs. Mobile/tablet behavior is a joint design decision: propose it from the desktop system, get Jax's OK, log it in `docs/decisions.md`.
- **Exported screens** are in [`screens/`](screens/) in the repo (1280px wide). For each page, `Name.png` is the light theme and `Name-1.png` is the dark theme (Home, About, and the Indeed, ActBlue, ServiceNow and Toyota studies). There are also component crops: Header, Footer, Nav, Nav Item, Menu Item, Mode Toggle, Theme Picker, Chip, Link, Study Card, Study Card Link. Use them for a quick visual check. Figma remains the source for exact values.
- **Figma is a reference, not the source of truth, and Jax won't update it to match the site** (decided 2026-10-15). Where Figma and the live site disagree, the code and `docs/decisions.md` win; use Figma for intent and for pages not built yet. If a design can't be built as drawn (accessibility, behavior), say so before deviating.

## Tokens and styling

Token system (D-002, ported in slice 0): `src/tokens/` (`primitives.ts` raw values, `defaultTheme.ts` semantic light/dark tokens, `colorSteps.ts` hover/active states, `types.ts`) compiles with `npm run build:theme` (`scripts/tokens/build-theme*`) into `src/styles/theme.css`. **Never hand-edit `theme.css`**; edit the TS and rebuild, and commit both. Semantic tokens are CSS custom properties (`--color-brand-default`, `--size-space-lg`, `--font-style-body-md-size`, ...); components use these, never primitives or raw values. Light is `:root`, dark is `[data-theme='dark']` (and a `prefers-color-scheme` block).

- `src/providers/Theme` sets `data-theme`, persists the choice, follows the OS when nothing is stored. Switching is **gated** by `VITE_THEME_SWITCHING` in `.env` (currently `false`, site pinned to light) until components are migrated to tokens. Preview with `?themePreview=1` (`=0` clears). Flip the flag when the dark designs are built (D-006, D-011). The inline script in `index.html` must mirror the provider's logic.
- Colors, spacing, radius, border width and the type scale were verified against Figma (light and dark) in slice 0. Type sizes are fluid `clamp()`s that reach the Figma desktop sizes at about 1280px; only the desktop size must match Figma, smaller sizes are tuned per slice (D-013). Manrope has no 900 weight; use 800 where Figma says 900 (D-010).
- Components are plain CSS modules using tokens (`Name.module.css`). There is no SCSS left (D-091). Breakpoints are literal `@media` widths (640, 900).
- Import aliases: legacy `@components/*` etc. and new `#components/*`, `#tokens/*` etc. both work (`vite.config.ts`, `tsconfig.json` and `package.json` `imports` must stay in sync). Prefer `#` in new code.
- Not ported from `update-content`: the Figma plugin sync (`watcher.ts`, `export-figma-tokens.ts`, `tokens.json`), `stylelint`, and `theme-bridge.css` (D-012). Revisit when needed.

## Commands

```
npm ci                                   # install
npm run dev                              # build-scripts (generate-index, sync-icons) then vite
npm run build:theme                      # regenerate src/styles/theme.css from src/tokens
npm run build                            # vite build; postbuild copies index.html to 404.html
npm run preview                          # serve dist/
npm run generate:component -- Name       # scaffold src/components/Name
npm run generate:component -- Page/Name  # scaffold src/pages/Page/components/Name
npm run generate-index                   # regenerate index.ts barrels
npm run sync-icons                       # regenerate icon list from src/assets/icons
npm run deploy                           # publishes to GitHub Pages. Only when Jax asks.
```

No test runner or lint script exists yet. Verify with `npm run build` plus a visual check at desktop (1280), tablet and mobile (~375). TypeScript is 5.x.

## Structure and conventions

```
src/components/        shared: Name/{Name.tsx, Name.module.css, index.ts}
                       migrated so far: Header, Footer, ModeToggle, TextLink (D-014), StudyCard and StudyCardGrid (D-028), About page (D-040), HeroMarks (D-041); Layout is full-width, only <main> is constrained
src/pages/             Work, About, Resume, Studies, NotFound (+ pages/<Page>/components)
src/pages/Studies/pages/<Study>/   content.ts, meta.ts, images/
src/constants/         shared links and icon names
src/providers/         SiteConfig context
src/styles/            _variables, _typography, _mixins, _functions, _utilities
```

- Routes: `src/App.tsx`. A new case study needs a slug in `src/constants/studyLinks.ts` and a card in `StudyCardGrid/resources/content.ts`.
- Import aliases (keep `vite.config.ts` and `tsconfig.json` in sync): `@components`, `@pages`, `@styles`, `@assets`, `@constants`, `@commonTypes`, `@providers`.
- Scaffold with `generate:component` instead of hand-making folders.
- **Copy lives inline** in components for short page copy (D-003); case studies will use Markdown/JSON. Don't add new `resources/*.ts` copy files. Older components still have them until migrated.
- **Accessibility is part of the pitch.** Semantic HTML, one `h1` per page, sensible heading order, visible focus, real `alt` text (empty only for decorative images), `aria-hidden` on decorative emoji, enough contrast, keyboard operable. Treat regressions as bugs.
- Match the surrounding file's quotes and semicolons (the codebase mixes them) and don't reformat files you aren't otherwise changing. TypeScript strict, function components with `React.FC`.
- Images are `*-min.png`, already compressed. Every rendered image gets meaningful `alt` text.
- Fonts: Inter (headings) and Manrope (body) from Google Fonts in `index.html`; the requested weights must cover the weights the design uses.
- Per-page SEO title and description live in `resources/meta.ts`; site defaults are in `index.html`.

## Reference branch: `update-content`

An earlier, larger attempt at the redesign, committed under a different identity. It holds the token pipeline and light/dark theming, case studies moved to Markdown/JSON, and new Header/Footer/Work page/study cards, plus its own longer `CLAUDE.md`.

- Related remote branches: `update-content-archive` (older big-bang work, 52 commits), `update-content-collab`, `figma-home-work-update` (earlier Home/Work attempt), `agents/shared-logic-for-variant-colors`, `test`. Look there before reinventing something.
- Read with `git show origin/update-content:<path>` or `git diff main...origin/update-content -- <path>`.
- Port a piece only as part of a slice Jax has chosen, re-checked against current Figma values. Don't cherry-pick whole commits blindly, and carry over only conventions recorded in `docs/decisions.md`.

## Skills

Project skills live in `.claude/skills/`. Current: `copy-check` (lint and read copy against the Copy voice rules), `ship-slice` (verify, commit, push, review links, merge to `redesign` on approval) and `portfolio-critique` (structured content/design review for hiring impact).
