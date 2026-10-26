// Vite plugin: `import photo from './photo.jpg?size'` gives `{ src, width, height }` instead of a bare URL.
// The size goes onto <img width height> so the browser reserves the space before a lazy image loads
// (no layout shift). Reads the PNG, JPEG or WebP header at build time, no dependency. D-125.
import { readFileSync } from 'node:fs';
import type { Plugin } from 'vite';

const SUFFIX = '?size';

export function readImageSize(file: string): { width: number; height: number } {
  const bytes = readFileSync(file);
  // PNG: 8-byte signature, then the IHDR chunk with width and height as 32-bit big-endian.
  if (bytes.readUInt32BE(0) === 0x89504e47) {
    return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  }
  // JPEG: walk the marker segments to the first start-of-frame (SOFn) marker.
  if (bytes.readUInt16BE(0) === 0xffd8) {
    let offset = 2;
    while (offset + 9 < bytes.length) {
      if (bytes[offset] !== 0xff) throw new Error(`${file}: bad JPEG marker at ${offset}`);
      const marker = bytes[offset + 1];
      const isFrame = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
      if (isFrame) {
        return { height: bytes.readUInt16BE(offset + 5), width: bytes.readUInt16BE(offset + 7) };
      }
      offset += 2 + bytes.readUInt16BE(offset + 2);
    }
  }
  // WebP: a RIFF container whose first chunk is lossy (VP8), lossless (VP8L) or extended (VP8X).
  if (bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = bytes.toString('ascii', 12, 16);
    if (chunk === 'VP8 ') {
      return {
        width: bytes.readUInt16LE(26) & 0x3fff,
        height: bytes.readUInt16LE(28) & 0x3fff,
      };
    }
    if (chunk === 'VP8L') {
      const bits = bytes.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    if (chunk === 'VP8X') {
      return { width: bytes.readUIntLE(24, 3) + 1, height: bytes.readUIntLE(27, 3) + 1 };
    }
  }
  throw new Error(`${file}: not a PNG, JPEG or WebP`);
}

export function imageSize(): Plugin {
  return {
    name: 'image-size',
    enforce: 'pre',
    async resolveId(source, importer) {
      if (!source.endsWith(SUFFIX)) return null;
      const resolved = await this.resolve(source.slice(0, -SUFFIX.length), importer, {
        skipSelf: true,
      });
      return resolved ? resolved.id + SUFFIX : null;
    },
    load(id) {
      if (!id.endsWith(SUFFIX)) return null;
      const file = id.slice(0, -SUFFIX.length);
      const { width, height } = readImageSize(file);
      return `import src from ${JSON.stringify(file)};\nexport default { src, width: ${width}, height: ${height} };`;
    },
  };
}
