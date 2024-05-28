import { obtenerCategoriasDeLS } from '../utils.js';
//import { eliminarContacto } from './abm.js';

export const agregarCategoriasALS = (categoria) => {
  const categorias = obtenerCategoriasDeLS();
  categorias.push(categoria);
  localStorage.setItem('categorias', JSON.stringify(categorias));
};

/*
const cargarFilaTabla = (categoria, indice) => {
  const $tbody = document.getElementById('tbody-contactos');

  const $tr = document.createElement('tr');

  // INDICE
  const $tdIndice = document.createElement('td');
  $tdIndice.textContent = indice;
  $tr.appendChild($tdIndice);

  // IMAGEN
  const $tdImagen = document.createElement('td');
  const $imagen = document.createElement('img');
  $imagen.src = contacto.imagen;
  $imagen.alt = contacto.nombre;
  $imagen.classList.add('imagen-tabla');
  $tdImagen.appendChild($imagen);
  $tr.appendChild($tdImagen);

  // NOMBRE
  const $tdNombre = document.createElement('td');
  $tdNombre.textContent = contacto.nombre;
  $tr.appendChild($tdNombre);

  // NUMERO
  const $tdNumero = document.createElement('td');
  $tdNumero.textContent = contacto.numero;
  $tr.appendChild($tdNumero);

  // EMAIL
  const $tdEmail = document.createElement('td');
  $tdEmail.textContent = contacto.email;
  $tr.appendChild($tdEmail);

  // NOTAS
  const $tdNotas = document.createElement('td');
  $tdNotas.textContent = contacto.notas;
  $tr.appendChild($tdNotas);

  // ACCIONES
  const $tdAcciones = document.createElement('td');
  const $btnEditar = document.createElement('button');
  const $btnEliminar = document.createElement('button');
  $btnEditar.classList.add('btn', 'btn-sm', 'btn-warning', 'me-2');
  $btnEliminar.classList.add('btn', 'btn-sm', 'btn-danger');
  $btnEditar.textContent = 'Editar';
  $btnEliminar.textContent = 'Eliminar';
  $btnEditar.onclick = () => {
    prepararEdicionContacto(contacto);
  };
  $btnEliminar.onclick = () => {
    eliminarContacto(contacto.codigo, contacto.nombre);
  };
  $tdAcciones.appendChild($btnEditar);
  $tdAcciones.appendChild($btnEliminar);
  $tr.appendChild($tdAcciones);

  $tbody.appendChild($tr);
};

export const cargarTabla = () => {
  // 1. Recuperar los contactos
  const contactos = obtenerContactosDeLS();

  // 2. Vaciar la tabla de los datos anteriores
  const $tbody = document.getElementById('tbody-contactos');
  $tbody.innerHTML = '';

  // 3. Crear una fila (tr) por cada contacto
  contactos.forEach((contacto, indice) => {
    // Crear fila para este elemento
    cargarFilaTabla(contacto, indice + 1);
  });
};

// Objetivo: Cargar en el formulario estos datos
export const prepararEdicionContacto = (contacto) => {
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
}*/;
