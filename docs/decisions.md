# Decisions

The rules that are in force today, grouped by area, with the IDs that hold the reasoning. Full history, including superseded entries and copy passes, is in [decisions-archive.md](decisions-archive.md). A later ID wins over an earlier one. Add a short entry at the bottom when a choice sets a pattern (new token, component, copy approach, tooling). Next ID: D-156.

## Workflow

- Jax Engel is the commit author. Small slices, small commits, push after each. Slices merge into `redesign` only when Jax approves, `main` stays the live site (D-001, D-007).
- Copy and design are collaborative: propose, agree, then do (D-004). Anything the tokens and shared components do not cover is raised first, then logged here (D-005).
- Every change gets a review link: the route, section and breakpoint (D-009).
- Figma is retired (2026-10-25). Code and these files are the only source of truth (D-132). There are no mobile designs, so responsive behavior is proposed from the desktop system and agreed per slice (D-008).

## Tokens, theme and CSS

- Token source is `src/tokens`, compiled by `npm run build:theme` into `theme.css`, which is never hand-edited (D-002). Primitives are raw scale steps, semantic tokens only reference them, and components only read semantic tokens (D-149). The generator emits only the primitives a semantic token reads (D-118).
- Light is `:root`, dark is `[data-theme='dark']`. `data-theme` always holds the theme being shown (stored choice, else the OS), so there are no `prefers-color-scheme` blocks (D-128). The header toggle is always on and the `.env` gate is gone (D-006, D-011, D-139).
- Plain CSS modules on tokens, no SCSS (D-091). Prettier formats the code (D-121). Imports use the `#` aliases (D-120).
- Type: fluid sizes reach the desktop size at 1280px (D-013). Fixed font sizes are named by role (`--font-size-label`, `-control`, `-lead`, `-heading-xl`, `-heading-xl-sm`, `-display-sm`, `-display`), never by value (D-149). One `strong` weight (900) serves both families, and Manrope renders it as 800 (D-154). `text-wrap: pretty` site-wide, non-breaking hyphens in headings (D-034). Headings over 44px take `--font-letter-spacing-compact` (D-114).
- Shared steps in `type.module.css` (`titleMd`, `headingLg`, `headingSm`, `headingMd`, `caption`) are composed by components, which add only color, spacing and wrapping. They sit in `@layer type` so a page's own media-query size wins (D-093, D-117, D-137).
- Heading tags are semantic only. No rule targets `h1` to `h6`, the look comes from a class (D-130, D-134).
- Breakpoints are literal: 640 (phone, 641 up) and 900 (desktop). Any other width carries a comment (D-118).
- Effects tokens (motion, shadow, state wash, layer) live in `effects.ts`. Targets are 40 and 44px (`--size-target-*`), the focus ring is 3px with a 3px offset (D-032, D-118, D-130). Icon glyph sizes are `--size-icon-*`. The browser bar color is generated from `surface.default` (D-130).
- Palettes: five container pairs (brand, primary, secondary, tertiary, quaternary) plus `quinary` green, applied by one class from `palette.module.css` (D-030, D-119, D-123). A section that re-colors the semantic tokens is a tone in `tone.css` (`blue` footer band, `error` 404, D-038, D-109).
- Dark text: `content.emphasis` and `on-accent` are white at 98%, `content.soft` is white at 80%, `content.prose` is black in light and purple-50 in dark for long reading text (D-035, D-042).
- Shared pieces: `Button` (filled, outline 3px, inverted), `TextLink` (animated line, no resting underline), `Chip`, `NameTag`, `Tooltip` (Floating UI, kept), `IconLink`, `iconControl` styles for the mode toggle and footer icons, `line.module.css` accent line (D-092, D-093, D-102, D-103, D-104, D-105, D-107, D-119, D-137).
- Links, buttons and tooltips share one hover and pressed color pair from `deepen.module.css` (D-147). Icons are 16, 20, 24 and 28px tokens and a link's text is its icon's size (D-146). The hover line under an icon is inset by the glyph's inset plus 1px (D-145).
- Forced colors: cards, chips and buttons keep their shape with a 2px `CanvasText` outline (D-129). Hover styles sit behind `(hover: hover)` (D-117).

## Structure and performance

