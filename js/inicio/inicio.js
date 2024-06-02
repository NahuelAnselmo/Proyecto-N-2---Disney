
<<<<<<< HEAD
import { obtenerPeliculasDestacadas } from '../utils.js';
import { cargarCarousel } from '../admin/utils.js';
=======
export function cargarPeliculasDestacadasEnSlider() {
    const sliderFilms = document.getElementById("carousel-inner");
>>>>>>> 8804a77bc2aee3851f1263d7d3355d930b9812b9


    // Limpiar el contenido actual del slider
    /*sliderFilms.innerHTML = '';

    // Iterar sobre las películas destacadas y agregarlas al slider
    peliculasDestacadas.forEach((pelicula) => {
        // Verificar si la imagen existe
        imageExists(pelicula.caratula, (exists) => {
            const caratula = exists ? pelicula.caratula : 'img/default.jpg';

            // Construir el HTML del slide
            const slideHTML = `
                <div class="carousel-item">
                    <img src="${caratula}" class="d-block w-100" alt="${pelicula.titulo}">
                </div>
            `;

            // Agregar el slide al slider
            sliderFilms.insertAdjacentHTML('beforeend', slideHTML);
        });
    });

<<<<<<< HEAD
=======
    // Llamar a la función para inicializar el carrusel
    cargarCarousel();
}
>>>>>>> 8804a77bc2aee3851f1263d7d3355d930b9812b9

// Llamar a la función para cargar las películas destacadas en el carrusel cuando se cargue la página
window.addEventListener("load", () => {
    cargarPeliculasDestacadasEnSlider();
<<<<<<< HEAD
});*/
obtenerPeliculasDestacadas();
cargarCarousel();
=======
});

export function cargarCarousel() {
    const peliculasDestacadas = obtenerPeliculasDestacadas();
    const $carouselInner = document.getElementById("carousel-inner");

    // Limpiamos el contenido existente en el carousel
    $carouselInner.innerHTML = "";

    // Agregar las películas al carousel
    peliculasDestacadas.forEach((pelicula) => {
        cargarItemsDeCarousel(pelicula, $carouselInner);
    });

    const prevButton = document.querySelector(".carousel-control-prev");
    const nextButton = document.querySelector(".carousel-control-next");

    let position = 0;

    nextButton.addEventListener("click", () => {
        position -= 100;
        if (position < -(peliculasDestacadas.length - 1) * 100) {
            position = 0;
        }
        $carouselInner.style.transform = `translateX(${position}%)`;
    });

    prevButton.addEventListener("click", () => {
        position += 100;
        if (position > 0) {
            position = -(peliculasDestacadas.length - 1) * 100;
        }
        $carouselInner.style.transform = `translateX(${position}%)`;
    });
}

export function cargarItemsDeCarousel(pelicula, carouselInner) {
    const $itemCarousel = document.createElement("div");
    $itemCarousel.classList.add("carousel-item");

    const $imagen = document.createElement("img");
    $imagen.src = pelicula.caratula;
    $imagen.classList.add("d-block", "w-100");
    $imagen.alt = pelicula.titulo;

    $itemCarousel.appendChild($imagen);
    carouselInner.appendChild($itemCarousel);
}
>>>>>>> 8804a77bc2aee3851f1263d7d3355d930b9812b9
