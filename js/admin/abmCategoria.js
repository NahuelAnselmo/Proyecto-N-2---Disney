import { obtenerCategoriasDeLS } from '../utils.js';
import { Categoria } from './Categoria.js';
import { agregarCategoriasALS, cargarTabla} from './utils.js';

export const agregarCategoria = (nombre, descripcion) => {
  const categoria = new Categoria(nombre, descripcion);
  agregarCategoriasALS(categoria);
};

export const editarCategoria = (nombreCategoria, descripcionCategoria) => {
  const categorias = obtenerCategoriasDeLS();
  const codigoCategoria = sessionStorage.getItem('codigoCategoria');

  const posicionCategoria = categorias.findIndex((categoria) => {
    return categoria.id === codigoCategoria;
  });

  if (posicionCategoria === -1) {
    alert('La categoria no se encontró');
    sessionStorage.removeItem('codigoCategoria');
    return;
  }

  const nuevaCategoria = new Categoria(nombreCategoria, descripcionCategoria);

  categorias.splice(posicionCategoria, 1, nuevaCategoria);

  localStorage.setItem('categorias', JSON.stringify(categorias));

  sessionStorage.removeItem('codigoCategoria');

  const $alert = document.getElementById('alert-edicion-categoria');
  $alert.classList.add('d-none');

  const $button = document.getElementById('btnCancelar');
  $button.classList.add('d-none');

  
};


export const eliminarCategoria = (idCategoria, nombreCategoria) => {
  swal
    .fire({
      title: 'Atención',
      text: `¿Estás seguro que deseas eliminar la categoria ${nombreCategoria}? Esta acción es irreversible.`,
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
    })
    .then((result) => {
      if (result.isConfirmed) {
        //PRIMERO OBTENGO PELICULAS ASOCIADAS A ESA CATEGORIA Y CAMBIO EL NOMBRE DE LA CATEGORIA POR EL NOMBRE MIX
        const categorias = obtenerCategoriasDeLS();

        const nuevasCategorias = categorias.filter((categoria) => {
          return categoria.id !== idCategoria;
        });

        localStorage.setItem('categorias', JSON.stringify(nuevasCategorias));

        cargarTabla();

        swal.fire({
          title: 'Exito',
          text: `Categoria ${nombreCategoria} eliminada correctamente`,
          icon: 'success',
          showConfirmButton: true,
          showCancelButton: false,
          confirmButtonText: '¡OK!',
        });
      }
    });
};
