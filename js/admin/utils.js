import { obtenerPeliculaSerieDeLs, obtenerCategoriasDeLS, obtenerPeliculasDestacadas } from "../utils.js";
import { eliminarPelicula } from "./abm.js";
import { destacarPelicula } from "./abm.js";

const cargarFilaTabla = (pelicula, indice) => {
  const $tbody = document.getElementById("tbody-peliculas");

  const $tr = document.createElement("tr");

  const $tdDestacar = document.createElement("td");
  const $btnDestacar = document.createElement("button");
  $btnDestacar.classList.add("btn", "btn-sm", "btn-info", "me-2", "bg-warning");
  $btnDestacar.innerHTML = '<i class="fa-regular fa-star"></i>';
  $btnDestacar.onclick = () => {
    destacarPelicula(pelicula.codigo, pelicula.titulo);
    cargarTabla();
  };
  $tdDestacar.appendChild($btnDestacar);
  $tr.appendChild($tdDestacar);

  const $tdIndice = document.createElement("td");
  $tdIndice.textContent = indice;
  $tr.appendChild($tdIndice);

  const $tdTitulo = document.createElement("td");
  $tdTitulo.textContent = pelicula.titulo;
  $tr.appendChild($tdTitulo);

  const $tdTipo = document.createElement("td");
  $tdTipo.textContent = pelicula.tipo;
  $tr.appendChild($tdTipo);

  const $tdCaratula = document.createElement("td");
  const $imagen = document.createElement("img");
  $imagen.src = pelicula.caratula;
  $imagen.alt = pelicula.titulo;
  $imagen.classList.add("imagen-tabla");
  $tdCaratula.appendChild($imagen);
  $tr.appendChild($tdCaratula);

  const $tdCategoria = document.createElement("td");
  const categorias = obtenerCategoriasDeLS();
  const categoria = categorias.find((categoria) => {
    return categoria.id === pelicula.categoria;
  });
  const nombreCategoria = categoria ? categoria.nombre : "Sin categoría";
  $tdCategoria.textContent = nombreCategoria;
  $tr.appendChild($tdCategoria);

  const $tdPortada = document.createElement("td");
  const $portada = document.createElement("img");
  $portada.src = pelicula.portada;
  $portada.alt = pelicula.titulo;
  $portada.classList.add("portada-tabla");
  $tdPortada.appendChild($portada);
  $tr.appendChild($tdPortada);

  const $tdDescripcion = document.createElement("td");
  $tdDescripcion.textContent = pelicula.descripcion;
  $tr.appendChild($tdDescripcion);

  const $tdPublicada = document.createElement("td");
  $tdPublicada.textContent = pelicula.publicada;
  $tr.appendChild($tdPublicada);

  const $tdAcciones = document.createElement("td");
  const $btnEditar = document.createElement("button");
  const $btnEliminar = document.createElement("button");
  $btnEditar.classList.add("btn", "btn-sm", "btn-warning", "me-2");
  $btnEliminar.classList.add("btn", "btn-sm", "btn-danger");
  $btnEditar.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
  $btnEliminar.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
  $btnEditar.onclick = () => {
    prepararEdicionPelicula(pelicula);
  };
  $btnEliminar.onclick = () => {
    eliminarPelicula(pelicula.codigo, pelicula.titulo);
    cargarTabla();
  };
  $tdAcciones.appendChild($btnEditar);
  $tdAcciones.appendChild($btnEliminar);
  $tr.appendChild($tdAcciones);

  $tbody.appendChild($tr);
};

export const cargarTabla = () => {
  const peliculas = obtenerPeliculaSerieDeLs();

  const $tbody = document.getElementById("tbody-peliculas");
  $tbody.innerHTML = "";

  peliculas.forEach((pelicula, indice) => {
    cargarFilaTabla(pelicula, indice + 1);
  });
};


