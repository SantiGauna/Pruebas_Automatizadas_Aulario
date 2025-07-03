import { test, expect } from '@playwright/test';

test.describe('Intentos de inyección SQL en login', () => {
  const payloads = [
    "' OR '1'='1",
    "' OR 1=1 --",
    "' OR '' = '",
    "'; --",
    "' OR '1'='1' /*",
    "' OR 1=1#",
    "' OR 1=1--",
    "' OR 1=1/*",
    "' OR sleep(5)--",
  ];

  for (const payload of payloads) {
    test(`No debe loguear con payload: ${payload}`, async ({ page }) => {
      await page.goto('https://age-sandbox.ucc.edu.ar/web/siuccweb_php/login.php');

      await page.getByRole('textbox', { name: 'Clave UCC' }).fill(payload);
      await page.getByRole('textbox', { name: 'Contraseña' }).fill(payload);
      await page.getByRole('button', { name: 'INGRESAR' }).click();

      // Asegurarse de que no se loguea (opcional: validar URL)
      await expect(page).not.toHaveURL(/dashboard/);

 
      await expect(page.getByRole('cell', { name: 'Datos incorrectos.', exact: true })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Sorry, you have been blocked' })).toBeVisible();

    });
  }
});
