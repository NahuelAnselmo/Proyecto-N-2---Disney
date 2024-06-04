import { cargarPeliculasDestacadas } from "../admin/utils.js";
import { cargarSlider } from "./cards.js";

cargarPeliculasDestacadas();

cargarSlider();

const $btnBusqueda = document.getElementById('btnBusqueda');
if ($btnBusqueda) {
    $btnBusqueda.addEventListener('click', (event) => {
        event.preventDefault(); 
        window.location.href = 'busqueda.html';
    });
}
