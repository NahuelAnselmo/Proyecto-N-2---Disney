import { obtenerPeliculasDestacadas, imageExists } from './utils.js';
import { destacarPelicula } from './admin.js'; // Importar la función para destacar una película

function cargarPeliculasDestacadasEnCarrusel() {
    const carouselInner = document.getElementById("carousel-inner");
    const carouselIndicators = document.getElementById("carousel-indicators");

    const peliculasDestacadas = obtenerPeliculasDestacadas();

    carouselInner.innerHTML = '';
    carouselIndicators.innerHTML = '';

    peliculasDestacadas.forEach((pelicula, index) => {
        const isActive = index === 0 ? "active" : "";

        imageExists(pelicula.caratula, (exists) => {
            const caratula = exists ? pelicula.caratula : 'img/default.jpg';
            const slideHTML = `
                <div class="carousel-item ${isActive}">
                    <img src="${caratula}" class="d-block w-100" alt="${pelicula.titulo}">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${pelicula.titulo}</h5>
                        <p>${pelicula.descripcion}</p>
                        <a class="btn link-reproducir" href="${pelicula.trailer}" target="_blank">
                            <i class="fa-regular fa-circle-play"></i> REPRODUCIR
                        </a>
                        <a class="btn link-ver-mas" href="./detalle.html?peliculaIndex=${index}">VER MÁS...</a>
                    </div>
                </div>
            `;

            carouselInner.innerHTML += slideHTML;

            const indicatorHTML = `
                <button
                    type="button"
                    data-bs-target="#carousel-inicio"
                    data-bs-slide-to="${index}"
                    class="${isActive}"
                    aria-label="Slide ${index + 1}"
                ></button>
            `;

            carouselIndicators.innerHTML += indicatorHTML;
        });
    });

    const myCarousel = document.getElementById('carousel-inicio');
    const carousel = new bootstrap.Carousel(myCarousel);
}

window.addEventListener("load", () => {
    cargarPeliculasDestacadasEnCarrusel();
    cargarTabla();
});
