import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { generarNumeroAleatorio } from '../../utils/generadores';
import { generaLetraAleatorio } from '../../utils/generadores';
import fs from 'fs';


test('Creación de un Nuevo Sector', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('2457207', 'SantiG2120');
    await page.waitForURL('https://d3sonsptsb4oi5.cloudfront.net/');
    await expect(page).toHaveURL('https://d3sonsptsb4oi5.cloudfront.net/');


    //Seleccionamos la sección de Sectores
    await page.locator('app-sidebar').getByText('Espacios', { exact: true }).click();
    await page.waitForURL('https://d3sonsptsb4oi5.cloudfront.net/espacios');
    await expect(page).toHaveURL('https://d3sonsptsb4oi5.cloudfront.net/espacios');
    await page.locator('.mdc-tab__text-label', { hasText: 'Sectores' }).click();

    let numero = generarNumeroAleatorio();;
    let nombreSector = `Nuevo Sector ${numero}`;

    //Nuevo sector
    await page.click('text=Nuevo Sector');
    await page.getByRole('textbox', { name: 'Nombre' }).click();
    await page.getByRole('textbox', { name: 'Nombre' }).fill(nombreSector);
    await page.getByText('Selecciona una ubicación').click();
    await page.getByRole('option', { name: 'Campus Universitario' }).click();

    let letra = generaLetraAleatorio();
    let intentosLetra = 0;
    const maxIntentosLetra = 10;
    let letraValida = false;

    while (intentosLetra < maxIntentosLetra && !letraValida) {
      
        await page.getByRole('textbox', { name: 'ID' }).fill('');
        await page.getByRole('textbox', { name: 'ID' }).fill(letra);
        await page.getByRole('button', { name: 'Crear' }).click();
        const mensajeErrorID = page.getByText('Este ID ya existe.');

        try {
            await expect(mensajeErrorID).toBeVisible({ timeout: 2000 });
            letra = generaLetraAleatorio();
            intentosLetra++;
        } catch {
            letraValida = true;
        }
    }

    if (!letraValida) {
    throw new Error('No se pudo generar una letra válida para el ID luego de varios intentos.');
    }


    // Guardar el sector creado
    fs.writeFileSync('ultimoSector.txt', nombreSector);

    // Validar que se haya creado
    await expect(page.getByRole('cell', { name: nombreSector })).toBeVisible();




});