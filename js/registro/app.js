
    import { agregarUsuario } from "./alta.js";
    const form = document.getElementById('registrationForm');
    const errorMessage = document.getElementById('error-message');
    const $inputNombre=document.getElementById("name");
  const $inputPassword=document.getElementById("password");
  const $inputEmail=document.getElementById("email");
  const $inputConfirmPassword=document.getElementById("confirmPassword");

  const usuarioAdmin = new Usuario('admin@gmail.com','admin',true);
  agregarUsuario("admin", "admin@gmail.com", "admin"),
 

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        
        
        if (password !== confirmPassword) {
            showError("Las contraseñas no coinciden.");
            return;
        }
       

        sendEmailToAdmin(user)
            .then(() => {
                Swal.fire({
                    title: "Usuario registrado con exito",
                    icon: "success",
                    timer: 1500,
                    showCancelButton: false,
                    showConfirmButton: false,
                    timerProgressBar: true,
                  });
                form.reset();
            })
            .catch(() => {
                window.location.href = '404.html';
            });
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('d-none');
    }

    async function sendEmailToAdmin(user) {
        // Simulamos el envio de correo
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Si falla, llamar a reject();
                // Si funciona, llamar a resolve();
                const success = Math.random() > 0.1; // Simulacion de que funcione del 90%
                if (success) {
                    resolve();
                } else {
                    reject();
                }
            }, 1000);
        });
    }

