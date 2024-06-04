import { obtenerPeliculaSerieDeLs } from "../utils.js";

export const cargarImagen = () => {
    const idPelicula = sessionStorage.getItem('selectedMovieUUID');
    const peliculasSeries = obtenerPeliculaSerieDeLs();
    const pelicula = peliculasSeries.find(peliculaSerie => peliculaSerie.codigo === idPelicula);

    if (!pelicula)
        {
            const defaultBgImgElement = document.getElementById('defaultBgImg');
            if (defaultBgImgElement) {
            defaultBgImgElement.style.display = 'block'; 
            }
            return;
        } 
            

    const bgImgElement = document.getElementById('bgImg');
    if (bgImgElement) {
        bgImgElement.src = pelicula.portada;
        bgImgElement.alt = pelicula.titulo;
    } 

    const imgTitleElement = document.getElementById('imgTitle');
    if (imgTitleElement) {
        imgTitleElement.src = pelicula.caratula;
        imgTitleElement.alt = pelicula.titulo;
    }

    const subTituloElement = document.getElementById('subTitulo');
    if (subTituloElement) {
        subTituloElement.textContent = pelicula.titulo;
    }

    const descripcionElement = document.getElementById('description');
    if (descripcionElement) {
        descripcionElement.textContent = pelicula.descripcion;
    }

    const trailerButton = document.querySelector('.trailer');
    if (trailerButton) {
        trailerButton.addEventListener('click', () => {
            window.location.href = pelicula.trailer; // Redirige a la URL del trailer
        });
    }

    sessionStorage.removeItem('selectedMovieUUID');
};

document.addEventListener('DOMContentLoaded', cargarImagen);
