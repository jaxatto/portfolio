import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { findRawValues, holdsRawValue } from './build-theme/rawValues';

const root = resolve(__dirname, '../..');
const themeCss = readFileSync(resolve(root, 'src/styles/theme.css'), 'utf8');
const lines = themeCss.split('\n').filter((line) => /^\s*--[\w-]+:/.test(line));
const name = (line: string) => line.trim().split(':')[0];
const semantic = lines.filter((line) => !name(line).startsWith('--primitive-'));

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

describe('primitive and semantic tokens stay in their own layers', () => {
  it('every semantic token holds references only, never a raw value', () => {
    expect(findRawValues(semantic)).toEqual([]);
  });

  it('no semantic token is named for a value', () => {
    const valueNamed = semantic.map(name).filter((n) => /-\d+(px|rem|%)?$/.test(n));
    expect(valueNamed).toEqual([]);
  });

  it('every reference in a semantic token points at a defined token', () => {
    const defined = new Set(lines.map(name));
    const missing = semantic.flatMap((line) =>
      [...line.matchAll(/var\((--[\w-]+)\)/g)].map((m) => m[1]).filter((ref) => !defined.has(ref)),
    );
    expect(missing).toEqual([]);
  });

  it('nothing outside the token setup reads a primitive', () => {
    const files = [
      ...walk(resolve(root, 'src')),
      ...walk(resolve(root, 'e2e')),
      resolve(root, 'index.html'),
    ].filter(
      (file) =>
        !file.startsWith(resolve(root, 'src/tokens')) &&
        file !== resolve(root, 'src/styles/theme.css') &&
        /\.(css|ts|tsx|html)$/.test(file),
    );
    const offenders = files
      .filter((file) => /--primitive-|tokens\/primitives/.test(readFileSync(file, 'utf8')))
      .map((file) => relative(root, file));
    expect(offenders).toEqual([]);
  });

  it('recognises a raw value', () => {
    expect(holdsRawValue('16px')).toBe(true);
    expect(holdsRawValue('clamp(var(--a), 1rem + 2vw, var(--b))')).toBe(true);
    expect(holdsRawValue('clamp(var(--a), var(--b), var(--c))')).toBe(false);
    expect(holdsRawValue('var(--primitive-size-space-4)')).toBe(false);
  });
});
