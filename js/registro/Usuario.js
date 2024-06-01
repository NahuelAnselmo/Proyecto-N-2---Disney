export class Usuario {
    constructor(email, contraseña) {
      this.id = window.self.crypto.randomUUID();
      this.email = email;
      this.contraseña = contraseña;
    }
  
    validarCredenciales(email, contraseña) {
      return this.email === email && this.contraseña === contraseña;
    }
  }