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
  $btnEditar.classList.add('btn', 'btn-sm', 'btn-warning', 'me-2');
  $btnEliminar.classList.add('btn', 'btn-sm', 'btn-danger');
  $btnEditar.textContent = 'Editar';
  $btnEliminar.textContent = 'Eliminar';
  /*$btnEditar.onclick = () => {
    prepararEdicionContacto(contacto);
  };*/
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

// Objetivo: Cargar en el formulario estos datos
/*[export const prepararEdicionContacto = (contacto) => {
  // 1. Seleccionar los nodos de los inputs
  const $inputNombre = document.getElementById('input-nombre');
  const $inputNumero = document.getElementById('input-numero');
  const $inputEmail = document.getElementById('input-email');
  const $inputImagen = document.getElementById('input-imagen');
  const $inputNotas = document.getElementById('input-notas');

  // 2. Cargar la info
  $inputNombre.value = contacto.nombre;
  $inputNumero.value = contacto.numero;
  $inputEmail.value = contacto.email;
  $inputImagen.value = contacto.imagen;
  $inputNotas.value = contacto.notas;

  // 3. Guardar código
  sessionStorage.setItem('codigoContacto', contacto.codigo);

  // 4. Mostrar alert
  const $alert = document.getElementById('alert-edicion-contacto');
  const $spanContacto = document.getElementById('nombre-contacto-edicion');
  $alert.classList.remove('d-none');
  $spanContacto.textContent = contacto.nombre;

  // 5. Mostrar boton
  const $button = document.getElementById('button-cancelar');
  $button.classList.remove('d-none');

  // TODO: Agregar event listener al botón para deshacer la edicion de un contacto (eliminar el cod de SS, vaciar los campos, resetear las clases,esconder alert, esconder boton)
};

export const estaEditando = () => {
  // El usuario está editando cuando existe un "codigoContacto" en sessionStorage
  // const codigo = sessionStorage.getItem('codigoContacto');
  // if (codigo) return true;
  // return false;
  return !!sessionStorage.getItem('codigoContacto');
};*/
