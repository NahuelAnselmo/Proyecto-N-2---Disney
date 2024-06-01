export const agregarUsuarioALS = (usuario) => {
    let usuarios = obtenerUsuariosDeLS();
    usuarios.push(usuario); 
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  };