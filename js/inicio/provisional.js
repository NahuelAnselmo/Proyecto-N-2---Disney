document.addEventListener("DOMContentLoaded", () => {
    const movieList = document.getElementById("movieList");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");

    // Función para crear una tarjeta de película
    const crearTarjetaPelicula = (src, alt) => {
        const card = document.createElement("div");
        card.className = "card";
        const img = document.createElement("img");
        img.src = src;
        img.alt = alt;
        card.appendChild(img);
        return card;
    };

    // Cargar películas desde localStorage
    let peliculasStorage = [];
    try {
        peliculasStorage = JSON.parse(localStorage.getItem("peliculas")) || [];
    } catch (e) {
        console.error("Error reading localStorage:", e);
        peliculasStorage = [];
    }

    // Función para mostrar las películas publicadas de 5 en 5
    const mostrarPeliculasPublicadas = (inicio) => {
        movieList.innerHTML = ""; // Limpiar la lista antes de mostrar las películas

        // Filtrar solo las películas publicadas
        const peliculasPublicadas = peliculasStorage.filter(pelicula => pelicula.publicada === 'si');

        // Mostrar las siguientes 5 películas a partir del índice "inicio"
        peliculasPublicadas.slice(inicio, inicio + 5).forEach(pelicula => {
            const card = crearTarjetaPelicula(pelicula.caratula, pelicula.titulo);
            movieList.appendChild(card);
        });
    };

    // Mostrar las primeras 5 películas publicadas al cargar la página
    mostrarPeliculasPublicadas(0);

    // Añadir listeners a los botones de navegación
    let startIndex = 0; // Índice inicial para mostrar las películas
    const scrollAmount = 250; // Cantidad de desplazamiento horizontal

    prevButton.addEventListener("click", () => {
        startIndex = Math.max(startIndex - 5, 0); // Asegurarse de no ir más allá del principio
        mostrarPeliculasPublicadas(startIndex);
    });

    nextButton.addEventListener("click", () => {
        if (startIndex + 5 < peliculasStorage.length) { // Asegurarse de no ir más allá del final
            startIndex += 5;
            mostrarPeliculasPublicadas(startIndex);
        }
    });
});
