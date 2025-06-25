import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import fs from 'fs';

test('Ingreso a la sección de Sectores', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('2457207', 'SantiG2120');
    await expect(page).toHaveURL('https://d3sonsptsb4oi5.cloudfront.net/');

    await page.locator('app-sidebar').getByText('Espacios', { exact: true }).click();
    await page.waitForURL('https://d3sonsptsb4oi5.cloudfront.net/espacios');
    await expect(page).toHaveURL('https://d3sonsptsb4oi5.cloudfront.net/espacios');
    await page.locator('.mdc-tab__text-label', { hasText: 'Sectores' }).click();
    const botonNuevoSector = page.getByRole('button', { name: 'Nuevo sector' });
    await expect(botonNuevoSector).toBeVisible();


    const ultimoSector = fs.readFileSync('ultimoSector.txt', 'utf8').trim();

    const buscador = page.getByRole('textbox', { name: 'Buscar' });
    await buscador.click();
    await buscador.fill(ultimoSector);
    await page.waitForTimeout(1000); 
    await expect(page.getByRole('cell', { name: ultimoSector })).toBeVisible();
    await buscador.fill('');

    await page.getByRole('button', { name: 'Ubicación' }).click();
    await page.locator('button[role="menuitem"]').filter({ hasText: 'Campus Universitario' }).click();
    const celdaUbicacion = page.getByRole('cell', { name: 'Campus Universitario' }).first();
    await expect(celdaUbicacion).toBeVisible();
});