import { obtenerUsuariosDeLS } from "../utils.js";
import {Usuario} from './Usuario.js';

export const agregarUsuarioALS = (usuario) => {
    let usuarios = obtenerUsuariosDeLS();
    usuarios.push(usuario); 
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
};

export const iniciarCuentaAdmin = () => {
    const usuarios = obtenerUsuariosDeLS();
    if (!usuarios || usuarios.length === 0) {
      const categoriaMix = new Usuario('admin', 'admin@mail.com','Admin123.');
      agregarUsuarioALS(categoriaMix); 
    }
  };
  