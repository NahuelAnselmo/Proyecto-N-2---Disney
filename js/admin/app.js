import {
  agregarPelicula,
  editarPelicula,
} from "./abm.js";
import {
  cargarTabla,
  estaEditando,
  cargarCategoriasEnSelect,
} from "./utils.js";
import { validateName, validateUrl } from "./validators.js";

const $form = document.getElementById("form-pelicula");
const $inputTitulo = document.getElementById("input-titulo");
const $inputTipo = document.getElementById("input-tipo");
const $inputCategoria = document.getElementById("input-categoria");
const $inputCaratula = document.getElementById("input-caratula");
const $inputTrailer = document.getElementById("input-trailer");
const $inputDescripcion = document.getElementById("input-descripcion");
const $inputPublicada = document.getElementById("input-publicada");

cargarCategoriasEnSelect($inputCategoria);
cargarTabla();

$inputTitulo.addEventListener("blur", () => {
  validateName($inputTitulo);
});

$inputTipo.addEventListener("blur", () => {
  validateName($inputTipo);
});

$inputCaratula.addEventListener("blur", () => {
  validateUrl($inputCaratula);
});

$inputTrailer.addEventListener("blur", () => {
  validateUrl($inputTrailer);
});

$inputDescripcion.addEventListener("blur", () => {
  validateName($inputDescripcion);
});

$inputPublicada.addEventListener("change", () => {
  validateName($inputPublicada);
});

$form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (
    !validateName($inputTitulo) ||
    !validateName($inputTipo) ||
    !validateUrl($inputCaratula) ||
    !validateUrl($inputTrailer)
  ) {
    alert("Revisa los campos");
    return;
  }

  const titulo = $inputTitulo.value;
  const tipo = $inputTipo.value;
  const categoriaSelect = $inputCategoria.selectedOptions[0];
  const categoria = categoriaSelect ? categoriaSelect.value : "";
  const caratula = $inputCaratula.value;
  const trailer = $inputTrailer.value;
  const descripcion = $inputDescripcion.value;
  const publicada = $inputPublicada.value;

  if (estaEditando()) {
    editarPelicula(
      titulo,
      tipo,
      categoria,
      caratula,
      trailer,
      descripcion,
      publicada
    );
  } else {
    agregarPelicula(
      titulo,
      tipo,
      categoria,
      caratula,
      trailer,
      descripcion,
      publicada
    );
  }

  $form.reset();
  $inputTitulo.classList.remove("is-valid", "is-invalid");
  $inputTipo.classList.remove("is-valid", "is-invalid");
  $inputCategoria.classList.remove("is-valid", "is-invalid");
  $inputCaratula.classList.remove("is-valid", "is-invalid");
  $inputTrailer.classList.remove("is-valid", "is-invalid");
  $inputDescripcion.classList.remove("is-valid", "is-invalid");
  $inputPublicada.classList.remove("is-valid", "is-invalid");

  cargarTabla();
  
  let mensaje = `Pelicula creada bajo el nombre de ${titulo}`;
  if (estaEditando()) mensaje = "Pelicula editada exitosamente";

  swal.fire({
    title: "Exito",
    text: mensaje,
    icon: "success",
    showConfirmButton: true,
    showCancelButton: false,
    confirmButtonText: "Genial",
  });
});
  document.getElementById("button-cancelar").addEventListener("click", () => {
  document.getElementById("form-pelicula").reset(); // Restablece el formulario
  document.getElementById("button-cancelar").classList.add("d-none"); // Oculta el botón Cancelar
  document.getElementById("alert-edicion-pelicula").classList.add("d-none"); // Oculta el mensaje de edición
  document.getElementById("form-pelicula").removeAttribute("onsubmit"); // Elimina el evento de submit del formulario
});
