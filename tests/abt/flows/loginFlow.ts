import { Page } from '@playwright/test';
import { enterCredentials } from '../actions/enterCredentials';
import { submitLogin } from '../actions/submitLogin';

export async function loginFlow(page: Page, username: string, password: string) {
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await enterCredentials(page, username, password);
  await submitLogin(page);
}