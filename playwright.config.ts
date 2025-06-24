import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://tuapp.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [
    ['list'], // reporte en consola
    ['html', { outputFolder: 'playwright-report', open: 'never' }], // HTML offline
    ['json', { outputFile: 'report.json' }] // opcional, para CI o análisis
  ],
});
