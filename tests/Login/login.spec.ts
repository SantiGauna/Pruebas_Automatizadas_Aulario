import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

test('Verificación de ingreso al Dashboard', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('2457207', 'SantiG2120');

  //Validación de que ingreso al dashboard
  await expect(page).toHaveURL('https://d3sonsptsb4oi5.cloudfront.net/');
});
