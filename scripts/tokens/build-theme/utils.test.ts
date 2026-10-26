import { describe, expect, it } from 'vitest';
import { cssVarName, isColorMode, isFluidValue, toKebabCase } from './utils';

describe('toKebabCase', () => {
  it('splits camelCase and lowercases', () => {
    expect(toKebabCase('bodyMd')).toBe('body-md');
    expect(toKebabCase('size2xl')).toBe('size2xl');
    expect(toKebabCase('h1Size')).toBe('h1-size');
  });
});

describe('cssVarName', () => {
  it('joins kebab-cased parts under a -- prefix', () => {
    expect(cssVarName('color', 'brandDefault')).toBe('--color-brand-default');
  });
});

describe('type guards', () => {
  it('recognises a light/dark pair', () => {
    expect(isColorMode({ light: '#fff', dark: '#000' })).toBe(true);
    expect(isColorMode({ light: '#fff' })).toBe(false);
    expect(isColorMode(null)).toBe(false);
  });

  it('recognises a fluid value', () => {
    expect(isFluidValue({ min: 1, preferred: 2, max: 3 })).toBe(true);
    expect(isFluidValue({ min: 1, max: 3 })).toBe(false);
    expect(isFluidValue('1rem')).toBe(false);
  });
});
