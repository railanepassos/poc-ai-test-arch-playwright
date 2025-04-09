import { Page, Locator } from '@playwright/test';

export class LoginForm {
  private root: Locator;

  constructor(private page: Page) {
    this.root = page.locator('form');
  }

  async fillForm(username: string, password: string) {
    await this.root.locator('#username').fill(username);
    await this.root.locator('#password').fill(password);
  }

  async submit() {
    await this.root.locator('#submit').click();
  }
}