import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    const baseUrl = process.env.BASE_URL || 'https://d3sonsptsb4oi5.cloudfront.net/';
    await this.page.goto(baseUrl);
  }

  async ingresarUsuario(usuario?: string) {
    const user = usuario || process.env.USER_FE || '';
    await this.page.fill('#username', user);
    await this.page.click('text="Siguiente"');
  }

  async ingresarClave(clave?: string) {
    const pass = clave || process.env.PASS_FE || '';
    await this.page.fill('#password', pass);
    await this.page.getByLabel('Presione enter para iniciar').click();
  }

  async login(usuario?: string, clave?: string) {
    await this.ingresarUsuario(usuario);
    await this.page.waitForSelector('#password');
    await this.ingresarClave(clave);
  }
}
