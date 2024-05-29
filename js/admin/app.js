import { validateCategoria } from "../validators.js";
import { agregarCategoria, editarCategoria } from "./abmCategoria.js";
import { cargarTabla, existeCategoria, estaEditando } from "./utils.js";

cargarTabla();

const $btnAgregarCategoria=document.getElementById("btnAgregarCategoria");
const $inputNombreCategoria=document.getElementById("inputNombreCategoria");
const $inputDescripcionCategoria=document.getElementById("inputDescripcionCategoria");
const $btnConfirmarCategoria=document.getElementById("btnConfirmarCategoria");
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
$btnConfirmarCategoria.addEventListener('click', () => {
  $modalAgregarCategoria.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
});

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
  nombreCategoria = nombreCategoria.toUpperCase();
  let existeCat = existeCategoria(nombreCategoria);

  if (existeCat) {
    alert('La categoria ya existe');
    return;
  }

  const descripcionCategoria = $inputDescripcionCategoria.value;

  if (estaEditando()) {
    editarCategoria(nombreCategoria, descripcionCategoria);
  } else {
    agregarCategoria(nombreCategoria, descripcionCategoria);
  }

  $inputNombreCategoria.value = '';
  $inputDescripcionCategoria.value = '';
  $inputNombreCategoria.classList.remove('is-valid', 'is-invalid');
  $inputDescripcionCategoria.classList.remove('is-valid', 'is-invalid');

  cargarTabla();

  let mensaje = `Categoria creada bajo el nombre de ${nombreCategoria}`;
  if (estaEditando()) mensaje = 'Categoria editada exitosamente';

  swal.fire({
    title: 'Exito',
    text: mensaje,
    icon: 'success',
    showConfirmButton: true,
    showCancelButton: false,
    confirmButtonText: '¡OK!',
  });

  const modalInstance = bootstrap.Modal.getInstance($modalAgregarCategoria);
  modalInstance.hide();
});

$modalAgregarCategoria.addEventListener('hidden.bs.modal', () => {
  $inputNombreCategoria.classList.remove('is-valid', 'is-invalid');
  $inputDescripcionCategoria.classList.remove('is-valid', 'is-invalid');
});