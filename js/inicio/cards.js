import { obtenerPeliculaSerieDeLs } from "../utils.js";

export const cargarSlider = () => {
  const peliculasSeries = obtenerPeliculaSerieDeLs();
  const $swiperWrapper = document.getElementById("wrapper-cards");
  $swiperWrapper.innerHTML = "";

  peliculasSeries.forEach((peliculaSerie) => {  
    if (peliculaSerie.publicada.toLowerCase() === "si") {

      const $slideCards = document.createElement("div");
      $slideCards.classList.add("swiper-slide");

      const $card = document.createElement("div");
      $card.classList.add("card");

      const $imgCard = document.createElement("img");
      $imgCard.src = peliculaSerie.caratula;
      $imgCard.alt = peliculaSerie.titulo;

      const $overlayCard = document.createElement("div");
      $overlayCard.classList.add("overlay-card", "swiper-hero");

      const $text = document.createElement("div");
      $text.classList.add("text", "overlay");

      const $title = document.createElement("h5");
      $title.classList.add("card-title", "title");
      $title.textContent = peliculaSerie.titulo;

      const $description = document.createElement("p");
      $description.classList.add("card-text", "description");
      $description.textContent = peliculaSerie.descripcion;

      const $divBotonesCard = document.createElement("div");
      $divBotonesCard.classList.add("buttons", "d-flex", "justify-content-center");

      const $btnDetallesCard = document.createElement("a");
      $btnDetallesCard.classList.add(
        "text-decoration-none",
        "btn-orange-outline",
        "btn",
        "mx-1",
        "fs-5"
      );
      $btnDetallesCard.textContent = "Detalles";
      $btnDetallesCard.addEventListener("click", (e) => {
        e.preventDefault(); 
        sessionStorage.setItem("selectedMovieUUID", peliculaSerie.codigo);
        window.location.href = "../pages/detalle.html"; 
      });

      $divBotonesCard.appendChild($btnDetallesCard);

      $text.appendChild($title);
      $text.appendChild($description);
      $text.appendChild($divBotonesCard);

      $overlayCard.appendChild($text);
      $card.appendChild($imgCard);
      $card.appendChild($overlayCard);
      $slideCards.appendChild($card);
      $swiperWrapper.appendChild($slideCards);
    }
  });

  new Swiper(".swiper-cards", {
    spaceBetween: 15,
    direction: "horizontal",
    loop: false,
    autoplay: false,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 5,
      },
      1400: {
        slidesPerView: 6,
      },
    },
  });
};

document.addEventListener("DOMContentLoaded", cargarSlider);
