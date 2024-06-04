import { obtenerPeliculaSerieDeLs, agregarPeliculaALS, } from "../utils.js";
import { Pelicula } from './peliculaSeries.js';
import { cargarTabla } from "./utils.js";


export const agregarPelicula = (titulo, tipo, categoria, caratula, portada, trailer, descripcion, publicada) => {
  const pelicula = new Pelicula(titulo, tipo, categoria, caratula, portada, trailer, descripcion, publicada);
  pelicula.destacada = false;

  agregarPeliculaALS(pelicula);
};

export const editarPelicula = (titulo, tipo, categoria, caratula, portada, trailer, descripcion, publicada) => {
  const peliculas = obtenerPeliculaSerieDeLs();
  const codigoPelicula = sessionStorage.getItem("codigoPelicula");

  const posicionPelicula = peliculas.findIndex((pelicula) => {
    return pelicula.codigo === codigoPelicula;
  });

  if (posicionPelicula === -1) {
    alert('La pelicula o serie no se encontró');
    sessionStorage.removeItem('codigoPelicula');
    return;
  }

  peliculas[posicionPelicula].titulo = titulo;
  peliculas[posicionPelicula].tipo = tipo;
  peliculas[posicionPelicula].categoria = categoria;
  peliculas[posicionPelicula].caratula = caratula;
  peliculas[posicionPelicula].portada = portada;
  peliculas[posicionPelicula].trailer = trailer;
  peliculas[posicionPelicula].descripcion = descripcion;
  peliculas[posicionPelicula].publicada = publicada;

  localStorage.setItem("peliculas", JSON.stringify(peliculas));

  sessionStorage.removeItem("codigoPelicula");

  Swal.fire({
    title: 'Éxito',
    text: `Película ${titulo} editada exitosamente`,
    icon: 'success',
    showConfirmButton: true,
    confirmButtonText: '¡OK!',
  });

  document.getElementById("alert-edicion-pelicula").classList.add("d-none");
  document.getElementById("button-cancelar").classList.add("d-none");
};

export const eliminarPelicula = (idPelicula, nombrePelicula) => {
  swal
    .fire({
      title: 'Atención',
      text: `¿Estás seguro que deseas eliminar la película ${nombrePelicula}? Esta acción es irreversible.`,
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
    })
    .then((result) => {
      if (result.isConfirmed) {
        const peliculas = obtenerPeliculaSerieDeLs();

        const nuevasPeliculas = peliculas.filter((pelicula) => {
          return pelicula.codigo !== idPelicula;
        });

        localStorage.setItem('peliculas', JSON.stringify(nuevasPeliculas));

        cargarTabla();

        swal.fire({
          title: 'Éxito',
          text: `Película ${nombrePelicula} eliminada correctamente`,
          icon: 'success',
          showConfirmButton: true,
          showCancelButton: false,
          confirmButtonText: 'Aceptar',
        });
      }
    });
};

export const destacarPelicula = (codigoPelicula) => {
  const peliculas = obtenerPeliculaSerieDeLs();

  const posicionPelicula = peliculas.findIndex((pelicula) => pelicula.codigo === codigoPelicula);

  if (posicionPelicula !== -1) {

    const estaDestacada = peliculas[posicionPelicula].destacada;

    peliculas[posicionPelicula].destacada = !estaDestacada;

    localStorage.setItem('peliculas', JSON.stringify(peliculas));

    if (estaDestacada) {
      swal.fire({
        title: 'Éxito',
        text: `Película ${peliculas[posicionPelicula].titulo} desdestacada correctamente`,
        icon: 'success',
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: 'Aceptar',
      });
    } else {
      swal.fire({
        title: 'Éxito',
        text: `Película ${peliculas[posicionPelicula].titulo} destacada correctamente`,
        icon: 'success',
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: 'Aceptar',
      });
    }

    cargarTabla();
  } else {
    swal.fire({
      title: 'Error',
      text: 'La película no se encontró',
      icon: 'error',
      showConfirmButton: true,
      showCancelButton: false,
      confirmButtonText: 'Aceptar',
    });
  }
};
