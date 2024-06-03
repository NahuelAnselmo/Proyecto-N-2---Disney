import { obtenerPeliculaSerieDeLs } from "../utils.js";
import { cargarPeliculasDestacadas } from "../admin/utils.js";

cargarPeliculasDestacadas();

export const cargarSlider = () => {
  const peliculasSeries = obtenerPeliculaSerieDeLs();
  const $swiperWrapper = document.querySelector(".swiper-wrapper");
  $swiperWrapper.innerHTML = "";

  peliculasSeries.forEach((peliculaSerie) => {
      if (peliculaSerie.publicada === "Si") {
          const $slideCards = document.createElement("div");
          $slideCards.classList.add("swiper-slide");

          const $card = document.createElement("div");
          $card.classList.add("card");

          const $imgCard = document.createElement("img");
          $imgCard.src = peliculaSerie.caratula;
          $imgCard.alt = peliculaSerie.titulo;

          const $overlayCard = document.createElement("div");
          $overlayCard.classList.add("overlay-card", "card");

          const $text = document.createElement("div");
          $text.classList.add("text", "card-body", "d-flex", "flex-column", "justify-content-between");

          const $title = document.createElement("h5");
          $title.classList.add("card-title");
          $title.textContent = peliculaSerie.titulo;

          const $description = document.createElement("p");
          $description.classList.add("card-text", "mb-4", "flex-grow-1");
          $description.textContent = peliculaSerie.descripcion;

          const $divBotonesCard = document.createElement("div");
          $divBotonesCard.classList.add("botones-card", "mt-auto", "d-flex", "justify-content-around");

          const $btnReproducirCard = document.createElement("a");
          $btnReproducirCard.href = "./pages/detallePeliculas.html";
          $btnReproducirCard.classList.add("btn-play");
          const $iconoReproducirCard = document.createElement("i");
          $iconoReproducirCard.classList.add("ri-play-large-line");
          $btnReproducirCard.appendChild($iconoReproducirCard);

          const $btnFavoritoCard = document.createElement("a");
          $btnFavoritoCard.href = "#";
          const $iconoFavoritoCard = document.createElement("i");
          $iconoFavoritoCard.classList.add("ri-bookmark-line");
          $btnFavoritoCard.appendChild($iconoFavoritoCard);

          const $btnDetallesCard = document.createElement("a");
          $btnDetallesCard.href = "#";
          const $iconoDetallesCard = document.createElement("i");
          $iconoDetallesCard.classList.add("ri-add-line");
          $btnDetallesCard.appendChild($iconoDetallesCard);

          $divBotonesCard.appendChild($btnReproducirCard);
          $divBotonesCard.appendChild($btnFavoritoCard);
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

  // Inicializar Swiper
  new Swiper(".swiper-cards", {
      spaceBetween: 15,
      direction: "horizontal",
      loop: true,
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

new Swiper(".swiper-cards", {
  // Optional parameters

  spaceBetween: 15,

  direction: "horizontal",
  loop: true,
  autoplay: false,

  // Navigation arrows
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
