/* effects.ts
 * Motion and elevation tokens. Every value is a primitive (`primitives.ts`), compiled into
 * theme.css by scripts/tokens/build-theme/effects.ts. Hero loops (HeroMarks, the Home cursor) are ambient
 * animation, not UI transitions, and keep their own timing.
 */

import { primitives } from './primitives';

export type EffectMode = { light: string; dark: string };

const { duration, easing } = primitives.motion;

export const effects = {
  // Transition and animation lengths for interface feedback.
  duration: {
    fast: duration['150'],
    base: duration['200'],
    moderate: duration['300'],
    slow: duration['400'],
    slower: duration['500'],
    // The color fade when the theme switches.
    slowest: duration['800'],
  },
  easing: {
    standard: easing.ease,
    // Grow-in lines and toggles.
    emphasized: easing['in-out-sharp'],
    // Lift and settle, fast start and soft landing.
    out: easing['out-soft'],
  },
  // Strength of the tint a hover or pressed state mixes into an outline control (color-mix percentage).
  wash: {
    hover: primitives.utils.opacity[12],
    active: primitives.utils.opacity[20],
  },
  // How far a control's hover and pressed colors step past the primary hover and pressed tokens (D-147): a mix
  // toward the next step on the violet scale. Light goes half a step past 800 on hover and a third of the way from 900
  // to 950 when pressed, keeping the hue and most of the chroma. Dark uses the tokens as they are (violet 200 and 100).
  // Sections on a dark ground (tone.css) set the amounts to 0%.
  deepen: {
    hover: {
      amount: { light: primitives.utils.opacity[50], dark: primitives.utils.opacity[0] },
      target: {
        light: primitives.colors.violet[900],
        dark: primitives.colors.violet[900],
      },
    },
    active: {
      amount: { light: primitives.utils.opacity[30], dark: primitives.utils.opacity[0] },
      target: {
        light: primitives.colors.violet[950],
        dark: primitives.colors.violet[950],
      },
    },
  },
  // The amount a tone sets when it turns the deepening off (tone.css).
  deepenOff: primitives.utils.opacity[0],
  // Stacking order, lowest to highest. Components name a layer, they never pick a number.
  layer: {
    behind: primitives.utils.layer['neg-1'],
    raised: primitives.utils.layer['10'],
    tooltip: primitives.utils.layer['30'],
    'skip-link': primitives.utils.layer['1000'],
  },
  // Full box-shadow or drop-shadow values. Dark mode needs a deeper shadow and a faint edge, since black
  // vanishes on the dark ground.
  shadow: {
    raised: {
      light: primitives.shadow['drop-soft-light'],
      dark: primitives.shadow['drop-soft-dark'],
    },
    // Card lift: offsets and blur only. A custom property resolves where it is defined, so a color
    // variable inside this token would be read at :root. The card adds its own color:
    // `box-shadow: var(--shadow-lift) var(--shadow-lift-color)`.
    lift: primitives.shadow['offset-lift'],
    // For `filter: drop-shadow()` under pointer and tag arrows.
    cursor: primitives.shadow['drop-cursor'],
  },
} as const satisfies {
  duration: Record<string, string>;
  easing: Record<string, string>;
  deepen: Record<'hover' | 'active', { amount: EffectMode; target: EffectMode }>;
  deepenOff: string;
  wash: Record<string, string>;
  layer: Record<string, string>;
  shadow: Record<string, string | EffectMode>;
};
