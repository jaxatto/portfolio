import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = resolve(__dirname, '..');
const src = resolve(root, 'src');

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const cssModules = walk(src).filter((file) => file.endsWith('.module.css'));
const tsxFiles = walk(src).filter((file) => file.endsWith('.tsx'));

// Class selectors in a stylesheet, with comments, strings and url() removed first.
const classesIn = (css: string) => {
  const clean = css.replace(/\/\*[\s\S]*?\*\/|url\([^)]*\)|'[^']*'|"[^"]*"/g, '');
  return new Set([...clean.matchAll(/\.([A-Za-z_][\w-]*)(?=[\s,{:.>+~[)]|$)/gm)].map((m) => m[1]));
};
const camel = (name: string) => name.replace(/-(\w)/g, (_, c: string) => c.toUpperCase());

describe('class names', () => {
  it('are kebab-case in every CSS module', () => {
    const offenders = cssModules.flatMap((file) =>
      [...classesIn(readFileSync(file, 'utf8'))]
        .filter((name) => !/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(name))
        .map((name) => `${relative(root, file)}: .${name}`),
    );
    expect(offenders).toEqual([]);
  });

  it('are read in markup with dot access, `styles.navLink`', () => {
    const offenders = tsxFiles
      .filter((file) =>
        /\b(styles|typography|palettes)\['[^']+'\]/.test(readFileSync(file, 'utf8')),
      )
      .map((file) => relative(root, file));
    expect(offenders).toEqual([]);
  });

  it('that markup reads exist in the module it imports', () => {
    const missing = tsxFiles.flatMap((file) => {
      const source = readFileSync(file, 'utf8');
      return [...source.matchAll(/import (\w+) from '([^']+\.module\.css)'/g)].flatMap((imp) => {
        const [, id, spec] = imp;
        const path = spec.startsWith('#styles/')
          ? resolve(src, 'styles', spec.slice('#styles/'.length))
          : resolve(dirname(file), spec);
        const known = new Set([...classesIn(readFileSync(path, 'utf8'))].map(camel));
        return [...source.matchAll(new RegExp(`\\b${id}\\.(\\w+)`, 'g'))]
          .map((m) => m[1])
          .filter((name) => !known.has(name))
          .map((name) => `${relative(root, file)}: ${id}.${name}`);
      });
    });
    expect(missing).toEqual([]);
  });
});
