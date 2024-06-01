export const obtenerCategoriasDeLS = () => {
    return ordenarLista(JSON.parse(localStorage.getItem('categorias')) || []);
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
  

export const obtenerPeliculaSerieDeLs = () => {
  return JSON.parse(localStorage.getItem('peliculas')) || [];
};

export const agregarPeliculaALS = (pelicula) => {
  const peliculas = obtenerPeliculaSerieDeLs();
  peliculas.push(pelicula);
  localStorage.setItem("peliculas", JSON.stringify(peliculas));
};
export function obtenerPeliculasDestacadas() {
    const peliculas = JSON.parse(localStorage.getItem('peliculas')) || [];
    return peliculas.filter(pelicula => pelicula.destacada);
}


function imageExists(url, callback) {
  const img = new Image();
  img.onload = () => callback(true);
  img.onerror = () => callback(false);
  img.src = url;
}