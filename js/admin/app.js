import { validateCategoria } from "../validators.js";
import { agregarCategoria } from "./abmCategoria.js";
import { cargarTabla, existeCategoria } from "./utils.js";

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

$modalAgregarCategoria.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!validateCategoria($inputNombreCategoria)) {
    alert('Revisá los campos');
    return;
  }
  
  let nombreCategoria = $inputNombreCategoria.value;
  nombreCategoria = nombreCategoria.toUpperCase();
  let existeCat = existeCategoria({ nombre: nombreCategoria });

  if (existeCat) {
    alert('La categoria ya existe');
    return;
  }

  const descripcionCategoria = $inputDescripcionCategoria.value;

  agregarCategoria(nombreCategoria, descripcionCategoria);

  swal.fire({
    title: 'Éxito',
    text: `Categoría creada bajo el nombre de ${nombreCategoria}`,
    icon: 'success',
    showConfirmButton: true,
    confirmButtonText: '¡OK!'
  }).then(() => {
    $inputNombreCategoria.value = '';
    $inputDescripcionCategoria.value = '';

    $inputNombreCategoria.classList.remove('is-valid', 'is-invalid');
    $inputDescripcionCategoria.classList.remove('is-valid', 'is-invalid');

    const modalInstance = bootstrap.Modal.getInstance($modalAgregarCategoria);
    modalInstance.hide();
  });

  cargarTabla();
});

$modalAgregarCategoria.addEventListener('hidden.bs.modal', () => {
  $inputNombreCategoria.classList.remove('is-valid', 'is-invalid');
  $inputDescripcionCategoria.classList.remove('is-valid', 'is-invalid');
});
