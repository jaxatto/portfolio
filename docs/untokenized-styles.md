# Styles that are not tokens

Generated 2026-10-25 from `src/**/*.css` after audit batch 4 (D-119), by reading every declaration and listing the ones whose value contains a literal length, color, duration or ratio outside a `var(--token)`. It is a worklist for the next design-system pass, not a defect list: single-use values are listed on purpose, so a value that starts repeating is noticed.

**101 declarations** in 21 files. Counts by group:

| Group | Declarations |
| --- | --- |
| Color | 10 |
| Layering | 4 |
| Motion | 3 |
| Typography | 6 |
| Proportion | 9 |
| Size | 35 |
| Space | 21 |
| Component custom property | 9 |
| Transform / filter | 4 |

What is already tokenized and so not listed: colors (semantic pairs), space, radius, border width, focus ring, type styles, motion durations and easings, elevation, tap targets, reading and column widths (D-118, D-119). Not covered by the scan: `@keyframes` bodies, media query widths (640, 641, 900 are the system, others carry a comment, D-118), and the TSX and HTML values at the end.

## Color (10)

Colors made by mixing a token with a literal percentage or a literal color.

Hover and pressed washes recur (12% hover, 20% pressed, in BackToTop and the outline Button). Candidate: `--color-state-wash-hover` / `-active` tokens, or a `color-mix` helper in the generator. The footer band mix (80%) and the card lift (5% light, 30% dark) are design values with a decision behind them (D-049, D-028).

| Where | Rule | Declaration |
| --- | --- | --- |
| `components/BackToTop/BackToTop.module.css:44` | `.button:hover` ((hover: hover)) | `background: color-mix(in srgb, var(--color-primary-default-hover) 12%, var(--color-surface-d` |
| `components/BackToTop/BackToTop.module.css:49` | `.button:active` | `background: color-mix(in srgb, var(--color-primary-default-active) 20%, var(--color-surface-` |
| `components/Button/Button.module.css:75` | `.outline:active` | `background: color-mix(in srgb, var(--color-primary-default-active) 20%, transparent)` |
| `components/Button/Button.module.css:83` | `.outline:hover` ((hover: hover)) | `background: color-mix(in srgb, var(--color-primary-default-hover) 12%, transparent)` |
| `components/Footer/Footer.module.css:178` | `[data-theme='dark']) .band` | `background: color-mix(in oklch, var(--color-surface-default) 80%, var(--color-secondary-cont` |
| `components/StudyCard/StudyCard.module.css:23` | `.card` | `--shadow-lift-color: color-mix(in oklch, var(--card-fg) 55%, transparent)` |
| `components/StudyCard/StudyCard.module.css:352` | `[data-theme='dark']) .card` | `--shadow-lift-color: oklch(0 0 0 / 0.5)` |
| `styles/tone.css:55` | `[data-tone='error']` | `--color-border-decorative: color-mix(in srgb, var(--color-content-on-accent) 22%, transparent)` |

## Layering (4)

Stacking order.

Four values (10, 30, 1000, -1) across four components. Candidate: `--layer-*` tokens (`raised`, `tooltip`, `skip-link`, `behind`) in `effects.ts`, so the order is read in one place.

| Where | Rule | Declaration |
| --- | --- | --- |
| `components/BackToTop/BackToTop.module.css:10` | `.button` | `z-index: 10` |
| `components/Header/Header.module.css:226` | `.skip-link:focus-visible` | `z-index: 1000` |
| `components/Header/Header.module.css:339` | `.controls::after` ((max-width: 640px)) | `z-index: -1` |
| `components/Tooltip/Tooltip.module.css:5` | `.tooltip` | `z-index: 30` |

## Motion (3)

Timing that is not UI feedback.

The three hero loops (selection resize and pointer drag at 12s, caret blink at 1.4s). Intentionally outside the motion tokens (D-118). If a second ambient animation appears, add `--motion-loop-*`.

