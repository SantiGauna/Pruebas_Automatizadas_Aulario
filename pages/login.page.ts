import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://d3sonsptsb4oi5.cloudfront.net/');
    // await this.page.goto('https://accounts-sandbox.ucc.edu.ar/signin/identifier');
  }

  async ingresarUsuario(usuario: string) {
    await this.page.fill('#username', usuario); 
    await this.page.click('text="Siguiente"'); 
  }

  async ingresarClave(clave: string) {
    await this.page.fill('#password', clave); 
    // await this.page.click('text="Iniciar Sesión"');
    await this.page.getByLabel('Presione enter para iniciar').click();
  }

  async login(usuario: string, clave: string) {
    await this.ingresarUsuario(usuario);
    await this.page.waitForSelector('#password'); // Espera a que aparezca el campo de clave
    await this.ingresarClave(clave);
  }
}
