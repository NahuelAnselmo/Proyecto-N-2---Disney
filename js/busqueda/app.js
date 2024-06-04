import { cargarTodo, buscarPeliculas } from "./utils.js";

const $inputBuscar = document.getElementById('inputBuscar');

cargarTodo();

$inputBuscar.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        let inputBuscar = $inputBuscar.value;
        inputBuscar=inputBuscar.toUpperCase();
        buscarPeliculas(inputBuscar);
    }
});


