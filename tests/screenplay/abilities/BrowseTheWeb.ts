import { Page } from '@playwright/test';

export class BrowseTheWeb {
  constructor(public readonly page: Page) {}

  async gotoLoginPage() {
    await this.page.goto('https://practicetestautomation.com/practice-test-login/');
  }
}