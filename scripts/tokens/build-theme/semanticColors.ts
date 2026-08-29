import type { SemanticThemeColors } from '#tokens/types.ts';
import { isColorMode, toKebabCase } from './utils';
import type { ResolveValue } from './types';

type TokenTree = Record<string, unknown>;

export function buildSemanticColorVars(
	colors: SemanticThemeColors,
	resolveValue: ResolveValue,
) {
	const lightSemanticVars: string[] = [];
	const darkSemanticVars: string[] = [];

	function processColors(obj: TokenTree, prefix = 'color') {
		for (const [key, val] of Object.entries(obj)) {
			const varName = `--${prefix}-${toKebabCase(key)}`;
			if (isColorMode(val)) {
				lightSemanticVars.push(
					`  ${varName}: ${resolveValue(val.light, 'color')};`,
				);
				darkSemanticVars.push(
					`  ${varName}: ${resolveValue(val.dark, 'color')};`,
				);
				continue;
			}

			if (typeof val === 'object' && val !== null) {
				processColors(val as TokenTree, `${prefix}-${toKebabCase(key)}`);
			}
		}
	}

	processColors(colors as TokenTree);

	return {
		lightSemanticVars,
		darkSemanticVars,
	};
}
