/* colorSteps.ts */

import { primitives } from './primitives';
import { colorGroups } from './constants';
import {
	type BaseSemanticThemeColors,
	type ColorFamily,
	type ColorMode,
	type SemanticThemeColors,
} from './types';

const colorSteps = [
	50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;
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

/** Steps a color mode toward mid-tone: light mode darkens, dark mode lightens, per level. */
export function deriveState(base: ColorMode, level: number): ColorMode {
	const light = primitiveLookup.get(base.light);
	const dark = primitiveLookup.get(base.dark);
	if (!light || !dark) {
		throw new Error(
			`deriveState: color is not a recognized primitive (light: ${base.light}, dark: ${base.dark})`,
		);
	}
	return {
		light: getPrimitive(light.family, shiftStep(light.step, level)),
		dark: getPrimitive(dark.family, shiftStep(dark.step, -level)),
	};
}

// derives hover/active states for 'default', '{group}-container', and 'on-{group}-container'
export function withInteractionStates(
	colors: BaseSemanticThemeColors,
): SemanticThemeColors {
	const themeColors = colors as unknown as SemanticThemeColors;
	for (const group of colorGroups) {
		const pairing = themeColors[group] as Record<string, ColorMode>;
		const keys = ['default', `${group}-container`, `on-${group}-container`];
		for (const key of keys) {
			const base = pairing[key];
			pairing[`${key}-hover`] = deriveState(base, 1);
			pairing[`${key}-active`] = deriveState(base, 2);
		}
	}
	return themeColors;
}

const interactStateSuffix = /-(?:hover|active)$/;

// pulls '-hover'/'-active' keys out of each group into a sibling 'interact' branch,
// so Figma folders read as color/interact/{group}/... instead of polluting color/{group}
export function extractInteractStates(target: Record<string, unknown>) {
	const interact: Record<string, unknown> = {};
	for (const group of colorGroups) {
		const groupObj = target[group] as Record<string, unknown> | undefined;
		if (!groupObj) continue;

		const remaining: Record<string, unknown> = {};
		const extracted: Record<string, unknown> = {};
		for (const [key, val] of Object.entries(groupObj)) {
			(interactStateSuffix.test(key) ? extracted : remaining)[key] = val;
		}

		target[group] = remaining;
		if (Object.keys(extracted).length > 0) interact[group] = extracted;
	}
	if (Object.keys(interact).length > 0) target.interact = interact;
}
