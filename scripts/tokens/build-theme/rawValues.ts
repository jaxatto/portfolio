// A semantic token holds references and function syntax only. Every number, unit, color and keyword
// value lives in a primitive, so this is how the two layers stay apart.
const stripVarRefs = (value: string) => {
  let out = '';
  for (let i = 0; i < value.length; i++) {
    if (value.startsWith('var(', i)) {
      let depth = 0;
      for (; i < value.length; i++) {
        if (value[i] === '(') depth++;
        if (value[i] === ')' && --depth === 0) break;
      }
      continue;
    }
    out += value[i];
  }
  return out;
};

const syntaxOnly = /^(?:clamp|calc|min|max|[\s,()+*/-])*$/;

export const holdsRawValue = (value: string) => !syntaxOnly.test(stripVarRefs(value));

// Custom property lines (`  --name: value;`) whose value is not made of references.
export const findRawValues = (lines: string[]) =>
  lines.filter((line) => {
    const [, value = ''] = /^\s*--[\w-]+:\s*(.*?);\s*$/.exec(line) ?? [];
    return holdsRawValue(value);
  });
