import { Page } from '@playwright/test';
import { LoginForm } from '../componets/LoginForm';

export class LoginPage {
  private loginForm: LoginForm;

  constructor(private page: Page) {
    this.loginForm = new LoginForm(page);
  }

  async navigate() {
    await this.page.goto('https://practicetestautomation.com/practice-test-login/');
  }

  async login(username: string, password: string) {
    await this.loginForm.fillUsername(username);
    await this.loginForm.fillPassword(password);
    await this.loginForm.submit();
  }
}