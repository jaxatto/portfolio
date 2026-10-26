# Decisions

The rules that are in force today, grouped by area, with the IDs that hold the reasoning. Full history, including superseded entries and copy passes, is in [decisions-archive.md](decisions-archive.md). A later ID wins over an earlier one. Add a short entry at the bottom when a choice sets a pattern (new token, component, copy approach, tooling). Next ID: D-144.

## Workflow

- Jax Engel is the commit author. Small slices, small commits, push after each. Slices merge into `redesign` only when Jax approves, `main` stays the live site (D-001, D-007).
- Copy and design are collaborative: propose, agree, then do (D-004). Anything the tokens and shared components do not cover is raised first, then logged here (D-005).
- Every change gets a review link: the route, section and breakpoint (D-009).
- Figma is retired (2026-10-25). Code and these files are the only source of truth (D-132). There are no mobile designs, so responsive behavior is proposed from the desktop system and agreed per slice (D-008).

## Tokens, theme and CSS

- Token source is `src/tokens`, compiled by `npm run build:theme` into `theme.css`, which is never hand-edited (D-002). The generator emits only the primitives a semantic token reads (D-118).
- Light is `:root`, dark is `[data-theme='dark']`. `data-theme` always holds the theme being shown (stored choice, else the OS), so there are no `prefers-color-scheme` blocks (D-128). The header toggle is always on and the `.env` gate is gone (D-006, D-011, D-139).
- Plain CSS modules on tokens, no SCSS (D-091). Prettier formats the code (D-121). Imports use the `#` aliases (D-120).
- Type: sizes are named by pixel (`--font-size-28`) and fluid down from the Figma desktop size at 1280px (D-013, D-033). Manrope tops out at 800, Inter keeps 900 for headings (D-010). `text-wrap: pretty` site-wide, non-breaking hyphens in headings (D-034). Headings over 44px take `--font-letter-spacing-compact` (D-114).
- Shared steps in `type.module.css` (`titleMd`, `headingLg`, `headingSm`, `headingMd`, `caption`) are composed by components, which add only color, spacing and wrapping. They sit in `@layer type` so a page's own media-query size wins (D-093, D-117, D-137).
- Heading tags are semantic only. No rule targets `h1` to `h6`, the look comes from a class (D-130, D-134).
- Breakpoints are literal: 640 (phone, 641 up) and 900 (desktop). Any other width carries a comment (D-118).
- Effects tokens (motion, shadow, state wash, layer) live in `effects.ts`. Targets are 40 and 44px (`--size-target-*`), the focus ring is 3px with a 3px offset (D-032, D-118, D-130). Icon glyph sizes are `--size-icon-*`. The browser bar color is generated from `surface.default` (D-130).
- Palettes: five container pairs (brand, primary, secondary, tertiary, quaternary) plus `quinary` green, applied by one class from `palette.module.css` (D-030, D-119, D-123). A section that re-colors the semantic tokens is a tone in `tone.css` (`blue` footer band, `error` 404, D-038, D-109).
- Dark text: `content.emphasis` and `on-accent` are white at 98%, `content.soft` is white at 80%, `content.prose` is black in light and purple-50 in dark for long reading text (D-035, D-042).
- Shared pieces: `Button` (filled, outline 3px, inverted), `TextLink` (animated line, no resting underline), `Chip`, `NameTag`, `Tooltip` (Floating UI, kept), `IconLink`, `iconControl` styles for the mode toggle and footer icons, `line.module.css` accent line (D-092, D-093, D-102, D-103, D-104, D-105, D-107, D-119, D-137).
- Forced colors: cards, chips and buttons keep their shape with a 2px `CanvasText` outline (D-129). Hover styles sit behind `(hover: hover)` (D-117).

## Structure and performance

- Page folders are `Page.tsx`, `Page.module.css`, `index.ts` plus optional `components/` and `resources/`. SEO text is in `resources/meta.ts`. Short page copy is inline in the page file at any length (D-003, D-140). Studies keep `pages/<Study>/{content.ts, meta.ts, images/}`.
- Images import with `?size` and carry width and height. Below the fold they lazy-load, above it they set `priority` (D-122, D-125). Fonts are self-hosted latin variable files with Inter and Manrope preloaded (D-127).
- `scripts/prerender-meta.ts` writes each route's title, description, canonical and og tags at build time. A new route needs an entry (D-122). Titles read "topic | Jax Engel" (D-045).
- Routes scroll to the top, and focus moves to the page's `h1` after a client navigation (D-115, D-126). `<main>` draws no focus ring (D-082).
- Lint (ESLint with `jsx-a11y`), typecheck and build run in CI on pull requests (D-139). Floating UI stays (D-103).

## Layout and shared UI

- Content column is 960px, reading text 40rem, left-aligned on the header edge (D-029, D-040, D-066). Layout is full width, only `<main>` is constrained (D-014).
- Header: brand left, nav and toggle right. The role label sits in the left slot as two stacked lines on Home and Resume, hidden on phones where it becomes a byline (D-016, D-018, D-097, D-098, D-106). Nav links draw the accent line on the current page and on hover (D-017).
- Footer: one footer on every page, a 2px hairline, a tinted band in dark except on Home, Resume/LinkedIn/GitHub as icon links, stacked at 640px and under (D-049, D-107, D-132).
- Back to top is a scroll-up pill at the top middle, shown on About, Resume and studies (D-108).
- Title wording is "Staff Product Designer", with "Design Engineer" where it fits (D-021). Footer line and 404 quips are settled (D-133).
- 404 is the `error` tone with a display-size numeral and one of seven quips per visit (D-022, D-038).

