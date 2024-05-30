export const obtenerPeliculaSerieDeLs = () => {
  return JSON.parse(localStorage.getItem('peliculas')) || [];
};

