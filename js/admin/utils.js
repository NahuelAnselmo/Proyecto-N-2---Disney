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

export const cargarPeliculasDestacadas = () => {
  const peliculasDestacadas = obtenerPeliculasDestacadas();
  const $swiperContainer = document.querySelector(".swiper-hero .swiper-wrapper");
  $swiperContainer.innerHTML = "";

  if (peliculasDestacadas.length === 0) {
    const $swiperSlide = document.createElement("div");
    $swiperSlide.classList.add("swiper-slide");

    const $defaultBanner = document.createElement("img");
    $defaultBanner.classList.add("img-banner-disney");
    $defaultBanner.src = "";
    $defaultBanner.alt = "Banner por defecto disney";

    const $overlay = document.createElement("div");
    $overlay.classList.add("overlay");

    const $title = document.createElement("h1");
    $title.classList.add("title");

    const $description = document.createElement("p");
    $description.classList.add("description");

    const $buttons = document.createElement("div");
    $buttons.classList.add("buttons");

    const $btnReproducir = document.createElement("a");
    $btnReproducir.href = "";
    $btnReproducir.classList.add("btn", "btn-play", "btn-lg", "btn-orange", "btn-secondary");

    const $iconoReproducir = document.createElement("i");
    $iconoReproducir.classList.add("fa-regular", "fa-circle-play", "me-1");

    $btnReproducir.appendChild($iconoReproducir);
    $btnReproducir.appendChild(document.createTextNode("Reproducir"));

    const $btnInfo = document.createElement("a");
    $btnInfo.href = "#";
    $btnInfo.classList.add("btn", "btn-outline-secondary", "btn-orange-outline", "btn-lg");

    const $iconoInfo = document.createElement("i");
    $iconoInfo.classList.add("ri-error-warning-line", "me-1");

    $btnInfo.appendChild($iconoInfo);
    $btnInfo.appendChild(document.createTextNode("Ver Más"));

    $buttons.appendChild($btnReproducir);
    $buttons.appendChild($btnInfo);

    $overlay.appendChild($title);
    $overlay.appendChild($description);
    $overlay.appendChild($buttons);

    $swiperSlide.appendChild($defaultBanner);
    $swiperSlide.appendChild($overlay);

    $swiperContainer.appendChild($swiperSlide);
  } else {
    peliculasDestacadas.forEach((pelicula) => {
      const $swiperSlide = document.createElement("div");
      $swiperSlide.classList.add("swiper-slide");

      const $imgSwiper = document.createElement("img");
      $imgSwiper.src = pelicula.portada;
      $imgSwiper.alt = pelicula.titulo;

      const $overlaySwiper = document.createElement("div");
      $overlaySwiper.classList.add("overlay");

      const $titleSwiper = document.createElement("h1");
      $titleSwiper.classList.add("title");
      $titleSwiper.textContent = pelicula.titulo;

      const $descriptionSwiper = document.createElement("p");
      $descriptionSwiper.classList.add("description");
      $descriptionSwiper.textContent = pelicula.descripcion;

      const $highlightButtonSwiper = document.createElement("div");
      $highlightButtonSwiper.classList.add("buttons");

      const $btnReproducirSwiper = document.createElement("a");
      $btnReproducirSwiper.href = "../pages/detalle.html";
      $btnReproducirSwiper.classList.add(
        "btn",
        "btn-play",
        "btn-lg",
        "btn-orange",
        "btn-secondary"
      );

      $btnReproducirSwiper.dataset.id = pelicula.code;

      const $iconoReproducirSwiper = document.createElement("i");
      $iconoReproducirSwiper.classList.add(
        "fa-regular",
        "fa-circle-play",
        "me-1"
      );
      $btnReproducirSwiper.appendChild($iconoReproducirSwiper);
      $btnReproducirSwiper.appendChild(document.createTextNode("Reproducir"));

      const $btnInfoSwiper = document.createElement("a");
      $btnInfoSwiper.href = "../pages/detalle.html";
      $btnInfoSwiper.classList.add(
        "btn",
        "btn-outline-secondary",
        "btn-orange-outline",
        "btn-lg"
      );
      const $iconoInfoSwiper = document.createElement("i");
      $iconoInfoSwiper.classList.add("ri-error-warning-line", "me-1");
      $btnInfoSwiper.appendChild($iconoInfoSwiper);
      $btnInfoSwiper.appendChild(document.createTextNode("Ver más"));
      $btnInfoSwiper.addEventListener('click', (e) => {
        e.preventDefault(); 
        
        const movieCode = pelicula.codigo; 
        
        if (movieCode) {
          console.log(movieCode); 
          sessionStorage.setItem('selectedMovieUUID', movieCode); 
          window.location.href = '../pages/detalle.html';
        } else {
          console.error('No se pudo obtener el código de la película.'); // En caso de que no se pueda obtener el código de la película
        }
      });

      $highlightButtonSwiper.appendChild($btnReproducirSwiper);
      $highlightButtonSwiper.appendChild($btnInfoSwiper);

      $overlaySwiper.appendChild($titleSwiper);
      $overlaySwiper.appendChild($descriptionSwiper);
      $overlaySwiper.appendChild($highlightButtonSwiper);

      $swiperSlide.appendChild($imgSwiper);
      $swiperSlide.appendChild($overlaySwiper);

      $swiperContainer.appendChild($swiperSlide);
    });
  }
  new Swiper(".swiper-hero", {
    direction: "horizontal",
    loop: true,
    effect: "fade",
    autoplay: {
      delay: 10000,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },
  
    pagination: {
      el: ".swiper-pagination",
      clickable: "true",
      dynamicBullets: "true",
    },
  
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  
};
