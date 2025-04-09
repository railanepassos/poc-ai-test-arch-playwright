import { Page } from '@playwright/test';

export async function submitLogin(page: Page) {
  await page.click('#submit');
}