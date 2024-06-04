import { obtenerPeliculaSerieDeLs } from "../utils.js";

export const cargarImagen = () => {
    const idPelicula = sessionStorage.getItem('selectedMovieUUID');

    const peliculasSeries = obtenerPeliculaSerieDeLs();
    const pelicula = peliculasSeries.find(peliculaSerie => peliculaSerie.codigo === idPelicula);

  
    const bgImgElement = document.getElementById('bgImg');
    if (bgImgElement) {
      bgImgElement.src = pelicula.caratula;
      bgImgElement.alt = pelicula.titulo;
    } 
    sessionStorage.removeItem('selectedMovieUUID');
  };