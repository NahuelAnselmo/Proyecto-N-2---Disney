import { validateCategoria } from "../validators.js";
import { agregarCategoria, editarCategoria } from "./abmCategoria.js";
import { cargarTabla, existeCategoria, estaEditando } from "./utils.js";

cargarTabla();

const $btnAgregarCategoria=document.getElementById("btnAgregarCategoria");
const $inputNombreCategoria=document.getElementById("inputNombreCategoria");
const $inputDescripcionCategoria=document.getElementById("inputDescripcionCategoria");
const $btnCancelarCategoria=document.getElementById("btnCancelarCategoria");
const $modalAgregarCategoria=document.getElementById("modalAgregarCategoria");

if ($btnAgregarCategoria) {
    $btnAgregarCategoria.addEventListener("click", mostrarModal);
}
$inputNombreCategoria.addEventListener('blur',() => {
   validateCategoria($inputNombreCategoria);
});

function mostrarModal() {
    const modal = new bootstrap.Modal(document.getElementById('modalAgregarCategoria'));
    modal.show();
}
// Evento para el botón Cancelar
$btnCancelarCategoria.addEventListener('click', () => {
  const modalInstance = bootstrap.Modal.getInstance($modalAgregarCategoria);
  $inputNombreCategoria.value = '';
  $inputDescripcionCategoria.value = '';
  modalInstance.hide();
});
$modalAgregarCategoria.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!validateCategoria($inputNombreCategoria)) {
    alert('Revisá los campos');
    return;
  }

  let nombreCategoria = $inputNombreCategoria.value;
  const descripcionCategoria = $inputDescripcionCategoria.value;

  if (estaEditando()) {
    editarCategoria(nombreCategoria, descripcionCategoria);
  } else {
    if(existeCategoria(nombreCategoria)===false){
      nombreCategoria = nombreCategoria.toUpperCase();
    agregarCategoria(nombreCategoria, descripcionCategoria);
    }
  }

  $inputNombreCategoria.classList.remove('is-valid', 'is-invalid');
  $inputDescripcionCategoria.classList.remove('is-valid', 'is-invalid');

  cargarTabla();

  const modalInstance = bootstrap.Modal.getInstance($modalAgregarCategoria);
  $inputNombreCategoria.value = '';
  $inputDescripcionCategoria.value = '';
  modalInstance.hide();
});

$modalAgregarCategoria.addEventListener('hidden.bs.modal', () => {
  $inputNombreCategoria.classList.remove('is-valid', 'is-invalid');
  $inputDescripcionCategoria.classList.remove('is-valid', 'is-invalid');
});