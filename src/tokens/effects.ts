/* effects.ts
 * Motion and elevation tokens. They are plain CSS values (no primitives behind them), compiled into
 * theme.css by scripts/tokens/build-theme/effects.ts. Hero loops (HeroMarks, the Home cursor) are ambient
 * animation, not UI transitions, and keep their own timing.
 */

export type EffectMode = { light: string; dark: string };

export const effects = {
  // Transition and animation lengths for interface feedback.
  duration: {
    fast: '0.15s',
    base: '0.2s',
    moderate: '0.3s',
    slow: '0.4s',
    slower: '0.5s',
    // The color fade when the theme switches.
    slowest: '0.8s',
  },
  easing: {
    standard: 'ease',
    // Grow-in lines and toggles.
    emphasized: 'cubic-bezier(0.4, 0.2, 0.2, 1)',
    // Lift and settle, fast start and soft landing.
    out: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
  },
  // Strength of the tint a hover or pressed state mixes into an outline control (color-mix percentage).
  wash: {
    hover: '12%',
    active: '20%',
  },
  // How far a control's hover and pressed colors step past the primary hover and pressed tokens (D-142): a mix
  // toward the next step on the violet scale. Light goes half a step past 800 on hover and a third of the way from 900
  // to 950 when pressed, keeping the hue and most of the chroma. Dark uses the tokens as they are (violet 200 and 100).
  // Sections on a dark ground (tone.css) set the amounts to 0%.
  deepen: {
    hover: {
      amount: { light: '50%', dark: '0%' },
      target: {
        light: 'var(--primitive-color-violet-900)',
        dark: 'var(--primitive-color-violet-900)',
      },
    },
    active: {
      amount: { light: '30%', dark: '0%' },
      target: {
        light: 'var(--primitive-color-violet-950)',
        dark: 'var(--primitive-color-violet-950)',
      },
    },
  },
  // Stacking order, lowest to highest. Components name a layer, they never pick a number.
  layer: {
    behind: '-1',
    raised: '10',
    tooltip: '30',
    'skip-link': '1000',
  },
  // Full box-shadow or drop-shadow values. Dark mode needs a deeper shadow and a faint edge, since black
  // vanishes on the dark ground.
  shadow: {
    raised: {
      light: '0 4px 8px rgb(0 0 0 / 15%)',
      dark: '0 4px 14px rgb(0 0 0 / 70%), 0 0 0 1px rgb(255 255 255 / 12%)',
    },
    // Card lift: offsets and blur only. A custom property resolves where it is defined, so a color
    // variable inside this token would be read at :root. The card adds its own color:
    // `box-shadow: var(--shadow-lift) var(--shadow-lift-color)`.
    lift: '0 24px 48px -20px',
    // For `filter: drop-shadow()` under pointer and tag arrows.
    cursor: '0 2px 3px rgb(0 0 0 / 25%)',
  },
} as const satisfies {
  duration: Record<string, string>;
  easing: Record<string, string>;
  deepen: Record<'hover' | 'active', { amount: EffectMode; target: EffectMode }>;
  wash: Record<string, string>;
  layer: Record<string, string>;
  shadow: Record<string, string | EffectMode>;
};
