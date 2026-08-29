import { primitives } from '#tokens/primitives';
import { toKebabCase } from './utils';
import type {
	PrimitiveDomain,
	PrimitiveFontMaps,
	PrimitiveMaps,
	PrimitiveSizeCategory,
	PrimitiveSizeMaps,
} from './types';

type TokenTree = Record<string, unknown>;

export function buildPrimitiveTokenContext() {
	const primitiveVars: string[] = [];
	const primitiveMaps: PrimitiveMaps = {
		color: new Map<string | number, string>(),
		font: new Map<string | number, string>(),
		size: new Map<string | number, string>(),
	};
	const primitiveFontMaps: PrimitiveFontMaps = {};
	const primitiveSizeMaps: PrimitiveSizeMaps = {
		space: new Map<string | number, string>(),
		radius: new Map<string | number, string>(),
		breakpoint: new Map<string | number, string>(),
	};

	function extractPrimitives(
		obj: TokenTree,
		prefix: string,
		domain: PrimitiveDomain,
		scopedMap?: Map<string | number, string>,
	) {
		for (const [key, val] of Object.entries(obj)) {
			const kebabKey = toKebabCase(key);
			const varName = `--primitive-${prefix}-${kebabKey}`;

			if (typeof val === 'object' && val !== null) {
				extractPrimitives(val as TokenTree, `${prefix}-${kebabKey}`, domain);
				continue;
			}

			primitiveVars.push(`  ${varName}: ${String(val)};`);
			if (
				(typeof val === 'string' || typeof val === 'number') &&
				!primitiveMaps[domain].has(val)
			) {
				primitiveMaps[domain].set(val, `var(${varName})`);
			}
			if (
				scopedMap &&
				(typeof val === 'string' || typeof val === 'number') &&
				!scopedMap.has(val)
			) {
				scopedMap.set(val, `var(${varName})`);
			}
		}
	}

	extractPrimitives(primitives.colors as TokenTree, 'color', 'color');
	for (const [category, values] of Object.entries(primitives.font)) {
		const fontMap = new Map<string | number, string>();
		primitiveFontMaps[category] = fontMap;
		extractPrimitives(
			values as TokenTree,
			`font-${toKebabCase(category)}`,
			'font',
			fontMap,
		);
	}
	for (const [category, values] of Object.entries(primitives.sizes)) {
		const sizeCategory = category as PrimitiveSizeCategory;
		extractPrimitives(
			values as TokenTree,
			`size-${toKebabCase(category)}`,
			'size',
			primitiveSizeMaps[sizeCategory],
		);
	}

	return {
		primitiveVars,
		primitiveMaps,
		primitiveFontMaps,
		primitiveSizeMaps,
	};
}
