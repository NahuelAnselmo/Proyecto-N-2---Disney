import {Usuario} from './Usuario.js';
import {agregarUsuarioALS} from './utils.js';

export const agregarUsuario = (nombre, email, password) => {
    const usuario = new Usuario(nombre, email, password);
    agregarUsuarioALS(usuario);
  };