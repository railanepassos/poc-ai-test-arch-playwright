import { Page } from '@playwright/test';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

export class User {
  ability: BrowseTheWeb;

  constructor(page: Page) {
    this.ability = new BrowseTheWeb(page);
  }
}