## Home

- Hero: one role line and one sentence. The "design" selection box and the "build" code chip are CSS art, both stop under reduced motion (D-016, D-017, D-134).
- Study cards: one stacked column, horizontal from 641px (text 55%, preview beside it), stacked on phones. Order Toyota, ServiceNow, Indeed, ActBlue. Ramp purple, indigo, sky, teal. Copy is inline in `StudyCardGrid.tsx` and uses only facts from each study (D-028, D-030, D-031, D-039).
- Card hover lifts 8px with a colored shadow and the screenshot grows inside its window. Selection inside a card takes the card's palette (D-080, D-111).

## About

- One column on the 960 grid. The hero is "About me" with the selection box, four code chips and a caret. Story at 40rem. The four pets are tagged photos with captions (D-040 to D-043).
- Copy rounds are in D-044 and D-045. The earlier-roles paragraph links to three case studies. Visa is left out on purpose.
- h2 is `content.prose`, 12px under it, label h3s are bold (D-055, D-056, D-057).

## Case studies

- Template: header (h1, role line, chips, intro and hero), sections with h2, text, labeled `items`, `panels`, `compare` or `image` media, then "More of my work" (D-046, D-050, D-054, D-058, D-078, D-084, D-086).
- Media rules: 40px above and below every image, captions as wide as their image, image containers use the card radius (D-053, D-054, D-071). Variants: `banner`, `column`. Several images in one section render in order (D-086).
- The palette of the study's card tints the h1, chips, label h3s, selection and "After" side, and stays tinted in dark (D-052, D-069, D-070). Chips run the full column (D-079).
- `**phrase**` in a paragraph renders as a tinted bold highlight, once or twice per study (D-081).
- Role line wraps item by item, dates use an en dash (D-085, D-116). h1 is 40, 48 and 56px by width (D-112, D-113).
- Content lives in each study's `content.ts`. Facts confirmed by Jax and claims left out on purpose are in D-047 to D-086 of the archive. New study: slug, card and prerender entry.

## Resume

- The page carries the resume. The h1 reads "Resume: Jax Engel" (prefix `sr-only`). The header has the portrait with a cursor tag, then the actions row (D-087, D-094, D-097, D-135).
- Core strengths: three cards in study colors, each with a proof line from its case study. Experience is split role cards on one gradient down the list (D-124). Role summaries and strength lines are drafts until Jax signs them off (D-124).
- The PDF is built from `resume/` HTML. The public PDF is not replaced until Jax says so (D-110).

## Open

- Outline button border is a local 3px `--outline-width`. Add a semantic token if outline buttons spread (D-102).
- Image fallback exploration and the About fallback use are open (see plan.md).

## D-141: Raw values that stay, and what is still open — decided, 2026-10-26

A scan of `src/**/*.css` found 82 declarations with a literal length, color, duration or ratio outside `var(--token)`. These stay as written, each for a stated reason:
- **Layout measures:** the card and panel geometry in rem (preview heights, text and preview widths, panel heights, `--image-w`), the Resume column widths (D-028, D-039, D-054, D-124). They size one component and match no scale step.
- **Em-sized glyphs** (`1em`, `1.2em` in Button, StudyCard, TextLink, Strength): they follow their text on purpose. Fixed glyphs use `--size-icon-*`.
- **Design values with a decision:** card lift 5% and 30%, the lift shadow color 55% and black 50%, the footer band mix, the 404 display size (D-022, D-028, D-049, D-118).
- **Ambient hero loops** keep their own timing and em sizes (D-118).
- **Visually hidden:** `.sr-only` uses `!important` so it works anywhere. The skip link hand-writes the same block because it must un-hide on focus, which an `!important` rule would block.
- **Grid tracks** (`minmax(0, 1fr)`, `repeat(n, …)`) are layout, not values.

The icon control line inset is now derived from `--size-target-md` and the glyph size (`calc((target - glyph) / 2 + 1px)`), so the toggle and footer icons share one rule. Open items with a proposed default of "keep" are listed in `docs/untokenized-styles.md`.

## D-142: A 2px space token — decided, 2026-10-26

`--space-2xs` (2px, primitive `space-2`) sits below `xs`. The Resume role card side gap and the NameTag padding (`xs` plus 2xs, `sm` plus 2xs) read it. Border widths keep their own `--size-border-width-*` tokens, so a 2px gap does not borrow the border token.

## D-143: Space tokens drop the `size` prefix — decided, 2026-10-26

Space tokens are `--space-xs`, `--space-lg`, `--space-section-xl` and so on (were `--size-space-*`). Other size tokens keep `--size-*` (`--size-radius-*`, `--size-border-width-*`, `--size-icon-*`, `--size-target-*`). The generator special-cases the `space` category, and the primitives keep their `--primitive-size-space-*` names. The archive still uses the old name in its older entries.
