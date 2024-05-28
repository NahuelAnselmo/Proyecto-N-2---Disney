//import { agregarCategoriasALS } from "./utils";

import { validateCategoria } from "../validators.js";
import { agregarCategoria } from "./abmCategoria.js";


const $btnAgregarCategoria=document.getElementById("btnAgregarCategoria");
const $inputNombreCategoria=document.getElementById("inputNombreCategoria");
const $inputDescripcionCategoria=document.getElementById("inputDescripcionCategoria");
const $btnConfirmarCategoria=document.getElementById("btnConfirmarCategoria");
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
    if (
      !validateCategoria($inputNombreCategoria)
    ) {
      alert('Revisá los campos');
      return;
    }
  
    const nombreCategoria = $inputNombreCategoria.value;
    const descripcionCategoria = $inputDescripcionCategoria.value;
  
    agregarCategoria(nombreCategoria,descripcionCategoria);
  
    $modalAgregarCategoria.addEventListener('hidden.bs.modal', () => {
        $inputNombreCategoria.classList.remove('is-valid', 'is-invalid');
        $inputDescripcionCategoria.classList.remove('is-valid', 'is-invalid');
    });
    
  
  });
  