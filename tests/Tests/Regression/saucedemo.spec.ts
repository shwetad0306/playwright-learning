import { test, expect, Page } from '@playwright/test';

const SAUCE_USER = 'standard_user';
const SAUCE_PASS = 'secret_sauce';

test.use({ storageState: 'storageState.json' });

async function ensureLoggedIn(page: Page) {
  await page.goto('/');
  if (page.url().includes('/inventory.html')) return;
  // If login form is present, perform login
  const username = page.locator('#user-name');
  if (await username.count() > 0) {
    await username.fill(SAUCE_USER);
    await page.locator('#password').fill(SAUCE_PASS);
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/inventory.html/, { timeout: 5000 });
    // optional: await page.context().storageState({ path: 'storageState.json' });
  } else {
    // fallback: navigate to inventory and let expectation handle failures
    await page.goto('/inventory.html');
  }
}

test('Open SauceDemo homepage', async ({ page }) => {
  await ensureLoggedIn(page);
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('Add product to cart', async ({ page }) => {
  await ensureLoggedIn(page);
  await page.goto('/inventory.html');
  await expect(page).toHaveURL(/inventory.html/);

  const addBtn = page.locator('#add-to-cart-sauce-labs-backpack');
  await expect(addBtn).toBeVisible({ timeout: 5000 });
  await addBtn.click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

test('Verify product in cart', async ({ page }) => {
  await ensureLoggedIn(page);
  await page.goto('/inventory.html');

  const addBtn = page.locator('#add-to-cart-sauce-labs-backpack');
  await expect(addBtn).toBeVisible({ timeout: 5000 });
  await addBtn.click();

  await page.locator('.shopping_cart_link').click();
  await expect(page.locator('.title')).toHaveText('Your Cart');
  await expect(page.locator('#remove-sauce-labs-backpack')).toBeVisible();
});

test('Remove product from cart', async ({ page }) => {
  await ensureLoggedIn(page);
  await page.goto('/inventory.html');

  const addBtn = page.locator('#add-to-cart-sauce-labs-backpack');
  await expect(addBtn).toBeVisible({ timeout: 5000 });
  await addBtn.click();

  await page.locator('.shopping_cart_link').click();
  await page.locator('#remove-sauce-labs-backpack').click();

  // badge may disappear — assert there is no badge element or it's empty
  const badge = page.locator('.shopping_cart_badge');
  await expect(badge).toHaveCount(0);
});
