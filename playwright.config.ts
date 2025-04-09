import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Carrega variáveis do .env na raiz
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Determina ambiente atual
const ENV = process.env.ENV || 'local';

function getBaseUrl(env: string): string {
  switch (env) {
    case 'staging':
      return process.env.STAGING_BASE_URL!;
    case 'production':
      return process.env.PRODUCTION_BASE_URL!;
    case 'local':
    default:
      return process.env.LOCAL_BASE_URL!;
  }
}

export default defineConfig({
  testDir: './tests',
  testMatch: '**/specs/*.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: getBaseUrl(ENV),
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
