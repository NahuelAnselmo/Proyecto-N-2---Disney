export class Pelicula {
  constructor(titulo, tipo, categoria, caratula, trailer, descripcion, publicada, destacada) {
    this.codigo = window.self.crypto.randomUUID();
    this.titulo = titulo;
    this.tipo = tipo;
    this.categoria = categoria;
    this.caratula = caratula;
    this.trailer = trailer;
    this.descripcion = descripcion;
    this.publicada = publicada;
    this.destacada = destacada;
  };
};  
