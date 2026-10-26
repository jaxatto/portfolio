import { describe, expect, it } from 'vitest';
import { deriveState } from './colorSteps';
import { primitives } from './primitives';
import { defaultTheme } from './defaultTheme';

const blue = primitives.colors.blue as Record<number, string>;

describe('deriveState', () => {
  it('darkens in light mode and lightens in dark mode', () => {
    const next = deriveState({ light: blue[500], dark: blue[500] }, 1);
    expect(next.light).toBe(blue[600]);
    expect(next.dark).toBe(blue[400]);
  });

  it('inverts the direction for colors that sit at the extreme step', () => {
    const next = deriveState({ light: blue[500], dark: blue[500] }, 1, true);
    expect(next.light).toBe(blue[400]);
    expect(next.dark).toBe(blue[600]);
  });

  it('clamps at the ends of the ramp', () => {
    const next = deriveState({ light: blue[950], dark: blue[50] }, 3);
    expect(next.light).toBe(blue[950]);
    expect(next.dark).toBe(blue[50]);
  });

  it('rejects a value that is not a primitive', () => {
    expect(() => deriveState({ light: '#123456', dark: '#654321' }, 1)).toThrow(/recognized/);
  });
});

describe('withInteractionStates', () => {
  it('derives only the states a component reads', () => {
    const keys = (group: string) =>
      Object.keys(defaultTheme.colors[group as 'primary']).filter((k) =>
        /-(hover|active)$/.test(k),
      );
    expect(keys('secondary').sort()).toEqual([
      'on-secondary-container-active',
      'on-secondary-container-hover',
      'secondary-container-hover',
    ]);
    expect(keys('primary')).toContain('default-hover');
    expect(keys('primary')).toContain('default-active');
  });
});
