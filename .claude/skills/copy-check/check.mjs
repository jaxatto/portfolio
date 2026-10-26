#!/usr/bin/env node
// Copy lint for the portfolio (see SKILL.md and the Copy voice rules in CLAUDE.md).
// Usage: node .claude/skills/copy-check/check.mjs [file or folder ...]   (default: src/pages src/components)
// Pattern based, so it flags candidates for a human read. It does not replace one.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const targets = process.argv.slice(2).length ? process.argv.slice(2) : ['src/pages', 'src/components'];
const exts = new Set(['.ts', '.tsx']);

const walk = (p) => {
  const s = statSync(p);
  if (s.isDirectory()) return readdirSync(p).flatMap((f) => walk(join(p, f)));
  return exts.has(extname(p)) ? [p] : [];
};

// Pull prose out of a source file: string literals and JSX text with enough words to be a sentence.
const extract = (file) => {
  const out = [];
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    const t = line.trim();
    if (t.startsWith('//') || t.startsWith('*') || t.startsWith('/*') || t.startsWith('import ')) return;
    const found = [];
    for (const m of line.matchAll(/'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"|`([^`]*)`/g)) {
      found.push((m[1] ?? m[2] ?? m[3]).replace(/\\'/g, "'"));
    }
    for (const m of line.matchAll(/>([^<>{}]{20,})</g)) found.push(m[1]);
    for (const text of found) {
      const words = text.trim().split(/\s+/);
      if (words.length < 5) continue;
      if (/[{}=]|var\(|https?:|\.(png|jpg|svg)|^[./@#]/.test(text) || /^[a-z-]+( [a-z-]+)*$/.test(text)) continue;
      out.push({ file, line: i + 1, text: text.trim() });
    }
  });
  return out;
};

const verbs = '(?:was|were|is|are|has|have|had|will|would|can|could|did|does|replaced|helped|led|built|made)';
const rules = [
  { id: 'em-dash', level: 'error', re: /—| -- /, msg: 'No em dashes in sentences. Use a comma or a full stop.' },
  { id: 'semicolon', level: 'error', re: /(?<!&[a-z]{2,6});/, msg: 'No semicolons in sentences. Split into two sentences.' },
  {
    id: 'contrast',
    level: 'error',
    re: /\b(rather than|instead of|more than just|not just|not only|isn[’']t [^,.]{1,40}, (it|but)|not [^,.]{1,40}(, but |,? but | ?, (it|that|this|they|we|i)(['’]s| is|'re| are) ))/i,
    msg: 'No "it\'s not X, it\'s Y" contrast phrasing. State what Jax does directly.',
  },
  {
    id: 'interrupting-clause',
    level: 'error',
    // "The ICL, which was strict, was replaced": a comma-set clause between the subject and its verb.
    re: new RegExp(`^[A-Z][^,.]{2,70}, [^,.]{3,90}, ${verbs}\\b`),
    msg: 'Interrupting clause between subject and verb. Put them together and give the detail its own sentence.',
    perSentence: true,
  },
  {
    id: 'which-mid',
    level: 'warn',
    re: /^[^,.]{3,70}, (which|who|whose) /,
    msg: '", which/who" right after the subject. Check it is not splitting subject from verb.',
    perSentence: true,
  },
  {
    id: 'buzzword',
    level: 'warn',
    re: /\b(significantly|systematic|leverag\w+|robust|seamless\w*|holistic|synerg\w+|cutting-edge|world-class|passionate|utili[sz]e|production-ready|true engineering|in order to)\b/i,
    msg: 'Buzzword or filler. Replace it with a concrete detail.',
  },
];

// `**phrase**` marks a highlighted phrase in study copy (D-081): ignore the markers so they never hide a sentence break.
const sentences = (text) => text.replace(/\*\*/g, '').split(/(?<=[.!?])\s+(?=[A-Z"“‘'])/);
const wordCount = (s) => s.trim().split(/\s+/).length;

// Headings and labels use sentence case. Names and acronyms keep their capitals.
const properNouns = new Set(
  ['Jax', 'Engel', 'Toyota', 'PRIME', 'ActBlue', 'ServiceNow', 'Indeed', 'Visa', 'Spectrum', 'Albertsons', 'Routable', 'FireHydrant', 'Salesforce', 'Figma', 'Zelda', 'Kirby', 'Midna', 'Beau', 'Fort', 'Worth', 'Texas', 'WCAG', 'AI', 'PDF', 'CSS', 'Texas', 'Remote', 'Blueprint', 'FigJam', 'UX', 'UI'],
);
const headingSources = [
  /<h[1-6][^>]*>([^<>{}]{3,80})</g,
  /\b(?:label|heading):\s*'((?:[^'\\]|\\.)+)'/g,
  /^\s*'([A-Z][^':]{2,60}): /g, // "Label: sentence" strings (About)
];
const titleCase = (text) => {
  const words = text.trim().split(/\s+/);
  if (words.length < 2 || words.length > 8) return false;
  return words.slice(1).some((w) => /^[A-Z][a-z]/.test(w) && !properNouns.has(w.replace(/[^A-Za-z]/g, '')));
};

let errors = 0;
let warnings = 0;
const report = (item, level, id, msg, excerpt) => {
  if (level === 'error') errors++;
  else warnings++;
  console.log(`${item.file}:${item.line}  ${level.toUpperCase()}  ${id}: ${msg}\n    ${excerpt.slice(0, 200)}`);
};

for (const file of targets.flatMap(walk)) {
  for (const item of extract(file)) {
    for (const rule of rules) {
      if (rule.perSentence) {
        for (const s of sentences(item.text)) if (rule.re.test(s)) report(item, rule.level, rule.id, rule.msg, s);
      } else if (rule.re.test(item.text)) {
        report(item, rule.level, rule.id, rule.msg, item.text);
      }
    }
    for (const s of sentences(item.text)) {
      const n = wordCount(s);
      if (n > 30) report(item, 'error', 'run-on', `Sentence has ${n} words. Split it.`, s);
      else if (n > 25) report(item, 'warn', 'long-sentence', `Sentence has ${n} words. Consider splitting.`, s);
    }
  }
}

for (const file of targets.flatMap(walk)) {
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    if (line.trim().startsWith('//')) return;
    for (const re of headingSources) {
      for (const m of line.matchAll(re)) {
        if (titleCase(m[1])) report({ file, line: i + 1 }, 'error', 'title-case', 'Headings and labels use sentence case.', m[1]);
      }
    }
  });
}

console.log(`\ncopy-check: ${errors} error(s), ${warnings} warning(s)`);
process.exit(errors ? 1 : 0);
