export type PrimitiveDomain = 'color' | 'font' | 'size';
export type PrimitiveSizeCategory = 'space' | 'radius' | 'breakpoint';

export type PrimitiveMaps = Record<
	PrimitiveDomain,
	Map<string | number, string>
>;

export type PrimitiveFontMaps = Record<string, Map<string | number, string>>;

export type PrimitiveSizeMaps = Record<
	PrimitiveSizeCategory,
	Map<string | number, string>
>;

export type ResolveValue = (
	val: unknown,
	domain?: PrimitiveDomain,
	fontCategory?: string,
) => string;
