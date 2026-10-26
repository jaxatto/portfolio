# Raw values still open

Scan on 2026-10-26: 82 declarations in `src/**/*.css` hold a literal length, color, duration or ratio outside `var(--token)`. The ones that stay, with reasons, are in D-141 of [decisions.md](decisions.md). This file lists only what is not yet decided. Each item has a proposed default, and "keep" means leave the literal and log it.

Re-run the scan (read each declaration, drop `var()` contents, flag numbers with units, hex and `oklch(`) after a token pass and update this list.

| Where | Value | Proposed default |
| --- | --- | --- |
| StudyCard | `--image-w` 112%, `+ 4%`, `min-height: 104%` | Keep. Part of the enlarged screenshot crop (D-028, D-111). |
| Resume Role | washes `14%` and `80%` of `--role-fg`, `gap: 2px` | Keep. One component, tuned on the gradient (D-124). |
| Resume | `translate(-4px, -4px)` | Keep. Offsets the portrait tag (D-135). |
| Image | `opacity: 40%` on the fallback icon | Keep. One use. |
| ModeToggle | `rotate(±60deg) scale(0.6)` | Keep. Icon swap motion, one use. |
| TextLink | `clamp(16px, 7.4vw - 9px, 32px)` | Keep. Fluid footer email size (D-014). |
| NotFound | `min-height: 100vh` | Keep. Full-height page ground. |
| Footer | `max-width: 40em`, `margin-inline-start: -7px` | Keep. Text measure and optical alignment. |
| Header | `padding-inline: 0.3em`, `font-size: 0.9em`, `max-width: 900px` | Keep. The ampersand and the header measure. |
| NameTag | `+ 2px` padding | Keep. D-105 records 6px by 10px as `space-xs` and `space-sm` plus 2px. |
| tone.css | `22%` decorative border mix | Keep. Same mix as D-022's mobile divider. |
| main.css | cursor data URI | Keep. The site cursor (D-017). |

If any of these starts repeating in a second component, make it a token then.
