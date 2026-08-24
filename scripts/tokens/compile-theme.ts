/* scripts/build-tokens.ts */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { primitives } from '#tokens/primitives';
import { defaultTheme } from '#src/tokens/defaultTheme';
import type { ColorMode } from '#tokens/types.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const toKebabCase = (str: string) =>
	str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

function isColorMode(val: unknown): val is ColorMode {
	return (
		typeof val === 'object' && val !== null && 'light' in val && 'dark' in val
	);
}

function buildTokens() {
	const primitiveVars: string[] = [];
	const primitiveMap = new Map<string | number, string>();

	/* ------------------------------------------------------------- */
	/* -- 1. Process Primitives & Build Reverse Lookup Map --------- */
	/* ------------------------------------------------------------- */
	function extractPrimitives(obj: Record<string, any>, prefix: string) {
		for (const [key, val] of Object.entries(obj)) {
			const varName = `--primitive-${prefix}-${toKebabCase(key)}`;
			if (typeof val === 'object' && val !== null) {
				extractPrimitives(val, `${prefix}-${toKebabCase(key)}`);
			} else {
				primitiveVars.push(`  ${varName}: ${val};`);
				// Map the exact string value back to its CSS var name for semantic referencing
				primitiveMap.set(val, `var(${varName})`);
			}
		}
	}

	extractPrimitives(primitives.colors, 'color');
	extractPrimitives(primitives.font, 'font');
	extractPrimitives(primitives.sizes, 'size');

	/* ------------------------------------------------------------- */
	/* -- 2. Helper to Resolve Values to Primitive Variables ------- */
	/* ------------------------------------------------------------- */
	function resolveValue(val: unknown): string {
		if (typeof val === 'string' || typeof val === 'number') {
			return primitiveMap.get(val) ?? String(val);
		}
		return String(val);
	}

	/* ------------------------------------------------------------- */
	/* -- 3. Process Semantic Colors ------------------------------- */
	/* ------------------------------------------------------------- */
	const lightSemanticVars: string[] = [];
	const darkSemanticVars: string[] = [];

	function processColors(obj: Record<string, any>, prefix = 'color') {
		for (const [key, val] of Object.entries(obj)) {
			const varName = `--${prefix}-${toKebabCase(key)}`;
			if (isColorMode(val)) {
				lightSemanticVars.push(`  ${varName}: ${resolveValue(val.light)};`);
				darkSemanticVars.push(`  ${varName}: ${resolveValue(val.dark)};`);
			} else if (typeof val === 'object') {
				processColors(val, `${prefix}-${toKebabCase(key)}`);
			}
		}
	}
	processColors(defaultTheme.colors);

	/* ------------------------------------------------------------- */
	/* -- 4. Process Semantic Sizes & Typography ------------------- */
	/* ------------------------------------------------------------- */
	const staticSemanticVars: string[] = [];

	// Sizes
	for (const [category, values] of Object.entries(defaultTheme.sizes)) {
		if (typeof values === 'object') {
			for (const [key, val] of Object.entries(values)) {
				staticSemanticVars.push(
					`  --size-${category}-${toKebabCase(key)}: ${resolveValue(val)};`,
				);
			}
		}
	}

	// Typography
	for (const [category, values] of Object.entries(defaultTheme.font)) {
		if (category === 'styles') continue;
		if (typeof values === 'object') {
			for (const [key, val] of Object.entries(values)) {
				staticSemanticVars.push(
					`  --font-${category}-${toKebabCase(key)}: ${resolveValue(val)};`,
				);
			}
		}
	}

	/* ------------------------------------------------------------- */
	/* -- 5. Generate Architecture CSS Output --------------------- */
	/* ------------------------------------------------------------- */
	const cssContent = `/**
 * Do not edit directly.
 * Generated automatically from primitives.ts and defaultTheme.ts
 */

:root {
  /* ========================================== */
  /* Primitive Tokens (Raw Values)             */
  /* ========================================== */
${primitiveVars.join('\n')}

  /* ========================================== */
  /* Semantic Static Tokens                     */
  /* ========================================== */
${staticSemanticVars.join('\n')}

  /* ========================================== */
  /* Semantic Light Mode Colors (Default)       */
  /* ========================================== */
${lightSemanticVars.join('\n')}
}

/* ============================================== */
/* Semantic Dark Mode Overrides                   */
/* ============================================== */
[data-theme="dark"] {
${darkSemanticVars.join('\n')}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
${darkSemanticVars.join('\n')}
  }
}
`;

	const distDir = path.resolve(__dirname, '../../src/styles');
	if (!fs.existsSync(distDir)) {
		fs.mkdirSync(distDir, { recursive: true });
	}

	fs.writeFileSync(path.join(distDir, 'variables.css'), cssContent, 'utf-8');
	console.log('✅ Theme compiled successfully to ./src/styles/variables.css');
}

buildTokens();
