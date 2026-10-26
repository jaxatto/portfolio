import type { SemanticThemeColors } from '#tokens/types';
import { colorGroups } from '#tokens/constants';
import { cssVarName, isColorMode } from './utils';
import type { ResolveValue } from './types';

type TokenTree = Record<string, unknown>;

function normalizeColorKey(prefix: string, key: string) {
  const group = prefix.startsWith('color-') ? prefix.slice('color-'.length) : '';
  if (!colorGroups.includes(group as (typeof colorGroups)[number])) {
    return key;
  }

  const containerPrefix = `${group}-container`;
  const onContainerPrefix = `on-${group}-container`;
  if (key.startsWith(onContainerPrefix)) {
    return `on-container${key.slice(onContainerPrefix.length)}`;
  }
  if (key.startsWith(containerPrefix)) {
    return `container${key.slice(containerPrefix.length)}`;
  }
  if (key === `on-${group}`) {
    return 'on-default';
  }

  return key;
}

export function buildSemanticColorVars(colors: SemanticThemeColors, resolveValue: ResolveValue) {
  const lightSemanticVars: string[] = [];
  const darkSemanticVars: string[] = [];

  function processColors(obj: TokenTree, prefix = 'color') {
    for (const [key, val] of Object.entries(obj)) {
      const varName = cssVarName(prefix, normalizeColorKey(prefix, key));
      if (isColorMode(val)) {
        lightSemanticVars.push(`  ${varName}: ${resolveValue(val.light, 'color')};`);
        darkSemanticVars.push(`  ${varName}: ${resolveValue(val.dark, 'color')};`);
        continue;
      }

      if (typeof val === 'object' && val !== null) {
        processColors(val as TokenTree, `${prefix}-${key}`);
      }
    }
  }

  processColors(colors as TokenTree);
  return {
    lightSemanticVars,
    darkSemanticVars,
  };
}