- Page folders are `Page.tsx`, `Page.module.css`, `index.ts` plus optional `components/` and `resources/`. SEO text is in `resources/meta.ts`. Short page copy is inline in the page file at any length (D-003, D-140). Studies keep `pages/<Study>/{content.ts, meta.ts, images/}`.
- Images import with `?size` and carry width and height. Below the fold they lazy-load, above it they set `priority` (D-122, D-125). Fonts are self-hosted latin variable files with Inter and Manrope preloaded (D-127).
- `scripts/prerender.ts` renders each route to HTML and writes its title, description, canonical and og tags at build time. A new route needs an entry (D-122, D-159). Titles read "topic | Jax Engel" (D-045).
- Routes scroll to the top, and focus moves to the page's `h1` after a client navigation (D-115, D-126). `<main>` draws no focus ring (D-082).
- Lint (ESLint with `jsx-a11y`), typecheck and build run in CI on pull requests (D-139). Floating UI stays (D-103).

## Layout and shared UI

- Content column is 960px, reading text 40rem, left-aligned on the header edge (D-029, D-040, D-066). Layout is full width, only `<main>` is constrained (D-014).
- Header: brand left, nav and toggle right. The role label sits in the left slot as two stacked lines on Home and Resume, hidden on phones where it becomes a byline (D-016, D-018, D-097, D-098, D-106). Nav links draw the accent line on the current page and on hover (D-017).
- Footer: one footer on every page, a 2px hairline, a tinted band in dark except on Home, Resume/LinkedIn/GitHub as icon links, stacked at 640px and under (D-049, D-107, D-132).
- Back to top is a scroll-up pill at the top middle, shown on About, Resume and studies (D-108).
- Title wording is "Staff Product Designer", with "Design Engineer" where it fits (D-021). Footer line and 404 quips are settled (D-133).
- 404 is the `inverse` tone with a display-size numeral and one of seven quips per visit (D-022, D-038).

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

Superseded by D-153: the 2px step is `--space-3xs`.

## D-143: Space tokens drop the `size` prefix — decided, 2026-10-26

Space tokens are `--space-*`, not `--size-space-*`. Other size tokens keep `--size-*` for now. The scale is in D-153.

## D-144: Icon size, state wash, layer and theme-color tokens — decided, 2026-10-25

`--size-icon-xs/sm/md/lg` (16, 20, 24, 28px after D-146, with `xs` for Back to top) in `defaultTheme.ts`. `--state-wash-hover` (12%) and `--state-wash-active` (20%), the tint an outline control mixes in on hover and press, and `--layer-behind/raised/tooltip/skip-link` (-1, 10, 30, 1000) in `effects.ts`. BackToTop, Button, ModeToggle, Footer, Tooltip and Header read them. The browser bar color (`theme-color`) is now generated from `surface.default` into `src/tokens/themeColor.ts`, and `index.html` (meta tag and pre-paint script) and `ThemeProvider` read that file, through a small Vite plugin for the HTML. This fixes a drift: the dark value typed by hand was `#0f172b`, while the dark surface is `oklch(21% 0.05 280)`, which is `#14152f`. The dark browser bar on phones is now the page color. The fixed 28px footer glyph size has no neighbor on the 16, 24, 32 scale, so `lg` is 28. Checked against the previous build: computed color, background, border, shadow, fill, opacity, z-index and icon size matched on 6 routes in light and dark at 1280 and 375 (24 of 24), and hover, press, tooltip, skip link and back-to-top values matched except a mid-transition sample.

D-144 follow-up (2026-10-25): the literals that already equal a token now use it (Image, StudyCard, About, Resume bar, Role logo), Header's line offsets read `--size-border-width-default`, and the Resume bar radius reads `--size-radius-full`. The computed radius string changes from 2px to 9999px and the pixels do not: the Resume full-page screenshot is byte-identical. Computed styles, element sizes and pseudo-elements matched on 5 of 6 routes at 1280 and 375 in light and dark, and on Resume apart from that radius string.

## D-145: Icon line inset from the tokens, the footer line bug, optical values that stay — decided, 2026-10-25

The hover line under a footer icon and under the mode toggle is inset by the glyph's own inset in its 40px target plus 1px, because the drawn edge of these glyphs sits a pixel inside their box: `(--size-target-md - --size-icon-*) / 2 + 1px`, which is 7px for the 28px footer glyphs and the 28px toggle glyph. Both read it through `--line-inset`. The footer glyphs also rise 1px (`--icon-optical`) so they clear the line, which stays where it was.

