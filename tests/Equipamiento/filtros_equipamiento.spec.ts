import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import fs from 'fs';

test('Validación de filtros de Equipamientos', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('2457207', 'SantiG2120');

  await expect(page).toHaveURL('https://d3sonsptsb4oi5.cloudfront.net/');


  await page.click('text=Equipamiento');

  //Validación que ingreso a la sección de Equipamientos
  await expect(page).toHaveURL('https://d3sonsptsb4oi5.cloudfront.net/equipamiento');

  // Leer el nombre del último equipamiento creado
  const nuevoNombre = fs.readFileSync('ultimoEquipamiento.txt', 'utf-8').trim();

  await page.getByPlaceholder('Buscar...').click();
  // Buscar el equipamiento en la lista
  await page.getByPlaceholder('Buscar...').fill(nuevoNombre);
  await page.waitForTimeout(1000); 

  //Valido que encontro el equipamiento
  await expect(page.getByRole('cell', { name: nuevoNombre })).toBeVisible();

  //Borro el buscador
  await page.getByPlaceholder('Buscar...').click();
  await page.getByPlaceholder('Buscar...').fill('');

  //Flitro por Tipo
    await page.getByRole('button', { name: 'Tipo' }).click();
  await page.getByRole('menuitem', { name: 'Otros equipamientos' }).click();


  // Buscá la celda que tenga exactamente ese texto:
  const celdaTipo = page.getByRole('cell', { name: 'Otros equipamientos' }).first()


  // Validá que esté visible
  await expect(celdaTipo).toBeVisible();


  




});
