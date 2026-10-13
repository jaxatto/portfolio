# CLAUDE.md

Jax Engel's portfolio (https://jaxengeldesign.com): React 19 + TypeScript SPA, Vite, SCSS modules, React Router, deployed to GitHub Pages. This file describes `main`.

**Goal: get Jax hired.** Every change should make the portfolio stronger to a hiring manager or design leader reviewing a staff-level product designer. Polish, clarity, accessibility and craft matter more than feature count.

## Start of every session

1. If a skill named `i-have-adhd` is available, load it and follow it for the whole session. (Jax wants it in every Claude session. See `docs/plan.md` → Setup.)
2. Read `docs/plan.md` (where we are, what's next) and skim `docs/decisions.md` (what's already decided). Don't re-ask settled questions.
3. Check `git status` and the current branch. Confirm the git identity (below).

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
- **Small slices, small commits, frequent merges.** One page or component per slice. Commit often (one logical change per commit, short imperative subject matching history, e.g. "update about page"), push after each commit so work is saved, and merge to `main` in small steps so `main` is always deployable. At the end of a slice, offer to open a PR; open it when Jax says yes. Jax approves merges. Never run `npm run deploy` unless asked.
- **Foundations before pages.** Tokens, typography, layout, header and footer come first.
- **Match Figma, then stop.** Read exact values from Figma, not from screenshots. Don't add features or refactors that weren't asked for; mention them and leave them alone.
- **Be honest about verification.** Say what was built, what was checked (build, typecheck, viewport widths), and what wasn't.
- **Resume page is a later, joint effort.** Don't change `src/pages/Resume` or the resume PDF until Jax starts that work.
- **Make skills for repeat tasks.** When a procedure comes up a second time (or is obviously going to), write it as a skill in `.claude/skills/<name>/SKILL.md`. Also look for good existing skills or plugins (SearchSkills, SearchPlugins) when a task would benefit, and propose them to Jax rather than installing silently.

## Code comments

Add comments where they help the next reader or session: *why* something is the way it is, a design/accessibility reason, a non-obvious Figma-to-code mapping, a workaround, a known limitation, or a pointer to a decision (`// See docs/decisions.md D-004`). Use `// NOTE:` for context and `// TODO(jax):` for an open question that needs a design or copy decision. Don't narrate obvious code. Keep comments true; update or delete them when the code changes.

## Git

- Commit as Jax: `Jax Engel <6673768+jaxatto@users.noreply.github.com>`. At the start of a session check `git config user.name` / `user.email`; set them locally if they say anything else.
- Branch from the latest `main` for each slice. Work only on the branch the session designates, and never push directly to `main`.
- `origin/update-content` is an earlier attempt, kept as a quarry (see below). Don't merge it or build on top of it.

## Design source: Figma

