import { User } from '../actors/User';

export class Login {
  static async with(username: string, password: string, actor: User) {
    const page = actor.ability.page;
    await page.fill('#username', username);
    await page.fill('#password', password);
    await page.click('#submit');
  }
}