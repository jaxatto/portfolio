// Writes one HTML file per route into dist/ with that page's own title, description, canonical and
// social tags. Crawlers and link previews do not run JavaScript, so without this every shared link
// would preview as the home page. The app still renders the page and Meta keeps the title and
// description current on client navigation. GitHub Pages serves dist/<route>/index.html at /<route>.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { meta as about } from '../src/pages/About/resources/meta';
import { meta as resume } from '../src/pages/Resume/resources/meta';
import actblue from '../src/pages/Studies/pages/ActBlue/meta';
import indeed from '../src/pages/Studies/pages/Indeed/meta';
import servicenow from '../src/pages/Studies/pages/ServiceNow/meta';
import toyota from '../src/pages/Studies/pages/Toyota/meta';

const origin = 'https://jaxengeldesign.com';
const dist = join(process.cwd(), 'dist');

type Page = { path: string; title: string; description: string };

const pages: Page[] = [
  { path: '/about', ...pick(about) },
  { path: '/resume', ...pick(resume) },
  ...[actblue, indeed, servicenow, toyota].map((m) => ({
    path: m.linkUrl,
    ...pick(m),
  })),
];

function pick(m: { title: string; description: string }) {
  return { title: m.title, description: m.description };
}

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Replaces the content of the one tag that carries `marker` and fails loudly when index.html changes.
function setContent(html: string, marker: string, value: string) {
  const tag = new RegExp(`(<meta[^>]*${marker}[^>]*content=")[^"]*(")`);
  if (!tag.test(html)) throw new Error(`index.html has no tag matching ${marker}`);
  // A function replacer keeps `$` in the copy ("$1.5M") from being read as a group reference.
  return html.replace(tag, (_, open, close) => `${open}${escape(value)}${close}`);
}

const template = readFileSync(join(dist, 'index.html'), 'utf8');

for (const page of pages) {
  // GitHub Pages serves dist/<route>/index.html at /<route>/ and redirects /<route> there, so the
  // canonical URL is the one it ends on.
  const url = `${origin}${page.path}/`;
  let html = template.replace(
    /<title>[^<]*<\/title>/,
    () => `<title>${escape(page.title)}</title>`,
  );
  html = setContent(html, 'name="description"', page.description);
  html = setContent(html, 'property="og:title"', page.title);
  html = setContent(html, 'property="og:description"', page.description);
  html = setContent(html, 'property="og:url"', url);
  html = html.replace(
    /(<link rel="canonical" href=")[^"]*(")/,
    (_, open, close) => `${open}${url}${close}`,
  );
  const file = join(dist, page.path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

console.log(`Wrote ${pages.length} route pages with their own meta tags.`);
