import type { ColorMode, FluidValue } from '#tokens/types';
import { colorModes } from '#tokens/constants';

export const toKebabCase = (str: string) =>
	str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

// builds a `--foo-bar-baz` CSS custom property name from unkebabbed parts
export const cssVarName = (...parts: string[]) =>
	`--${parts.map(toKebabCase).join('-')}`;

export function isColorMode(val: unknown): val is ColorMode {
	return (
		typeof val === 'object' &&
		val !== null &&
		colorModes.every((mode) => mode in val)
	);
}

export function isFluidValue(val: unknown): val is FluidValue {
	return (
		typeof val === 'object' &&
		val !== null &&
		'min' in val &&
		'preferred' in val &&
		'max' in val
	);
}
