import { estaLogueado } from './utils.js';

const $botonLogout = document.getElementById('boton-salir');

if (estaLogueado()) {
  $botonLogout.classList.remove('d-none');
}
$botonLogout.addEventListener('click', () => {
  swal
    .fire({
      title: 'Atención',
      text: '¿Estás seguro que deseas cerrar sesion?',
      confirmButtonText: 'Si, cerrar',
      cancelButtonText: 'No, mantenerse logueado',
      showCancelButton: true,
    })
    .then((res) => {
      if (res.isConfirmed) {
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('estaLogueado');

        window.location.assign('/');
      }
    });
});