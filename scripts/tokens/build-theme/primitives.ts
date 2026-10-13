import { primitives } from '#tokens/primitives';
import { cssVarName, toKebabCase } from './utils';
import {
	primitiveDomains,
	varPrefixes,
	type PrimitiveDomain,
	type PrimitiveFontMaps,
	type PrimitiveMaps,
	type PrimitiveSizeCategory,
	type PrimitiveSizeMaps,
} from './types';

type TokenTree = Record<string, unknown>;

export function buildPrimitiveTokenContext() {
	const primitiveVars: string[] = [];
	const primitiveMaps: PrimitiveMaps = Object.fromEntries(
		primitiveDomains.map((domain) => [
			domain,
			new Map<string | number, string>(),
		]),
	) as PrimitiveMaps;
	const primitiveFontMaps: PrimitiveFontMaps = {};
	const primitiveSizeMaps: PrimitiveSizeMaps = Object.fromEntries(
		Object.keys(primitives.sizes).map((category) => [
			category,
			new Map<string | number, string>(),
		]),
	) as PrimitiveSizeMaps;

	const missingPrimitiveSizeCategories = Object.keys(primitives.sizes).filter(
		(category) => !(category in primitiveSizeMaps),
	);
	if (missingPrimitiveSizeCategories.length > 0) {
		throw new Error(
			`Missing primitive size maps for: ${missingPrimitiveSizeCategories.join(', ')}`,
		);
	}

	function extractPrimitives(
		obj: TokenTree,
		prefix: string,
		domain: PrimitiveDomain,
		scopedMap?: Map<string | number, string>,
	) {
		for (const [key, val] of Object.entries(obj)) {
			const kebabKey = toKebabCase(key);
			const varName = cssVarName(varPrefixes.primitive, prefix, kebabKey);

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
	for (const [category, values] of Object.entries(primitives.shadow)) {
		extractPrimitives(
			values as TokenTree,
			`shadow-${toKebabCase(category)}`,
			'shadow',
		);
	}
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
		const scopedMap = primitiveSizeMaps[sizeCategory];
		if (!scopedMap) {
			throw new Error(
				`Missing primitive size map for category: ${String(category)}`,
			);
		}
		extractPrimitives(
			values as TokenTree,
			`size-${toKebabCase(category)}`,
			'size',
			scopedMap,
		);
	}
	extractPrimitives(primitives.utils as TokenTree, 'utils', 'utils');

	return {
		primitiveVars,
		primitiveMaps,
		primitiveFontMaps,
		primitiveSizeMaps,
	};
}
