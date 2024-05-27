/*const $btnIniciarSesion = document.getElementById('btnIniciarSesion');

$btnIniciarSesion.addEventListener('click', navegarLogin());

function navegarLogin() {
    window.location.href = '../pages/login.html';
}*/
import { validateEmail, validatePassword } from '../validators.js';

const $btnConfirmar=document.getElementById('btnConfirmar');
$btnConfirmar.addEventListener('click', validarCampoMail);

function validarCampoMail() {
    
}