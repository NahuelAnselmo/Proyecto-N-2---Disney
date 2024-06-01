export const obtenerUsuariosDeLS = () => {
    return ordenarLista(JSON.parse(localStorage.getItem('usuarios')) || []);
  };