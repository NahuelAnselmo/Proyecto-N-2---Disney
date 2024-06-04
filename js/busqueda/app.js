import { cargarTodo, buscarPeliculas } from "./utils.js";

const $inputBuscar = document.getElementById('inputBuscar');

cargarTodo();

const inputBuscar=$inputBuscar.value;

$inputBuscar.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        let inputBuscar = $inputBuscar.value;
        inputBuscar=inputBuscar.toUpperCase();
        buscarPeliculas(inputBuscar);
    }
});


