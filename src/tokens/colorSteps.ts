/* colorSteps.ts */

import { primitives } from './primitives';
import { colorGroups } from './constants';
import {
  type BaseSemanticThemeColors,
  type ColorFamily,
  type ColorMode,
  type SemanticThemeColors,
} from './types';

const colorSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
type Step = (typeof colorSteps)[number];

// reverse lookup so a resolved primitive value can be traced back to its family/step
const primitiveLookup = new Map<string, { family: ColorFamily; step: Step }>();
for (const family of Object.keys(primitives.colors) as ColorFamily[]) {
  const steps = primitives.colors[family] as Partial<Record<Step, string>>;
  for (const step of colorSteps) {
    const value = steps[step];
    if (value !== undefined) primitiveLookup.set(value, { family, step });
  }
}

function shiftStep(step: Step, delta: number): Step {
  const idx = colorSteps.indexOf(step);
  const clamped = Math.min(Math.max(idx + delta, 0), colorSteps.length - 1);
  return colorSteps[clamped];
}

function getPrimitive(family: ColorFamily, step: Step): string {
  return (primitives.colors[family] as Partial<Record<Step, string>>)[step]!;
}

/**
 * Steps a color mode per level: light mode darkens, dark mode lightens.
 * Pass `invert` for colors that already sit at the extreme step (e.g. content default),
 * so hover/active move back toward mid-tone instead of clamping at the same value.
 */
export function deriveState(base: ColorMode, level: number, invert = false): ColorMode {
  const light = primitiveLookup.get(base.light);
  const dark = primitiveLookup.get(base.dark);
  if (!light || !dark) {
    throw new Error(
      `deriveState: color is not a recognized primitive (light: ${base.light}, dark: ${base.dark})`,
    );
  }
  const delta = invert ? -level : level;
  return {
    light: getPrimitive(light.family, shiftStep(light.step, delta)),
    dark: getPrimitive(dark.family, shiftStep(dark.step, -delta)),
  };
}

// Hover and pressed states a component reads: the container and its foreground (palette.module.css),
// plus the primary default (deepen.module.css). Nothing else is derived, so no unused token is emitted.
export function withInteractionStates(colors: BaseSemanticThemeColors): SemanticThemeColors {
  const themeColors = colors as unknown as SemanticThemeColors;
  for (const group of colorGroups) {
    const pairing = themeColors[group] as Record<string, ColorMode>;
    const container = `${group}-container`;
    const onContainer = `on-${group}-container`;
    pairing[`${container}-hover`] = deriveState(pairing[container], 1);
    pairing[`${onContainer}-hover`] = deriveState(pairing[onContainer], 1);
    pairing[`${onContainer}-active`] = deriveState(pairing[onContainer], 2);
  }

  const primary = themeColors.primary as unknown as Record<string, ColorMode>;
  primary['default-hover'] = deriveState(primary.default, 1);
  primary['default-active'] = deriveState(primary.default, 2);

  return themeColors;
}
