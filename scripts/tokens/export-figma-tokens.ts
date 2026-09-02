/* scripts/tokens/export-figma-tokens.ts */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { primitives } from '#tokens/primitives';
import { defaultTheme } from '#src/tokens/defaultTheme';
import { extractInteractStates } from '#src/tokens/colorSteps';
import type { ColorMode } from '#tokens/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function isColorMode(val: unknown): val is ColorMode {
	return (
		typeof val === 'object' && val !== null && 'light' in val && 'dark' in val
	);
}

function isFluidValue(
	val: unknown,
): val is { min: string; preferred: string; max: string } {
	return (
		typeof val === 'object' &&
		val !== null &&
		'min' in val &&
		'preferred' in val &&
		'max' in val
	);
}

function withOpacity(color: string, opacity: string) {
	return color.replace(/\)$/, ` / ${opacity})`);
}

function exportFigmaTokens() {
	/* ------------------------------------------------------------- */
	/* -- 1. Format Colors for Figma Modes (Light / Dark) ---------- */
	/* ------------------------------------------------------------- */
	const lightColors: Record<string, any> = {};
	const darkColors: Record<string, any> = {};

	function processColors(
		obj: Record<string, any>,
		targetLight: Record<string, any>,
		targetDark: Record<string, any>,
	) {
		for (const [key, val] of Object.entries(obj)) {
			if (isColorMode(val)) {
				targetLight[key] = { $value: val.light, $type: 'color' };
				targetDark[key] = { $value: val.dark, $type: 'color' };
			} else if (typeof val === 'object' && val !== null) {
				targetLight[key] = {};
				targetDark[key] = {};
				processColors(val, targetLight[key], targetDark[key]);
			}
		}
	}
	processColors(defaultTheme.colors, lightColors, darkColors);
	extractInteractStates(lightColors);
	extractInteractStates(darkColors);
	const lightShadowColors: Record<string, any> = {
		default: {
			$value: withOpacity(
				defaultTheme.shadow.color.default.color.light,
				defaultTheme.shadow.color.default.opacity,
			),
			$type: 'color',
		},
	};
	const darkShadowColors: Record<string, any> = {
		default: {
			$value: withOpacity(
				defaultTheme.shadow.color.default.color.dark,
				defaultTheme.shadow.color.default.opacity,
			),
			$type: 'color',
		},
	};
	for (const group of ['brand', 'primary', 'secondary', 'tertiary'] as const) {
		lightShadowColors[group] = {};
		darkShadowColors[group] = {};
		for (const [state, shadow] of Object.entries(defaultTheme.shadow[group])) {
			lightShadowColors[group][state] = {
				$value: withOpacity(shadow.color.light, shadow.opacity),
				$type: 'color',
			};
			darkShadowColors[group][state] = {
				$value: withOpacity(shadow.color.dark, shadow.opacity),
				$type: 'color',
			};
		}
	}

	/* ------------------------------------------------------------- */
	/* -- 2. Format Fluid Styles for Inspection -------------------- */
	/* ------------------------------------------------------------- */
	const formattedStyles = Object.fromEntries(
		Object.entries(defaultTheme.font.styles ?? {}).map(
			([styleKey, styleObj]) => [
				styleKey,
				Object.fromEntries(
					Object.entries(styleObj ?? {}).map(([propKey, propVal]) => [
						propKey,
						isFluidValue(propVal)
							? {
									$value: `clamp(${propVal.min}, ${propVal.preferred}, ${propVal.max})`,
									$type: 'typography',
								}
							: { $value: propVal, $type: 'typography' },
					]),
				),
			],
		),
	);

	/* ------------------------------------------------------------- */
	/* -- 3. Build Figma JSON Payload ------------------------------ */
	/* ------------------------------------------------------------- */
	const figmaPayload = {
		$schema: 'https://tokens.studio/schema/2026/tokens.json',
		primitives: {
			color: primitives.colors,
			font: primitives.font,
			size: primitives.sizes,
			shadow: primitives.shadow,
			utils: primitives.utils,
		},
		semantic: {
			modes: {
				light: { color: lightColors },
				dark: { color: darkColors },
			},
			shadow: {
				color: {
					light: lightShadowColors,
					dark: darkShadowColors,
				},
				blur: defaultTheme.shadow.blur,
				spread: defaultTheme.shadow.spread,
				x: defaultTheme.shadow.x,
				y: defaultTheme.shadow.y,
			},
			sizes: defaultTheme.sizes,
			font: {
				family: defaultTheme.font.family,
				size: defaultTheme.font.size,
				weight: defaultTheme.font.weight,
				'line-height': defaultTheme.font['line-height'],
				styles: formattedStyles,
			},
		},
	};

	const outputDir = path.resolve(__dirname, '../../src/tokens');
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	const outputPath = path.join(outputDir, 'tokens.json');
	fs.writeFileSync(outputPath, JSON.stringify(figmaPayload, null, 2), 'utf-8');
	console.log(`🎨 Exported Figma tokens manifest to ${outputPath}`);
}

exportFigmaTokens();
