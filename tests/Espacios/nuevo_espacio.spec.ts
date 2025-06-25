import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { generarNumeroDosDigitos } from '../../utils/generadores';
import fs from 'fs';

test('Creación de un Nuevo Espacio sin ID', async ({ page }) => {
  const loginPage = new LoginPage(page);


  await loginPage.goto();
  await loginPage.login('2457207', 'SantiG2120');
  
  // Espera explícita en vez de timeout fijo
  await page.waitForURL('https://d3sonsptsb4oi5.cloudfront.net/');
  await expect(page).toHaveURL('https://d3sonsptsb4oi5.cloudfront.net/');

  // Seleccionamos la sección de Espacios
  await page.locator('app-sidebar').getByText('Espacios', { exact: true }).click();
  await page.waitForURL('https://d3sonsptsb4oi5.cloudfront.net/espacios');
  await expect(page).toHaveURL('https://d3sonsptsb4oi5.cloudfront.net/espacios');

  // Nuevo espacio
  await page.click('text=Nuevo Espacio');
  await page.click('text=Comenzar');

  // Espera a que el mat-select esté listo y selecciona la opción
  await page.waitForSelector('#mat-select-0');
  await page.click('#mat-select-0');
  await page.click('mat-option >> text=Campus Universitario');

  // Seleccionar sector
  await page.locator('div').filter({ hasText: /^Seleccionar sector$/ }).first().click();
  await page.click('mat-option >> text=Matteo Ricci');

  // Seleccionar ubicación
  await page.locator('#mat-mdc-form-field-label-8').getByText('Ubicación').click();
  await page.getByRole('option', { name: 'PB' }).click();

  let numero = generarNumeroDosDigitos();
  let intento = 0;
  const maxIntentos = 10;
  let numeroValido = false;

  while (intento < maxIntentos && !numeroValido) {
    await page.getByText('N° del espacio').click();
    await page.getByText('N° del espacio').fill(numero.toString());

    // Esperar un breve tiempo a que aparezca el mensaje (puede ajustarse)
    await page.waitForTimeout(500);

    const errorLocator = page.getByText('Este n° ya existe');

    if (await errorLocator.isVisible()) {
      numero += 1;
      intento += 1;
    } else {
      numeroValido = true;
    }
  }

  if (!numeroValido) {
    throw new Error('No se pudo generar un número válido de espacio luego de varios intentos.');
  }

  const nombreEspacio = `Nuevo Espacio ${numero}`;

  await page.waitForTimeout(3000);
  // Seleccionar tipo
  await page.getByText('Seleccionar tipo').click();
  await page.getByRole('option', { name: 'Aula' }).click();

  // Completar nombre con el nombre dinámico generado
  await page.getByRole('textbox', { name: 'Nombre' }).click();
  await page.getByRole('textbox', { name: 'Nombre' }).fill(nombreEspacio);

  // Siguiente pasos
  await page.getByRole('button', { name: 'Siguiente' }).click();
  await page.getByRole('button').filter({ hasText: 'add' }).first().click();
  await page.getByRole('button', { name: 'Siguiente' }).click();
  await page.getByRole('button', { name: 'Siguiente' }).click();
  await page.getByRole('button', { name: 'Finalizar y crear' }).click();


  //Validar el snackbar
  await expect(page.getByText('El espacio fue creado con exito')).toBeVisible();

  // Búsqueda para validar que el espacio fue creado
  await page.getByRole('textbox', { name: 'Buscar' }).click();
  await page.getByRole('textbox', { name: 'Buscar' }).fill(nombreEspacio);

  // Validación de que existe en el listado el nuevo espacio
  await expect(page.getByRole('cell', { name: nombreEspacio })).toBeVisible();

   fs.writeFileSync('ultimoEspacio.txt', nombreEspacio);



});
