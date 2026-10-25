// Renders resume.html to an ATS-friendly PDF with headless Chrome.
// Usage: cd resume && npm install && npm run build
// Set CHROME_PATH if Chrome is not in a standard location.
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer-core';
import { PDFArray, PDFDocument, PDFName, PDFRawStream, decodePDFRawStream } from 'pdf-lib';

const dir = dirname(fileURLToPath(import.meta.url));
// Optional first argument names another source, e.g. `node build.mjs resume-v2` builds resume-v2.html to ..._v2.pdf.
const name = process.argv[2] ?? 'resume';
const out = join(dir, `Jax-Engel_Staff-Product-Designer_Resume_2026${name === 'resume' ? '' : name.replace(/^resume/, '')}.pdf`);

const chrome = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/opt/pw-browsers/chromium',
].find((p) => p && existsSync(p));
if (!chrome) throw new Error('Chrome not found. Set CHROME_PATH.');

const browser = await puppeteer.launch({ executablePath: chrome, headless: true });
const page = await browser.newPage();
await page.goto(pathToFileURL(join(dir, `${name}.html`)).href, { waitUntil: 'networkidle0' });
await page.emulateMediaType('print');
// tagged: true writes the structure tree (headings, lists) so reading order survives.
const bytes = await page.pdf({ preferCSSPageSize: true, printBackground: false, tagged: true, outline: false });
await browser.close();

// Chrome (Skia) darkens mid and light text colors in the PDF, so the CSS purple #6f42c1 prints as #3e256d.
// Vector rules keep their exact color. Swap the darkened text colors back to the CSS values in the content streams.
const textColorFixes = [
  ['.2431 .1451 .4275', '.4353 .2588 .7569'], // #3e256d -> #6f42c1 (--accent)
  ['.3529 .3176 .4235', '.6275 .5647 .7529'], // #5a516c -> #a090c0 (.sep)
];
const fixColors = (pdfDoc) => {
  for (const page of pdfDoc.getPages()) {
    const contents = page.node.Contents();
    const streams = contents instanceof PDFArray ? contents.asArray().map((r) => pdfDoc.context.lookup(r)) : [contents];
    const fixed = streams.map((stream) => {
      let text = Buffer.from(decodePDFRawStream(stream instanceof PDFRawStream ? stream : new PDFRawStream(stream.dict, stream.contents)).decode()).toString('latin1');
      for (const [from, to] of textColorFixes) text = text.split(`${from} RG`).join(`${to} RG`).split(`${from} rg`).join(`${to} rg`);
      return pdfDoc.context.register(pdfDoc.context.flateStream(Buffer.from(text, 'latin1')));
    });
    page.node.set(PDFName.of('Contents'), pdfDoc.context.obj(fixed));
  }
};

// Chrome writes the title from <title> but leaves author empty, so set metadata here.
const pdf = await PDFDocument.load(bytes);
fixColors(pdf);
pdf.setTitle('Jax Engel – Staff Product Designer – Resume 2026');
pdf.setAuthor('Jax Engel');
pdf.setSubject('Resume');
pdf.setKeywords(['Staff Product Designer', 'Design Systems', 'Design Technologist']);
pdf.setCreator('resume/build.mjs');
pdf.setProducer('Headless Chrome');
await writeFile(out, await pdf.save({ useObjectStreams: false }));
console.log(`Wrote ${out} (${pdf.getPageCount()} pages)`);
