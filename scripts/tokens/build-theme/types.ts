import type { Primitives } from '#tokens/primitives';

// single source of truth for primitive domain names (type + runtime value)
export const primitiveDomains = [
	'color',
	'font',
	'size',
	'shadow',
	'utils',
] as const;
export type PrimitiveDomain = (typeof primitiveDomains)[number];

// single source of truth for pipeline CSS variable namespace prefixes
export const varPrefixes = {
	primitive: 'primitive',
	fontStyle: 'font-style',
} as const;

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
