import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = [
  '/',
  '/about',
  '/resume',
  '/case-studies/indeed',
  '/case-studies/actblue',
  '/case-studies/servicenow',
  '/case-studies/toyota',
  '/no-such-page',
];

const viewports = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'phone', width: 375, height: 812 },
];

for (const colorScheme of ['light', 'dark'] as const) {
  for (const viewport of viewports) {
    test.describe(`${colorScheme} ${viewport.name}`, () => {
      test.use({ colorScheme, viewport });

      for (const route of routes) {
        test(`${route} has no axe violations`, async ({ page }) => {
          await page.goto(route);
          await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
          await expect(page.locator('h1')).toHaveCount(1);
          // Lazy images and fonts settle before axe measures contrast.
          await page.waitForLoadState('networkidle');

          const { violations } = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
            .analyze();

          expect(
            violations.map((v) => ({
              id: v.id,
              impact: v.impact,
              nodes: v.nodes.map((n) => n.target.join(' ')),
            })),
          ).toEqual([]);
        });
      }
    });
  }
}

test('keyboard focus is visible on the first tab stop', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const outline = await page.evaluate(() => {
    const style = getComputedStyle(document.activeElement as Element);
    return { style: style.outlineStyle, width: parseFloat(style.outlineWidth) };
  });
  expect(outline.style).not.toBe('none');
  expect(outline.width).toBeGreaterThan(0);
});