| Where | Rule | Declaration |
| --- | --- | --- |
| `components/HeroMarks/HeroMarks.module.css:19` | `.selection` | `animation: resize-box 12s ease-in-out infinite` |
| `components/HeroMarks/HeroMarks.module.css:74` | `.pointer` | `animation: pointer-drag 12s ease-in-out infinite` |
| `components/HeroMarks/HeroMarks.module.css:199` | `.caret` | `animation: blink 1.4s ease-in-out infinite` |

## Typography (6)

Type values outside the type scale.

The 404 numeral and the footer email link are fluid displays derived from scale steps (D-022, D-013). `.build` at 0.9em and the NameTag 1.2 line height are one-offs. The ModeToggle icon is a 24px font-size used to size a glyph (see icon sizes).

| Where | Rule | Declaration |
| --- | --- | --- |
| `components/Header/Header.module.css:304` | `.build` | `font-size: 0.9em` |
| `components/ModeToggle/ModeToggle.module.css:54` | `.icon` | `font-size: 24px` |
| `components/NameTag/NameTag.module.css:10` | `.label` | `line-height: 1.2` |
| `components/TextLink/TextLink.module.css:25` | `.large` | `font-size: clamp(var(--font-size-16), 7.4vw - 9px, var(--font-size-32))` |
| `pages/NotFound/NotFound.module.css:60` | `.title` | `font-size: clamp(var(--font-size-56), 18vw, calc(var(--font-size-56) * 2.5))` |
| `pages/NotFound/NotFound.module.css:62` | `.title` | `line-height: 1` |

## Proportion (9)

Ratios, flex shares and opacity.

Aspect ratios belong to the image content (3 / 1 banner, 1200 / 740 compare box). The 55% text share and 140px fact basis are layout choices. `stroke-width: 1.2` is the cursor arrow outline. Image fallback opacity 40%.

| Where | Rule | Declaration |
| --- | --- | --- |
| `components/Header/Header.module.css:326` | `.controls` ((max-width: 640px)) | `flex: 1 0 100%` |
| `components/HeroMarks/HeroMarks.module.css:87` | `.pointer-fill` | `stroke-width: 1.2` |
| `components/HeroMarks/HeroMarks.module.css:180` | `.tag-arrow` | `stroke-width: 1.2` |
| `components/Image/Image.module.css:18` | `.fallback-wrapper svg` | `opacity: 40%` |
| `components/StudyCard/StudyCard.module.css:171` | `.horizontal .content` ((min-width: 641px)) | `flex: 0 1 55%` |
| `pages/Resume/Resume.module.css:74` | `.fact` ((max-width: 899px)) | `flex: 1 1 140px` |
| `pages/Resume/components/Role/Role.module.css:12` | `.logo` | `flex: 0 0 auto` |
| `pages/Studies/components/StudyCompare/StudyCompare.module.css:32` | `.shot` | `aspect-ratio: 1200 / 740` |
| `pages/Studies/components/StudyImage/StudyImage.module.css:46` | `.banner` ((min-width: 641px)) | `aspect-ratio: 3 / 1` |

## Size (35)

Widths, heights and measures.

Two groups worth a token: icon sizes (16px BackToTop, 28px footer icons, 1em / 1.2em glyphs in Button, StudyCard, TextLink and ModeToggle) and card box sizes in rem (17rem, 12.5rem, 31.25rem, 28.75rem, 34.25rem, 18.75rem, 13.75rem). The 48px logo avatar and 40em footer measure are single uses. The `1px` rows are the visually-hidden pattern, written twice (`.sr-only`, `.skip-link`).

