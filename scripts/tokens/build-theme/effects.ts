import { effects, type EffectMode } from '#tokens/effects';
import { cssVarName } from './utils';

const isMode = (val: string | EffectMode): val is EffectMode => typeof val === 'object';

// Motion and elevation tokens. Values that differ by mode go to the light and dark lists, the rest are static.
export function buildEffectVars() {
  const staticVars: string[] = [];
  const lightVars: string[] = [];
  const darkVars: string[] = [];

  for (const [key, val] of Object.entries(effects.duration)) {
    staticVars.push(`  ${cssVarName('motion', 'duration', key)}: ${val};`);
  }
  for (const [key, val] of Object.entries(effects.easing)) {
    staticVars.push(`  ${cssVarName('motion', 'ease', key)}: ${val};`);
  }
  for (const [key, val] of Object.entries(effects.wash)) {
    staticVars.push(`  ${cssVarName('state', 'wash', key)}: ${val};`);
  }
  staticVars.push(`  ${cssVarName('state', 'deepen')}: ${effects.deepen.amount};`);
  lightVars.push(`  ${cssVarName('state', 'deepen', 'target')}: ${effects.deepen.target.light};`);
  darkVars.push(`  ${cssVarName('state', 'deepen', 'target')}: ${effects.deepen.target.dark};`);
  for (const [key, val] of Object.entries(effects.layer)) {
    staticVars.push(`  ${cssVarName('layer', key)}: ${val};`);
  }
  for (const [key, val] of Object.entries(effects.shadow)) {
    const name = cssVarName('shadow', key);
    if (isMode(val)) {
      lightVars.push(`  ${name}: ${val.light};`);
      darkVars.push(`  ${name}: ${val.dark};`);
    } else {
      staticVars.push(`  ${name}: ${val};`);
    }
  }

  return { staticVars, lightVars, darkVars };
}
