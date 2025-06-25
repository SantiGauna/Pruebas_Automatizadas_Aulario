import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import fs from 'fs';
import { generarNumeroAleatorio } from '../../utils/generadores';


const numero = generarNumeroAleatorio();
const nombreEquipamiento = `Nuevo Equipamiento ${numero}`;


test('Creación de Nuevo Equipamiento', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('2457207', 'SantiG2120');

  await page.waitForURL('https://d3sonsptsb4oi5.cloudfront.net/');
  await expect(page).toHaveURL('https://d3sonsptsb4oi5.cloudfront.net/');

  await page.click('text=Equipamiento');

  // Validación que ingresó a la sección Equipamientos
  await expect(page).toHaveURL('https://d3sonsptsb4oi5.cloudfront.net/equipamiento');


  await page.click('text=Nuevo Equipamiento');

  await page.fill('#mat-input-1', nombreEquipamiento);

  await page.click('#mat-select-0');
  await page.locator('mat-option >> text=Otros equipamientos').click();

  await page.click('text="Crear"');

  await page.getByPlaceholder('Buscar...').click();
  await page.getByPlaceholder('Buscar...').fill(nombreEquipamiento);

  //Valido el snackbar
  await expect(page.getByText('Equipamiento creado con éxito')).toBeVisible();
  

  //Valido que este en la lista
  await expect(page.getByRole('cell', { name: nombreEquipamiento, exact: true })).toBeVisible();

  fs.writeFileSync('ultimoEquipamiento.txt', nombreEquipamiento);


});