File `Portfolio-2026`, key `MqsYPIWOx9imJtSiXidiww` (https://www.figma.com/design/MqsYPIWOx9imJtSiXidiww/Portfolio-2026).

- Use the Figma MCP: `get_design_context` (layout and values), `get_variable_defs` (tokens), `get_metadata` (structure). Load the `figma-design-to-code` skill before `get_design_context`. Its output is a reference to adapt to this codebase, not code to paste.
- Current designs are on the **Screens** page (`0:1`). Ignore **Old Screens** and the Sandbox/Presi pages unless asked. Desktop frames are 1280px wide with a 912px content column.

| Page | Node |
| --- | --- |
| Home (Work) | `2839:21650` |
| About | `2850:26579` |
| Indeed study | `2853:27124` |
| ActBlue study | `2860:33875` |
| ServiceNow study | `2860:34444` |
| Toyota study | `2948:40398` |

  Each page has a second frame with an adjacent id (Home `2839:21652`, About `2850:26578`, Indeed `2853:27125`, ActBlue `2860:33874`, ServiceNow `2860:34445`, Toyota `2951:40612`), probably the mobile versions. Confirm with Jax and check frame widths before relying on that.
- Jax also keeps design screenshots in `~/desktop/screens` on their own machine. Cloud sessions can't see that folder. If screenshots are needed, Jax has to add them to the repo (see `docs/plan.md`).
- If Figma and the live site disagree, Figma wins. If a design can't be built as drawn (accessibility, behavior), say so before deviating.

## Tokens and styling

Direction (see `docs/decisions.md` D-002): adopt the token system from `origin/update-content` (`src/tokens/`, the `scripts/tokens/` build, generated `theme.css`, light/dark semantic tokens). Keep SCSS only where it earns its place (mixins like `respond()`, build-time helpers); components consume tokens as CSS custom properties. New and migrated components use tokens only, with no hard-coded colors, sizes or breakpoints that have a token. Until the token slice lands, `main` still uses the older SCSS variables in `src/styles/`.

## Commands (on `main`)

```
npm ci                                   # install
npm run dev                              # build-scripts (generate-index, sync-icons) then vite
npm run build                            # vite build; postbuild copies index.html to 404.html
npm run preview                          # serve dist/
npm run generate:component -- Name       # scaffold src/components/Name
npm run generate:component -- Page/Name  # scaffold src/pages/Page/components/Name
npm run generate-index                   # regenerate index.ts barrels
npm run sync-icons                       # regenerate icon list from src/assets/icons
npm run deploy                           # publishes to GitHub Pages. Only when Jax asks.
```

No test runner or lint script exists yet. Verify with `npm run build` plus a visual check at desktop (1280), tablet and mobile (~375). Known baseline: `npx tsc --noEmit` reports one existing error in `src/index.tsx` (unused `@ts-expect-error`); don't treat it as yours.

## Structure and conventions

```
src/components/        shared: Name/{Name.tsx, Name.module.scss, index.ts, resources/}
src/pages/             Work, About, Resume, Studies, NotFound (+ pages/<Page>/components)
src/pages/Studies/pages/<Study>/   content.ts, meta.ts, images/
src/constants/         shared links and icon names
src/providers/         SiteConfig context
src/styles/            _variables, _typography, _mixins, _functions, _utilities
```

- Routes: `src/App.tsx`. A new case study needs a slug in `src/constants/studyLinks.ts` and a card in `StudyCardGrid/resources/content.ts`.
- Import aliases (keep `vite.config.ts` and `tsconfig.json` in sync): `@components`, `@pages`, `@styles`, `@assets`, `@constants`, `@commonTypes`, `@providers`.
- `src/styles/_all.scss` is injected into every SCSS module; don't `@use` it manually.
- Scaffold with `generate:component` instead of hand-making folders.
- **Where copy lives is undecided** (`docs/decisions.md` D-003). Until it's decided, edit copy where it already lives and don't add new copy files in a new style.
- **Accessibility is part of the pitch.** Semantic HTML, one `h1` per page, sensible heading order, visible focus, real `alt` text (empty only for decorative images), `aria-hidden` on decorative emoji, enough contrast, keyboard operable. Treat regressions as bugs.
- Match the surrounding file's quotes and semicolons (the codebase mixes them) and don't reformat files you aren't otherwise changing. TypeScript strict, function components with `React.FC`.
- Images are `*-min.png`, already compressed. Every rendered image gets meaningful `alt` text.
- Fonts: Inter (headings) and Manrope (body) from Google Fonts in `_variables.scss`; the requested weights must cover the weights the design uses.
- Per-page SEO title and description live in `resources/meta.ts`; site defaults are in `index.html`.

## Reference branch: `update-content`

An earlier, larger attempt at the redesign, committed under a different identity. It holds the token pipeline and light/dark theming, case studies moved to Markdown/JSON, and new Header/Footer/Work page/study cards, plus its own longer `CLAUDE.md`.

- Read with `git show origin/update-content:<path>` or `git diff main...origin/update-content -- <path>`.
- Port a piece only as part of a slice Jax has chosen, re-checked against current Figma values. Don't cherry-pick whole commits blindly, and carry over only conventions recorded in `docs/decisions.md`.
- Its `CLAUDE.md` mentions an `origin/update-content-archive` branch that doesn't exist on the remote.

## Skills

Project skills live in `.claude/skills/`. Current: `ship-slice` (verify, commit, push, offer PR) and `portfolio-critique` (structured content/design review for hiring impact).