Bug found on the way: the footer's `right: 7px; left: 7px` on `::after` never applied. In the bundle that rule comes before the shared `.line::after` rule at the same specificity, so the line under a footer icon was the full 40px, in the built site and in dev. It now uses `--line-inset` like the toggle, so the footer line is 26px wide, centered, as the code and its comment always said.

How the footer icon links and the mode toggle differ today: the rest color (violet link color in the footer, near-black variant color on the toggle), the glyph size (the toggle was 24px and is 28px from 2026-10-25, matching the footer, so both lines are 26px), the pressed state (the toggle also tints its line, the footer icons tint only the glyph), and the element (the toggle is a button with its border, padding and background reset, an icon swap animation and a pointer cursor). Target size, radius, hover color, focus ring and line geometry are the same.

Kept as written: the HeroMarks values (1.2 stroke width, 1px and 2px margins, the tag hanging 2px under the arrow tip and 10px in) are tuned to the drawn cursor and its tag. The Home hero sentence keeps `max-width: 900px`, set so the larger "build" chip does not push "accessible" to a third line at desktop width.

## D-146: Icons in px, and a link's text is its icon's size — decided, 2026-10-25

`--size-icon-sm/md/lg` are 20, 24 and 28px, and every icon reads one of them in px, with no `em` sizes left on UI icons (the hero caret and cursor marks follow their text on purpose). Moon and sun and the footer glyphs are 28px (lg), Button icons 24px (md), text-link arrows, card link arrows and the Back to top arrow 20px (sm). The footer email arrow stays em-sized. The text of a link with an icon is set to the icon's size from one custom property, `--link-icon`: TextLink with an icon and the study card links are 20px, and the footer email is not part of this: it keeps its fluid size (16px up to 32px at about 550px wide, D-013) with a 1em arrow, as before. This makes card links 20px on every width (they were 14 to 20px by breakpoint, and 14 to 16px under a case study), so the study variant's links are larger than before. Button labels keep their own size (16.6 to 20px) and are not tied to the 24px icon. Checked on Home, Resume, the 404 and a study at 1280, 700 and 375: sizes as listed, no horizontal scroll.

## D-147: Hover and pressed colors of links, buttons and tooltips — decided, 2026-10-25

Every interactive control steps from the primary hover and pressed colors toward the next violet: `src/styles/deepen.module.css` mixes `--color-primary-default-hover` toward violet-900 by `--state-deepen-hover` and `--color-primary-default-active` toward violet-950 by `--state-deepen-active` (oklch), and exposes `--state-color-hover` and `--state-color-active`. Light uses 50% and 30%, so hover is half a step past violet-800 (lightness 0.406, chroma 0.21) and pressed is 0.351 and 0.175. Dark uses 0%, so it keeps violet-200 and violet-100. Sections on a dark ground (`tone.css`) set both amounts to 0%. Mixing with black or white was tried first (20%, then 10%) and washed the colors out, because the chroma fell with the lightness. The line style composes it for every link (text and line), and so do `Button`, Back to top and the Tooltip, whose tag background is the hover color of the control it names. The pressed rules in `Button` now come after the hover rules, so a pressed button shows its own color. The tooltip opens after 400ms, fades in over 350ms while drifting 4px away from the control and out over 250ms, instantly under reduced motion, and the footer icon tooltips sit 2px higher. `Button` and `TextLink` do nothing on a `mailto:` click on localhost. The Resume strength card links are 20px text with a 20px arrow, and the ActBlue strength title is "Self-serve workflows" so the three cards align.

## D-148: Image fallbacks take their frame's shape; a person icon on the Resume portrait; study card previews fall back — decided, 2026-10-26

The shared `Image` fallback copies its frame's corner radius (`border-radius: inherit`) instead of drawing a circle, so a failed Resume portrait stays a rounded square. The Resume portrait shows a `user` icon (Phosphor bold, new in `src/assets/icons`), the About photos keep their pet icons, and the Home study card previews now render through `Image`, so a failed screenshot leaves the sample window with a muted image icon. `Image` takes `priority` for the first card, and its wrapper is `display: contents` in the card so the screenshot lays out as before (checked: sizes and positions match at 1280 and 375). Study page images (banner, compare, panels) have no fallback yet.

