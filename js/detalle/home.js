const target = document.getElementById("mainDetalle");

const goto = (e) => {
    const alt = e.target.alt;
    setData(alt); // Establecer la película seleccionada
    e.preventDefault();
}

const setData = (movie) => {
    localStorage.setItem('movieData', JSON.stringify(movie));

    // Actualizar la lista de películas
    cargarPeliculas();
};

const cargarPeliculas = () => {
    // Obtener las películas del localStorage y las existentes en el HTML
    const peliculasLocalStorage = obtenerPeliculasLocalStorage();
    const peliculasHTML = Array.from(document.querySelectorAll('.pelicula')).map(pelicula => pelicula.textContent);
    
    const movieList = document.getElementById("movieList");

    // Limpiar la lista actual de películas
    movieList.innerHTML = '';

    // Combinar las películas de localStorage y las existentes en el HTML
    const peliculasCombinadas = [...new Set([...peliculasLocalStorage, ...peliculasHTML])];

    // Iterar sobre las películas combinadas y agregarlas a la lista
    peliculasCombinadas.forEach(pelicula => {
        const listItem = document.createElement('li');
        listItem.textContent = pelicula;
        listItem.classList.add('pelicula'); // Añadir la clase 'pelicula'
        movieList.appendChild(listItem);
    });
};

const obtenerPeliculasLocalStorage = () => {
    // Obtener las películas del localStorage y devolverlas como un arreglo
    return JSON.parse(localStorage.getItem('peliculas')) || [];
};

// Llamar a la función para cargar las películas al cargar la página
document.addEventListener("DOMContentLoaded", cargarPeliculas);

// Asignar el evento de clic al contenedor principal
target.addEventListener("click", goto);
