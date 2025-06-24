import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

test('Ingreso a la sección de Equipamientos', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('2457207', 'SantiG2120');

  await expect(page).toHaveURL('https://d3sonsptsb4oi5.cloudfront.net/');


  await page.click('text=Equipamiento');

  //Validación que ingreso a la sección de Equipamientos
  await expect(page).toHaveURL('https://d3sonsptsb4oi5.cloudfront.net/equipamiento');



});
