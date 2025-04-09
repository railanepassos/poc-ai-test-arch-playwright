import { test, expect } from '@playwright/test';
import { loginFlow } from '../flows/loginFlow';

test('Login com sucesso - Action-Based', async ({ page }) => {
  await loginFlow(page, 'student', 'Password123');
  await expect(page.locator('text=Logged In Successfully')).toBeVisible();
});