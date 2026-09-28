import { chromium } from 'playwright';
import { preview } from 'vite';

// Checks that study card titles fit in 3 lines at every width and are never clipped.
// Run after `npm run build`:  npm run check:cards [-- --stress]
// --stress widens letter-spacing (STRESS_EM, default 0.05) to simulate wider fonts, a
// safety margin when web fonts are unavailable. Set PLAYWRIGHT_CHROMIUM_PATH to use a specific Chromium binary.

const MAX_LINES = 3;
const widths = [320, 360, 375, 414, 600, 720, 768, 900, 901, 1024, 1160, 1440];
const stress = process.argv.includes('--stress');
const stressEm = process.env.STRESS_EM ?? '0.05';

const server = await preview({ preview: { port: 4199, open: false } });
const browser = await chromium.launch({
	executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined,
});

let failures = 0;
for (const width of widths) {
	const page = await browser.newPage({ viewport: { width, height: 900 } });
	await page.goto('http://localhost:4199/');
	await page.evaluate(() => document.fonts.ready);
	if (stress)
		await page.addStyleTag({
			content: `h3 { letter-spacing: ${stressEm}em !important; }`,
		});
	await page.waitForTimeout(200);

	const titles = await page.$$eval('main h3', (nodes) =>
		nodes.map((node) => {
			const el = node as HTMLElement;
			const style = getComputedStyle(el);
			const lineHeight =
				parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.2;
			return {
				text: el.textContent ?? '',
				lines: Math.round(el.getBoundingClientRect().height / lineHeight),
				fontSize: parseFloat(style.fontSize),
				clipped:
					el.scrollWidth > el.clientWidth + 1 ||
					el.scrollHeight > el.clientHeight + 1,
			};
		}),
	);
	for (const title of titles) {
		const bad = title.lines > MAX_LINES || title.clipped;
		if (bad) failures++;
		console.log(
			`${bad ? '✗' : '✓'} ${String(width).padStart(4)}px  ${title.lines} lines @ ${title.fontSize.toFixed(1)}px  ${title.text.slice(0, 40)}`,
		);
	}
	await page.close();
}

await browser.close();
await server.close();
console.log(
	failures
		? `\n${failures} title(s) exceed ${MAX_LINES} lines or are clipped`
		: `\nAll titles fit in ${MAX_LINES} lines`,
);
process.exit(failures ? 1 : 0);
