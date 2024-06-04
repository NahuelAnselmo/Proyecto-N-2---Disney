import { cargarPeliculasDestacadas } from "../admin/utils.js";
import { cargarSlider } from "./cards.js";

cargarPeliculasDestacadas();

cargarSlider();

const botonesPlay = document.querySelectorAll(".btn-play");

botonesPlay.forEach((boton) => {
  boton.addEventListener("click", (event) => {
    event.preventDefault();

    const peliculaId = boton.dataset.id
    
    const peliculas = obtenerPeliculasSeriesDeLS();

    const pelicula = peliculas.find(p => p.code === peliculaId)

    if(pelicula){
    localStorage.setItem("peliculaSeleccionada", JSON.stringify(pelicula));
    window.location.href = "./pages/detalle.html";
  } else {
    console.error(`No se encontró la película con id ${peliculaId}`);
  }
  });
});
