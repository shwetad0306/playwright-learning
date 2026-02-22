import { test , expect } from '@playwright/test';

// test.use({storageState: 'storageStage.json'});

// Open Dashboard 
test('Open Dashboard' ,  async ({ page }) => {
    await page.goto('https://www.amazon.in/'); //base url 
    await page.waitForTimeout(1000);
    
});
// Amazon Login 
test('Amazon Login' , async ({ page }) => {
    await page.goto('https://www.amazon.in/');
    await page.waitForTimeout(1000);


    await page.locator('#nav-link-accountList').click();

    await page.locator('#ap_email_login').fill('shwetapanchras@gmail.com');
    await page.locator('#continue').click();
    await page.waitForTimeout(1000);

    await page.locator('#ap_password').fill('Alpha123!!');
    await page.locator('#signInSubmit').click();
    await page.waitForTimeout(1000);

})
// Verify searchBox
test (' Click on Search Box' , async ({ page }) => {

    await page.goto('https://www.amazon.in/');
    await page.waitForTimeout(1000);


    await page.locator('#nav-link-accountList').click();

    await page.locator('#ap_email_login').fill('shwetapanchras@gmail.com');
    await page.locator('#continue').click();
    await page.waitForTimeout(1000);

    await page.locator('#ap_password').fill('Alpha123!!');
    await page.locator('#signInSubmit').click();
    await page.waitForTimeout(1000);

    await page.locator('#twotabsearchtextbox').fill('mobile');
    await page.waitForTimeout(1000);

    await page.locator('#nav-search-submit-text').click();
    await page.waitForTimeout(1000);

})