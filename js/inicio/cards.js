import { obtenerCategoriasDeLS, obtenerPeliculaSerieDeLs } from "../utils.js";

export const cargarSlider = () => {
  const peliculasSeries = obtenerPeliculaSerieDeLs();
  const categorias = obtenerCategoriasDeLS();
  const $categoriesContainer = document.getElementById('categories-container');

  if (!peliculasSeries || !categorias) {
    console.error('No se pudieron obtener las películas o las categorías desde el local storage.');
    return;
  }

  $categoriesContainer.innerHTML = ''; 

  categorias.forEach((categoria) => {
    const categoriaPeliculas = peliculasSeries.filter(pelicula => pelicula.categoria === categoria.id && pelicula.publicada.toLowerCase() === "si");

    if (categoriaPeliculas.length > 0) {
      const $sliderContainer = document.createElement('div');
      $sliderContainer.classList.add('slider-container');
      
      const $tituloCategoria = document.createElement('h3');
      $tituloCategoria.classList.add('text-light', 'mt-3', 'text-center');
      $tituloCategoria.textContent = categoria.nombre; 
      
      const $swiperContainer = document.createElement('div');
      $swiperContainer.classList.add('swiper', 'swiper-cards', 'mt-3');
      
      const $swiperWrapper = document.createElement('div');
      $swiperWrapper.classList.add('swiper-wrapper');
      
      categoriaPeliculas.forEach((peliculaSerie) => {
        const $slideCards = document.createElement('div');
        $slideCards.classList.add('swiper-slide');

        const $card = document.createElement('div');
        $card.classList.add('card');

        const $imgCard = document.createElement('img');
        $imgCard.src = peliculaSerie.caratula;
        $imgCard.alt = peliculaSerie.titulo;

        const $overlayCard = document.createElement('div');
        $overlayCard.classList.add('overlay-card', 'swiper-hero');

        const $text = document.createElement('div');
        $text.classList.add('text', 'overlay');

        const $title = document.createElement('h5');
        $title.classList.add('card-title', 'title');
        $title.textContent = peliculaSerie.titulo;

        const $description = document.createElement('p');
        $description.classList.add('card-text', 'description');
        $description.textContent = peliculaSerie.descripcion;

        const $divBotonesCard = document.createElement('div');
        $divBotonesCard.classList.add('buttons', 'd-flex', 'justify-content-center');

        const $btnDetallesCard = document.createElement('a');
        $btnDetallesCard.classList.add(
          'text-decoration-none',
          'btn-orange-outline',
          'btn',
          'mx-1',
          'fs-5'
        );
        $btnDetallesCard.textContent = 'Detalles'; 
        $btnDetallesCard.classList.add('btn'); 
        $divBotonesCard.appendChild($btnDetallesCard);
        
        $btnDetallesCard.dataset.movieCode = peliculaSerie.codigo;
        
        $btnDetallesCard.addEventListener('click', () => {
          const movieCode = $btnDetallesCard.dataset.movieCode; 
          if (movieCode) {
            console.log(movieCode);
            sessionStorage.setItem('selectedMovieUUID', movieCode); 
            window.location.href = '../pages/detalle.html'; 
          } 
        });

        $text.appendChild($title);
        $text.appendChild($description);
        $text.appendChild($divBotonesCard);

        $overlayCard.appendChild($text);
        $card.appendChild($imgCard);
        $card.appendChild($overlayCard);
        $slideCards.appendChild($card);
        $swiperWrapper.appendChild($slideCards);
      });

      $swiperContainer.appendChild($swiperWrapper);
      $sliderContainer.appendChild($tituloCategoria);
      $sliderContainer.appendChild($swiperContainer);
      $categoriesContainer.appendChild($sliderContainer);

      new Swiper($swiperContainer, {
        spaceBetween: 15,
        direction: 'horizontal',
        loop: false,
        autoplay: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
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
    }
  });
};
