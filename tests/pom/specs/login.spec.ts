import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Login com sucesso - POM', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('student', 'Password123');
  await expect(page.locator('text=Logged In Successfully')).toBeVisible();
});
