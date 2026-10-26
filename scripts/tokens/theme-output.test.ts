import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, it } from 'vitest';

const root = resolve(__dirname, '../..');
const generated = ['src/styles/theme.css', 'src/tokens/themeColor.ts'].map((p) => resolve(root, p));

// Catches a token edit committed without `npm run build:theme`.
it('committed theme files match what the token source compiles to', () => {
  const before = generated.map((p) => readFileSync(p, 'utf8'));
  try {
    execFileSync('npx', ['tsx', 'scripts/tokens/build-theme.ts'], { cwd: root, stdio: 'pipe' });
    const after = generated.map((p) => readFileSync(p, 'utf8'));
    expect(after).toEqual(before);
  } finally {
    generated.forEach((p, i) => writeFileSync(p, before[i]));
  }
}, 30_000);