export const prepararEdicionPelicula = (pelicula) => {
  swal
    .fire({
      title: "Atención",
      text: `¿Estás seguro que deseas editar esta pelicula?.`,
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    })
    .then((result) => {
      if (result.isConfirmed) {
        const $inputTitulo = document.getElementById("input-titulo");
        const $inputTipo = document.getElementById("input-tipo");
        const $inputCategoria = document.getElementById("input-categoria");
        const $inputCaratula = document.getElementById("input-caratula");
        const $inputTrailer = document.getElementById("input-trailer");
        const $inputDescripcion = document.getElementById("input-descripcion");
        const $inputPublicada = document.getElementById("input-publicada");

        $inputTitulo.value = pelicula.titulo;
        $inputTipo.value = pelicula.tipo;
        $inputCategoria.value = pelicula.categoria;
        $inputCaratula.value = pelicula.caratula;
        $inputTrailer.value = pelicula.trailer;
        $inputDescripcion.value = pelicula.descripcion;
        $inputPublicada.value = pelicula.publicada;

        sessionStorage.setItem("codigoPelicula", pelicula.codigo);

        const $alert = document.getElementById("alert-edicion-pelicula");
        const $spanPelicula = document.getElementById(
          "titulo-edicion-pelicula"
        );
        $alert.classList.remove("d-none");
        $spanPelicula.textContent = pelicula.titulo;

        const $button = document.getElementById("button-cancelar");
        $button.classList.remove("d-none");
      } else {
        // Lógica para cancelar la edición
        sessionStorage.removeItem("codigoPelicula");
        swal.fire({
          title: "Cancelado",
          text: "La edición ha sido cancelada",
          icon: "info",
          showConfirmButton: true,
          confirmButtonText: "Ok",
        });
      }
    });
};

export const estaEditando = () => {
  return !!sessionStorage.getItem("codigoPelicula");
};

export function cargarCategoriasEnSelect($selectCategoria) {
  const categorias = obtenerCategoriasDeLS();

  $selectCategoria.innerHTML = "";

  const $defaultOption = document.createElement("option");
  $defaultOption.value = "";
  $defaultOption.textContent = "Seleccione una categoría";
  $selectCategoria.appendChild($defaultOption);

  categorias.forEach((categoria) => {
    let $option = document.createElement("option");
    $option.value = categoria.id;
    $option.textContent = categoria.nombre;
    $selectCategoria.appendChild($option);
  });
}

export function existePelicula(tituloPelicula) {
  tituloPelicula = tituloPelicula.toUpperCase();
  const peliculas = obtenerPeliculaSerieDeLs();
  for (const pelicula of peliculas) {
    if (pelicula.titulo.toUpperCase() === tituloPelicula) {
      const mensaje = `Esa película ya existe, por favor, intente de nuevo`;
      swal.fire({
        title: "Error",
        text: mensaje,
        icon: "error",
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: "¡OK!",
      });
      return true;
    }
  }
  return false;
}

export function cargarPeliculasDestacadas () {
  const peliculasDestacadas = obtenerPeliculasDestacadas();
  const $swiperWrapper = document.querySelector(".swiper-wrapper");
  $swiperWrapper.innerHTML = "";

  peliculasDestacadas.forEach((pelicula) => {
    const $slide = document.createElement("div");
    $slide.classList.add("swiper-slide");

    const $img = document.createElement("img");
    $img.src = pelicula.portada;
    $img.alt = pelicula.titulo;

    const $overlay = document.createElement("div");
    $overlay.classList.add("overlay");

    const $title = document.createElement("h1");
    $title.classList.add("title");
    $title.textContent = pelicula.titulo;

    const $description = document.createElement("p");
    $description.classList.add("description");
    $description.textContent = pelicula.descripcion;

    const $buttons = document.createElement("div");
    $buttons.classList.add("buttons");

    const $playButton = document.createElement("a");
    $playButton.href = "../pages/detalle.html"; // Agrega la URL del trailer
    $playButton.classList.add("btn", "btn-primary", "btn-lg", "btn-primary");
    $playButton.innerHTML = '<i class="fa-regular fa-circle-play me-1"></i>Reproducir';

    const $moreButton = document.createElement("a");
    $moreButton.href = "../pages/detalle.html"; // Agrega la URL para ver más detalles
    $moreButton.classList.add("btn", "btn-outline-warning", "btn-secondary-outline", "btn-lg");
    $moreButton.innerHTML = '<i class="ri-error-warning-line"></i>Ver Más';

    $buttons.appendChild($playButton);
    $buttons.appendChild($moreButton);

    $overlay.appendChild($title);
    $overlay.appendChild($description);
    $overlay.appendChild($buttons);

    $slide.appendChild($img);
    $slide.appendChild($overlay);

    $swiperWrapper.appendChild($slide);
  });

  // Inicializar Swiper
  const swiper = new Swiper('.swiper-hero', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}
