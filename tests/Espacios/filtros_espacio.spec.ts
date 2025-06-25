import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import fs from 'fs';

test('Valido flitros de espacios', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Iniciar sesión
  await loginPage.goto();
  await loginPage.login('2457207', 'SantiG2120');
  await expect(page).toHaveURL('https://d3sonsptsb4oi5.cloudfront.net/');

  // Ingresar a la sección de Espacios
  await page.locator('app-sidebar').getByText('Espacios', { exact: true }).click();
  await page.waitForURL('https://d3sonsptsb4oi5.cloudfront.net/espacios');
  await expect(page).toHaveURL('https://d3sonsptsb4oi5.cloudfront.net/espacios');

  // Leer el nombre del último espacio creado desde archivo
  const ultimoEspacio = fs.readFileSync('ultimoEspacio.txt', 'utf-8').trim();

  // Buscar por nombre
  const buscador = page.getByRole('textbox', { name: 'Buscar' });
  await buscador.click();
  await buscador.fill(ultimoEspacio);
  await page.waitForTimeout(1000); 

  // Validar que encontró el espacio
  await expect(page.getByRole('cell', { name: ultimoEspacio })).toBeVisible();

  // Limpiar el buscador
  await buscador.fill('');

  // Filtrar por ubicación o tipo si querés agregar validaciones adicionales
  await page.getByRole('button', { name: 'Ubicación' }).click();
  await page.locator('button[role="menuitem"]').filter({ hasText: 'Campus Universitario' }).click();

  // await page.getByRole('menuitem', { name: 'Campus Universitario' }).click();

  const celdaUbicacion = page.getByRole('cell', { name: 'Campus Universitario' }).first();
  await expect(celdaUbicacion).toBeVisible();
});

