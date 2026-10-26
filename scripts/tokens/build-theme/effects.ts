import { effects, type EffectMode } from '#tokens/effects';
import { cssVarName, requirePrimitive } from './utils';
import type { PrimitiveMaps } from './types';

const isMode = (val: string | EffectMode): val is EffectMode => typeof val === 'object';

// Motion and elevation tokens. Values that differ by mode go to the light and dark lists, the rest are
// static. Each one resolves to a primitive or the build fails.
export function buildEffectVars(primitiveMaps: PrimitiveMaps) {
  const staticVars: string[] = [];
  const lightVars: string[] = [];
  const darkVars: string[] = [];
  const ref = (domain: keyof PrimitiveMaps, val: string, label: string) =>
    requirePrimitive(primitiveMaps[domain], val, label);

  for (const [key, val] of Object.entries(effects.duration)) {
    staticVars.push(
      `  ${cssVarName('motion', 'duration', key)}: ${ref('motion', val, `duration ${key}`)};`,
    );
  }
  for (const [key, val] of Object.entries(effects.easing)) {
    staticVars.push(
      `  ${cssVarName('motion', 'ease', key)}: ${ref('motion', val, `easing ${key}`)};`,
    );
  }
  for (const [key, val] of Object.entries(effects.wash)) {
    staticVars.push(`  ${cssVarName('state', 'wash', key)}: ${ref('utils', val, `wash ${key}`)};`);
  }
  for (const [state, { amount, target }] of Object.entries(effects.deepen)) {
    const amountName = cssVarName('state', 'deepen', state);
    const targetName = cssVarName('state', 'deepen', state, 'target');
    lightVars.push(`  ${amountName}: ${ref('utils', amount.light, `deepen ${state} light`)};`);
    darkVars.push(`  ${amountName}: ${ref('utils', amount.dark, `deepen ${state} dark`)};`);
    lightVars.push(`  ${targetName}: ${ref('color', target.light, `deepen ${state} target`)};`);
    darkVars.push(`  ${targetName}: ${ref('color', target.dark, `deepen ${state} target`)};`);
  }
  staticVars.push(
    `  ${cssVarName('state', 'deepen', 'off')}: ${ref('utils', effects.deepenOff, 'deepen off')};`,
  );
  for (const [key, val] of Object.entries(effects.layer)) {
    staticVars.push(`  ${cssVarName('layer', key)}: ${ref('utils', val, `layer ${key}`)};`);
  }
  for (const [key, val] of Object.entries(effects.shadow)) {
    const name = cssVarName('shadow', key);
    if (isMode(val)) {
      lightVars.push(`  ${name}: ${ref('shadow', val.light, `shadow ${key} light`)};`);
      darkVars.push(`  ${name}: ${ref('shadow', val.dark, `shadow ${key} dark`)};`);
    } else {
      staticVars.push(`  ${name}: ${ref('shadow', val, `shadow ${key}`)};`);
    }
  }

  return { staticVars, lightVars, darkVars };
}
