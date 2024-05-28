//import { obtenerCategoriasDeLS } from '../utils.js';
import { Categoria } from './Categoria.js';
import { agregarCategoriasALS} from './utils.js';

export const agregarCategoria = (nombre, descripcion) => {
  const categoria = new Categoria(nombre, descripcion);
  agregarCategoriasALS(categoria);
};

/*export const editarContacto = (nombre, numero, email, imagen, notas) => {
  const contactos = obtenerContactosDeLS();
  const codigoContacto = sessionStorage.getItem('codigoContacto');

  // 2. Encontrar la posicion del contacto a editar
  const posicionContacto = contactos.findIndex((contacto) => {
    return contacto.codigo === codigoContacto;
  });

  if (posicionContacto === -1) {
    alert('El contacto no se encontró');
    sessionStorage.removeItem('codigoContacto');
    return;
  }

  // 3. Crear el nuevo objeto contacto
  const nuevoContacto = new Contacto(nombre, numero, email, imagen, notas);

  // 4. Editar la posicion del contacto existente por el nuevo
  contactos.splice(posicionContacto, 1, nuevoContacto);
  // contactos[posicionContacto] = nuevoContacto;

  // 5. Actualizar LS
  localStorage.setItem('contactos', JSON.stringify(contactos));

  // 6. Eliminar el código de SS
  sessionStorage.removeItem('codigoContacto');

  // 7. Esconder alert
  const $alert = document.getElementById('alert-edicion-contacto');
  $alert.classList.add('d-none');

  // 8. Mostrar boton
  const $button = document.getElementById('button-cancelar');
  $button.classList.add('d-none');
};

export const eliminarContacto = (idContacto, nombreContacto) => {
  // 1. CONFIRMAR que se desea eliminar el contacto
  swal
    .fire({
      title: 'Atención',
      text: `¿Estás seguro que deseas eliminar el contacto de ${nombreContacto}? Esta acción es irreversible.`,
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
    })
    .then((result) => {
      if (result.isConfirmed) {
        // 2. Obtener el listado de contactos
        const contactos = obtenerContactosDeLS();

        // 3. Filtrar esa lista para eliminar el contacto con id indicado
        const nuevosContactos = contactos.filter((contacto) => {
          return contacto.codigo !== idContacto;
        });

        // 4. Actualizar lista en LS
        localStorage.setItem('contactos', JSON.stringify(nuevosContactos));

        // 5. Actualizar la tabla
        cargarTabla();

        // 6. Notificar al usuario del exito
        swal.fire({
          title: 'Exito',
          text: `Contacto ${nombreContacto} eliminado correctamente`,
          icon: 'success',
          showConfirmButton: true,
          showCancelButton: false,
          confirmButtonText: 'Tremen2',
        });
      }
    });
}*/;
