import { test, expect } from '@playwright/test';

test('Login once and save session', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.waitForTimeout(1000);

  // Fill credentials from .env
  await page.locator('#user-name').fill(process.env.SAUCE_USER!);
  await page.waitForTimeout(1000);
  await page.locator('#password').fill(process.env.SAUCE_PASS!);
  await page.waitForTimeout(1000);
  await page.locator('#login-button').click();
  await page.waitForTimeout(2000);

  // Verify login
  await expect(page).toHaveURL(/inventory/);
  await page.waitForTimeout(1000);

  // Save session for future tests
  await page.context().storageState({ path: 'storageState.json' });
  await page.waitForTimeout(1000);
  console.log('✅ Session saved to storageState.json');
});
