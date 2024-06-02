export class Usuario {
    constructor(nombre, email, contraseña) {
      this.id = window.self.crypto.randomUUID();
      this.nombre=nombre;
      this.email = email;
      this.contraseña = contraseña;
    }
  
    validarCredenciales(email, contraseña) {
      return this.email === email && this.contraseña === contraseña;
    }
  }