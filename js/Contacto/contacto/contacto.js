import { validarEmail, validarNombre, validarNotas, validarNumero } from "../validators.js";

const $form = document.getElementById("form-contaco");
const $imputNombre = document.getElementById("imput-nombre");
const $imputEmail = document.getElementById("imput-email");
const $imputNumero = document.getElementById("imput-numero");
const $imputNotas = document.getElementById("imput-notas");

$form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validarNombre($imputNombre) || 
        !validarNumero($imputNumero) || 
        !validarEmail($imputEmail) ||
        !validarNotas($imputNotas)
    ){
        alert ('revise que los campos esten correctos'); 
        return;
    }

    window.location.href = "#404";
});

