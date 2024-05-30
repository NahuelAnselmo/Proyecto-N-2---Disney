import { validateEmail } from "../validators.js";

const $inputEmail=document.getElementById("inputEmail");
const $inputContraseña=document.getElementById("inputContraseña");

$inputEmail.addEventListener('blur',() => {
    validateEmail($inputEmail);
  });