import { obtenerUsuariosDeLS } from "../utils.js";

export const estaLogueado = (email, contraseña) => {
    const usuarios = obtenerUsuariosDeLS();
    let encontrado = false;
  
    usuarios.forEach(usuario => {
      if (usuario.email === email && usuario.contraseña === contraseña) {
        encontrado = true;
      }
    });
    return encontrado;
  };