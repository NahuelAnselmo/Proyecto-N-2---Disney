
import { obtenerPeliculasDestacadas } from '../utils.js';
import { cargarCarousel } from '../admin/utils.js';


    // Limpiar el contenido actual del slider
    /*sliderFilms.innerHTML = '';

    // Iterar sobre las películas destacadas y agregarlas al slider
    peliculasDestacadas.forEach((pelicula) => {
        // Verificar si la imagen existe
        imageExists(pelicula.caratula, (exists) => {
            const caratula = exists ? pelicula.caratula : 'img/default.jpg';

            // Construir el HTML del slide
            const slideHTML = `
                <div class="slide">
                    <div class="cl">
                        <img src="${caratula}" alt="${pelicula.titulo}">
                    </div>
                </div>
            `;

            // Agregar el slide al slider
            sliderFilms.innerHTML += slideHTML;

            // Inicializar el slider después de agregar los slides
            $(document).ready(function(){
                $('.slider').slick({
                    infinite: true,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerMode: true,
                    variableWidth: true
                });
            });
        });
    });


// Llamar a la función para cargar las películas destacadas en el slider cuando se cargue la página
window.addEventListener("load", () => {
    cargarPeliculasDestacadasEnSlider();
});*/
obtenerPeliculasDestacadas();
cargarCarousel();
