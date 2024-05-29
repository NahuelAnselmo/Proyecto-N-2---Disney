import { obtenerCategoriasDeLS } from '../utils.js';
import { eliminarCategoria } from './abmCategoria.js';

export const agregarCategoriasALS = (categoria) => {
  const categorias = obtenerCategoriasDeLS();
  categorias.push(categoria);
  localStorage.setItem('categorias', JSON.stringify(categorias));
};

const cargarFilaTabla = (categoria, indice) => {
  const $tbody = document.getElementById('tbody-categoria');

  const $tr = document.createElement('tr');

  const $tdIndice = document.createElement('td');
  $tdIndice.textContent = indice;
  $tr.appendChild($tdIndice);

  const $tdNombre = document.createElement('td');
  $tdNombre.textContent = categoria.nombre;
  $tr.appendChild($tdNombre);

  const $tdDescripcion = document.createElement('td');
  $tdDescripcion.textContent = categoria.descripcion;
  $tr.appendChild($tdDescripcion);

  const $tdAcciones = document.createElement('td');
  const $btnEditar = document.createElement('button');
  const $btnEliminar = document.createElement('button');
  $btnEditar.classList.add('btn', 'btn-sm', 'btn-warning','me-1','mb-1');
  $btnEliminar.classList.add('btn', 'btn-sm', 'btn-danger','ms-3', 'mb-1');
  $btnEditar.textContent = 'Editar';
  $btnEliminar.textContent = 'Eliminar';
  $btnEditar.onclick = () => {
    mostrarModal();
    prepararEdicionCategoria(categoria);
  };
  $btnEliminar.onclick = () => {
    eliminarCategoria(categoria.id, categoria.nombre);
  };
  $tdAcciones.appendChild($btnEditar);
  $tdAcciones.appendChild($btnEliminar);
  $tr.appendChild($tdAcciones);
  $tbody.appendChild($tr);
};

export const cargarTabla = () => {
  const categorias = obtenerCategoriasDeLS();

  const $tbody = document.getElementById('tbody-categoria');
  $tbody.innerHTML = '';

  categorias.forEach((categoria, indice) => {
    cargarFilaTabla(categoria, indice + 1);
  });
};

export const existeCategoria = (nombreCategoria) => {
  const categorias = obtenerCategoriasDeLS();
  let existe = false;
  categorias.forEach((cat) => {
    if (cat.nombre === nombreCategoria) {
      existe = true;
    }
  });
  return existe;
};

export const prepararEdicionCategoria = (categoria) => {
  const $inputNombreCategoria=document.getElementById("inputNombreCategoria");
  const $inputDescripcionCategoria=document.getElementById("inputDescripcionCategoria");

  $inputNombreCategoria.value = categoria.nombre;
  $inputDescripcionCategoria.value = categoria.descripcion;

  sessionStorage.setItem('codigoCategoria', categoria.id);

  const $alert = document.getElementById('alert-edicion-categoria');
  const $spanCategoria = document.getElementById('nombre-categoria-edicion');
  $alert.classList.remove('d-none');
  $spanCategoria.textContent = categoria.nombre;

  const $button = document.getElementById('button-cancelar');
  $button.classList.remove('d-none');
};

function mostrarModal() {
  const modal = new bootstrap.Modal(document.getElementById('modalAgregarCategoria'));
  modal.show();
}
export const estaEditando = () => {
  return !!sessionStorage.getItem('codigoCategoria');
};

