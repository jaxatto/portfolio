import { expect, test } from '@playwright/test';

// Every page is pre-rendered and React attaches to it (D-159). A mismatch between the HTML and the first
// client render shows up as a page error, so any error here means the two have drifted apart.
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
  test.describe(`${colorScheme} hydration`, () => {
    test.use({ colorScheme });

    for (const route of routes) {
      test(`${route} attaches without errors`, async ({ page }) => {
        const errors: string[] = [];
        page.on('pageerror', (error) => errors.push(error.message));
        page.on('console', (message) => {
          if (message.type() === 'error') errors.push(message.text());
        });
        await page.route('**/cloud.umami.is/**', (r) => r.abort());
        await page.goto(route);
        await page.waitForLoadState('networkidle');
        await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
        expect(errors.filter((e) => !e.startsWith('Failed to load resource'))).toEqual([]);
      });
    }

    // The preview server answers an unknown path with index.html. GitHub Pages answers with 404.html.
    test('404.html attaches without errors', async ({ page, request }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      const body = await (await request.get('/404.html')).text();
      await page.route('**/cloud.umami.is/**', (r) => r.abort());
      await page.route('**/no-such-page', (r) =>
        r.fulfill({ status: 404, contentType: 'text/html', body }),
      );
      await page.goto('/no-such-page');
      await page.waitForLoadState('networkidle');
      await expect(page.locator('h1')).toHaveText('404');
      expect(errors).toEqual([]);
    });
  });
}
