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
    const peliculas = obtenerPeliculaSerieDeLs();
    const $carouselCategorias = document.getElementById('carousel-categorias');
    $carouselCategorias.innerHTML = '';
    peliculas.forEach((pelicula) => {
        cargarItemCategoria(pelicula, $carouselCategorias);
    });

    $carouselCategorias.querySelectorAll('.categoria-btn').forEach(($btnCategoria) => {
        $btnCategoria.addEventListener('click', () => {
            const categoriaId = $btnCategoria.dataset.categoriaId; 
            sessionStorage.setItem('idCategoria', categoriaId); 
            cargarPeliculasPorCategoria(); 
        });
    });
};

const cargarItemCategoria = (pelicula, $contenedorCategorias) => {
    if(pelicula.tipo==='pelicula'){
        const categorias = obtenerCategoriasDeLS();
        categorias.forEach((categoria) => {
            if (pelicula.categoria === categoria.id) {
                const $btnCategoria = document.createElement('button');
                $btnCategoria.classList.add('categoria-btn', 'btn', 'btn-secondary', 'mb-3', 'mx-4');
                $btnCategoria.textContent = categoria.nombre;
                $btnCategoria.dataset.categoriaId = categoria.id; 
                $contenedorCategorias.appendChild($btnCategoria);
            }
        });
       
    }
};

export const cargarItemPelicula = (pelicula, contenedorPeliculas) => {
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