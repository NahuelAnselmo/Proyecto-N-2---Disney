document.addEventListener("DOMContentLoaded", () => {
    const movieList = document.getElementById("movieList");

    const crearTarjetaPelicula = (src, alt, id) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";

        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = src;
        img.alt = alt;

        const overlay = document.createElement("div");
        overlay.className = "overlay";

        const link = document.createElement("a");
        link.href = `./pages/detallePeliculas.html?id=${id}`;
        link.textContent = "Ver detalles";

        overlay.appendChild(link);
        card.appendChild(img);
        card.appendChild(overlay);
        slide.appendChild(card);

        return slide;
    };

    let peliculasStorage = [];
    try {
        peliculasStorage = JSON.parse(localStorage.getItem("peliculas")) || [];
    } catch (e) {
        console.error("Error reading localStorage:", e);
        peliculasStorage = [];
    }

    const mostrarPeliculasPublicadas = () => {
        const peliculasPublicadas = peliculasStorage.filter(pelicula => pelicula.publicada === 'Si');

        peliculasPublicadas.forEach(pelicula => {
            const slide = crearTarjetaPelicula(pelicula.caratula, pelicula.titulo, pelicula.id);
            movieList.appendChild(slide);
        });

        new Swiper('.swiper-container', {
            spaceBetween: 15,
            direction: 'horizontal',
            loop: false,
            autoplay: false,
            navigation: {
                nextEl: '#nextButton',
                prevEl: '#prevButton',
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

    mostrarPeliculasPublicadas();
});
