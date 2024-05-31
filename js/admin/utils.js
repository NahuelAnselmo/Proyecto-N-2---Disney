import { obtenerPeliculaSerieDeLs } from '../utils.js';
import { eliminarPelicula } from './abm.js';
import { destacarPelicula } from './abm.js';


export const agregarPeliculaALS = (pelicula) => {
    const peliculas = obtenerPeliculaSerieDeLs();
    peliculas.push(pelicula);
    localStorage.setItem('peliculas', JSON.stringify(peliculas));
};

const cargarFilaTabla = (pelicula, indice) =>{
    const $tbody = document.getElementById('tbody-peliculas');

    const $tr = document.createElement('tr');

    const $tdDestacar = document.createElement('td');
    const $btnDestacar = document.createElement('button');
    $btnDestacar.classList.add('btn', 'btn-sm', 'btn-info', 'me-2');
    $btnDestacar.textContent = 'Destacar';
    $btnDestacar.onclick = () => {
        destacarPelicula(pelicula.codigo, pelicula.titulo);
        cargarTabla();
    };
    $tdDestacar.appendChild($btnDestacar);
    $tr.appendChild($tdDestacar);


    const $tdIndice = document.createElement('td');
    $tdIndice.textContent = indice;
    $tr.appendChild($tdIndice);

    const $tdTitulo = document.createElement('td');
    $tdTitulo.textContent = pelicula.titulo;
    $tr.appendChild($tdTitulo);

    const $tdTipo = document.createElement('td');
    $tdTipo.textContent = pelicula.tipo;
    $tr.appendChild($tdTipo);

    const $tdCaratula = document.createElement('td');
    const $imagen = document.createElement('img');
    $imagen.src = pelicula.caratula;
    $imagen.alt = pelicula.titulo;
    $imagen.classList.add('imagen-tabla');
    $tdCaratula.appendChild($imagen);
    $tr.appendChild($tdCaratula);

    const $tdCategoria = document.createElement('td');
    $tdCategoria.textContent = pelicula.categoria;
    $tr.appendChild($tdCategoria);

    const $tdDescripcion = document.createElement('td');
    $tdDescripcion.textContent = pelicula.descripcion;
    $tr.appendChild($tdDescripcion);

    const $tdPublicada = document.createElement('td');
    $tdPublicada.textContent = pelicula.publicada;
    $tr.appendChild($tdPublicada);

    const $tdAcciones = document.createElement('td');
    const $btnEditar = document.createElement('button');
    const $btnEliminar = document.createElement('button');
    $btnEditar.classList.add('btn', 'btn-sm', 'btn-warning','me-2');
    $btnEliminar.classList.add('btn', 'btn-sm', 'btn-danger');
    $btnEditar.textContent = 'Editar';
    $btnEliminar.textContent = 'Eliminar';
    $btnEditar.onclick = () => {
        prepararEdicionPelicula(pelicula);
    };
    $btnEliminar.onclick = () => {
        eliminarPelicula(pelicula.codigo, pelicula.titulo);
        cargarTabla();
    };
    $tdAcciones.appendChild($btnEditar);
    $tdAcciones.appendChild($btnEliminar);
    $tr.appendChild($tdAcciones);

    $tbody.appendChild($tr);
};

export const cargarTabla = () => {
    const peliculas = obtenerPeliculaSerieDeLs();

    const $tbody = document.getElementById('tbody-peliculas');
    $tbody.innerHTML = '';

    peliculas.forEach((pelicula, indice) => {
        cargarFilaTabla(pelicula, indice + 1);
    });

};

export const prepararEdicionPelicula = (pelicula) => {
    const $inputTitulo = document.getElementById('input-titulo');
    const $inputTipo = document.getElementById('input-tipo');
    const $inputCategoria = document.getElementById('input-categoria');
    const $inputCaratula = document.getElementById('input-caratula');
    const $inputTrailer = document.getElementById('input-trailer');
    const $inputDescripcion = document.getElementById('input-descripcion');
    const $inputPublicada = document.getElementById('input-publicada');

    $inputTitulo.value = pelicula.titulo;
    $inputTipo.value = pelicula.tipo;
    $inputCategoria.value = pelicula.categoria;
    $inputCaratula.value = pelicula.caratula;
    $inputTrailer.value = pelicula.trailer;
    $inputDescripcion.value = pelicula.descripcion;
    $inputPublicada.value = pelicula.publicada;

    sessionStorage.setItem('codigoPelicula', pelicula.codigo);

    const $alert = document.getElementById('alert-edicion-pelicula');
    const $spanPelicula = document.getElementById('titulo-edicion-pelicula');
    $alert.classList.remove('d-none');
    $spanPelicula.textContent = pelicula.titulo;

    const $button = document.getElementById('button-cancelar');
    $button.classList.remove('d-none');

    swal
    .fire({
      title: 'Atención',
      text: `¿Estás seguro que deseas editar esta pelicula?.`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    })
};

export const estaEditando = () => {
    return !!sessionStorage.getItem('codigoPelicula');
}