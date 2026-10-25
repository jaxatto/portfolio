# Decisions

One short entry per decision: what, why, date. Add an entry when a choice sets a pattern (new token, component, copy approach, tooling). Reference by ID in code comments, e.g. `// See docs/decisions.md D-004`. Status: **decided**, **proposed** (discuss with Jax), or **superseded**.

## D-001 Commit identity and workflow — decided, 2026-10-13
Commits are authored as Jax Engel. Work in small slices with frequent small commits; merge in small steps into `redesign` (D-007). Why: Jax wants to move fast while saving work as we go.

## D-002 Adopt the `update-content` token system — decided, 2026-10-13
Use the token pipeline from `origin/update-content` (`src/tokens/`, `scripts/tokens/`, generated `theme.css`, light/dark semantic tokens) as the styling foundation. Keep SCSS only where it earns its place (e.g. `respond()` mixin); components consume tokens as CSS custom properties. Port it as its own foundations slice and re-check values against current Figma. Dark mode ships (see D-006).

## D-003 Where copy lives — decided, 2026-10-13
Short page copy lives inline in components, next to its markup. Case studies get Markdown/JSON files when we build them (slice 3/4). No new `resources/*.ts` copy files. Existing ones are folded in as each component is migrated (Header and Footer done in slice 1).

## D-004 Copy is collaborative — decided, 2026-10-13
Copy can be revised and improved, but through discussion. Claude proposes concrete changes with reasoning aimed at the hiring goal; Jax decides.

## D-005 No one-off styles — decided, 2026-10-13
Anything not covered by existing tokens/components is raised and agreed first, then logged here as a new token, variant or design change.

## D-006 Ship light and dark themes — decided, 2026-10-13
The redesign ships with both themes (Figma has both, desktop only). Tokens are built with light/dark semantic values from the start; the theme switcher and OS-preference behavior are designed in the foundations/header slice. Every component is checked in both themes.

## D-007 `redesign` integration branch — decided, 2026-10-13
All redesign slices merge into `redesign`, only on Jax's approval. `main` (the live site) is untouched until Jax decides to bring `redesign` back. Why: lets us move fast and save work without disturbing the live site.

## D-008 No mobile designs yet — decided, 2026-10-13
Figma contains desktop designs only (light and dark). Responsive behavior is proposed from the desktop system and agreed with Jax per slice, then logged here. Don't invent responsive patterns silently.

## D-009 Review links with every change — decided, 2026-10-13
After each change the dev server is up and Jax gets the exact route/section to review plus a screenshot. Files are always shared as real links.

## D-010 Manrope tops out at 800 — decided, 2026-10-13
Manrope has no 900 weight, so Figma's Manrope "strong"/"extra-strong" (900) renders as 800. Jax is fine with 800. In code, Manrope text that Figma sets to 900 uses 800 (body links, bold body text); Inter keeps 900 for headings (`--font-weight-strong`). No token change needed yet: only heading styles use `strong`. When the Link/body-strong components are built, add a Manrope-specific weight token rather than hard-coding 800 (D-005). Optionally update Figma to 800 so the file matches what ships. Fonts load Inter 400/700/800/900 and Manrope 400/500/700/800 (`_variables.scss`).

## D-011 Dark mode gated until components migrate — decided, 2026-10-13
D-006 stands (ship light and dark). Until the components that use legacy SCSS colors are migrated, `VITE_THEME_SWITCHING=false` pins the site to light so nothing half-restyles. Flip it when Header, Footer, Work and the shared components are on tokens.

## D-012 Token port scope and TypeScript 5 — decided, 2026-10-13
Slice 0 ported the token source, build script, generated `theme.css`, `ThemeProvider` and the pre-paint theme script. Left behind for now: Figma plugin sync (`watcher.ts`, `export-figma-tokens.ts`, `tokens.json`), stylelint, and `theme-bridge.css` (a temporary dark-mode patch for legacy components that the gate makes unnecessary). TypeScript upgraded 4.9 → 5.9 because the token types use `const` type parameters (TS 5.0+); `update-content` shipped with that unresolved typecheck error.

## D-013 Fluid type scale — decided, 2026-10-13
Type sizes may be fluid (`clamp()`), and need not match the token values at every width, as long as the size at desktop (1280px) equals Figma. The ported scale reaches Figma's desktop sizes at about 1280px (title-sm 40, heading-lg 32, body-lg 24, body-md 20). Smaller-screen behavior is still tuned per slice and checked with Jax (D-008).

## D-014 Slice 1 patterns — decided, 2026-10-13
- **Focus ring:** 3px solid `--color-state-focus-ring`, 3px offset (2px / 2px in Figma; thickened and pushed out per Jax's review, 2026-10-13). Same on nav, brand, TextLink and the mode toggle.
- **TextLink** (`src/components/TextLink`) is the token-based Figma Link. The legacy SCSS `Link` stays until its last consumers (study cards, NotFound, Resume) are migrated, then it is deleted.
- **Decorative shapes** are CSS (header ring, footer circle, dot, ring, dashed circle) because Figma's SVG export isn't available to us. Fills are container colors at 50% opacity (verified against light and dark exports); positions and sizes come from Figma. Dashed rings use `content-default`.
- **32px** for the footer email link and the wave emoji (Figma has 28px, which is off the scale). The email link is fluid down to 16px so it fits 375px screens.
- **Footer bottom padding** is `section-xl + 2xl` (104px in Figma, not a token).
- **Header** shows the intro (photo, greeting) on Home only; other pages show brand + nav. Header and Footer are full width; only `<main>` is constrained to the site width.
- **Mode toggle** renders only while theme switching is enabled (D-011). The multi-theme picker (Unicorn, Forest, ...) is a later slice.
- **Page background** now uses `--color-surface-default` (same white in light).
- **Placeholders:** the sun, moon and automation (brand mark) icons are hand-made stand-ins from `update-content` until Figma exports are available.
- **Site metadata** says Staff everywhere (title, description, Open Graph, Work and Resume pages).

## D-015 Link hover and pressed states — decided, 2026-10-13
- **Colors are existing tokens only.** The `*-hover` tokens are too subtle on their own (about 0.06 lightness), so links step further along the ramp: hover uses `primary-default-active` (violet links) or `content-default-active` (dark links); pressed uses the deepest step (`primary-on-container-active`, or back to `content-default` for dark links).
- **Hover also moves the underline:** it is always present but transparent, fades in and slides down to 4px (`--link-underline-offset-hover`, md token + 2px). Thickness stays 2px the whole time (tried thickening to 3px, dropped). Pressed pulls it back to the 2px rest offset so the link feels pushed in.
- **Skip-ink is `auto`** on all links (Figma had `none` on Link).
- Open: the 4px hover offset is a CSS variable, not a token. Add one if this pattern is kept.

## D-016 Home hero: copy and structure — decided, 2026-10-13
- **Header is light:** a nav row, a role line ("Staff Product Designer") and one sentence ("Hi, I'm Jax! I design and build accessible products and the systems behind them."). No photo, no hero actions (the nav already has Work and Resume), no brand mark on Home (the greeting carries the name; inner pages show the brand).
- **Tried and dropped:** a pitch paragraph, a "How I work" pillars section, the photo with dashed ring and blurred rings, and a wave emoji bubble. They were heavy or competed with the nav. Reconsider pillars in the content pass if the proof points exist.
- **Targets:** staff product design and design technologist / design engineering roles. The role line is one title; Design Technologist comes through "design and build" and the footer. Page title and meta still say Staff Product Designer; revisit with the copy.
- Open: one concrete AI example and one proof point (metric or shipped outcome).

## D-017 Home hero: visual language and toggle — decided, 2026-10-13
- **Type and color carry it:** dark heavy greeting, regular weight for the rest; the role label sits in the nav row's left slot on Home (the brand's slot on inner pages) as plain dark text (tried violet text, muted text, an accent bar, a filled chip that read as a third chip style, and a status dot; all were dropped); as an eyebrow above the sentence it floated and collided with the "design" box; every nav link has a full-width accent line drawn with `::after` at one position: always shown on the current page (it grows in when the page becomes current), grown in on hover for the others (a shape, not only a color); hover color is violet on all; no native underline in the nav.
- **Motion (hero):** the selection box slowly resizes (8s drag, then a 4s pause, repeating) with a design-tool pointer on its corner handle, and the "build" cursor blinks subtly (1.4s). Both stop under `prefers-reduced-motion`. Overlays are empty and `aria-hidden`, so text never reflows.
- **Two small tool marks** (CSS only, hidden from assistive tech by being pseudo-elements): "design" gets a selection box with corner handles (secondary color), "build" gets a code chip with a terminal cursor (primary container). Checked against ~37 portfolios; none does this (2026-10-13).
- **Mono font is Roboto Mono** (the existing `--font-family-mono` token), loaded at 500 and 700 in `_variables.scss`, so "build" never falls back to a system font.
- **Top of the page is all Inter:** the role label (regular), the nav words (bold) and the sentence. Manrope stays for body text elsewhere.
- **Mode toggle** is an icon-only button showing the mode you will switch to (moon in light, sun in dark), near-black like the nav labels, no background, turning violet and drawing the nav's accent line under the icon on hover and focus (focus also shows the ring) (Figma had a pill switch; a segmented control was tried and took too much focus). It is a plain button whose accessible name states the action ("Switch to dark mode" / "Switch to light mode"), since the icon shows the target mode.
- **Inner pages:** brand left, nav and toggle right, on the same row.
- **Sun icon** is a filled sunburst (disc with 8 pointed rays) so it pairs with the solid moon; outlined options looked lighter than the moon.
- **Text selection** uses `primary-container` with `primary-on-container` text (global `::selection` in `main.scss`) instead of the browser's blue.
- **Hero pointer** is a Figma multiplayer cursor: a solid indigo arrow (selection box color) with a thin white edge and a name tag ("Jax"), tip up-left on the box's bottom-right handle. It fades in only while the box is being dragged (middle of the 8s drag, hidden during the 4s pause) so the tag isn't over the line below all the time, and it is hidden under reduced motion.
- **Site cursor** is the hero pointer's arrow shape in black with a thin white edge and a soft drop shadow (CSS `cursor` on `html`, hotspot at the tip). Links, buttons and inputs keep their own cursors. Trade-off: over plain text the arrow replaces the browser's I-beam.
- **Over the "build" chip** the cursor becomes the browser's I-beam, matching the typing cursor in the chip.