| Where | Rule | Declaration |
| --- | --- | --- |
| `components/BackToTop/BackToTop.module.css:59` | `.icon` | `width: 16px` |
| `components/BackToTop/BackToTop.module.css:60` | `.icon` | `height: 16px` |
| `components/Button/Button.module.css:35` | `.icon` | `width: 1.2em` |
| `components/Button/Button.module.css:36` | `.icon` | `height: 1.2em` |
| `components/Footer/Footer.module.css:46` | `.description` | `max-width: 40em` |
| `components/Footer/Footer.module.css:129` | `.icon-link svg` | `width: 28px` |
| `components/Footer/Footer.module.css:130` | `.icon-link svg` | `height: 28px` |
| `components/Header/Header.module.css:215` | `.skip-link` | `width: 1px` |
| `components/Header/Header.module.css:216` | `.skip-link` | `height: 1px` |
| `components/Header/Header.module.css:282` | `.heading` | `max-width: 900px` |
| `components/HeroMarks/HeroMarks.module.css:28` | `.handle-br` | `width: 0.2em` |
| `components/HeroMarks/HeroMarks.module.css:29` | `.handle-br` | `height: 0.2em` |
| `components/HeroMarks/HeroMarks.module.css:194` | `.caret` | `width: 0.12em` |
| `components/HeroMarks/HeroMarks.module.css:195` | `.caret` | `height: 0.85em` |
| `components/HeroMarks/HeroMarks.module.css:198` | `.caret` | `vertical-align: -0.1em` |
| `components/ModeToggle/ModeToggle.module.css:61` | `.icon svg` | `width: 1em` |
| `components/ModeToggle/ModeToggle.module.css:62` | `.icon svg` | `height: 1em` |
| `components/StudyCard/StudyCard.module.css:116` | `.icon` | `width: 1.2em` |
| `components/StudyCard/StudyCard.module.css:117` | `.icon` | `height: 1.2em` |
| `components/StudyCard/StudyCard.module.css:138` | `.preview` | `height: 17rem` |
| `components/StudyCard/StudyCard.module.css:145` | `.sample` | `min-width: 31.25rem` |
| `components/StudyCard/StudyCard.module.css:184` | `.horizontal .outcome` ((min-width: 641px)) | `max-width: 28.75rem` |
| `components/StudyCard/StudyCard.module.css:224` | `.horizontal .content` ((min-width: 900px)) | `flex-basis: 34.25rem` |
| `components/StudyCard/StudyCard.module.css:299` | `.preview` ((max-width: 640px)) | `height: 12.5rem` |
| `components/StudyCard/StudyCard.module.css:331` | `.card:hover .image` ((hover: hover) and (prefers-reduced-motion: no-preference)) | `width: calc(var(--image-w) + 4%)` |
| `components/StudyCard/StudyCard.module.css:335` | `.horizontal:hover .image` ((hover: hover) and (prefers-reduced-motion: no-preference)) | `min-height: 104%` |
| `components/TextLink/TextLink.module.css:41` | `.icon` | `width: 1em` |
| `components/TextLink/TextLink.module.css:42` | `.icon` | `height: 1em` |
| `pages/NotFound/NotFound.module.css:8` | `.page` | `min-height: 100vh` |
| `pages/Resume/components/Role/Role.module.css:16` | `.logo` | `width: 48px` |
| `pages/Resume/components/Role/Role.module.css:17` | `.logo` | `height: 48px` |
| `pages/Studies/components/StudyPanels/StudyPanels.module.css:18` | `.box` | `height: 18.75rem` |
| `pages/Studies/components/StudyPanels/StudyPanels.module.css:66` | `.box` ((max-width: 640px)) | `height: 13.75rem` |
| `styles/main.css:66` | `.sr-only` | `width: 1px !important` |
| `styles/main.css:67` | `.sr-only` | `height: 1px !important` |

## Space (21)

Offsets and spacing that do not sit on the space scale.

Mostly optical nudges on decorative marks (HeroMarks 1px, -2px, 10px; the footer icon inset 7px and -7px; `0.3em` word gaps). The scale-based ones are `calc(token + 2px)` in NameTag and the nav row margin. Candidate: `--size-optical-*` is not worth it. Document as optical.

