import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
    // {
    //   name: 'Firefox',
    //   use: { browserName: 'firefox' },
    // },
    // {
    //   name: 'Webkit',
    //   use: { browserName: 'webkit' },
    // },
    //  { name: 'iPhone 13', use: devices['iPhone 13'] },
  ],
  use: {
    baseURL: 'https://tuapp.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [
    ['list'],
  ],
});
