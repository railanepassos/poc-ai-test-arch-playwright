import { test, expect } from '@playwright/test';
import { User } from '../actors/User';
import { Login } from '../tasks/Login';

test('Login com sucesso - Screenplay', async ({ page }) => {
  const user = new User(page);
  await user.ability.gotoLoginPage();
  await Login.with('student', 'Password123', user);
  await expect(page.locator('text=Logged In Successfully')).toBeVisible();
});