| Where | Rule | Declaration |
| --- | --- | --- |
| `components/Footer/Footer.module.css:69` | `.row` | `margin-inline-start: -7px` |
| `components/Footer/Footer.module.css:97` | `.email::before` | `top: min(0px, calc((100% - var(--size-target-lg)) / 2))` |
| `components/Footer/Footer.module.css:98` | `.email::before` | `bottom: min(0px, calc((100% - var(--size-target-lg)) / 2))` |
| `components/Footer/Footer.module.css:124` | `.icon-link::after` | `right: 7px` |
| `components/Footer/Footer.module.css:125` | `.icon-link::after` | `left: 7px` |
| `components/Header/Header.module.css:217` | `.skip-link` | `margin: -1px` |
| `components/Header/Header.module.css:268` | `.role` | `margin: calc((var(--size-target-lg) - 1em * var(--font-line-height-default)) / 2) 0 0` |
| `components/Header/Header.module.css:299` | `.build` | `padding-inline: 0.3em` |
| `components/Header/Header.module.css:337` | `.controls::after` ((max-width: 640px)) | `bottom: 2px` |
| `components/Header/Header.module.css:363` | `.byline` ((max-width: 640px)) | `column-gap: 0.3em` |
| `components/HeroMarks/HeroMarks.module.css:9` | `.design` | `margin-inline: 0.04em` |
| `components/HeroMarks/HeroMarks.module.css:10` | `.design` | `padding-inline: 0.1em` |
| `components/HeroMarks/HeroMarks.module.css:71` | `.pointer` | `margin: 1px 0 0 1px` |
| `components/HeroMarks/HeroMarks.module.css:140` | `.corner-tr .pointer` | `margin: -1px 0 0 1px` |
| `components/HeroMarks/HeroMarks.module.css:187` | `.tag-label` | `margin: -2px 0 0 10px` |
| `components/HeroMarks/HeroMarks.module.css:196` | `.caret` | `margin-left: 0.15em` |
| `components/Image/Image.module.css:19` | `.fallback-wrapper svg` | `top: -0.25rem` |
| `components/NameTag/NameTag.module.css:3` | `.label` | `padding: calc(var(--size-space-xs) + 2px) calc(var(--size-space-sm) + 2px)` |
| `pages/Resume/Resume.module.css:106` | `.byline` ((max-width: 640px)) | `column-gap: 0.3em` |
| `pages/Studies/components/HeaderSection/HeaderSection.module.css:84` | `.sep::before` | `left: calc(var(--sep-w) / 2 - 0.15em)` |
| `styles/main.css:69` | `.sr-only` | `margin: -1px !important` |

## Component custom property (9)

Custom properties a component defines with a literal value.

These are the component API (`--line-bottom`, `--line-inset`, `--card-lift`, `--image-w`). Fine as local variables. `--card-lift` (5% light, 30% dark) is the one that could become a token if a second tinted surface appears.

| Where | Rule | Declaration |
| --- | --- | --- |
| `components/Header/Header.module.css:83` | `.brand` | `--line-bottom: 2px` |
| `components/Header/Header.module.css:136` | `.nav-link` | `--line-bottom: 2px` |
| `components/ModeToggle/ModeToggle.module.css:8` | `.button` | `--line-inset: 9px` |
| `components/StudyCard/StudyCard.module.css:15` | `.card` | `--card-lift: 5%` |
| `components/StudyCard/StudyCard.module.css:198` | `.horizontal .image` ((min-width: 641px)) | `--image-w: 112%` |
| `components/StudyCard/StudyCard.module.css:211` | `.horizontal:not(.enlarge) .image` ((min-width: 641px)) | `--image-w: calc(112% + 2 * var(--size-border-width-default))` |
| `components/StudyCard/StudyCard.module.css:217` | `.horizontal.enlarge .image` ((min-width: 641px)) | `--image-w: calc(112% + 40px)` |
| `components/StudyCard/StudyCard.module.css:351` | `[data-theme='dark']) .card` | `--card-lift: 30%` |

## Transform / filter (4)

Transforms.

ModeToggle sun and moon turn (rotate 60deg, scale 0.6) and About photo hover (scale 1.04, translate 4px). Single-use interaction values.