## D-018: Home header on mobile (≤640px) — decided, 2026-10-13

Approved by Jax (no mobile design exists, D-008). The nav row is a bar: links left, mode toggle at the right edge, hairline (`--color-border-decorative`) under it. The role moves from the bar to a byline under "Hi, I'm Jax!" (a second element inside the h1, shown only on mobile; the bar's copy is hidden there, so it is announced once). The sentence steps down to `--font-size-32` and the greeting takes its own line. Checked at 320, 375 and 768; tablet needs no change.

## D-019: Dark-mode header text — 2026-10-13

Hero sentence uses new `--color-content-emphasis` (light = purple-950 like default, dark = true white) so the greeting and "I design…" are the brightest thing on the page. Dark `--color-content-variant` moves from slate-100 to purple-50, so nav labels, the mode toggle and the mobile byline match the page's purple-tinted white. Light mode is unchanged. Footer text that uses `content-variant` follows.

Also (dark): app surfaces move from slate to a new project primitive `night` (hue 280°, between slate and purple; surface default 900, sunken 800, decorative border 700) so the ground is blue-purple, not blue. Stone was tried and read too warm, and new `--color-content-secondary` (light = purple-950, dark = purple-200) dims the role label and mobile byline one step.

## D-020: Footer shapes removed, Home meta, header everywhere — 2026-10-13

- Footer: the decorative circles (dashed ring, dot, blurred circle) are removed; the footer is the card alone until its own pass. The hero "Jax" cursor tag is removed (markup and CSS); it added little next to the resizing box.
- Home meta (provisional, TODO(jax)): title "Jax Engel | Staff Product Designer and Design Technologist" and a description naming accessible products, systems, enterprise/fintech and AI-assisted workflows. Set inline in `Work.tsx` and in `index.html` (the static Home tags). Other pages keep their old meta until their slices; `Work/resources/meta.ts` stays for Resume.
- The nav header is in `Layout`, so Work, About, Resume and the case studies all use it. The 404 page now renders it too.

## D-021: Title wording — decided, 2026-10-13

"Staff Product Designer" is the title everywhere. "Design Engineer" (not "Design Technologist") is added only where the context is relevant and there is room, e.g. the Home page title. Existing "Design Technologist" mentions (footer copy) change when the footer is redone; other pages' meta change in their slices. Dark mode is reviewed page by page, header done.

## D-022: 404 ground tokens — 2026-10-13

The 404 keeps its dark full-bleed look but uses semantic tokens instead of the legacy palette: new `--color-surface-accent` (light indigo-900, dark indigo-950) and `--color-content-on-accent` (white). The button uses `secondary-container`. The mode toggle is back. The bottom email line is removed, and on phones the message sits under the header instead of mid-screen. Slightly lighter and more violet than the old navy (indigo-900, not a custom blue).

Also (D-022): the "404" is a display size derived from the largest type token (`clamp(5xl, 18vw, 5xl × 2.5)`, 56px to 140px), since no token goes past 56px. The quip is one of seven phrases (`NotFound/resources/content.ts`) picked at random per visit; provisional copy.

Also (D-022): hover/pressed on the 404 header use new `--color-content-on-accent-hover` / `-active` (indigo-200 / 300 in both themes); the container tokens went dark in dark mode and made the nav and toggle illegible. The mobile divider is a 22% tint of on-accent.

## D-023: Header brand — 2026-10-13

On inner pages "Jax Engel" in the nav row is regular weight and stays a link to Home. It uses the nav links' text color (`content-variant`, near-black) and hover; the current nav link is the same color and differs only by its line. Hover: violet text and the 3px line growing in from the left at the same position. No visited or current state.

## D-024: Footer variants — decided direction, 2026-10-13

No card, no shapes. Content aligns to the header's column: heading, one line of copy and the email on the left, Resume / LinkedIn / GitHub on the right; one column on phones. Two variants:
- `quiet` (Home): page ground with a hairline above. Home already ends in colorful cards.
- `accent` (every other page, and the default): full-bleed `--color-surface-accent`, with text and link tokens re-pointed to on-accent values.

To make the accent ground read in dark mode, `surface-accent` is indigo-900 in both themes (indigo-950 vanished against the dark ground); the 404 follows. Footer copy is provisional: "Open to remote Staff Product Designer and Design Engineer roles." (D-021). `TextLink` icons now inherit the link color; a legacy global `a svg` rule had forced a fixed purple on every arrow.

Also (D-024): the footer's Resume / LinkedIn / GitHub are icon-only links (file, LinkedIn mark, GitHub mark; 44px targets, `sr-only` names, `title` tooltips), and the footer email plus these icons take the nav links' treatment (D-017): no resting underline, violet and a 3px line growing from the left on hover. In-content `TextLink`s keep the always-on underline so links stay recognizable in text. Brand marks are Octicons (MIT) and Simple Icons (CC0).

Also (D-019, D-024): `--color-content-secondary` is now near-black (slate-900) in light so the role label matches the nav; dark stays one step dimmer (purple-200). Footer copy uses `content-variant`. The footer email hugs its text, has 16px more space above, and its arrow is heavier (`+1px`, large links only).

## D-025: Icon-button tooltips — 2026-10-14

Icon-only controls (footer Resume / LinkedIn / GitHub and the mode toggle) show a tooltip styled like a Figma cursor name tag: brand color, rounded with one square corner, small Inter label. It is violet (primary), sits just above the control with its square corner (the tip) centered over the control and the body extending left, shows after 0.12s, not attached to the cursor: a following tag is jittery, unreachable by keyboard and breaks WCAG 1.4.13 (hoverable, dismissible, persistent). It appears on hover (after a short delay) and on keyboard focus, and Escape hides it until the pointer moves. It is visual only; names stay in `aria-label` / `sr-only` text, and the generated content has empty alt text so it isn't announced twice. Lives in `src/styles/tooltip.css` (`data-tooltip="Label"`).

Footer icon buttons now share the mode toggle's target (40px, `radius-md`), 9px line inset and focus ring, so the row's right edge lines up with the toggle; on mobile the row is pulled left 9px so the glyphs are flush with the text, and the description is full width.

Also (D-024): the footer GitHub icon is the Octicons `mark-github` (MIT), sized 22px like the full box (the other icons' glyphs are 20px; the circle mark reads smaller at the same size).

## D-026: One icon family — Phosphor bold — 2026-10-14

The footer links (file-with-arrow for Resume, LinkedIn, GitHub), the link arrows (right, up-right) and the mode toggle's sun and moon now come from Phosphor Icons, bold weight (MIT; license noted in each SVG). One family at one weight replaces three sources (our hand-drawn strokes, Simple Icons, Octicons) that never matched. Icons are filled glyphs in `currentColor`, so their stroke scales with size instead of being tied to the underline thickness token (the earlier non-scaling stroke). GitHub is Phosphor's cat-head mark, not the circle. The old `download`, `file` and other decorative icons stay until their pages are migrated.

## D-027: Legacy pages in dark mode, stopgap — 2026-10-14

About, the case studies and Resume use hard-coded dark text from the old palette and were unreadable on the dark ground (1.01:1). Until each is migrated, a single TEMP rule in `main.scss` sets their body text to white in dark mode, leaving text inside pale chips and cards alone. Each page's own slice replaces this with tokens and deletes the rule. Also: the link hover distance is now a real token (`--font-text-underline-offset-lg`, 4px), replacing the CSS variable in `main.scss`; and the Resume page uses the layout's footer, so the accent footer is full-bleed there.

Also (D-017): keyboard focus on the mode toggle shows only the focus ring: no violet and no line, like the nav links. Hover keeps both. The tooltip still shows on focus.

## D-028: Home study cards — decided, 2026-10-14

Built from Figma Home `2839:21650`, then refined with Jax in review. The Figma frame is now out of date (TODO(jax): update it).
- **Layout:** a single stacked column of rounded cards in the 960px column (D-029), every card horizontal on desktop (900px and up): text left, a screenshot "window" right. At 900px and below they stack: text, then the screenshot cropped by the card's edges. One column means a fifth study needs no layout change.
- **Anatomy:** title (verb-led, 2 lines), one outcome paragraph (3 lines at most), link naming the company. No tag line and no eyebrow: each added a text style. Copy is inline in `StudyCardGrid.tsx` (D-003) and uses only facts from each study's own content (ActBlue's $1.5M stays "estimated"; ServiceNow's tool accuracy is left in the study so it isn't read as Jax's impact). Outcome lines were written with Jax; the leadership demo and user testing were cut from ServiceNow's card and study.
- **Order:** Toyota, ServiceNow, Indeed, ActBlue. The Toyota study page doesn't exist yet: its card links to `/case-studies/toyota` (the 404 until content is added before launch) and carries `ready: false` so it stays out of the "next study" row under case studies. TODO(jax).
- **Measures (desktop, 960px card):** padding 32 / 32 / 40, title 36px (`--font-size-36`), 12px title-to-copy gap, paragraph 20px at weight 500 and 460px wide, text box 548px (text 492px), screenshot window 412 x 306 starting at 548px, 32px below the top and cropped by the card edges. ServiceNow, Indeed and ActBlue screenshots are 40px larger inside the same window, anchored top-left (`enlargeImage`); Toyota's is trimmed 2px at top and left. No glow behind the screenshot.
- **Phones (no Figma, D-008):** padding unchanged, title 28px (`--font-size-28`), paragraph and link `body-lg` (matches the footer, about 19px at 375), 200px screenshot window, link shows a short label (D-031).
- **Fill:** the palette container mixed 5% toward `surface-default` in light and 30% in dark (`--card-lift`), so dark cards are calmer than the raw tint.
- **Dark text:** heading and link are white (`content-emphasis`), the paragraph is `content-soft` (white at 80%), so it isn't tinted by the palette (D-035).
- **Accessibility:** one `article` per card with a real heading (h2 on Home, h3 under a case study); one stretched link covers the card, its accessible name is "Read the X case study: <title>" and keyboard focus rings the whole card (D-032). No `aria-label` count.
- **Tried and dropped:** a 1120px breakout, full-width bands, a one-hue stepped ramp, a 2-up row, a tag line, a 22px paragraph, a glow, a pop-out screenshot.

## D-029: Content column is 960px; Home intro padding — decided, 2026-10-14

`--size-layout-popout-max` is 960px (was Figma's 912); the main wrapper is 1008px including its 24px side padding, and the legacy Divider offset is recomputed (180). Header, footer, hero and cards follow it. `CLAUDE.md` and the Figma frames still say 912. The Home intro has 176px top padding and none at the bottom on desktop (was 120 / 16), 64px top on phones (was 48); the header's own 48px bottom padding still separates it from the first card.

## D-030: Card color ramp and a teal palette — decided, 2026-10-14

Cards run a hue ramp, top to bottom: brand (reddish purple), secondary (indigo), tertiary (sky), quaternary (teal). `quaternary` is a new color group (teal 700 / 300 default, 200 / 800 container, with hover, active and shadow tokens generated like the others). Neighbours are at least 28 degrees apart, unlike purple next to violet (12). `primary` (violet) is no longer used on Home. A fifth study continues the ramp with green (not built yet). The teal container is teal 100 (not 200, which read brighter than the other pastels), with hover on 200.

## D-031: Card link — decided, 2026-10-14

No resting underline and no color change on hover; a 3px line grows in from the left under the text, the nav and footer links' treatment (D-017, D-024), sitting like the nav's line (2px below the text box). The arrow does not move. Keyboard focus shows only the card's ring. The legacy global `a` hover rules (color, fill, underline) are overridden on this link. On phones the link shows a short label ("Read the case study", full name still in the accessible name) and never wraps; the arrow stays next to the text.

## D-032: Focus ring tokens — decided, 2026-10-14

`--size-focus-ring-width` and `--size-focus-ring-offset` (both 3px, from a new `border-width` primitive 3) replace `calc(border-width-default + 1px)` and raw `3px` in the header, footer, mode toggle, TextLink, study card and the legacy palette mixin. Color stays `--color-state-focus-ring`. Figma draws 2px / 2px; the thicker ring is Jax's call (D-014). Change the ring in `defaultTheme.ts` only.

## D-033: Type scale named by pixel value; medium weight — decided, 2026-10-14

The semantic font sizes are named by their pixel value (`--font-size-12`, 14, 16, 20, 24, 28, 32, 36, 40, 48, 56) instead of t-shirt names. T-shirt names (xs to 5xl) had no room for the 28 and 36 steps the card titles need, and "xl-plus" was a hack; a numeric name stays true when a step is added, and the semantic meaning already lives in the type styles (heading-lg, body-md, ...). Primitives were already numeric; spacing and radius keep their t-shirt scales. About 7 direct uses were renamed. `--font-weight-medium` (500, Manrope 500 was already loaded) is used for card paragraphs, since 400 read thin on a tinted ground.

## D-034: Pretty text wrapping site-wide — decided, 2026-10-14

`text-wrap: pretty` is set on `body` and inherited; elements with `balance` (card titles, the footer description) keep it. It does not stop a break at a hyphen, so hyphenated words that must stay whole in headings use a non-breaking hyphen (U+2011): "multi‑brand", "self‑serve".

## D-035: White text on dark — decided, 2026-10-14

In dark mode `content.emphasis` and `content.on-accent` are white at 98% opacity (`white-alpha-98`, a new primitive), so large white type is a little less harsh. New `content.soft` (light slate-900, dark white at 80%, `white-alpha-80`) is the body copy on the card and footer grounds, replacing a purple tint; the accent footer remaps it to full `on-accent`. The footer and TextLink icons now keep `fill: currentcolor` on hover: the legacy global `a:hover svg` rule was setting a fixed dark purple fill, which showed on the dark ground (D-031 has the same override for the card link).

Audit (2026-10-14): the remaining full whites on dark were the focus ring (now `white-alpha-98`) and the legacy `--color-white` (#FFF) used by the old palette mixins, button text and Resume card fills; in dark it now resolves to `content-emphasis` (98%). The browser's own white (cursor edge, image backgrounds, the white screenshots in cards) is unchanged.

## D-036: Home is out of the legacy styling — decided, 2026-10-14

An audit of the CSS rules matching Home found legacy styling still reaching it. Now: (1) `body` takes its default color, font and line height from tokens (`content-default`, `font-family-body`, `font-line-height-default`) instead of `--color-dark` and `--line-height-300`. (2) `Layout` is a CSS module using the same width expression as the header and footer (`--size-layout-popout-max` plus 2 x `--size-space-2xl`), not the legacy SCSS `site` map. (3) Layout has a `legacy` prop (default true) that adds a `.legacy` class on its root; the old global `a` link rules (`Link.module.scss`) and the dark-mode TEMP white-text rule (D-027) are scoped under `.legacy`, so Home (`legacy={false}`) no longer receives them, and each page migrated later just sets the prop and, when the last one is done, the rules are deleted. (4) The global `html, body { overflow-x: hidden }` is removed: there is no horizontal overflow on Home, About, Resume, ActBlue or the 404 at 375 or 1280, and it hid overflow bugs and breaks sticky. Not touched: the `:root` legacy palette variables (no Home element uses them), the margin reset, and the 404 page, which does not use Layout.

## D-037: One icon set, and the 404 button — decided, 2026-10-14

Every UI icon is Phosphor bold now (D-026). The remaining hand-drawn icons that were still referenced were swapped for Phosphor equivalents: `cat`, `controller` (game-controller) and `paw` (paw-print) for the About image fallbacks, `download` (download-simple) for the Resume button and `image` for the default `Image` fallback. Unused hand-drawn files (`ai`, `automation`, `clouds`, `component`, `dog`, `file`, `pencil-ruler`, `person`) were deleted, and an unknown icon name falls back to the image glyph. Left alone on purpose: the hero's pointer and selection handles (CSS art), the favicon, and the Resume page's company logos (brand marks, not UI icons). The emoji are gone too: case study and "more of my work" section titles, the About bullets and the Resume byline's unicorn (the `titleEmoji` and `emoji` fields were removed). The 404 button's arrow had drifted high because the global `a` rule that centered it is scoped to `.legacy` pages since D-036; the legacy `.button` now carries its own `align-items`, gap and font family. The 404 no longer uses the legacy `Link` or SCSS at all: `NotFound.module.css` and a router link use only tokens (space, radius, type, color, focus ring), with no fixed values besides two media-query breakpoints and the derived display size.

Revised (D-038, 2026-10-14): the 404 has its own ground token, `surface.error` (indigo-900 in light, indigo-800 in dark), instead of sharing `surface.accent` with the footer, so it is a theme pair of its own and distinct from the page surface (white / night-900). The button is inverted (`content-on-accent` fill, `surface-error` text, pale hover and pressed steps from the on-accent tokens), because a container color can't read on it: secondary-container is indigo-800, the same as the dark ground.


## D-039: Cards stay side-by-side on tablet — decided, 2026-10-14

Below 900px the horizontal card used to fall back to the phone stack, which at 768 gave 720 x 523 cards with a large empty band. Now everything above phones (641px) stays side-by-side: text takes 55% of the card and the preview the rest, the title stays at heading-lg (about 27px at 768), and the fixed 548px text column and 36px title return from 900px. Below 800px the short link label ("Read the case study") is used so the link never wraps in the narrower column. Phones (640px and below) keep the stack (D-028, D-031). Checked at 641, 700, 768, 801 and 1280, light and dark: no overflow, link on one line, cards 340 to 390px tall.

Phone preview: the screenshot window starts at the top of the preview area (16px higher, 200px instead of 184px visible), card height unchanged.
Phone card: the gap between link and screenshot is 32px (content bottom padding 3xl instead of 4xl), so the card is 8px shorter.

## D-040: About page on tokens and the 960 column — decided, 2026-10-14

About is a CSS module on tokens with `legacy={false}`, in one column on the 960 grid. The story is held to 40rem (about 70 characters) and left-aligned on the header's edge. The "Label: sentence" paragraphs under Approach to Work get the label as its own bold line (copy unchanged; the component splits at the first colon). Pretty wrapping on. Copy edits (a possibly missing word in paragraph 1, adding an outcome) are held for a separate pass. The shared `Image` fallback styles are untouched until the case study slice. Revised by D-041: the two-column layout was dropped.

## D-041: About hero carries over the Home marks — decided, 2026-10-14

The hero is "About" plus "me" inside the Home header's design-tool selection box and pointer, with the four facts as code-style chips: Roboto Mono, one container palette each (the same four as the Home cards), and a blinking caret after the last one. The marks moved from the Header into a shared `HeroMarks` component (`DesignSelection`, `Caret`), so Home and About use one source. Title is the 56px step from 900px (title-md below). About uses the quiet footer like Home (D-024). The pet photos are rounded squares with the card corner (`radius-lg`), 3-up on all widths, including the fallback icon.

## D-042: About refinements — decided, 2026-10-14

(1) The "me" selection's pointer drags the top-right handle (`corner="top-right"` on `DesignSelection`; the box grows up and to the right), so it differs from Home's bottom-right. (2) Chips use the I-beam cursor, like the "build" chip on Home. (3) The chip caret takes the chip's text color (`--caret-color`, defaulting to primary). (4) New token `content.prose`: true black in light, the usual purple-50 in dark, for long-form reading text; used by the About body. (5) Heading steps on About: h2 are heading-lg (24 to 32px), and the "Label: sentence" groups are real h3s at heading-sm (16 to 20px), so the secondary headings clearly outrank the tertiary ones and the page has a proper h1, h2, h3 outline.

About photo 1 is Midna napping on the couch, cropped in about 30% from the full frame (900px JPG, square crop). The earlier lavender cutout and the portrait were tried and dropped. Photo 3 is a new Beau portrait (looking at the camera, black collar with a tree charm). Photo 4 is Zelda sitting on a gray-blue blanket, glancing to the side, cropped in about 30% on her head and shoulders (same loose lightness and saturation match as the others). The dog photo (Kirby in a pink bandana, smiling up) replaced the couch-and-controller one and moved first, so the row reads Kirby, Beau, Midna, Zelda (pose and tone alternate, and the two straight-on portraits are split); the screen-reader intro lists them in that order.

About shows four pets: Zelda (the black cat) is added as the fourth photo (cropped to a square on her face, original background), so the screen-reader note that she was "not pictured" is removed. The row is 2 x 2 on phones and 4 across from 641px, and sits outside the 40rem story column so it spans the full 960 grid. TODO(jax): a one-line personality note for Zelda like the other three have.

The four About photos are loosely matched: each was moved halfway toward the group average lightness and saturation (gamma on L, a saturation scale), so the black cat is lifted and the bright dog and gray cat are eased. Originals are not kept in the repo; re-crop from the source photos if a change is needed.

## D-043: Pet photos get name tags and captions — decided, 2026-10-14

Each About photo is a `figure` with a Figma-style cursor and name label (`CursorTag` in `HeroMarks`) at its bottom-right, in the saturated pair of one palette (primary, secondary, tertiary, quaternary in photo order), and a one-line caption under it. The names are always visible, so nothing depends on hover. The alt text now only describes the photo; the personality lines moved to the captions so sighted visitors see them. The tag is aria-hidden because the alt text already names the pet. Hover (pointer devices only) eases the photo in 4% and nudges the tag up and left; reduced motion turns it off. Captions are Jax's flavor text (Kirby: sweet and cuddly boy; Beau: menace to society; Midna: thinking evil thoughts; Zelda: having zero thoughts), edited in `images.ts`. The tags all sit in the same spot, 4px in from the bottom-right corner of each photo. Also added the `*.jpg` module declaration to `global.d.ts`.

About, tablet and phone: the space between the photos and the footer is 48px below 900px (64px on desktop), and the captions under the photos are hidden at 640px and below, leaving the name tags (the alt text still names and describes each pet).

## D-044: About copy pass, round one — decided, 2026-10-16

Applied: intro paragraph 1 (the how: design tokens and automation, token systems for multi-brand products, Figma-to-code pipelines, plus the original background list), paragraph 2 (now at Spectrum on the ecommerce design system; Toyota as the most recent role with the most impact), Approach lines 3a and 3b lightly edited and 3c unchanged, and the page title and description (no location, no "open to remote"; the footer keeps that line since Jax is still looking). Spectrum is named publicly. No "it's not X, it's Y" constructions (rule in CLAUDE.md). Open: an earlier-roles paragraph (ServiceNow, Indeed, ActBlue, Visa; Visa is old, ActBlue is missing from About), one scale number for the Toyota token work, and the fourth chip ("Cross-functional collaboration").

## D-045: Page meta rewritten, one title pattern — decided, 2026-10-16

Titles are "topic | Jax Engel" everywhere (Home and About add the role). Descriptions reuse each case study card's claim in new words; ActBlue says "an estimated $1.5M a year" to match the card. Resume's title and description were still coming from the old `Work/resources/meta.ts` ("remote staff product designer at ServiceNow"); Resume now imports its own `Resume/resources/meta.ts` (11+ years, design systems, token automation, accessibility, enterprise UX) and the Work file is deleted. "Open to remote roles." is removed from the Home and `index.html` descriptions (it stays in the footer). The About fourth chip is "Design-to-code automation". Toyota's meta waits for its page: "Toyota Design Token System Case Study | Jax Engel" and "Led token architecture and Figma-to-code automation for Toyota's PRIME design system across a multi-brand product ecosystem."

About intro paragraph 3 (D-044 follow-up): "Earlier work includes AI-assisted survey analysis at ServiceNow, an accessible, rebranded design system at Indeed, and a self-serve Salesforce integration at ActBlue." Each company name links to its case study (TextLink, with a visually hidden "case study" so the link names are unambiguous). Visa is left out on purpose (old, no case study, still on the resume); Spectrum is named in paragraph 2.


## D-046: Case study template on tokens — decided, 2026-10-16

Study pages (`StudyTemplate`, `HeaderSection`, `StudySection`, `StudyImage`, `NextStudy`) are plain CSS modules on tokens with `legacy={false}`; their SCSS is deleted. One column on the 960 grid: text holds a 40rem measure (D-040), images run the full column with the card corner (`radius-lg`; `corners: 'square'` keeps no radius), captions are soft body-sm, centered. Header: the one h1 at the About title step, role and date as a soft line, chips in the About code style (Roboto Mono, container palette, no caret), a hairline, then the intro and hero image. The dotted Divider is gone from studies. Sections: h2 at heading-lg, `content-prose` text, 48px between sections (32px on phones). "More of my work" is an h2 above a hairline, with two cards (h3) side by side above 900px and stacked below (revised by D-048: back to stacking at 900px and below). `StudyImage` is a plain `figure` and `img` (no fallback icon). The shared legacy `Chip`, `ChipGroup`, `Divider`, `DateRange` and `Image` stay for Resume.

Checked at 375, 768 and 1280, light and dark: one h1, no horizontal overflow. Left for slice 4: content (Toyota page, ServiceNow Outcomes) and the Figma versions' richer sections (Deliverables, Opportunities). Resume still needs the global `.legacy` rules and the D-027 TEMP rule, so they stay.

## D-047: Indeed copy from Figma, first pass — decided, 2026-10-16

The Indeed page now carries the copy from Figma `2853:27124` (intro with 100+ designers and WCAG, Context, three labeled Contributions, Outcomes, Deliverables, a new Opportunities section, the two image captions, "Remote" in the role line), to be revised later with Jax. Lightly edited to follow the copy rules: "Rather than", "Instead of" and "Rather than relying" were dropped, the intro's last sentence was split, the Outcomes ending reads "while keeping the system consistent". Chips are B2C, PeopleTech, Design Systems, Accessibility. New template support: `items` on a section (labeled paragraphs, label is an h3 at heading-sm like About) and `location` in `roleDetails`. The 100+ designers, WCAG and multi-brand token claims are confirmed by Jax (D-048). ActBlue and ServiceNow still use their earlier copy.

## D-048: Study card hover and bottom alignment — decided, 2026-10-16

The link underline's transform origin no longer swaps between right (resting) and left (hover): the swap made the line jump when the pointer re-entered mid-transition. It now grows in from the left and retracts back to the left, and can be interrupted smoothly. Stacked cards (the "More of my work" row) are now flex columns whose text area fills the card and whose link sits at the bottom (`margin-top: auto`), above the preview, so the link and the image line up across cards whatever the title wraps to. Horizontal Home cards are unchanged. The "More of my work" row stacks at tablet (900px and below), side by side only above 900px. D-046's claims in Indeed's copy (100+ designers, WCAG, multi-brand tokens) are confirmed by Jax (2026-10-16).

Revised (2026-10-16): the same fix applies to every grow-from-the-left underline: nav links, brand, footer email and icon links, the mode toggle and the card link all keep `transform-origin: left center` at rest and on hover, so repeated hovering no longer jumps.

## D-049: One footer on every page — decided, 2026-10-16

The quiet and accent footer variants are merged (supersedes D-024's two variants). Every page has the same footer: the page ground, a 2px hairline (`--size-border-width-default`) across the content column, 104px above the content (section-lg plus 40px) and 80px below (section-xl). In dark mode it sits on a band, the page ground mixed 20% toward `secondary-container` (about 0.25 lightness against 0.34 for the cards, so it never matches a card above it), with the on-accent text tokens and no hairline. Home passes `footerBand={false}` and keeps the plain ground and hairline in dark. The mix lives in `Footer.module.css`, no new tokens. Tried and dropped: a solid indigo footer (matched the ServiceNow card), per-palette grounds (too loud), the sunken surface in light (looked sickly next to the pastel cards). All hairlines are 2px: the study header rule, the line above "More of my work", the footer, and the mobile nav divider. The legacy Divider on Resume is untouched until that joint pass. The 404 keeps its own ground (D-038).

## D-050: Indeed images from Figma — decided, 2026-10-16

The three Indeed images follow Figma `2853:27124`. (1) Header image: `variant: 'banner'`, a 3:1 crop of the top of the image from 641px up, natural 16:9 on phones. (2) Context image: `variant: 'frame'`, the documentation pages in a `surface-sunken` box with 32px at the top and sides, cropped at 300px tall by the box's bottom edge. (3) Before / after: a new `StudyCompare` component (`compare` on a section): two columns, "Before" on `surface-sunken`, "After" on `secondary-container`, each shot at 1200:740 with a text label on its bottom-right corner, its own alt text, stacked on phones. The baked-in grey and blue backgrounds are gone, so all three follow dark mode. Images were re-exported at 1600px wide as JPEG at quality 80 (about 1MB in total, the old 1000px PNGs were 0.2MB): `accessibility-annotations`, `documentation-sample`, `indeed-before`, `indeed-after` in `Indeed/images`; the composite `home-before-after-min.png` and the old PNGs were removed. The "After" shot is the whole tall capture (1600 x 1895), cropped from the top by the layout (an earlier export cropped from the middle and lost the Indeed header). ActBlue and ServiceNow images still use the old treatment.

## D-051: Case study text column is centered — decided, 2026-10-17

The reading column (40rem) is centered in the 960 column on study pages: the h1, role line, chips, hairline, intro, section titles and section text all share it, left-aligned inside. The hero image, section images, the before / after pair and the "More of my work" row keep the full 960. Centered text was rejected (ragged both sides is harder to read). This differs from About, which keeps its story left-aligned on the header's edge (D-040); TODO(jax): decide whether About should follow. The header hairline is now 40rem wide, matching the column.

## D-052: Study h1 takes its card's color — decided, 2026-10-17

The h1 on a study page uses the color of that study's card title: the palette's `on-container` in light (Indeed sky, ServiceNow indigo, ActBlue teal, Toyota brand purple), white (`content-emphasis`) in dark, like the cards (D-028). The chips use the same palette (container fill, on-container text, white text in dark), ignoring each chip's own `theme`. `studyPalette(linkUrl)` in `StudyCardGrid` reads the palette from the card list, so a new study only needs its card.

## D-053: 40px above and below every study image — decided, 2026-10-17

Every image on a study page (the hero, section images, the before / after pair) has 40px above and 40px below it, at every width. The spacing is the image's own `margin-block` (`--size-space-4xl`), so the gaps around it do not add to it: the header, the page and the sections no longer use a flex `gap`. Sections that do not end with an image are still 48px apart (40px on phones); a section that ends with an image adds nothing before the next one, and "More of my work" adds nothing after an image (it keeps 64px, 48px on phones, after text). A header without a hero image gets its own gap before the first section.

## D-054: Context panels, 16px radius, caption width — decided, 2026-10-17

(1) The Indeed Context image is now three page crops (Button, Accessibility, Localization) side by side in a sunken box that is the copy's width (40rem), 300px tall, with 32px padding at the top and sides, none at the bottom, so the pages are top aligned and clipped by the bottom edge (phones: 220px tall, 16px padding). The new `StudyPanels` component (`panels` on a section) cuts the pages out of one source image with percentages, so one file stays sharp for all three; each panel has its own alt text. This replaces the 960px `frame` variant, which was removed. (2) Image containers on studies have a 16px radius (`radius-lg`): the banner, the panels box, the before / after pair and now its inner shots (they were 8px). The pages inside the panels keep 4px top corners. (3) Captions are held to the copy's 40rem column, centered, for every image, including the 960px ones.

Revised (2026-10-17): the hairline under the study chips was removed (the chips lead straight into the intro). D-046 and D-049's list of 2px hairlines no longer include it; the footer and the line above "More of my work" remain.

Revised (2026-10-17): 40px between the study header (h1, role line, chips) and the intro paragraph, at every width (it was 24px, 20px on phones).

## D-055: Label h3s are bold — decided, 2026-10-17

The "Label: sentence" h3s on About (the Approach to Work labels) and on case studies (Contributions, Opportunities items) use `--font-weight-emphasis` (bold, 700) instead of the heading-sm weight (Black, 900). Size and line height still come from heading-sm. The card titles (h2 on Home, h3 under a study) keep their own weights.

## D-056: About and study h2s are black — decided, 2026-10-17

The h2s on About ("Approach to Work", "Personal Life") and on case studies (section titles and "More of my work") use `content.prose`: true black in light, the usual purple-50 in dark (D-042), the same token as the body text. They were `content.emphasis` (dark purple). The h1s, the label h3s and the footer heading are unchanged.

## D-057: 12px under h2s — decided, 2026-10-17

The space between an h2 and what follows is 12px on case studies (section titles, "More of my work") and on About (it was 24px). On About it is the section's 24px gap with a -12px margin on the element after the h2; on studies the `copy` and "More of my work" containers use a 12px gap. The label h3s keep their 4px gap to their sentence.

## D-058: Indeed hero and last image swapped — decided, 2026-10-17

On Indeed the before / after pair is now the hero image under the header and the accessibility annotations banner sits in Outcomes. The study header accepts `compare` (a before / after pair) in place of `image`, and `image` is optional. Resolved: both captions were reworded in D-072 and the Outcomes copy was settled in D-061 and D-075.

## D-059: Indeed copy pass, round two — decided, 2026-10-17

After the critique: (1) a subtitle line under the h1, "Scaling a design system through a rebrand" (the card's title); the header takes an optional `subtitle` in body-lg. (2) The intro describes the role as building and documenting components ("I built and documented components and token workflows ... used by 100+ designers. My focus was embedding WCAG accessibility standards ..."); "architected", "production-ready" and "unifying cross-functional adoption" are gone. (3) Captions: "Images obtained online." and "Higher quality image unavailable." removed; the panels caption describes the Button documentation pages. (4) Buzzwords out: "bring systematic clarity", "significantly" (twice), "true engineering efficiency", "enabled" became "helped". (5) Deliverables is one sentence listing the artifacts, not bullets. (6) The Opportunities opener is "Looking back at this 2020 project, I would change two things:". Left out on purpose: the length of the engagement and the team size (Jax would rather not draw attention to them, and the size is unconfirmed), and any numbers (none are available). The date shows "2020" only. Resolved: the Context line on the ICL, IDS and the rebrand was approved in D-061.

Revised (2026-10-17, D-059): the subtitle under the h1 was removed (three stacked lines read as messy; the `subtitle` field stays available in the header). Corrected facts: the Indeed Component Library (ICL) was replaced by a new Indeed Design System (IDS), so the Context says that and "Evolving Component Architecture" became "Building the Component Library"; the rebrand began when Jax joined. Resolved: the card title and meta were reworded in D-061 and D-075.

## D-060: Indeed copy pass, round three (facts from Jax) — decided, 2026-10-17

Drafted from Jax's recollections only. Added: a fuller Context (Indeed.com owned by separate teams, mobile apps with their own splits, no cohesive system, a hybrid desktop and mobile responsive goal, the ICL replaced by IDS during the rebrand) and a new Localization section (Japan, Germany and the US plus Arabic and Hebrew, label length, fixed and content widths, RTL, swapped order and mirrored icons, all visible in the Button / Localization documentation pages). Removed because tokens were too new in 2020 (Jax): "token workflows", "aligned token structures with production code", "unify multi-brand token structures", "restructure our token system". The Opportunities token item now says tokens were a new idea in 2020. The earlier confirmation of the "multi-brand token" claim (D-048) is superseded. Resolved: the card and meta were reworded (D-061, D-075) and the images stay where they are (D-061).

## D-061: Indeed copy pass, round four (reviewed section by section with Jax) — decided, 2026-10-17

Revised one section at a time with Jax, using the copy-check skill and the copywriting-kit diagnosis. Kept "enterprise" in the intro (Indeed is enterprise scale). The intro now says Jax applied WCAG standards to the components (a collaborative effort, no mention of who set them). Context: one short sentence per group (consumer side, employer side where hiring managers connect with candidates and set up job posts, the separate mobile app), then the brand refresh, the Sketch-based ICL, the Figma-built IDS and the hybrid, responsive goal. Contributions: "Building the Component Library" (general-purpose components, aimed at the hybrid, responsive goal), a new "Documenting Components" item (usage, accessibility and localization, with the Button page as the example) and "Team Support & Enablement" (shares Figma, design systems and accessibility expertise with other designers, contributes to onboarding). "Establishing Contribution Pathways" was removed: Jax supported that effort and did not run it. Localization: the three markets and languages, RTL languages including Arabic and Hebrew, and RTL design guidelines Jax developed. Outcomes keeps the original mentions but frames them as collaboration with engineering and design teams. Deliverables is five scannable bullets (library, per-component docs, WCAG standards applied with other teams, localization and RTL guidelines, support for other designers). Opportunities: the team had not adopted design tokens and used basic variables only in 2020 (replaces the false "tokens were a new idea" claim, D-060). The Home card title is "Documenting a global design system" (Jax's wording, 4 words, an exception to the 5 to 8 word guide) and its outcome names the components, accessibility, localization and the 100+ designers; the page meta description matches. Images stay where they are (Jax's call). Tried and dropped for the card title: titles starting with "Building", "Scaling" and noun phrases, and "100+ designers" in the title. Supersedes the "scaling" card and meta wording from D-028 and D-045.

## D-062: "More of my work" heading left-aligned, 40px card gap — decided, 2026-10-19

The h2 sits on the left edge of the cards instead of the centered 40rem column, and the two study cards are 40px apart (was 16px) on desktop. Stacked layout at 900px and below is unchanged. Supersedes the heading alignment in D-051 for this row.

## D-063: Study cards: 16px less under the link — decided, 2026-10-19

Cards under a case study (`variant="study"`) have 24px under the link (16px on phones), down from 40 (32). Home cards keep 40 (32).

## D-064: "More of my work" heading: 20px above the cards — decided, 2026-10-19

The gap under this h2 is 20px (8px more than the 12px in D-057), because the cards are large blocks and need more air than body text.

## D-065: "More of my work" spacing — decided, 2026-10-19

56px between the hairline and the heading (was 48), 32px between the two cards (was 40, revises D-062).

## D-066: Study text column left-aligned — decided, 2026-10-19

The 40rem reading column (h1, role, chips, intro, h2s, h3s, text, captions, the panels box) sits on the left edge of the 960 column instead of centered, so it shares one left edge with the header logo, the cards and the footer. Images keep their widths. Supersedes the centering in D-051.

## D-067: ActBlue copy, reviewed with Jax — decided, 2026-10-19

Sections: Context, Contributions, Outcomes, Deliverables, new Opportunities. The Figma frame's invented claims were left out (80% fewer dropdowns, "thousands of campaigns", WCAG-compliant, Slack and AI-mapping Opportunities). Added from Jax: role is Remote, a short ActBlue and users introduction (teams of one to presidential campaigns), the existing Blueprint design system (used and contributed to), Figma prototypes and CSS samples, close work with the product and engineering managers, FigJam workshops built together, and Jax's was the first design work on the team. Contributions are five labeled items. Opportunities are Jax's four: per-integration analytics, design iteration (Connected chip, image), notification history (moved to a future state), a clear path to help. The $1.5M estimate and the "sharp drop" in setup issues stay as before (confirmed). Opportunities are written from Jax's notes in the page voice, not his exact wording. The Design Iteration item says only that the Connected status is visually subtle (the logo point was cut by Jax).

## D-068: ActBlue images from Figma — decided, 2026-10-19

Figma `2860:33875` order: the hero is a before / after pair (old staff-only notifications screen, redesigned Salesforce page), then the FigJam board (Context), the annotated full flow (Contributions) and three final screens (Outcomes, one composite image). Exported from the frame's image fills as JPEG (`*-min.jpg`, quality 80, at most 1600px wide, the tall "before" cropped to 1600 x 1895). The five old PNGs are removed, including `responsive-specs`, which the Figma frame hides. The three final screens are one image, not `StudyPanels`: the source crops are landscape and the panels box is a fixed 300px, which left empty space.

## D-069: The study palette tints the whole page — decided, 2026-10-19

`StudyTemplate` sets `--study-container`, `--study-on-container` and `--study-heading` on the page from the study's card palette (`pal-<name>`). They drive the h1, the chips, the label h3s (on-container in light, white in dark), the text selection color, the "After" side of a before / after pair and the new spread box. This replaces the per-palette classes in `HeaderSection` (it no longer takes a `palette` prop). Before / after follows Figma ActBlue: "Before" on the sunken surface, "After" on the study tint (Indeed's "After" is now its tertiary sky tint, was secondary). Spread: `panels.framed` on a section renders `StudyPanels` full width on the study tint with 32px padding on every side, 24px between panels and the 4px panel corner (Figma `2858:28022`, whose blue fill is replaced by the tint); phones use 16px padding and 12px gaps. ActBlue's three final screens use it, cropped at 700 x 559 each. ActBlue copy: the Opportunities lead-in names time and a targeted MVP as the constraints; terms made consistent ("flow", "documentation"); "Salesforce logo" replaces "illustration".

## D-070: Study headings keep the palette tint in dark — decided, 2026-10-19

The h1, label h3s and chip text on a study page use the palette's `on-container` in dark too (a pale tint such as teal-100), not white. Supersedes the white h1 and chip text for studies in D-052 and D-069. Home cards keep their white titles (D-028).

## D-071: Captions are as wide as their image — decided, 2026-10-19

Study captions (banner and full images, the before / after pair, the spread) run the width of their image instead of the 40rem column. The 40rem panels box already had a matching caption. Supersedes the caption width in D-054. The FigJam image on ActBlue stays as the full board (Jax's call).

## D-072: ActBlue and Indeed labels and captions aligned — decided, 2026-10-19

After comparing the two studies: Contributions labels are gerund phrases on both ("Designing Integration Flows", "Building Setup & Feedback Patterns", "Collaborating with Product & Engineering"; Indeed's "Team Support & Enablement" became "Supporting Team Adoption"). ActBlue's five contributions are three (design system folds into the patterns item, handoff into collaboration). Opportunities labels are plain noun phrases with "&" like the rest ("Token Architecture & Automation", "Clear Path to Help"). Indeed's two captions describe the image instead of starting with "Comparison" and "Collaborated".

## D-073: Team structure stated on ActBlue and Indeed — decided, 2026-10-19

From Jax: on ActBlue he was the sole designer, embedded with product and engineering (second intro paragraph). Indeed's design system was central and owned by the design org (a Context sentence). No team sizes, per D-059.

## D-074: Indeed team size stated, ActBlue "first design work" cut — decided, 2026-10-19

Jax gave the Indeed team shape himself: one of three designers on the design system team, with a lead and a junior designer. This revises D-059's choice to leave team size out (now stated, no engagement length). On ActBlue the sentence "Mine was the first design work on the team…" is cut (Jax: it read oddly). The sole-designer line in the intro carries the point.

## D-075: Indeed opens with the problem, 20 components — decided, 2026-10-19

The Indeed intro is now two paragraphs like ActBlue's: the problem (no cohesive design system, inconsistent deliverables), then Jax's role. Context starts with a one-line description of Indeed (a job search platform connecting job seekers and employers), then the split teams, then the brand refresh, ICL to IDS, central ownership and the team. The problem sentence left Context. Outcomes opens with "I shipped 20 components, each designed, documented and handed off to engineering" (from Jax). The Home card outcome and page meta carry the 20. No other concrete data exists for Indeed, so the card title stays activity-led ("Documenting a global design system").

## D-076: Final pass on ActBlue and Indeed — decided, 2026-10-19

ActBlue Outcomes is two paragraphs (access and setup time, then support impact, savings and reuse), matching Indeed. Indeed's second Deliverables bullet covers usage, accessibility and localization (it repeated "usage and when to use it"). No open facts remain: the 20 components are Indeed's outcome (Jax has nothing further to add), and the ActBlue Design Iteration item is settled.

## D-077: ServiceNow copy, reviewed with Jax — decided, 2026-10-19

Sections: Context, Contributions, Outcomes, Deliverables, Opportunities. Role line: Staff UI/UX Engineer, Remote, 2024 to 2025 (Figma's dates, Jax's title). The intro opens with the problem (thousands of responses, 10+ hours per 100), then Jax's role: sole designer, short and targeted engagement, joined after the first prototype. Context opens with the company line, then Jax's main role on Oolong (the employee intranet design system, drawn from Horizon, one of two designers), then the tool as a separate internal research asset whose first prototype a non-developer researcher built with AI. The 95% accuracy, 10+ hours and "in minutes" (card title) claims are confirmed by Jax. The tool's name (ThemeWeaver) stays out of the copy. Contributions: three labeled gerund items. Outcomes: leadership reviewed the designs and defined the roadmap, more enhancements were planned, Jax designed draft features, and early testing showed users did not understand the tool and that Hybrid (user-confirmed themes) was most accurate, with testing before and after the redesign. Figma's invented claims were left out (senior leadership demos, WCAG compliance, AI confidence ratings, "production-ready"). Opportunities: AI suggestions upfront and live feedback on results; the platform item was cut because replacing the prototype was already planned. The Home card outcome and meta describe the work as shaping the experience of the tool, since "replacing" manual work overstated the design's role.

## D-078: ServiceNow images and two template additions — decided, 2026-10-19

Images follow Figma `2860:34444`, exported as JPEG (`*-min.jpg`, quality 80, at most 1600px wide): a hero spread of three screen widths, the journey map (cropped as in Figma), the four-step screen grid, a before / after pair and the Figma board. The old PNGs are removed. Template additions: (1) the study header accepts `panels` (the framed spread) in place of `image` or `compare`; each panel takes an optional `weight` (flex share), so three screens of different widths keep equal heights (weights 4, 2, 1 in proportion to each slice's width over height). (2) `compare` takes an optional `aspectRatio` for its two shots (default 1200 / 740), since the strategy screens are nearly square. Types `StudyPanelsData` and `StudyCompareData` are shared by the header and the sections.

Revised (2026-10-19, D-077): Jax's own edits to the intro and Context are in. Context now introduces Oolong (the intranet design system, no Horizon or team size), says the project began as a Digital Technology group effort, that the prototype had been through a round of testing, and that users were unsure how to use the tool and how it differed from uploading a CSV to the company's internal ChatGPT. The "great results" wording became "promising". Outcomes keeps only the Hybrid finding and the before and after testing, since Context now carries the confusion.
Contributions are now Simplifying the Core Flow (flow mapping and interaction, merged from two overlapping items), Designing Responsive Screens (low-fidelity to high-fidelity with Oolong, annotated responsive layouts) and Partnering on Implementation (designs implemented in the prototype, tested, and the feedback fed into the next round).

Revised (2026-10-19, D-077 and D-078): the before / after pair is the ServiceNow hero and the responsive spread moved to Outcomes. Outcomes now says the prototype had no clear path or end point, the redesign adds a five-step progress bar, weights the main action above the rest, explains each strategy (Hybrid recommended) and shows full question names, testing showed users understood and liked the tool, and leadership approved future work and assigned more resources. Nothing is claimed about what happened after Jax's engagement ended (he does not know). The earlier "testing before and after" and "built into the prototype" lines are gone.

Revised (2026-10-19, D-077): Jax's facts on coding. A theme is a predefined category assigned to individual responses and assigning them is coding. Researchers define themes and the AI could suggest a starting set. In the Hybrid strategy researchers are recommended to code about 10% of their responses (100 of 1,000) and the AI codes the rest at an estimated 95% accuracy, against an estimated 70% for AI-only. The 95% belongs to Hybrid, not to the AI's theme suggestions. Oolong is introduced because every internal tool uses it. The page mentions testing twice (the early prototype test in Context, the redesign test in Outcomes). Testing showed users understood the tool, saw how it differs from general chat tools and liked it. Opportunities: AI suggests a starting set of themes, and researcher corrections teach the AI.

Revised (2026-10-19, D-078): the four-step screen grid is removed from Contributions (and its file), and the Outcomes line about the main action and full question names is cut.

Revised (2026-10-19, D-077): cut "question our assumptions" (no assumption could be named) and "the Digital Technology group" (unexplained) after the judge and proof checks.

Revised (2026-10-19, D-077): the Home card outcome and the page meta now say the tool "codes" open-ended responses into themes and that coding by hand took 10+ hours per 100 responses (the earlier wording said "groups" them). The two long alt texts are split into shorter sentences.

## D-079: Study chips use the full column — decided, 2026-10-19

The chips on a study header are no longer held to the 40rem reading column. The text (title block and intro paragraphs) keeps 40rem, left-aligned (D-066), and the chip row runs the 960 column and wraps only when the screen is too narrow (about 755px of chips on ServiceNow's five, so it wraps below roughly 800px). Before, the row was `nowrap` inside 40rem, so a fifth chip overflowed the column. Supersedes the chip width in D-051 and D-066. ServiceNow also gained an Internal Tools chip.

## D-080: Text selection in a card takes the card's palette — decided, 2026-10-19

Selecting text inside a study card (Home, and the "More of my work" row on a study page) uses that card's own palette: the hover background and hover text pair, so the highlight shows against the plain card face (the plain container would vanish into it). Before, Home cards used the site's violet selection and cards under a study took that study's tint. `.card.card ::selection` in `StudyCard.module.css` outweighs the study page's `.page ::selection` (D-069). A study page's own text (h1, copy, captions) still uses its palette. The footer on a study page still uses the site's violet selection.

## D-081: Highlighted phrase in study copy — decided, 2026-10-19

A phrase wrapped in `**double asterisks**` in a study section paragraph renders as bold text in the study's tint (the same `--study-heading` as the label h3s, so the palette's on-container color in light and dark). `StudySection` splits the text and wraps the phrase in a `strong`. First use: ServiceNow's Hybrid vs AI-only accuracy sentence. Use it sparingly, once or twice per study. Study header paragraphs do not parse it yet. Checked in the same pass (D-080): the footer keeps the site's violet selection on every study page.

## D-082: No focus ring on <main> — decided, 2026-10-19

`<main id="main-content" tabindex="-1">` is the skip link's target and takes focus when a reader clicks blank space, but it is not a control. Keyboard activation of the skip link makes it `:focus-visible`, which drew the browser's ring around the whole page. `Layout.module.css` now sets `outline: none` on `.main:focus` and `.main:focus-visible`. There is deliberately no global `*:focus, *:focus-visible { outline: none }`: every control draws its own ring through its component's `:focus-visible` rule (nav, brand, TextLink, mode toggle, footer icons, card, 404 button, skip link), and a global reset would risk removing them for keyboard users. Any other element that shows an unwanted ring should get its own rule here.

Highlight phrases (D-081): ActBlue's "Internal estimates put the savings at over $1.5 million per year in reduced support costs." and ServiceNow's "approved future work and assigned more resources to the tool" and the Hybrid versus AI-only accuracy sentence are the three in use.

Revised (2026-10-19, D-067): ActBlue's intro first sentence is split in two, "fully" is cut from the annotated flow, the flow caption reads "annotated for developers and used to support QA", the Opportunities lead-in says "add or change four things", and the three long alt texts are split into shorter sentences.

Revised (2026-10-19, D-067): the $1.5M saving is an estimate everywhere. The page no longer says "over" and now matches the Home card and meta ("an estimated $1.5M a year"). Jax confirmed the days or weeks to minutes setup claim and the reuse by other integrations and internal tools. The highlighted sentence in D-082's list reads "Internal estimates put the savings at $1.5 million per year in reduced support costs."

## D-085: Study header role line on phones, en dash in dates — decided, 2026-10-20

At 640px and below the role and place stay on one line and the date drops to its own line without the dot, so a wrapped line never ends or starts with a dot (it did on ActBlue at 375). The date never breaks across lines. DateRange uses an en dash (was an em dash), per Jax: dates take an en dash. The change also reaches Resume through the shared component.

## D-083: Toyota case study copy and page, reviewed with Jax — decided, 2026-10-21

The page is `/case-studies/toyota` (`Studies/pages/Toyota`), wired in `Studies.tsx`. The `ready` flag on the study cards is gone because every study now has a page, so Toyota shows under Home and in the "More of my work" row (ServiceNow and Indeed on its own page). Title "Toyota PRIME Token System" (the Home card keeps "Building a multi-brand token system"), role "Senior UX Engineer", "Plano, TX (Hybrid)", 2025–2026. Chips: Design Systems, Design Tokens, Automation, Multi-Brand ("Logistics" dropped, the supply chain org is only context). Facts from Jax: PRIME is a React system with 80+ components in production that served one organization, Supply Chain and Fulfillment (SCaFT and Toyota are supported today, Lexus is not yet). The token library was a separate project applied to PRIME and could serve React, Angular and Swift consumers. 680 primitive and theme tokens, 120 component tokens, 15 components mapped in Figma and 3 in development, 40 SCaFT product teams across 10 web apps expected to adopt (numbers from leadership), 5 designers, 12 epics and 200+ stories created in bulk with Python and AI. The CLI was finished and used to build the tokens. The handoff pipeline was designed and planned only, so it is worded "would" and listed as "designed and planned". Coded components were in progress and nothing is claimed about reduced manual work beyond "expected to reduce". "Single source of truth" appears once (Outcomes). The migration benefit of binding tokens is worded as expected. Opportunities: shifting priorities with slow or missing answers, and engineering prioritization with stakeholder turnover (neutral wording, a named engineering sponsor is Claude's suggestion that Jax accepted). Meta is the D-045 draft. The Home card outcome now cites the token counts instead of "single source of truth". The proposal strip (Context) and the ecosystem diagram (Contributions) are in. The Outcomes image is the Figma variables panel (no code screenshot exists any more). Still missing: the header banner and an optional Deliverables image.

Resolved (2026-10-24, Jax): the resume line "Supported 40+ product teams building on the React design system" is Jax's own claim and stays. Do not flag the 40 teams as "expected adopters" against the resume again. The case study wording above stays as written.


## D-084: Study image variant `column` — decided, 2026-10-21

`StudyImage` gets a third variant, `column`: the image and its caption are 40rem wide (the reading column) and left-aligned to the 960 edge. It is for a tall UI crop that would stretch and blur at 960px. First use: Toyota's Figma variables panel in Outcomes. Part of the parked `StudyMedia` rethink in docs/plan.md.

## D-086: Several images in one study section — decided, 2026-10-21

A section renders every image in its `image` array, in order (it rendered only the first). Images that follow each other are 40px apart. Toyota Outcomes shows the sprint board at the 640 column width and the Figma variables image is the hero (banner crop, Jax: text does not need to be readable). The sprint board stays the 800px image (Jax does not need it sharp).

## D-087: Resume PDF is built from HTML in `resume/` — decided, 2026-10-24

`resume/resume.html` and `resume.css` are the source, `resume/build.mjs` (puppeteer-core with the local Chrome, pdf-lib for author and title) writes a tagged, text-only, single-column Letter PDF in Arial. It has its own `package.json` so the site's dependencies stay untouched. Content is the current public PDF word for word, with separators changed to pipes and "Skills & Tools" shortened to "Skills" (standard ATS section name). The public PDF is not replaced until Jax says so. Round two (2026-10-24, Jax approved all seven proposals): headline "Staff Product Designer & Design Engineer", "Present", Toyota and ServiceNow bullets rebuilt from D-077 and D-083 facts (Toyota's 40 teams are expected adopters), ActBlue's $1.5M is "an estimated" figure (D-067), Indeed gets the localization and RTL documentation fact, a Case Studies section with the four study URLs, skills reordered (Python, design tokens added, SASS duplicate cut). Round three (2026-10-24): Toyota ends Sep 2026 and Spectrum (Senior Design Engineer, contract, remote, from `resume-slice` roles.ts) starts Sep 2026. Three bullets at most per role, no one or two word last lines (checked in the PDF text), Visa is one Senior UX Engineer entry (Nov 2017 – Feb 2020) with a "Promoted from UX Engineer" line (Nov 2015 – Nov 2017), Helvetica at 9.8pt, site purple and ink. The Toyota bullets lost the 40 teams (expected adopters) and the specification and Zeroheight bullet. The tighter v2 wording replaced the first version (2026-10-24): summary and bullets keep Jax's original wording plus added facts, Albertsons and Routable have one bullet each, skills are trimmed, GitHub is in the contact line. `resume/resume-ats.html` (`node build.mjs resume-ats`) is the same resume without title descriptors, "Contract" and "(Hybrid)", for strict parsers. Role titles are unchanged. Albertsons, Routable, FireHydrant and Visa are only reworded, no new metrics exist.

## D-088: Study card hover lift — decided, 2026-10-24

On devices that hover and without reduced motion, a study card rises 8px with a soft shadow and its screenshot grows 4 points wider inside its window, anchored top left (no shift, no transform scale, so the crop does not move). The arrow and link stay where they are (Jax: the arrow moving as well was too much at once). The tint change and the link underline stay. The shadow is a card-scoped custom property, `--card-shadow` (the palette color at 55 percent, black at 50 percent in dark), because the token system has no semantic shadow token yet. TODO(jax): add one if more components lift.

## D-089: Study h1 size and width — decided, 2026-10-24

The study h1 is 56px from 900px, 48px from 641px and 40px on phones (it was `title-md`, which stayed at 40px until about 2,800px). It matches the About hero and is 1.75 times the 32px h2s. The h1 may use the full 960 column. Role line, chips and the 40px gap under them are unchanged.

## D-090: Study chips: 16px more above — decided, 2026-10-24

The chips sit 40px under the role line (the 24px intro gap plus 16px). The 40px between the chips and the intro paragraph is unchanged.

## D-091: Study role line one step up, tight tracking on large headings — decided, 2026-10-24

The study role line is body-lg (it was body-md) so it holds beside the 56px title. Headings over 44px get `letter-spacing: var(--font-letter-spacing-compact)` (-0.02em, an existing token): the study h1 from 641px, the About hero from 900px and the 404 numeral. Home hero sentence uses `title-md`, which stays at 40px until very wide screens, so it is not included yet. Any new heading over 44px should use the same token.

## D-092: New pages open at the top — decided, 2026-10-24

`ScrollToTop` (mounted in App) scrolls to the top when the path changes, so a "More of my work" card opens the next study at its title and not at the footer. Back and forward keep the browser scroll position and a #hash link keeps its anchor. TODO(jax): move keyboard focus to the h1 on navigation if we want screen readers to announce the new page.

## D-093: Study role line wraps item by item; phone study cards 8px more under the link — decided, 2026-10-24

The role, place and date stay on one line whenever they fit and wrap one by one when they do not (replaces the always-stacked date on phones, D-085). Each item after the first carries its own dot, and the row is pulled left by the dot padding inside a clipped box, so a wrapped line never starts with a dot. Study cards under a case study have 24px under the link on phones (was 16, D-063). Home cards are unchanged.