## D-149: Primitives and semantic tokens stay apart — decided, 2026-10-26

Three rules, enforced. (1) Components never read a `--primitive-*` token or import `primitives.ts`. (2) Every semantic token resolves to a primitive or another semantic token. The generator throws on a semantic value with no primitive, and `scripts/tokens/token-layers.test.ts` checks `theme.css` for raw values, undefined references and any use of a primitive outside `src/tokens`. (3) No semantic token is named for a value. The `--font-size-12` to `--font-size-56` aliases are gone. Components use role names: `label` (14), `control` (16), `lead` (32), `card-title-compact` (28), `card-title` (36), `display-sm` (48), `display` (56). New primitives back what was raw: a `dimension` size scale (icon, target, layout), `motion` (durations, easings), `shadow`, `utils.layer`, `utils.ratio` (the half in the icon inset calc), more `utils.opacity` steps for the deepen amounts, and `font.fluid` for the sloped part of each `clamp()`. `--state-deepen-off` is the semantic zero that `tone.css` uses. A `calc()` of other tokens in `defaultTheme.ts` stays as written and the raw-value check covers its parts. Computed font sizes, spacing, durations, layers and shadows matched the previous build (About, Resume and Indeed h1 56px, Home card title 36px, the 404 numeral 140px), and the 33 accessibility tests pass. Supersedes the value-named sizes in D-033.

The shared `Image` fallback copies its frame's corner radius (`border-radius: inherit`) instead of drawing a circle, so a failed Resume portrait stays a rounded square. The Resume portrait shows a `user` icon (Phosphor bold, new in `src/assets/icons`), the About photos keep their pet icons, and the Home study card previews now render through `Image`, so a failed screenshot leaves the sample window with a muted image icon. `Image` takes `priority` for the first card, and its wrapper is `display: contents` in the card so the screenshot lays out as before (checked: sizes and positions match at 1280 and 375).

The study card fallback is a tint of the card's own palette (14% of the text color in light, 8% in dark), so it reads as part of the card.

## D-150: Study page images fall back to their frame — decided, 2026-10-26

`StudyImage`, `StudyCompare` and `StudyPanels` render through `Image`. A failed picture leaves its frame (banner, column, before or after shot, panel) as a 12% tint of the muted text color with the image icon, at the size the picture would have had. `StudySection` now passes each image's width and height so the plain figure keeps its aspect ratio (checked: loaded image sizes are unchanged at 1280 on all four studies).

## D-151: Route chunks — decided, 2026-10-25

Home stays in the entry bundle. About, Resume, the case studies and NotFound are `React.lazy` chunks behind one `Suspense` in `App.tsx`, whose fallback is the real `Header`. The static first-paint shell tried the same day moved when React mounted, so D-152 replaced it.

## D-152: Dead tokens removed, only read states derived, a guard for undefined tokens — decided, 2026-10-26

Removed because nothing read them: `surface.accent`, `state.overlay-tint` and its inverse, `content.inverse`, `layout.gutter`, the `decorative` font family (the same as body), the `all-caps` text transform (it pointed at `capitalize`, and `uppercase` exists), `extractInteractStates`, and the hover and pressed colors nobody uses. Hover and pressed states are derived only for what is read: each group's container hover and its foreground's hover and pressed (`palette.module.css`), plus the primary default hover and pressed (`deepen.module.css`). Every palette keeps the same members (`default`, `on-default`, `container`, `on-container`), so `quinary` and `brand` keep a default pair that nothing reads yet. `TextStyleKey` lists the eight styles that exist. `token-layers.test.ts` now also fails when a component reads a token that is not defined, which would have caught `shell.css` still using the old `--size-space-*` names after D-143 (fixed).

## D-153: The space scale, and space primitives — decided, 2026-10-26

Space steps are `none` (0), `3xs` (2px), `2xs` (4), `xs` (8), `sm` (12), `md` (16), `lg` (20), `xl` (24), `2xl` (32), `3xl` (40), `4xl` (48), `5xl` (56), `6xl` (64) and `7xl` (80). The `section-*` names are gone, so one scale runs without a break. Every old name moved one step down, so `--space-lg` is now `--space-md`. Each use kept its pixel value, which I checked against the old and new `theme.css`. Space primitives are `--primitive-space-8`, without `size`. The other size scales keep `--primitive-size-*`.

