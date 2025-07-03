import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { generarFechaInicio } from '../../utils/generadores';
import { generarFechaFin } from '../../utils/generadores';
import fs from 'fs';

test('Creación de Nuevo Cronograma', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('2457207', 'SantiG2120');
    await page.waitForTimeout(5000);
    await expect(page).toHaveURL('https://d3sonsptsb4oi5.cloudfront.net/');

    //Seleccionamos la sección de Cronograma
    await page.locator('app-sidebar').getByText('Cronogramas', { exact: true }).click();

    //Validación que ingreso a la sección de Cronograma
    await expect(page).toHaveURL('https://d3sonsptsb4oi5.cloudfront.net/cronogramas');


    //Nuevo Cronograma

    //Paso 1
    await page.click('text=Nuevo Cronograma');
    await page.getByRole('combobox', { name: 'Buscar materia o curso' }).click();
    await page.getByRole('combobox', { name: 'Buscar materia o curso' }).fill('Programacion II'); 
    await page.waitForTimeout(5000);
    await page.getByText('PROGRAMACION II0821546').click();
    await page.click('text=Siguiente');

    //Paso 2
    //Cátedra
    await page.getByRole('textbox', { name: 'Cátedra' }).click();
    await page.getByRole('textbox', { name: 'Cátedra' }).fill('A');
 

    //Periodo academico
    await page.getByRole('button', { name: 'Periodo académico' }).click();
    await page.getByRole('button', { name: 'MODULAR'}).click();


    //Días y horarios

    let fechaInicio = generarFechaInicio();
    let fechaFin = generarFechaFin();

    await page.getByRole('textbox', { name: 'Fecha inicio' }).click();
    // await page.getByPlaceholder('Fecha inicio').click();
    await page.getByPlaceholder('Fecha inicio').fill(fechaInicio);

    




});