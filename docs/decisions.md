# Decisions

The rules in force today, grouped by area, with the IDs that hold the reasoning. Full history, including superseded entries and copy passes, is in [decisions-archive.md](decisions-archive.md). A later ID wins over an earlier one. Add a short entry at the bottom when a choice sets a pattern (new token, component, copy approach, tooling), and fold it into its area when this file is next trimmed. Next ID: D-163.

## Workflow

- Jax Engel is the commit author. Small slices, small commits, push after each (D-001).
- `main` is the integration branch (the redesign merged into it on 2026-10-25). Session branches start from the latest `main`, merge by pull request only when Jax approves, and a merged branch restarts from `main`. Nothing pushes straight to `main`. Deploying is a separate step that runs only when Jax asks (D-007, D-160).
- Copy and design are collaborative: propose, agree, then do (D-004). Anything the tokens and shared components do not cover is raised first, then logged here (D-005).
- Every change gets a review link: the route, section and breakpoint (D-009).
- Figma is retired (2026-10-25). Code and these files are the only source of truth (D-132). There are no mobile designs, so responsive behavior is proposed from the desktop system and agreed per slice (D-008).

## Tokens, theme and CSS

- Token source is `src/tokens`, compiled by `npm run build:theme` into `theme.css` and `type.module.css`, never hand-edited (D-002). Primitives are raw scale steps. Every semantic token resolves to a primitive or another semantic token, and none is named for a value. Components read semantic tokens only. The generator throws on a raw semantic value, and `scripts/tokens/token-layers.test.ts` checks raw values, undefined references, primitive use outside `src/tokens`, and that every token a component reads is defined (D-118, D-149, D-152).
- Light is `:root`, dark is `[data-theme='dark']`. `data-theme` always holds the theme being shown (stored choice, else the OS), so there are no `prefers-color-scheme` blocks. The header toggle is always on (D-006, D-011, D-128, D-139).
- Switching theme cross-fades the whole page with a View Transition (400ms to dark, 500ms to light, `--motion-duration-theme*`). The mode toggle has its own transition name during the switch so its icon swaps at the normal 300ms. The per-element `theme-fading` color fade stays as the fallback, and reduced motion switches instantly (D-162).
- Plain CSS modules on tokens, no SCSS. Prettier formats the code. Imports use the `#` aliases (D-091, D-120, D-121).
- Names: components are PascalCase. Classes in CSS are kebab-case and read in markup as camelCase with dot access (`.nav-link` is `styles.navLink`, through Vite's `localsConvention: 'camelCaseOnly'`). `scripts/css-conventions.test.ts` enforces it and checks every class the markup reads exists (D-161).
- Breakpoints are literal: 640 (phone, 641 up) and 900 (desktop). Any other width carries a comment (D-118).
- Space: `none`, `3xs` (2px), `2xs` (4), `xs` (8), `sm` (12), `md` (16), `lg` (20), `xl` (24), `2xl` (32), `3xl` (40), `4xl` (48), `5xl` (56), `6xl` (64), `7xl` (80). They read `--space-*`, and the primitives `--primitive-space-*`. Other sizes keep `--size-*` (radius, border width, icon, target, layout) (D-153).
- Effects tokens (motion, shadow, state wash, layer) live in `effects.ts`. Targets are 40 and 44px, the focus ring is 3px with a 3px offset, the browser bar color is generated from `surface.default` (D-032, D-118, D-144).
- Raw values that stay as written: card and panel geometry in rem, the Resume column widths, em-sized glyphs, card lift, the lift shadow color, the footer band mix, the 404 display size, the ambient hero loops, grid tracks, and `.sr-only` with its `!important` (the skip link hand-writes the block because it must un-hide on focus). The rest of the list, each with a default of keep, is in `untokenized-styles.md` (D-141).
- Palettes: five container pairs (brand, primary, secondary, tertiary, quaternary) plus `quinary` green, one class each in `palette.module.css`. Every palette keeps the same members (`default`, `on-default`, `container`, `on-container`). Hover and pressed colors are derived only for what is read. A section that re-colors the semantic tokens is a tone in `tone.css`: `blue` for the dark footer band and `inverse` for the 404, which uses `surface.inverse` and `content.on-accent` (D-030, D-038, D-052, D-109, D-119, D-123, D-152, D-154).
- Dark text: `content.emphasis` and `on-accent` are white at 98%, `content.soft` is white at 80%, `content.prose` is black in light and purple-50 in dark for long reading text (D-035, D-042).
- Type: fluid sizes reach the desktop size at 1280px (D-013). Fixed font sizes name a role in the type scale, never a value or a place: `label`, `control`, `lead`, `heading-xl`, `display-sm`, `display` (D-149, D-155). One `strong` weight (900) serves both families, and Manrope renders it as 800 (D-154). `text-wrap: pretty` site-wide, non-breaking hyphens in headings, headings over 44px take compact letter spacing (D-034, D-114).
- Every text style (`title-sm/md`, `heading-sm/md/lg`, `body-sm/md/lg`) has a generated class in `type.module.css`. A component applies it in its markup with `clsx` and sets only color, spacing and overrides, and does not read `--font-style-*`. The one exception is StudyCard's phone media query, since a class cannot change at a breakpoint. The classes sit in `@layer type`, so a component's own rules win whatever the bundle order (D-093, D-117, D-156).
- Heading tags are semantic only. No rule targets `h1` to `h6`, the look comes from a class (D-130, D-134).
- Icons are `--size-icon-xs/sm/md/lg` (16, 20, 24, 28px). A link's text is its icon's size, through `--link-icon`. The hover line under an icon is inset by the glyph's inset in its 40px target plus 1px (D-144, D-145, D-146).
- Links, buttons, Back to top and tooltips share one hover and pressed color pair from `deepen.module.css`, a mix toward the next violet that tones on dark grounds turn off. Tooltips open after 400ms and fade (D-147).
- Shared pieces: `Button` (filled, outline 3px, inverted), `TextLink` (animated line, no resting underline), `Chip`, `NameTag`, `Tooltip` (Floating UI, kept), `IconLink`, and the `iconControl`, `line` and `deepen` modules (D-092, D-093, D-102, D-103, D-104, D-105, D-107, D-119, D-137).
- Image fallbacks: `Image` shows a muted icon in its frame's shape, a person icon for the Resume portrait, pet icons on About, and a tint of the card's palette on the Home cards. Study page images (banner, compare, panels) fall back to their frame (D-148, D-150).
- Forced colors: cards, chips and buttons keep their shape with a 2px `CanvasText` outline. Hover styles sit behind `(hover: hover)` (D-117, D-129).

## Structure and performance

- Page folders are `Page.tsx`, `Page.module.css`, `index.ts` plus optional `components/` and `resources/`. SEO text is in `resources/meta.ts`. Short page copy is inline in the page file at any length. Studies keep `pages/<Study>/{content.ts, meta.ts, images/}` (D-003, D-140).
- Images import with `?size` and carry width and height. Below the fold they lazy-load, above it they set `priority` (high fetch priority on the first Home card). Home card previews are WebP except ServiceNow (D-122, D-125, D-158). Fonts are self-hosted latin variable files with Inter and Manrope preloaded (D-127).
- `npm run build` makes a client build and a server build, then `scripts/prerender.ts` renders every route to HTML (with title, description, canonical, og tags and its CSS and chunk links), writes `404.html` and `sitemap.xml`, and the client hydrates. A new route needs an entry in the script. Render nothing from `window`, storage, the clock or `Math.random` on the first render (D-122, D-159).
- Home is in the entry bundle, and About, Resume, the studies and the 404 are lazy chunks behind one `Suspense` whose fallback is the real header (D-151).
- The site host is `https://www.jaxengeldesign.com`, the CNAME. `robots.txt` points to the generated sitemap (D-157).
- Titles read "topic | Jax Engel" (D-045). Routes scroll to the top and focus moves to the page's `h1` after a client navigation. `<main>` draws no focus ring (D-082, D-115, D-126).
- ESLint (with `jsx-a11y`), typecheck, build and tests run in CI on pull requests. Floating UI stays (D-103, D-139).

## Layout and shared UI

- Content column is 960px, reading text 40rem, left-aligned on the header edge. Layout is full width, only `<main>` is constrained (D-014, D-029, D-040, D-066).
- Header: brand left, nav and toggle right. The role label sits in the left slot as two stacked lines on Home and Resume, chosen from the route inside `Header` (D-165), hidden on phones where it becomes a byline. Nav links draw the accent line on the current page and on hover (D-016, D-017, D-018, D-097, D-098, D-106).
- Footer: one footer on every page, a 2px hairline, a tinted band in dark except on Home, Resume, LinkedIn and GitHub as icon links, stacked at 640px and under (D-049, D-107, D-132).
- Back to top is a scroll-up pill at the top middle, shown on About, Resume and studies (D-108).
- Title wording is "Staff Product Designer", with "Design Engineer" where it fits. Footer line and 404 quips are settled (D-021, D-133).
- 404 is the `inverse` tone with a display-size numeral and one of seven quips per visit (D-022, D-038).

## Home

- Hero: one role line and one sentence. The "design" selection box and the "build" code chip are CSS art, and both stop under reduced motion (D-016, D-017, D-134).
- Study cards: one stacked column, horizontal from 641px (text 55%, preview beside it), stacked on phones where the title uses `heading-lg`. Order Toyota, ActBlue, ServiceNow, Indeed. Ramp purple, indigo, sky, teal, assigned by position (D-163). Copy is inline in `StudyCardGrid.tsx` and uses only facts from each study (D-028, D-030, D-031, D-039, D-155).
- Card hover lifts 8px with a colored shadow and the screenshot grows inside its window. Selection inside a card takes the card's palette (D-080, D-111).

## About

- One column on the 960 grid. The hero is "About me" with the selection box, four code chips and a caret. Story at 40rem. The four pets are tagged photos with captions (D-040 to D-043).
- The earlier-roles paragraph links to three case studies. Visa is left out on purpose (D-044, D-045).
- h2 is `content.prose`, 12px under it, label h3s are bold (D-055, D-056, D-057).
- Approach to work has five labelled cards in Jax's own words: ask and document, focus and prioritization, share and teach, accessibility with proof from Indeed and ActBlue, and AI prototyping (D-164, D-167).

## Case studies

- Template: header (h1, role line, chips, intro and hero), sections with h2, text, labeled `items`, `panels`, `compare` or `image` media, then "More of my work" (D-046, D-050, D-054, D-058, D-078, D-084, D-086).
- Media rules: 40px above and below every image, captions as wide as their image, image containers use the card radius. Variants: `banner`, `column`. Several images in one section render in order (D-053, D-054, D-071, D-086).
- The palette of the study's card tints the h1, chips, label h3s, selection and "After" side, and stays tinted in dark. Chips run the full column (D-052, D-069, D-070, D-079).
- `**phrase**` in a paragraph renders as a tinted bold highlight, once or twice per study (D-081).
- Role line wraps item by item, dates use an en dash. h1 is 40, 48 and 56px by width (D-085, D-112, D-113, D-116).
- Content lives in each study's `content.ts`. Facts confirmed by Jax and claims left out on purpose are in D-047 to D-086 of the archive. New study: slug, card and prerender entry.

## Resume

- The page carries the resume. The h1 reads "Resume: Jax Engel" (prefix `sr-only`). The header has the portrait with a cursor tag, then the actions row (D-087, D-094, D-097, D-135).
- Core strengths: three cards in study colors, each with a proof line from its case study. Experience is split role cards on one gradient down the list. Role summaries and strength lines are drafts until Jax signs them off (D-124).
- "What I'm looking for" is the first section under the intro, ahead of Experience, and carries the tenure context (D-166).
- The PDF is built from `resume/` HTML. The public PDF is not replaced until Jax says so (D-110).

## Tests

- `e2e/shell.spec.ts` compares the pre-rendered header and footer with the live page on every route, light and dark. The pre-rendered shell must always match the live site (D-165).

## Open

- Outline button border is a local 3px `--outline-width`. Add a semantic token if outline buttons spread (D-102).
- Palettes, content color roles and the shorter `--size-*` names are on hold (see plan.md).
