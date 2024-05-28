export const obtenerCategoriasDeLS = () => {
    return ordenarLista(JSON.parse(localStorage.getItem('categoria')) || []);
  };
  
  export const estaLogueado = () => {
    return sessionStorage.getItem('estaLogueado');
  };
  
  export const ordenarLista = (lista) => {
    return lista.sort((a, b) => {
      if (a.nombre > b.nombre) {
        return 1;
      }
      if (a.nombre < b.nombre) {
        return -1;
      }
      return 0;
    });
  };
  