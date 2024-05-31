import { obtenerPeliculaSerieDeLs } from "../utils.js";
import { Pelicula } from './peliculaSeries.js';
import { agregarPeliculaALS} from './utils.js';
import { cargarTabla } from "./utils.js";

export const agregarPelicula = (titulo, tipo, categoria, caratula, trailer, descripcion, publicada) => {
  const pelicula = new Pelicula(titulo, tipo, categoria, caratula, trailer, descripcion, publicada);
  pelicula.destacada = false;

  agregarPeliculaALS(pelicula);
};

export const editarPelicula = (titulo, tipo, categoria, caratula, trailer, descripcion, publicada) => {
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

  const nuevaPelicula = new Pelicula(titulo, tipo, categoria, caratula, trailer, descripcion, publicada);

  peliculas.splice(posicionPelicula, 1, nuevaPelicula);

  localStorage.setItem("peliculas", JSON.stringify(peliculas));

  sessionStorage.removeItem("codigoPelicula");

  const $alert = document.getElementById("alert-edicion-pelicula").classList.add("d-none");

  const $button = document.getElementById("button-cancelar").classList.add("d-none");
};

export const eliminarPelicula = (idPelicula, nombrePelicula) => {
  // 1. CONFIRMAR que se desea eliminar la película
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
        // 2. Obtener el listado de películas
        const peliculas = obtenerPeliculaSerieDeLs();

        // 3. Filtrar esa lista para eliminar la película con id indicado
        const nuevasPeliculas = peliculas.filter((pelicula) => {
          return pelicula.codigo !== idPelicula;
        });

        // 4. Actualizar lista en LS
        localStorage.setItem('peliculas', JSON.stringify(nuevasPeliculas));

        // 5. Actualizar la tabla
        cargarTabla();

        // 6. Notificar al usuario del éxito
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
    // Marcamos la película como destacada
    peliculas[posicionPelicula].destacada = true;

    // Guardamos la lista actualizada en localStorage
    localStorage.setItem('peliculas', JSON.stringify(peliculas));

    // Notificamos al usuario
    swal.fire({
      title: 'Éxito',
      text: `Película ${peliculas[posicionPelicula].titulo} destacada correctamente`,
      icon: 'success',
      showConfirmButton: true,
      showCancelButton: false,
      confirmButtonText: 'Aceptar',
    });

    // Actualizar la tabla
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

export const mostrarPeliculasDestacadas = () => {
  const peliculas = obtenerPeliculaSerieDeLs();
  const contenedorDestacadas = document.getElementById('peliculas-destacadas');

  if (!contenedorDestacadas) {
    console.error('Elemento con ID "peliculas-destacadas" no encontrado en el DOM.');
    return;
  }

  contenedorDestacadas.innerHTML = ''; // Limpia el contenedor antes de llenarlo

  const peliculasDestacadas = peliculas.filter((pelicula) => pelicula.destacada);

  peliculasDestacadas.forEach((pelicula) => {
    const peliculaElemento = document.createElement('div');
    peliculaElemento.classList.add('pelicula-destacada');
    peliculaElemento.innerHTML = `
      <h3>${pelicula.titulo}</h3>
      <img src="${pelicula.caratula}" alt="${pelicula.titulo}">
      <p>${pelicula.descripcion}</p>
      <a href="${pelicula.trailer}" target="_blank">Ver Trailer</a>
    `;
    contenedorDestacadas.appendChild(peliculaElemento);
  });
};


