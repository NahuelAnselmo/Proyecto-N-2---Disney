
export const categorias = ["Acción", "Comedia", "Drama", "Terror", "Documental"];

export function cargarCategorias(selectElement) {
  selectElement.innerHTML = ""; // Limpiar las opciones existentes
  categorias.forEach(categoria => {
    const option = document.createElement("option");
    option.value = categoria;
    option.textContent = categoria;
    selectElement.appendChild(option);
  });
}
