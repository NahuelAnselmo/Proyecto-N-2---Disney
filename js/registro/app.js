import { agregarUsuario } from "./alta.js";
import { iniciarCuentaAdmin } from "./utils.js";
import { validateName,validateEmail,validatePassword } from "../validators.js";

const form = document.getElementById('registrationForm');
const errorMessage = document.getElementById('error-message');
const $inputNombre=document.getElementById("name");
const $inputPassword=document.getElementById("password");
const $inputEmail=document.getElementById("email");
const $inputConfirmPassword=document.getElementById("confirmPassword");

$inputNombre.addEventListener("blur", () => {
  validateName($inputNombre);
});

$inputPassword.addEventListener("blur", () => {
  validatePassword($inputPassword);
});

$inputConfirmPassword.addEventListener("blur", () => {
  validatePassword($inputConfirmPassword);
});

$inputEmail.addEventListener("blur", () => {
    validateEmail($inputEmail);
});

iniciarCuentaAdmin();
form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (
      !validateName($inputNombre) ||
      !validatePassword($inputPassword) ||
      !validatePassword($inputConfirmPassword) ||
      !validateEmail($inputEmail)
    ) {
      alert("Revisa los campos");
      return;
    }

    const nombre = $inputNombre.value;
    const password = $inputPassword.value;
    const email = $inputEmail.value;
    const confirmPassword = $inputConfirmPassword.value;
    
    if (password !== confirmPassword) {
        showError("Las contraseñas no coinciden.");
        return;
    }
 
        agregarUsuario(nombre, email, password);
        $inputEmail.value='';
        $inputPassword.value='';
        $inputConfirmPassword.value='';
        $inputNombre.value='';
       
        let mensaje = `¡Bienvenido ${nombre}!`;
        swal.fire({
          title: 'Exito',
          text: mensaje,
          icon: 'success',
          showConfirmButton: true,
          showCancelButton: false,
          confirmButtonText: '¡OK!',
        });
        form.reset();
});

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('d-none');
}