## D-159: Pre-render every route and hydrate — decided, 2026-10-25

`npm run build` makes the client build, then a server build (`src/entry-server.tsx`, into `.ssr`), then `scripts/prerender.ts` renders each route to HTML with `StaticRouter` and writes it into `#root` of `dist/<route>/index.html` and `dist/404.html`. The script also writes each route's title, description, canonical and og tags (it replaces `prerender-meta.ts`, D-122) and adds the lazy page's CSS and `modulepreload` links from the client manifest. `src/index.tsx` calls `hydrateRoot` when `#root` has markup and `createRoot` on the dev server. The router moved out of `App` into the two entries. `vite-react-ssg` was not used because it supports react-router-dom 6 and the site is on 7.

Rules that keep hydration clean: render nothing from `window`, `localStorage`, the clock or `Math.random` during the first render. `ThemeProvider` starts from light and a layout effect reads the stored choice and the OS setting before paint (until then `index.html`'s pre-paint script owns `data-theme`). `NotFound` shows its first line in the HTML and picks a random one after mount. The header's active link ignores a trailing slash, which GitHub Pages adds. A new route needs an entry in `scripts/prerender.ts`.

Checked on a development-mode build (readable React warnings), 8 routes in light and dark at 1280 and 375: no hydration warnings or console errors. On a throttled connection (1.6 Mbps, 150 ms), Home paints at 0.7 s and About at 0.7 s, with a layout shift under 0.002.

## D-154: Inverse surface, one strong weight, text-style tokens trimmed — decided, 2026-10-26

`surface.error` is `surface.inverse` (`--color-surface-inverse`) and the 404 tone is `data-tone="inverse"`: it is the dark ground that text and links on it re-point to `on-accent` values for, so it is not about errors. `font-weight` has one `strong` (900) in place of `strong` and `extra-strong`. Manrope's `@font-face` stops at 800, so the browser renders 900 as 800, and Inter renders 900. Measured in the built site: Manrope text is the same width at 800 and 900, Inter is not. Removed because nothing read them: `font-weight-subtle` and the 13 `font-text-*` tokens (transform, decoration, thickness, underline offset), with their type fields. The primitives for them stay. `tone.css` stopped re-pointing `content-default-hover` and `-active`, which D-152 had already removed.


## D-158: Home card previews are WebP, and the first one loads at high priority — decided, 2026-10-25

The Toyota, Indeed and ActBlue card previews are `-min.webp` (quality 90, visually identical to the PNGs): 127, 75 and 85 KB became 37, 30 and 31 KB. ServiceNow stays a PNG because it is already 28 KB and WebP gains nothing. `?size` reads WebP headers (`scripts/vite-image-size.ts`, tested). `Image` sets `fetchPriority="high"` when `priority` is on, so the first preview does not queue behind the scripts. On a throttled connection (1.6 Mbps, 150 ms) Home's largest paint went from 2.9 s to 1.2 s and first paint stayed at 0.7 s.

## D-155: Fixed font sizes are named for a role in the type scale — decided, 2026-10-26

A semantic size names a step of the type scale, never a component or a place. `card-title` (36) is `heading-xl` and `card-title-compact` (28) is `heading-xl-sm`, continuing past the fluid `heading-sm/md/lg` styles. `-sm` is the step down for smaller screens, as in `display` (56) and `display-sm` (48). `label`, `control` and `lead` stay. Whether these fixed steps become fluid type styles is still open (plan.md).

## D-157: robots.txt and a generated sitemap — decided, 2026-10-25

`public/robots.txt` allows everything and points to the sitemap. `scripts/prerender.ts` writes `dist/sitemap.xml` from the same route list as the pages, with the trailing-slash URLs the canonical tags use, so a new route is in the sitemap the moment it is in the script. ESLint ignores `temp/`. The site's one host is `https://www.jaxengeldesign.com`, the CNAME, because Pages redirects the bare domain to it (decided 2026-10-25). The canonical, og and sitemap URLs, `robots.txt`, `homepage` and `siteURL` all use it. The resume HTML in `resume/` still links the bare domain, which redirects, and waits for the Resume work.
