import { Page } from '@playwright/test';

export async function enterCredentials(page: Page, username: string, password: string) {
  await page.fill('#username', username);
  await page.fill('#password', password);
}