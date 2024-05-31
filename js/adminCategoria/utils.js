import { obtenerCategoriasDeLS } from '../utils.js';
import { eliminarCategoria } from './abmCategoria.js';
import {Categoria} from './Categoria.js';

const $btnAgregarCategoria=document.getElementById("btnAgregarCategoria");
const $inputNombreCategoria=document.getElementById("inputNombreCategoria");
const $inputDescripcionCategoria=document.getElementById("inputDescripcionCategoria");
const $btnCancelarCategoria=document.getElementById("btnCancelarCategoria");
const $modalAgregarCategoria=document.getElementById("modalAgregarCategoria");

export const iniciarCategoriaMix = () => {
  const categorias = obtenerCategoriasDeLS();
  if (!categorias || categorias.length === 0) {
    const categoriaMix = new Categoria('MIX', 'Categoría por defecto');
    agregarCategoriasALS(categoriaMix); 
  }
};


export const agregarCategoriasALS = (categoria) => {
  let categorias = obtenerCategoriasDeLS();
  categorias.push(categoria); // Agregar la nueva categoría a la lista de categorías
  localStorage.setItem('categorias', JSON.stringify(categorias));
};

const cargarFilaTabla = (categoria, indice) => {
  const $tbody = document.getElementById('tbody-categoria');

  const $tr = document.createElement('tr');

  const $tdIndice = document.createElement('td');
  $tdIndice.classList.add('text-white', 'text-center', 'fw-bold');
  $tdIndice.textContent = indice;
  $tr.appendChild($tdIndice);

  const $tdNombre = document.createElement('td');
  $tdNombre.classList.add('text-white', 'w-25');
  $tdNombre.textContent = categoria.nombre;
  $tr.appendChild($tdNombre);

  const $tdDescripcion = document.createElement('td');
  $tdDescripcion.classList.add('text-white', 'w-25');
  $tdDescripcion.textContent = categoria.descripcion;
  $tr.appendChild($tdDescripcion);

  const $tdAcciones = document.createElement('td');
  if (categoria.nombre !== "MIX") {
    const $btnEditar = document.createElement('button');
    const $btnEliminar = document.createElement('button');
    $btnEditar.classList.add('btn', 'btn-sm', 'btn-warning','mb-1','me-2','col-12', 'col-md-5');
    $btnEliminar.classList.add('btn', 'btn-sm', 'btn-danger', 'mb-1','col-12','col-md-5');
    $btnEditar.innerHTML = 'Editar <i class="fas fa-pencil-alt"></i>'; 
    $btnEliminar.innerHTML = 'Eliminar <i class="fas fa-trash"></i>'; 
    $btnEditar.onclick = () => {
      mostrarModal();
      prepararEdicionCategoria(categoria);
    };
    $btnEliminar.onclick = () => {
      eliminarCategoria(categoria.id, categoria.nombre);
    };
    $tdAcciones.appendChild($btnEditar);
    $tdAcciones.appendChild($btnEliminar);
  } else{
    $tdAcciones.classList.add('text-white', 'text-center', 'fw-bold');
    $tdAcciones.textContent = 'No se puede eliminar ni editar';
  }
  $tr.appendChild($tdAcciones);
  $tbody.appendChild($tr);

};

export const cargarTabla = () => {
  iniciarCategoriaMix();
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
    if (estaEditando()) {
      sessionStorage.removeItem('codigoCategoria');
    }
    $inputNombreCategoria.value = '';
    $inputDescripcionCategoria.value = '';
    const $spanCategoria = document.getElementById('alert-edicion-categoria');
    $spanCategoria.classList.add('d-none');
    const modalInstance = bootstrap.Modal.getInstance($modalAgregarCategoria);
    modalInstance.hide();
}