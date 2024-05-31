import { obtenerCategoriasDeLS, obtenerPeliculaSerieDeLs } from '../utils.js';
import { Categoria } from './Categoria.js';
import { agregarCategoriasALS, cargarTabla, existeCategoria} from './utils.js';


export const agregarCategoria = (nombre, descripcion) => {
  const categoria = new Categoria(nombre, descripcion);
  agregarCategoriasALS(categoria);
  let mensaje = `Categoria creada bajo el nombre de ${nombre}`;
  swal.fire({
    title: 'Exito',
    text: mensaje,
    icon: 'success',
    showConfirmButton: true,
    showCancelButton: false,
    confirmButtonText: '¡OK!',
  });
  
};

export const editarCategoria = (nombreCategoria, descripcionCategoria) => {
  nombreCategoria = nombreCategoria.toUpperCase();
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
    
    const mensaje = `Categoria ${nombreCategoria} editada`;
    swal.fire({
      title: 'Exito',
      text: mensaje,
      icon: 'success',
      showConfirmButton: true,
      showCancelButton: false,
      confirmButtonText: '¡OK!',
    });
    sessionStorage.removeItem('codigoCategoria');
    const $alert = document.getElementById('alert-edicion-categoria');
    $alert.classList.add('d-none');
  
 
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
        const peliculas = obtenerPeliculaSerieDeLs();
        
        const categorias = obtenerCategoriasDeLS();

        const nuevasCategorias = categorias.filter((categoria) => {
          return categoria.id !== idCategoria;
        });

        peliculas.forEach((pelicula) => {
          if (pelicula.categoria === nombreCategoria) {
            pelicula.categoria = "MIX";
          }
        });

        localStorage.setItem('categorias', JSON.stringify(nuevasCategorias));
        localStorage.setItem('peliculas', JSON.stringify(peliculas));

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

