import type { Primitives } from '#tokens/primitives';

export type PrimitiveDomain = 'color' | 'font' | 'size' | 'shadow';
export type PrimitiveSizeCategory = keyof Primitives['sizes'];

export type PrimitiveMaps = Record<
	PrimitiveDomain,
	Map<string | number, string>
>;

export type PrimitiveFontMaps = Record<string, Map<string | number, string>>;

export type PrimitiveSizeMaps = {
	[K in PrimitiveSizeCategory]: Map<string | number, string>;
};

export type ResolveValue = (
	val: unknown,
	domain?: PrimitiveDomain,
	fontCategory?: string,
) => string;
