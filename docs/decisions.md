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

About photo 1 is Midna napping on the couch, cropped in about 30% from the full frame (900px JPG, square crop). The earlier lavender cutout and the portrait were tried and dropped. Photo 3 is a new Beau portrait (looking at the camera, black collar with a tree charm). Photo 4 is Zelda on the gray fleece blanket, looking at the camera. The dog photo (Kirby in a pink bandana, smiling up) replaced the couch-and-controller one and moved first, so the row reads Kirby, Beau, Midna, Zelda (pose and tone alternate, and the two straight-on portraits are split); the screen-reader intro lists them in that order.

About shows four pets: Zelda (the black cat) is added as the fourth photo (cropped to a square on her face, original background), so the screen-reader note that she was "not pictured" is removed. The row is 2 x 2 on phones and 4 across from 641px, and sits outside the 40rem story column so it spans the full 960 grid. TODO(jax): a one-line personality note for Zelda like the other three have.

The four About photos are loosely matched: each was moved halfway toward the group average lightness and saturation (gamma on L, a saturation scale), so the black cat is lifted and the bright dog and gray cat are eased. Originals are not kept in the repo; re-crop from the source photos if a change is needed.

## D-043: Pet photos get name tags and captions — decided, 2026-10-14

Each About photo is a `figure` with a Figma-style cursor and name label (`CursorTag` in `HeroMarks`) at its bottom-left, in the saturated pair of one palette (primary, secondary, tertiary, quaternary in photo order), and a one-line caption under it. The names are always visible, so nothing depends on hover. The alt text now only describes the photo; the personality lines moved to the captions so sighted visitors see them. The tag is aria-hidden because the alt text already names the pet. Hover (pointer devices only) eases the photo in 4% and nudges the tag up and left; reduced motion turns it off. Captions are Jax's flavor text (Kirby: sweet and cuddly boy; Beau: actual menace to society; Midna: thinking evil thoughts; Zelda: having zero thoughts at all), edited in `images.ts`. The tags sit in different spots per photo (bottom-left, bottom-right, top-left, top-right), each clear of the face. Also added the `*.jpg` module declaration to `global.d.ts`.
