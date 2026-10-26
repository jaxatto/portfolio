// Pre-renders every route at build time (D-154). For each route it renders the React tree to HTML with
// the server build (.ssr/entry-server), puts that HTML into #root of dist/index.html, and writes the
// route's own title, description, canonical and social tags plus the CSS and chunk it needs. A visitor
// and a crawler both get the finished page in the first response, and React attaches to it in the
// browser. GitHub Pages serves dist/<route>/index.html at /<route> and dist/404.html for unknown paths.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { meta as about } from '../src/pages/About/resources/meta';
import { meta as resume } from '../src/pages/Resume/resources/meta';
import actblue from '../src/pages/Studies/pages/ActBlue/meta';
import indeed from '../src/pages/Studies/pages/Indeed/meta';
import servicenow from '../src/pages/Studies/pages/ServiceNow/meta';
import toyota from '../src/pages/Studies/pages/Toyota/meta';

const origin = 'https://jaxengeldesign.com';
const dist = join(process.cwd(), 'dist');
const ssrDir = join(process.cwd(), '.ssr');

// `chunk` is the route's lazy page in the client manifest. Home ships in the entry bundle.
type Page = { path: string; chunk?: string; title?: string; description?: string };

const studies = 'src/pages/Studies/index.ts';
const pages: Page[] = [
  { path: '/' },
  { path: '/about', chunk: 'src/pages/About/index.ts', ...pick(about) },
  { path: '/resume', chunk: 'src/pages/Resume/index.ts', ...pick(resume) },
  ...[actblue, indeed, servicenow, toyota].map((m) => ({
    path: m.linkUrl,
    chunk: studies,
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

type ManifestChunk = {
  file: string;
  css?: string[];
  imports?: string[];
  isEntry?: boolean;
};

const template = readFileSync(join(dist, 'index.html'), 'utf8');
const manifest: Record<string, ManifestChunk> = JSON.parse(
  readFileSync(join(dist, '.vite', 'manifest.json'), 'utf8'),
);

// A lazy page's CSS and chunks load from script on a client-side visit. In a pre-rendered page the
// styles must be in the HTML, and the chunk is preloaded so React can attach without a wait.
function assetsFor(chunk: string) {
  const css = new Set<string>();
  const js = new Set<string>();
  const walk = (key: string) => {
    const entry = manifest[key];
    if (!entry || entry.isEntry || js.has(entry.file)) return;
    js.add(entry.file);
    entry.css?.forEach((file) => css.add(file));
    entry.imports?.forEach(walk);
  };
  if (!manifest[chunk]) throw new Error(`The client manifest has no chunk ${chunk}`);
  walk(chunk);
  return [
    ...[...css].map((file) => `<link rel="stylesheet" crossorigin href="/${file}">`),
    ...[...js].map((file) => `<link rel="modulepreload" crossorigin href="/${file}">`),
  ].join('\n    ');
}

function build(page: Page, markup: string) {
  let html = template.replace('<!--app-html-->', () => markup);
  if (page.chunk) html = html.replace('</head>', () => `${assetsFor(page.chunk!)}\n  </head>`);
  return html;
}

async function main() {
  // The server bundle is ESM, so it loads with a dynamic import from this CommonJS script.
  const { render } = (await import(pathToFileURL(join(ssrDir, 'entry-server.mjs')).href)) as {
    render: (url: string) => Promise<string>;
  };
  const rendered = new Map<string, string>();
  const notFound: Page = { path: '/no-such-page', chunk: 'src/pages/NotFound/index.ts' };
  const withMarkup = [...pages, notFound];
  for (const page of withMarkup) rendered.set(page.path, await render(page.path));

  for (const page of pages) {
    let html = build(page, rendered.get(page.path) ?? '');
    if (page.title && page.description) {
      // GitHub Pages serves dist/<route>/index.html at /<route>/ and redirects /<route> there, so the
      // canonical URL is the one it ends on.
      const url = `${origin}${page.path}/`;
      html = html.replace(/<title>[^<]*<\/title>/, () => `<title>${escape(page.title!)}</title>`);
      html = setContent(html, 'name="description"', page.description);
      html = setContent(html, 'property="og:title"', page.title);
      html = setContent(html, 'property="og:description"', page.description);
      html = setContent(html, 'property="og:url"', url);
      html = html.replace(
        /(<link rel="canonical" href=")[^"]*(")/,
        (_, open, close) => `${open}${url}${close}`,
      );
    }
    const file = join(dist, page.path, 'index.html');
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
  }

  // GitHub Pages serves this for every path without a file, so it carries the Not Found page.
  writeFileSync(join(dist, '404.html'), build(notFound, rendered.get(notFound.path) ?? ''));

  // One entry per route, with the same trailing-slash URL as its canonical tag.
  const urls = pages.map(
    (page) => `  <url><loc>${origin}${page.path === '/' ? '' : page.path}/</loc></url>`,
  );
  writeFileSync(
    join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
  );

  rmSync(ssrDir, { recursive: true, force: true });
  console.log(`Pre-rendered ${pages.length} routes, 404.html and sitemap.xml.`);
}

main();
