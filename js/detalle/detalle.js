import { obtenerPeliculaSerieDeLs } from "../utils.js";

const bgImg = document.querySelector("#bgImg");
const imgTitle = document.querySelector("#imgTitle");
const subtitle = document.querySelector(".subTitle");
const description = document.querySelector(".description");

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch("URL_DEL_ARCHIVO_JSON_AQUI");
        const data = await res.json();
        const movie = getData();

        const movieIndex = data.movies.findIndex(item => item.titulo === movie);
        if (movieIndex !== -1) {
            const selectedMovie = data.peliculaa[movieIndex];
            bgImg.src = selectedMovie.portada;
            imgTitle.src = selectedMovie.titulo;
            subtitle.innerHTML = selectedMovie.descripcion;
            description.innerHTML = selectedMovie.descripcion;
        }
    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
});

const getData = () => {
    return JSON.parse(localStorage.getItem('movieData'));
}
