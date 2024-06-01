export class Usuario{
    constructor(nombre, email, password){
        this.id = window.self.crypto.randomUUID();
        this.nombre = nombre;
        this.email = email;
        this.password =  password;
    }
}