import { expect, test } from '@playwright/test';

// The pre-rendered HTML is the shell a visitor sees before any script runs. Its header and footer must
// read the same as the live page after React attaches, or the page jumps when the script arrives.
const routes = [
  '/',
  '/about/',
  '/resume/',
  '/case-studies/indeed/',
  '/case-studies/actblue/',
  '/case-studies/servicenow/',
  '/case-studies/toyota/',
];

for (const colorScheme of ['light', 'dark'] as const) {
  test.describe(`${colorScheme} shell`, () => {
    for (const route of routes) {
      test(`${route} shell matches the live page`, async ({ browser, baseURL }) => {
        const read = async (javaScriptEnabled: boolean) => {
          const context = await browser.newContext({ baseURL, colorScheme, javaScriptEnabled });
          const page = await context.newPage();
          await page.route('**/umami.is/**', (r) => r.abort());
          await page.goto(route);
          if (javaScriptEnabled) await page.waitForLoadState('networkidle');
          const parts = {
            header: await page.locator('header').first().innerText(),
            footer: await page.locator('footer').innerText(),
          };
          await context.close();
          return parts;
        };

        const shell = await read(false);
        const live = await read(true);
        expect(shell.header).toBe(live.header);
        expect(shell.footer).toBe(live.footer);
      });
    }
  });
}
