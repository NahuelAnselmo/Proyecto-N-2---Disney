$btnIniciarSesion=document.getElementById("btnIniciarSesion");

if($btnIniciarSesion){
    $btnIniciarSesion.addEventListener('click', navegarLogin);
}
function navegarLogin() {
    window.location.href = '../pages/login.html';
}