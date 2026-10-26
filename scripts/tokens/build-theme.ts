/* scripts/build-theme.ts */

import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defaultTheme } from '#src/tokens/defaultTheme';
import { buildPrimitiveTokenContext } from './build-theme/primitives';
import { renderThemeCss } from './build-theme/renderCss';
import { buildEffectVars } from './build-theme/effects';
import { buildSemanticColorVars } from './build-theme/semanticColors';
import { buildStaticSemanticVars } from './build-theme/semanticStatic';
import { createValueResolver } from './build-theme/valueResolver';
import { findRawValues } from './build-theme/rawValues';
import { renderThemeColorModule } from './build-theme/themeColor';
import { writeThemeCss } from './build-theme/writeThemeCss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const varName = (line: string) => line.trim().split(':')[0];

// Keeps a primitive line when a semantic line, or another kept primitive, reads it with var().
function pruneUnusedPrimitives(primitiveVars: string[], semanticVars: string[]) {
  const referenced = (lines: string[]) =>
    new Set(lines.join('\n').match(/--primitive-[a-z0-9-]+/g));
  let kept = new Set(referenced(semanticVars));
  for (;;) {
    const next = new Set([
      ...kept,
      ...referenced(primitiveVars.filter((line) => kept.has(varName(line)))),
    ]);
    if (next.size === kept.size) break;
    kept = next;
  }
  return primitiveVars.filter((line) => kept.has(varName(line)));
}

function buildTheme() {
  const { primitiveVars, primitiveFontMaps, primitiveMaps, primitiveSizeMaps } =
    buildPrimitiveTokenContext();
  const resolveValue = createValueResolver({
    primitiveFontMaps,
    primitiveMaps,
  });

  const { lightSemanticVars, darkSemanticVars } = buildSemanticColorVars(
    defaultTheme.colors,
    resolveValue,
  );
  const staticSemanticVars = buildStaticSemanticVars(
    defaultTheme,
    resolveValue,
    primitiveSizeMaps,
    primitiveFontMaps,
  );

  const effectVars = buildEffectVars(primitiveMaps);
  const staticVars = [...staticSemanticVars, ...effectVars.staticVars];
  const lightVars = [...lightSemanticVars, ...effectVars.lightVars];
  const darkVars = [...darkSemanticVars, ...effectVars.darkVars];

  const raw = findRawValues([...staticVars, ...lightVars, ...darkVars]);
  if (raw.length > 0) {
    throw new Error(
      `Semantic tokens must reference primitives, not raw values:\n${raw.join('\n')}`,
    );
  }

  // Primitives are raw scale steps. Only the ones a semantic token points at are emitted, so the
  // stylesheet doesn't carry whole unused ramps (components never read primitives, D-002).
  const usedPrimitiveVars = pruneUnusedPrimitives(primitiveVars, [
    ...staticVars,
    ...lightVars,
    ...darkVars,
  ]);

  const cssContent = renderThemeCss({
    primitiveVars: usedPrimitiveVars,
    staticSemanticVars: staticVars,
    lightSemanticVars: lightVars,
    darkSemanticVars: darkVars,
  });

  const distDir = path.resolve(__dirname, '../../src/styles');
  writeThemeCss(cssContent, distDir);
  const { light, dark } = defaultTheme.colors.surface.default;
  writeFileSync(
    path.resolve(__dirname, '../../src/tokens/themeColor.ts'),
    renderThemeColorModule(light, dark),
  );
  console.log(
    '✅ Theme compiled successfully to ./src/styles/theme.css and src/tokens/themeColor.ts',
  );
}

buildTheme();
