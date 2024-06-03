$btnIniciarSesion=document.getElementById("btnIniciarSesion");
$btnRedigirRegistrarme=document.querySelectorAll(".suscripcion");

$btnIniciarSesion.addEventListener('click', navegarLogin);


if($btnRedigirRegistrarme){
    $btnRedigirRegistrarme.addEventListener('click', navegarRegistrarme);
}
function navegarLogin() {
    window.location.href = '../pages/login.html';
}

function navegarRegistrarme() {
    window.location.href = '../pages/registro.html';
}
