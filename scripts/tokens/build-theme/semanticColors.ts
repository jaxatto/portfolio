import type { SemanticThemeColors, SemanticThemeShadow } from '#tokens/types';
import { cssVarName, isColorMode } from './utils';
import type { ResolveValue } from './types';

type TokenTree = Record<string, unknown>;

function withOpacity(color: string, opacity: string) {
	return color.replace(/\)$/, ` / ${opacity})`);
}

export function buildSemanticColorVars(
	colors: SemanticThemeColors,
	shadow: SemanticThemeShadow,
	resolveValue: ResolveValue,
) {
	const lightSemanticVars: string[] = [];
	const darkSemanticVars: string[] = [];

	function processColors(obj: TokenTree, prefix = 'color') {
		for (const [key, val] of Object.entries(obj)) {
			const varName = cssVarName(prefix, key);
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
				processColors(val as TokenTree, `${prefix}-${key}`);
			}
		}
	}

	processColors(colors as TokenTree);
	for (const [group, states] of Object.entries(shadow)) {
		if (
			!['color', 'brand', 'primary', 'secondary', 'tertiary'].includes(group)
		) {
			continue;
		}
		for (const [state, value] of Object.entries(states)) {
			const shadowValue = value as {
				color: { light: string; dark: string };
				opacity: string;
			};
			const varName =
				group === 'color'
					? cssVarName('shadow', 'color', state)
					: cssVarName('shadow', 'color', group, state);
			lightSemanticVars.push(
				`  ${varName}: ${withOpacity(shadowValue.color.light, shadowValue.opacity)};`,
			);
			darkSemanticVars.push(
				`  ${varName}: ${withOpacity(shadowValue.color.dark, shadowValue.opacity)};`,
			);
		}
	}

	return {
		lightSemanticVars,
		darkSemanticVars,
	};
}
