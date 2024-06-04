import { obtenerCategoriasDeLS, obtenerPeliculaSerieDeLs } from '../utils.js';


export const cargarTodasLasSeries = () => {
    const series = obtenerPeliculaSerieDeLs();
    const $contenedorPeliculas = document.querySelector('.main .grid');
    $contenedorPeliculas.innerHTML = '';

    series.forEach((serie) => {
        if (serie.tipo === 'serie') {
            cargarItemSerie(serie, $contenedorPeliculas);
        }
    });
};

export const cargarSeriesPorCategoria = () => {
    const series = obtenerPeliculaSerieDeLs();
    const $contenedorPeliculas = document.querySelector('.main .grid');
    const categoriaId = sessionStorage.getItem('idCategoria'); 
    $contenedorPeliculas.innerHTML = '';
    series.forEach((serie) => {
        if (serie.tipo === 'serie' && serie.categoria === categoriaId) {
            cargarItemSerie(serie, $contenedorPeliculas);
        }
    });
    
};

export const cargarCategorias = () => {
    const series = obtenerPeliculaSerieDeLs();
    const $carouselCategorias = document.getElementById('carousel-categorias');
    $carouselCategorias.innerHTML = '';
    series.forEach((serie) => {
        cargarItemCategoria(serie, $carouselCategorias);
    });

    $carouselCategorias.querySelectorAll('.categoria-btn').forEach(($btnCategoria) => {
        $btnCategoria.addEventListener('click', () => {
            const categoriaId = $btnCategoria.dataset.categoriaId; 
            sessionStorage.setItem('idCategoria', categoriaId); 
            cargarSeriesPorCategoria(); 
        });
    });
};

const cargarItemCategoria = (serie, $contenedorCategorias) => {
    if(serie.tipo==='serie'){
        const categorias = obtenerCategoriasDeLS();
        categorias.forEach((categoria) => {
            if (serie.categoria === categoria.id) {
                const $btnCategoria = document.createElement('button');
                $btnCategoria.classList.add('categoria-btn', 'btn', 'btn-secondary', 'mb-3', 'mx-4');
                $btnCategoria.textContent = categoria.nombre;
                $btnCategoria.dataset.categoriaId = categoria.id; 
                $contenedorCategorias.appendChild($btnCategoria);
            }
        });
       
    }
};

export const cargarItemSerie = (serie, contenedorPeliculas) => {
    const $divCard = document.createElement('div');
    $divCard.classList.add('card-disney');

    const $divItemBorder = document.createElement('div');
    $divItemBorder.classList.add('item-border');

    const $imagenSerie = document.createElement('img');
    $imagenSerie.src = serie.portada;
    $imagenSerie.alt = serie.titulo;
    $imagenSerie.classList.add('item-image');

    $divItemBorder.appendChild($imagenSerie);

    $divCard.appendChild($divItemBorder);

    contenedorPeliculas.appendChild($divCard);
};