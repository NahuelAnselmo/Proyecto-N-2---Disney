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
<<<<<<< HEAD
    const categorias = obtenerCategoriasDeLS();
=======
    const categorias = obtenerCategoriasDeLS(); 
>>>>>>> 6e570e38c4e74657d114ad2e2cfab851dc7b2813
    const $carouselCategorias = document.getElementById('contenedor-categorias');
    $carouselCategorias.innerHTML = '';

    categorias.forEach((categoria) => {
        const $btnCategoria = document.createElement('button');
        $btnCategoria.classList.add('categoria-btn', 'swiper-slide');
        $btnCategoria.textContent = categoria.nombre;
        $btnCategoria.dataset.categoriaId = categoria.id; 
        $carouselCategorias.appendChild($btnCategoria);
    });

    new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

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

