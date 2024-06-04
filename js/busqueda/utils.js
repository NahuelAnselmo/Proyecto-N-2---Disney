import { obtenerCategoriasDeLS, obtenerPeliculaSerieDeLs } from '../utils.js';

export const cargarTodo = () => {
    const series = obtenerPeliculaSerieDeLs();
    const $contenedorPeliculas = document.querySelector('.main .grid');
    $contenedorPeliculas.innerHTML = '';
    series.forEach((serie) => {cargarItem(serie, $contenedorPeliculas);
    });
};
export const cargarItem = (serie, contenedorPeliculas) => {
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
export const buscarPeliculas = (categoriaId) => {
    const series = obtenerPeliculaSerieDeLs();
    const categorias = obtenerCategoriasDeLS();
    const $contenedorPeliculas = document.querySelector('.grid');
    $contenedorPeliculas.innerHTML = '';

    series.forEach((serie) => {
        if (serie.categoria) {
            const categoria = categorias.find(cat => cat.id === serie.categoria);
            if (categoria && categoria.nombre === categoriaId) {
                cargarItem(serie, $contenedorPeliculas);
            }
        }
    });
}





