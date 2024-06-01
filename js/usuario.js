function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

class Usuario {
    constructor(nombre, email, password) {
        this.uuid = generateUUID();
        this.nombre = nombre;
        this.email = email;
        this.password = password;
    }

    saveToLocalStorage() {
        const user = {
            uuid: this.uuid,
            nombre: this.nombre,
            email: this.email,
            password: this.password
        };
        localStorage.setItem('usuario', JSON.stringify(user));
    }

    static loadFromLocalStorage() {
        const userData = localStorage.getItem('usuario');
        if (userData) {
            const data = JSON.parse(userData);
            const user = new Usuario(data.nombre, data.email, data.password);
            user.uuid = data.uuid;
            return user;
        }
        return null;
    }

    saveToSessionStorage() {
        const user = {
            uuid: this.uuid,
            nombre: this.nombre,
            email: this.email,
            password: this.password
        };
        sessionStorage.setItem('usuario', JSON.stringify(user));
    }

    static loadFromSessionStorage() {
        const userData = sessionStorage.getItem('usuario');
        if (userData) {
            const data = JSON.parse(userData);
            const user = new Usuario(data.nombre, data.email, data.password);
            user.uuid = data.uuid;
            return user;
        }
        return null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const user = new Usuario(nombre, email, password);

        user.saveToLocalStorage();

        user.saveToSessionStorage();

        console.log('Usuario registrado y guardado en localStorage y sessionStorage');

        console.log(Usuario.loadFromLocalStorage());
        console.log(Usuario.loadFromSessionStorage());

        form.reset();
    });
});