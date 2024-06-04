
import { obtenerCategoriasDeLS, obtenerPeliculaSerieDeLs } from '../utils.js';

export const cargarTodasLasPeliculas = () => {
    const peliculas = obtenerPeliculaSerieDeLs();
    const $contenedorPeliculas = document.querySelector('.main .grid');
    $contenedorPeliculas.innerHTML = '';

    peliculas.forEach((pelicula) => {
        if (pelicula.tipo === 'pelicula') {
            cargarItemPelicula(pelicula, $contenedorPeliculas);
        }
    });
};

export const cargarPeliculasPorCategoria = () => {
    const peliculas = obtenerPeliculaSerieDeLs();
    const $contenedorPeliculas = document.querySelector('.main .grid');
    const categoriaId = sessionStorage.getItem('idCategoria'); 
    $contenedorPeliculas.innerHTML = '';
    peliculas.forEach((pelicula) => {
        if (pelicula.tipo === 'pelicula' && pelicula.categoria === categoriaId) {
            cargarItemPelicula(pelicula, $contenedorPeliculas);
        }
    });
};

export const cargarCategorias = () => {
    const categorias = obtenerCategoriasDeLS();
    const $carouselCategorias = document.getElementById('contenedor-categorias');
    $carouselCategorias.innerHTML = '';

    categorias.forEach((categoria) => {
        const $btnCategoria = document.createElement('button');
        $btnCategoria.classList.add('categoria-btn', 'swiper-slide');
        $btnCategoria.textContent = categoria.nombre;
        $btnCategoria.dataset.categoriaId = categoria.id; 
        $carouselCategorias.appendChild($btnCategoria);
    });

    // Inicializar Swiper.js
    new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Agregar event listener para cargar películas por categoría
    document.querySelectorAll('.categoria-btn').forEach(($btnCategoria) => {
        $btnCategoria.addEventListener('click', () => {
            const categoriaId = $btnCategoria.dataset.categoriaId; 
            sessionStorage.setItem('idCategoria', categoriaId); 
            cargarPeliculasPorCategoria(); 
        });
    });
};

const cargarItemPelicula = (pelicula, contenedorPeliculas) => {
    const $divCard = document.createElement('div');
    $divCard.classList.add('card-disney');

    const $divItemBorder = document.createElement('div');
    $divItemBorder.classList.add('item-border');

    const $imagenPelicula = document.createElement('img');
    $imagenPelicula.src = pelicula.portada;
    $imagenPelicula.alt = pelicula.titulo;
    $imagenPelicula.classList.add('item-image');

    $divItemBorder.appendChild($imagenPelicula);

    $divCard.appendChild($divItemBorder);

    contenedorPeliculas.appendChild($divCard);
};

