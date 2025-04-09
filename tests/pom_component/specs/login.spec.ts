import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import fs from 'fs';
import path from 'path';

function logTestStep(description: string) {
  const logPath = path.join(__dirname, '../logs/session-2025-04-08.log');
  fs.appendFileSync(logPath, `STEP: ${description}\n`);
}

test('Login com sucesso', async ({ page }) => {
  const loginPage = new LoginPage(page);

  logTestStep('Acessando a página de login');
  await loginPage.navigate();

  logTestStep('Realizando login com credenciais válidas');
  await loginPage.login('student', 'Password123');

  logTestStep('Verificando mensagem de sucesso');
  await expect(page.locator('h1')).toHaveText('Logged In Successfully');
});

test('Login com senha errada', async ({ page }) => {
  const loginPage = new LoginPage(page);

  logTestStep('Acessando a página de login');
  await loginPage.navigate();

  logTestStep('Realizando login com senha inválida');
  await loginPage.login('student', 'WrongPassword');

  logTestStep('Verificando mensagem de erro');
  await expect(page.locator('#error')).toHaveText('Your password is invalid!');
});