import { validateEmail, validatePassword } from "../validators.js";
import { estaLogueado } from './utils.js';


const $inputEmail=document.getElementById('inputEmail');
const $inputContraseña=document.getElementById('inputContraseña');
const $form = document.getElementById('login-form');
const $alertCredenciales = document.getElementById('alert-login');

$inputEmail.addEventListener('blur',() => {
    validateEmail($inputEmail);
});

$form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validateEmail($inputEmail, false) && validatePassword($inputContraseña)) {
    const email = $inputEmail.value;
    const contraseña = $inputContraseña.value;
    const logueado = estaLogueado(email, contraseña);
    if (logueado === true) {
      swal.fire({
        title: 'Bienvenido',
        timer: 1500,
        icon: 'success',
        showCancelButton: false,
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        window.location.assign('/pages/inicio.html');
      });
    } else {
      swal.fire({
        title: 'Usuario inexistente',
        icon: 'error',
        timer: 1500,
        showCancelButton: false,
        showConfirmButton: false,
      }).then(() => {
        $alertCredenciales.classList.remove('d-none');
      });
    }
  }
  $form.reset();
});