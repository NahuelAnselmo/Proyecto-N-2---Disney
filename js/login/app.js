import { validateEmail, validatePassword } from "../validators.js";
import { estaLogueado } from '../utils.js';
import { Usuario } from './Usuario.js';

if (estaLogueado()) {
  window.location.replace('/pages/admin.html');
}

const usuarioPorDefecto = new Usuario('admin@admin.com', 'admin');

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

    if (usuarioPorDefecto.validarCredenciales(email, contraseña)) {
      $alertCredenciales.classList.add('d-none');
      sessionStorage.setItem('estaLogueado', true);
      sessionStorage.setItem(
        'usuario',
        JSON.stringify({
          email: usuarioPorDefecto.email,
          id: usuarioPorDefecto.id,
        })
      );

      swal.fire({
          title: 'Bienvenido',
          timer: 1500,
          showCancelButton: false,
          showConfirmButton: false,
          timerProgressBar: true,
        })
        .then(() => {
          window.location.assign('/pages/admin.html');
        });
    } else {
      $alertCredenciales.classList.remove('d-none');
    }
  }
});