import { obtenerPeliculasDestacadas, imageExists } from '../utils.js';
import { obtenerPeliculaSerieDeLs } from "../utils.js";

export const destacarPelicula = (codigoPelicula) => {
    const peliculas = obtenerPeliculaSerieDeLs();
  
    const posicionPelicula = peliculas.findIndex((pelicula) => pelicula.codigo === codigoPelicula);
  
    if (posicionPelicula !== -1) {
      const pelicula = peliculas[posicionPelicula];
      pelicula.destacada = !pelicula.destacada;
  
      localStorage.setItem('peliculas', JSON.stringify(peliculas));
  
      const mensaje = pelicula.destacada
        ? `Película ${pelicula.titulo} destacada correctamente`
        : `Película ${pelicula.titulo} ya no está destacada`;
  
      swal.fire({
        title: 'Éxito',
        text: mensaje,
        icon: 'success',
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: 'Aceptar',
      });
  
      cargarTabla();
      cargarPeliculasDestacadasEnSlider();  // Asegúrate de llamar a esta función para actualizar el slider
    } else {
      swal.fire({
        title: 'Error',
        text: 'La película no se encontró',
        icon: 'error',
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: 'Aceptar',
      });
    }
  };

function cargarPeliculasDestacadasEnSlider() {
  const sliderFilms = document.getElementById("slider-films");

  // Obtener las películas destacadas
  const peliculasDestacadas = obtenerPeliculasDestacadas();

  // Limpiar el contenido actual del slider
  sliderFilms.innerHTML = '';

  // Crear una promesa para verificar todas las imágenes antes de inicializar el slider
  const promesas = peliculasDestacadas.map((pelicula) => {
    return new Promise((resolve) => {
      imageExists(pelicula.caratula, (exists) => {
        const caratula = exists ? pelicula.caratula : 'img/default.jpg';
        const slideHTML = `
          <div class="slide">
            <div class="cl">
              <img src="${caratula}" alt="${pelicula.titulo}">
            </div>
          </div>
        `;
        resolve(slideHTML);
      });
    });
  });

  // Esperar a que todas las promesas se resuelvan y luego inicializar el slider
  Promise.all(promesas).then((slides) => {
    slides.forEach((slideHTML) => {
      sliderFilms.innerHTML += slideHTML;
    });

    // Inicializar el slider después de agregar los slides
    $(document).ready(function() {
      $('.slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        variableWidth: true
      });
    });
  });
}

// Llamar a la función para cargar las películas destacadas en el slider cuando se cargue la página
window.addEventListener("load", () => {
  cargarPeliculasDestacadasEnSlider();
});
