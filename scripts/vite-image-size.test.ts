import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { readImageSize } from './vite-image-size';

const samples = join(__dirname, '../src/assets/samples');

describe('readImageSize', () => {
  it('reads a lossy WebP header', () => {
    expect(readImageSize(join(samples, 'toyota-sample-min.webp'))).toEqual({
      width: 1000,
      height: 672,
    });
  });

  it('reads a PNG header', () => {
    expect(readImageSize(join(samples, 'servicenow-sample-min.png'))).toEqual({
      width: 832,
      height: 560,
    });
  });
});