| Where | Rule | Declaration |
| --- | --- | --- |
| `components/ModeToggle/ModeToggle.module.css:67` | `.sun` | `transform: rotate(-60deg) scale(0.6)` |
| `components/ModeToggle/ModeToggle.module.css:77` | `.button[data-mode='dark'] .moon` | `transform: rotate(60deg) scale(0.6)` |
| `pages/About/About.module.css:159` | `.figure:hover .photoImage` ((hover: hover)) | `transform: scale(1.04)` |
| `pages/About/About.module.css:163` | `.figure:hover .tag` ((hover: hover)) | `transform: translate(-4px, -4px)` |

## Outside the CSS scan

- `src/styles/main.css`: the site cursor is a data-URI SVG with fixed black, white and a 0.32 shadow opacity (a cursor image cannot read custom properties, D-017). The `.sr-only` rule is the visually-hidden pattern.
- `src/providers/Theme/ThemeContext.tsx` and `index.html`: the `theme-color` meta values `#ffffff` and `#0f172b` are copied by hand from the light and dark surface tokens. They must change with `--color-surface-default`.
- `src/components/Tooltip/Tooltip.tsx`: Floating UI `flip` and `shift` padding of 8px, and the offset math, are literals.
- `src/components/BackToTop/BackToTop.tsx`: show after 1.5 screens of scroll, 4px scroll delta, 16px icon.
- `src/components/HeroMarks/HeroMarks.tsx`: the pointer and tag arrow SVGs are drawn at 14 x 19 with their own paths.
- `src/pages/Studies/components/*` and the study `content.ts` files: panel `weight`, `sourceWidth`, `sourceHeight` and slice pixels are per-image numbers (the parked `StudyMedia` rework in `docs/plan.md`).
- Keyframes in `Header.module.css`, `HeroMarks.module.css` and `Tooltip.module.css` carry literal percentages and transforms.

## Done (D-130, 2026-10-25)

Icon sizes (`--size-icon-sm/md/lg`, 16, 24 and 28px), the state washes (`--state-wash-hover` 12% and `--state-wash-active` 20%), the layer order (`--layer-behind`, `raised`, `tooltip`, `skip-link`) and the `theme-color` pair (generated from `surface.default` into `src/tokens/themeColor.ts`) are tokens now. The rows above that point at them are kept for the record.

## One-off lengths and their nearest token

A scan of the length literals that are left (px and rem, 42 values) against the space, radius, type and target scales.

**Exactly a token already: swapped (2026-10-25).** Image `top`, StudyCard `+ 40px`, About `translate(-4px, -4px)`, the Resume bar (56px by 4px), the Role logo (48px) now read `space-*` tokens. Header's two `--line-bottom: 2px` and the phone divider's `bottom: 2px` read `--size-border-width-default`, and the Resume bar radius reads `--size-radius-full`. The Resume page screenshot is byte-identical to before.

**One or two pixels off (a rounding or optical value, leave unless the design changes):**

- `1px` visually-hidden pattern (`.sr-only`, skip link): fixed by the technique.
- `2px` in `Role` gap and `NameTag` padding (`space-xs + 2px`): spacing, not a border, so `--size-border-width-default` would say the wrong thing. Left.
- `7px` footer icon underline inset and `-7px` margin, and `9px` ModeToggle `--line-inset`: now `(target - icon) / 2 + 1px` from the tokens (D-131).
- HeroMarks `1px` and `2px` nudges and the `10px` tag margin: decided to stay as written (D-131).
- `9px` in the TextLink fluid clamp: part of a tuned formula.

**Far from any token (layout measures, keep as they are):** `17rem` and `12.5rem` card preview heights, `31.25rem`, `28.75rem` and `34.25rem` card geometry (D-028), `18.75rem` and `13.75rem` panel boxes, `14rem` and `38rem` Resume role columns, `900px` on the Home hero sentence (decided to stay, D-131).

**Em-based sizes** (`1em`, `1.2em` glyphs in Button, StudyCard, TextLink, ModeToggle) follow their text on purpose and are not icon tokens.
