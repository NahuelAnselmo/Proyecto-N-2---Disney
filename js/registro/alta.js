export const agregarUsuario = (nombre, email, password) => {
    const Usuario = new Usuario(nombre, email, password);
    agregarUsuariosALS(usuario);
    let mensaje = `Usuario creado bajo el nombre de ${nombre}`;
    Swal.fire({
        title: "Usuario registrado con exito",
        icon: "success",
        timer: 1500,
        showCancelButton: false,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    form.reset();
    
  };