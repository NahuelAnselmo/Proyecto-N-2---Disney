const $btnIniciarSesion = document.getElementById('btnIniciarSesion');

$btnIniciarSesion.addEventListener('click', navegarLogin());

function navegarLogin() {
    window.location.href = '../pages/login.html';
}