import type { SemanticTheme, SemanticThemeTypography } from '#tokens/types.ts';
import { isFluidValue, toKebabCase } from './utils';
import type {
	PrimitiveSizeCategory,
	PrimitiveSizeMaps,
	ResolveValue,
} from './types';

type TokenTree = Record<string, unknown>;

export function buildStaticSemanticVars(
	theme: SemanticTheme,
	resolveValue: ResolveValue,
	primitiveSizeMaps: PrimitiveSizeMaps,
) {
	const staticSemanticVars: string[] = [];

	function resolveFontStyleSemanticRef(
		propName: string,
		semanticKey: string,
	): string {
		return `var(--font-${toKebabCase(propName)}-${toKebabCase(semanticKey)})`;
	}

	for (const [category, values] of Object.entries(theme.sizes)) {
		if (typeof values !== 'object' || values === null) {
			continue;
		}

		for (const [key, val] of Object.entries(values)) {
			if (
				category === 'layout' &&
				key === 'gutter' &&
				typeof val === 'string'
			) {
				staticSemanticVars.push(
					`  --size-layout-gutter: var(--size-space-${toKebabCase(val)});`,
				);
				continue;
			}

			const sizeCategory = category as PrimitiveSizeCategory;
			const categoryMap = primitiveSizeMaps[sizeCategory];
			const categoryResolved =
				categoryMap && (typeof val === 'string' || typeof val === 'number')
					? (categoryMap.get(val) ?? null)
					: null;

			staticSemanticVars.push(
				`  --size-${category}-${toKebabCase(key)}: ${categoryResolved ?? resolveValue(val, 'size')};`,
			);
		}
	}

	for (const [category, values] of Object.entries(theme.shadow)) {
		if (typeof values !== 'object' || values === null) {
			continue;
		}

		for (const [key, val] of Object.entries(values)) {
			staticSemanticVars.push(
				`  --shadow-${category}-${toKebabCase(key)}: ${resolveValue(val, 'shadow')};`,
			);
		}
	}

	for (const [category, values] of Object.entries(theme.font)) {
		if (category === 'styles') {
			continue;
		}
		if (typeof values !== 'object' || values === null) {
			continue;
		}

		for (const [key, val] of Object.entries(values)) {
			staticSemanticVars.push(
				`  --font-${category}-${toKebabCase(key)}: ${resolveValue(val, 'font', category)};`,
			);
		}
	}

	const fontStyles = theme.font.styles;
	if (fontStyles) {
		for (const [styleName, styleObject] of Object.entries(fontStyles)) {
			if (typeof styleObject !== 'object' || styleObject === null) {
				continue;
			}

			for (const [propName, propValue] of Object.entries(styleObject)) {
				let finalValue = '';

				if (isFluidValue(propValue) && propName === 'size') {
					const minValue =
						typeof propValue.min === 'string' &&
						propValue.min in theme.font.size
							? resolveFontStyleSemanticRef('size', propValue.min)
							: resolveValue(propValue.min, 'font');
					const maxValue =
						typeof propValue.max === 'string' &&
						propValue.max in theme.font.size
							? resolveFontStyleSemanticRef('size', propValue.max)
							: resolveValue(propValue.max, 'font');
					finalValue = `clamp(${minValue}, ${propValue.preferred}, ${maxValue})`;
				} else if (isFluidValue(propValue)) {
					finalValue = resolveValue(propValue, 'font');
				} else {
					const semanticCategory =
						theme.font[propName as keyof SemanticThemeTypography];

					if (
						semanticCategory &&
						typeof semanticCategory === 'object' &&
						typeof propValue === 'string' &&
						propValue in semanticCategory
					) {
						finalValue = resolveFontStyleSemanticRef(propName, propValue);
					} else {
						finalValue = resolveValue(propValue, 'font');
					}
				}

				const varName = `--font-style-${toKebabCase(styleName)}-${toKebabCase(propName)}`;
				staticSemanticVars.push(`  ${varName}: ${finalValue};`);
			}
		}
	}

	return staticSemanticVars;
}
