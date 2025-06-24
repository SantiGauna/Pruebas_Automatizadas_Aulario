import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import fs from 'fs';

test('Editar el último equipamiento creado', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('2457207', 'SantiG2120');

  await page.waitForURL('https://d3sonsptsb4oi5.cloudfront.net/');
  await expect(page).toHaveURL('https://d3sonsptsb4oi5.cloudfront.net/');

  await page.click('text=Equipamiento');

  // Validar que estamos en la sección
  await expect(page).toHaveURL('https://d3sonsptsb4oi5.cloudfront.net/equipamiento');

  // Leer el nombre del último equipamiento creado
  const nombreEquipamiento = fs.readFileSync('ultimoEquipamiento.txt', 'utf-8').trim();

  // Buscar el equipamiento en la lista
  await page.getByPlaceholder('Buscar...').fill(nombreEquipamiento);
  await page.waitForTimeout(1000); // esperar un poco para que filtre la lista

  // Hacer clic en el botón/ícono de editar del equipamiento
 await page.locator(`tr:has-text("${nombreEquipamiento}") button[mattooltip="Editar"]`).first().click();



  // Cambiar el nombre (ejemplo: agregar " - Editado")
  const nuevoNombre = nombreEquipamiento + ' - Editado';

  await page.fill('#mat-input-1', nuevoNombre);

  // Guardar los cambios
  await page.click('text=Guardar');

  await page.waitForSelector('#miElemento');

  // Validar snackbar de éxito
  await expect(page.getByText('Equipamiento editado con éxito')).toBeVisible({ timeout: 10000 });

  // Validar que el nuevo nombre aparezca
  await page.getByPlaceholder('Buscar...').fill(nuevoNombre);
  await expect(page.getByRole('cell', { name: nuevoNombre, exact: true })).toBeVisible();
    fs.writeFileSync('ultimoEquipamiento.txt', nuevoNombre);
});
