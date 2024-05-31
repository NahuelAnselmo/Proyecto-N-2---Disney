export class Categoria{
    constructor(nombre, descripcion){
        this.id = window.self.crypto.randomUUID();
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}