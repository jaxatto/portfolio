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

  it('every token a component reads is defined', () => {
    const files = walk(resolve(root, 'src')).filter(
      (file) => /\.(css|tsx)$/.test(file) && file !== resolve(root, 'src/styles/theme.css'),
    );
    const sources = files.map((file) => readFileSync(file, 'utf8'));
    const defined = new Set(lines.map(name));
    // Custom properties a component or its inline style sets for itself.
    for (const source of sources) {
      for (const m of source.matchAll(/(--[\w-]+)\s*:/g)) defined.add(m[1]);
      for (const m of source.matchAll(/['"`](--[\w-]+)['"`]/g)) defined.add(m[1]);
    }
    const missing = sources.flatMap((source, i) =>
      [...source.matchAll(/var\((--[\w-]+)/g)]
        .map((m) => m[1])
        .filter((ref) => !ref.endsWith('-') && !defined.has(ref))
        .map((ref) => `${relative(root, files[i])}: ${ref}`),
    );
    expect(missing).toEqual([]);
  });

  it('components apply type through the generated classes, not the text-style tokens', () => {
    // A rule inside a media query cannot switch a class, so it may read a style's size and line height.
    const allowed = new Set(['src/components/StudyCard/StudyCard.module.css']);
    const offenders = walk(resolve(root, 'src'))
      .filter(
        (file) =>
          /\.css$/.test(file) &&
          file !== resolve(root, 'src/styles/theme.css') &&
          file !== resolve(root, 'src/styles/type.module.css'),
      )
      .filter((file) => /var\(\s*--font-style-/.test(readFileSync(file, 'utf8')))
      .map((file) => relative(root, file))
      .filter((file) => !allowed.has(file));
    expect(offenders).toEqual([]);
  });

  it('no stylesheet composes from the type module', () => {
    const offenders = walk(resolve(root, 'src'))
      .filter((file) => /\.css$/.test(file))
      .filter((file) => /composes:[^;]*type\.module\.css/.test(readFileSync(file, 'utf8')))
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
