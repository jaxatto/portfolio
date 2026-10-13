import type { SemanticTheme, SemanticThemeTypography } from '#tokens/types';
import { cssVarName, isFluidValue } from './utils';
import {
	varPrefixes,
	type PrimitiveSizeCategory,
	type PrimitiveSizeMaps,
	type ResolveValue,
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
		return `var(${cssVarName('font', propName, semanticKey)})`;
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
					`  ${cssVarName('size', 'layout', 'gutter')}: var(${cssVarName('size', 'space', val)});`,
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
				`  ${cssVarName('size', category, key)}: ${categoryResolved ?? resolveValue(val, 'size')};`,
			);
		}
	}

	for (const [category, values] of Object.entries(theme.shadow)) {
		if (
			['color', 'brand', 'primary', 'secondary', 'tertiary'].includes(category)
		) {
			continue;
		}
		if (typeof values !== 'object' || values === null) {
			continue;
		}

		for (const [key, val] of Object.entries(values)) {
			staticSemanticVars.push(
				`  ${cssVarName('shadow', category, key)}: ${resolveValue(val, 'shadow')};`,
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
				`  ${cssVarName('font', category, key)}: ${resolveValue(val, 'font', category)};`,
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

				const varName = cssVarName(varPrefixes.fontStyle, styleName, propName);
				staticSemanticVars.push(`  ${varName}: ${finalValue};`);
			}
		}
	}

	return staticSemanticVars;
}
