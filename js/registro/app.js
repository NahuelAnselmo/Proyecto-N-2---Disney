import {
    validateEmail,
    validatePassword,
  } from "./registroValidaciones.js";
  import { saveToLocalStorage, loadFromLocalStorage, clearLocalStorage } from './registroStorage.js';
  import { Usuario } from "./Usuario.js";
  
  // document.addEventListener('DOMContentLoaded', function (){
  
  //   clearLocalStorage();
  // });
  
  const $form = document.getElementById("form");
  const $email = document.getElementById("email");
  const $password = document.getElementById("password");
  const $password2 = document.getElementById("password2");
  
  const $validPassword = [
    document.getElementById('length-warning'),
    document.getElementById('uppercase-warning'),
    document.getElementById('lowercase-warning'),
    document.getElementById('number-warning'),
    document.getElementById('special-warning')
  ];
  
  const $inputControl = [
    document.getElementById('input-control-1'),
    document.getElementById('input-control-2'),
    document.getElementById('input-control-3')
  ];
  
  
  $email.addEventListener("blur", () => {
    validateEmail($email);
  });
  $password.addEventListener("blur", () => {
    validatePassword($password);
  });
  $password2.addEventListener("blur", () => {
    validatePasswordConfirmation($password,$password2);
  });
  
  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(validateInputs()){
      const userData = {
        email: $email.value,
        password: $password.value
      }
      const usuario = new Usuario(userData.email, userData.password);
      saveToLocalStorage(usuario);
      Swal.fire({
        title: 'Exito',
        text: "Has creado tu cuenta correctamente!!",
        icon:'success',
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: 'Okey',
      }).then(() => {
        $form.reset();
        $inputControl.forEach(element => {
          element.classList.remove('success');
      });
        $validPassword.forEach(element => { 
          element.classList.remove('valid');
        });
  
    });
    };
  });
  
  export const validateInputs = () => {
  
    const isEmailValid = validateEmail($email);
    const isPasswordValid = validatePassword($password);
    const isPasswordConfirmationValid = validatePasswordConfirmation($password, $password2);
  
    return isEmailValid && isPasswordValid && isPasswordConfirmationValid;
  };