import type { SemanticTheme, SemanticThemeTypography } from '#tokens/types';
import { primitives } from '#tokens/primitives';
import { cssVarName, isFluidValue, requirePrimitive } from './utils';
import {
  varPrefixes,
  type PrimitiveSizeCategory,
  type PrimitiveFontMaps,
  type PrimitiveSizeMaps,
  type ResolveValue,
} from './types';

// A semantic size group that has no primitive scale of its own reads another group's scale.
const primitiveCategoryFor: Record<string, PrimitiveSizeCategory> = {
  target: 'dimension',
  icon: 'dimension',
  layout: 'dimension',
  'focus-ring': 'border-width',
};

export function buildStaticSemanticVars(
  theme: SemanticTheme,
  resolveValue: ResolveValue,
  primitiveSizeMaps: PrimitiveSizeMaps,
  primitiveFontMaps: PrimitiveFontMaps,
) {
  const staticSemanticVars: string[] = [];

  function resolveFontStyleSemanticRef(propName: string, semanticKey: string): string {
    return `var(${cssVarName('font', propName, semanticKey)})`;
  }

  for (const [category, values] of Object.entries(theme.sizes)) {
    if (typeof values !== 'object' || values === null) {
      continue;
    }

    for (const [key, val] of Object.entries(values)) {
      if (category === 'layout' && key === 'gutter' && typeof val === 'string') {
        staticSemanticVars.push(
          `  ${cssVarName('size', 'layout', 'gutter')}: var(${cssVarName('space', val)});`,
        );
        continue;
      }

      // A calc() built from other tokens stays as written. The raw-value check covers its parts.
      if (typeof val === 'string' && val.startsWith('calc(')) {
        staticSemanticVars.push(`  ${cssVarName('size', category, key)}: ${val};`);
        continue;
      }

      const sizeCategory = primitiveCategoryFor[category] ?? (category as PrimitiveSizeCategory);
      staticSemanticVars.push(
        `  ${category === 'space' ? cssVarName('space', key) : cssVarName('size', category, key)}: ${requirePrimitive(primitiveSizeMaps[sizeCategory], val as string, `size ${category}-${key}`)};`,
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
        `  ${cssVarName('font', category, key)}: ${requirePrimitive(primitiveFontMaps[category], val as string | number, `font ${category}-${key}`)};`,
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
          const sizeRef = (step: keyof typeof primitives.font.size) =>
            requirePrimitive(
              primitiveFontMaps.size,
              primitives.font.size[step],
              `size step ${step}`,
            );
          const fluidRef = requirePrimitive(
            primitiveFontMaps.fluid,
            primitives.font.fluid[propValue.preferred],
            `fluid ${propValue.preferred}`,
          );
          finalValue = `clamp(${sizeRef(propValue.min)}, ${fluidRef}, ${sizeRef(propValue.max)})`;
        } else if (isFluidValue(propValue)) {
          finalValue = resolveValue(propValue, 'font');
        } else {
          const semanticCategory = theme.font[propName as keyof SemanticThemeTypography];

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
