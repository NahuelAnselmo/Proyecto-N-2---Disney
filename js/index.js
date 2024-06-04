const btnIniciarSesion = document.getElementById("btnIniciarSesion");
    const btnsRedirigirRegistrarme = document.querySelectorAll(".suscripcion");

    if (btnIniciarSesion) {
        btnIniciarSesion.addEventListener('click', navegarLogin);
    }

    btnsRedirigirRegistrarme.forEach(function(btn) {
        btn.addEventListener('click', navegarRegistrarme);
    });

    // Funciones de redirección
    function navegarLogin() {
        window.location.href = './pages/login.html';
    }

    function navegarRegistrarme() {
        window.location.href = './pages/registro.html';
    }
