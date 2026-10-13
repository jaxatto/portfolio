import type { SemanticThemeTypography } from '#tokens/types';
import { isFluidValue } from './utils';
import type {
	PrimitiveDomain,
	PrimitiveFontMaps,
	PrimitiveMaps,
	ResolveValue,
} from './types';

type ResolverOptions = {
	primitiveFontMaps: PrimitiveFontMaps;
	primitiveMaps: PrimitiveMaps;
	fontSizes: SemanticThemeTypography['size'];
};

export function createValueResolver({
	primitiveFontMaps,
	primitiveMaps,
	fontSizes,
}: ResolverOptions): ResolveValue {
	return (
		val: unknown,
		domain: PrimitiveDomain = 'size',
		fontCategory?: string,
	) => {
		if (isFluidValue(val)) {
			const minRaw = fontSizes[val.min] ?? val.min;
			const maxRaw = fontSizes[val.max] ?? val.max;

			const minResolved = primitiveMaps.font.get(minRaw) ?? String(minRaw);
			const maxResolved = primitiveMaps.font.get(maxRaw) ?? String(maxRaw);

			return `clamp(${minResolved}, ${val.preferred}, ${maxResolved})`;
		}

		if (typeof val === 'string' || typeof val === 'number') {
			return (
				(fontCategory
					? primitiveFontMaps[fontCategory]?.get(val)
					: undefined) ??
				primitiveMaps[domain].get(val) ??
				primitiveMaps.size.get(val) ??
				String(val)
			);
		}

		return String(val);
	};
}
