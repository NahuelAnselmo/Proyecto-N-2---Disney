import { obtenerCategoriasDeLS } from '../utils.js';
import { eliminarCategoria } from './abmCategoria.js';

const $btnAgregarCategoria=document.getElementById("btnAgregarCategoria");
const $inputNombreCategoria=document.getElementById("inputNombreCategoria");
const $inputDescripcionCategoria=document.getElementById("inputDescripcionCategoria");
const $btnCancelarCategoria=document.getElementById("btnCancelarCategoria");
const $modalAgregarCategoria=document.getElementById("modalAgregarCategoria");


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

export function existeCategoria(nombreCategoria) {
  nombreCategoria = nombreCategoria.toUpperCase();
  const categorias = obtenerCategoriasDeLS();

  for (const cat of categorias) {
    if (cat.nombre === nombreCategoria) {
      const mensaje = `Esa categoría ya existe, por favor, intente de nuevo`;
      swal.fire({
        title: 'Error',
        text: mensaje,
        icon: 'error',
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: '¡OK!',
      });
      return true; 
    }
  }
  return false; 
}
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

};

function mostrarModal() {
  const modal = new bootstrap.Modal(document.getElementById('modalAgregarCategoria'));
  modal.show();
}
export const estaEditando = () => {
  return !!sessionStorage.getItem('codigoCategoria');
};

export function btnCancelarCategoria(){
    $inputNombreCategoria.value = '';
    $inputDescripcionCategoria.value = '';
    if (estaEditando()) {
      sessionStorage.removeItem('codigoCategoria');
    }
    const modalInstance = bootstrap.Modal.getInstance($modalAgregarCategoria);
    modalInstance.hide();
}