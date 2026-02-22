import { test, expect } from '@playwright/test';

// Smoke test
test('smoke: Open Dashboard', async ({ page }) => {
  await page.goto('https://www.amazon.in/');
  await expect(page).toHaveTitle(/Amazon/);
});

// Regression test
test('regression: Search for mobile', async ({ page }) => {
  await page.goto('https://www.amazon.in/');
  await page.locator('#twotabsearchtextbox').fill('mobile');
  await page.locator('#nav-search-submit-text').click();

});
