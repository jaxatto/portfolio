import type { ColorMode, FluidValue } from '#tokens/types.ts';

export const toKebabCase = (str: string) =>
	str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

export function isColorMode(val: unknown): val is ColorMode {
	return (
		typeof val === 'object' && val !== null && 'light' in val && 'dark' in val
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
