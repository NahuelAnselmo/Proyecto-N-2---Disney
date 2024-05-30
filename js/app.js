document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('registrationForm');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            showError("Las contraseñas no coinciden.");
            return;
        }

        const user = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('user', JSON.stringify(user));

        sendEmailToAdmin(user)
            .then(() => {
                alert('Usuario registrado con exito');
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
});
