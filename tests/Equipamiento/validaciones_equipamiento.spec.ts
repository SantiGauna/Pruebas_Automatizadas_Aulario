import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

test('Validaciones de los Equipamientos', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('2457207', 'SantiG2120');
    await page.waitForTimeout(5000);
    await expect(page).toHaveURL('https://d3sonsptsb4oi5.cloudfront.net/');


    await page.click('text=Equipamiento');


});
