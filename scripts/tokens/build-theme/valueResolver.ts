import type { PrimitiveDomain, PrimitiveFontMaps, PrimitiveMaps, ResolveValue } from './types';

type ResolverOptions = {
  primitiveFontMaps: PrimitiveFontMaps;
  primitiveMaps: PrimitiveMaps;
};

export function createValueResolver({
  primitiveFontMaps,
  primitiveMaps,
}: ResolverOptions): ResolveValue {
  return (val: unknown, domain: PrimitiveDomain = 'size', fontCategory?: string) => {
    if (typeof val === 'string' || typeof val === 'number') {
      return (
        (fontCategory ? primitiveFontMaps[fontCategory]?.get(val) : undefined) ??
        primitiveMaps[domain].get(val) ??
        primitiveMaps.size.get(val) ??
        String(val)
      );
    }

    return String(val);
  };
}
