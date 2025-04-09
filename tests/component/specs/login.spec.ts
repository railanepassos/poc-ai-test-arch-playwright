import { test, expect } from '@playwright/test';
import { LoginForm } from '../components/LoginForm';

test('Login com sucesso - Component Object', async ({ page }) => {
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  const form = new LoginForm(page);
  await form.fillForm('student', 'Password123');
  await form.submit();
  await expect(page.locator('text=Logged In Successfully')).toBeVisible();
});