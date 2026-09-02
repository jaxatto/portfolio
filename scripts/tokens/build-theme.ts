/* scripts/build-theme.ts */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defaultTheme } from '#src/tokens/defaultTheme';
import { buildPrimitiveTokenContext } from './build-theme/primitives';
import { renderThemeCss } from './build-theme/renderCss';
import { buildSemanticColorVars } from './build-theme/semanticColors';
import { buildStaticSemanticVars } from './build-theme/semanticStatic';
import { createValueResolver } from './build-theme/valueResolver';
import { writeThemeCss } from './build-theme/writeThemeCss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function buildTheme() {
	const { primitiveVars, primitiveFontMaps, primitiveMaps, primitiveSizeMaps } =
		buildPrimitiveTokenContext();
	const resolveValue = createValueResolver({
		primitiveFontMaps,
		primitiveMaps,
		fontSizes: defaultTheme.font.size,
	});

	const { lightSemanticVars, darkSemanticVars } = buildSemanticColorVars(
		defaultTheme.colors,
		defaultTheme.shadow,
		resolveValue,
	);
	const staticSemanticVars = buildStaticSemanticVars(
		defaultTheme,
		resolveValue,
		primitiveSizeMaps,
	);

	const cssContent = renderThemeCss({
		primitiveVars,
		staticSemanticVars,
		lightSemanticVars,
		darkSemanticVars,
	});

	const distDir = path.resolve(__dirname, '../../src/styles');
	writeThemeCss(cssContent, distDir);
	console.log('✅ Theme compiled successfully to ./src/styles/variables.css');
}

buildTheme();
