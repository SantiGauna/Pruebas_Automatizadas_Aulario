import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';


test('Ingreso a la sección de Sectores', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('2457207', 'SantiG2120');
    await page.waitForTimeout(5000);
    await expect(page).toHaveURL('https://d3sonsptsb4oi5.cloudfront.net/');

    //Seleccionamos la sección de Sectores
    await page.locator('app-sidebar').getByText('Espacios', { exact: true }).click();

    //Validación que ingreso a la sección de Sectores
    await expect(page).toHaveURL('https://d3sonsptsb4oi5.cloudfront.net/espacios');
    await page.locator('.mdc-tab__text-label', { hasText: 'Sectores' }).click();
    const botonNuevoSector = page.getByRole('button', { name: 'Nuevo sector' });
    await expect(botonNuevoSector).toBeVisible();
});

