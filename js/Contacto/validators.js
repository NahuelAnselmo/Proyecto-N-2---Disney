export const validarNombre = (field) => {

//no sea null o vacio
    if (!field || !field.value.trim()) {
        field.classList.add("is-invalid");
        field.classList.remove("is-valid");
        return false;
    }

//longitud minima y maxima
    if (field.value.trim().length < 3 || field.value.trim().length > 20) {
        field.classList.add("is-invalid");
        field.classList.remove("is-valid");
        return false;
    }

//solo letras
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+$/;
    if(!regex.test(field.value)) {
        field.classList.add("is-invalid");
        field.classList.remove("is-valid");
        return false;
    }

    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
    return true;
}

export const validarNumero = (field) => {

    //no sea null o vacio
    if (!field || !field.value.trim()) {
        field.classList.add("is-invalid");
        field.classList.remove("is-valid");
        return false;
    }

    //solo numero
    const regex = /^\d{8}$/;
    if(!regex.test(field.value)) {
        field.classList.add("is-invalid");
        field.classList.remove("is-valid");
        return false;
    }

    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
    return true;
}

export const validarEmail = (field) => {

    //no sea null o vacio
    if (!field || !field.value.trim()) {
        field.classList.add("is-invalid");
        field.classList.remove("is-valid");
        return false;
    }

    //longitud minima y maxima
    if (field.value.trim().length < 3 || field.value.trim().length > 100) {
        field.classList.add("is-invalid");
        field.classList.remove("is-valid");
        return false;
    }

    //formato mail
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(!regex.test(field.value)) {
        field.classList.add("is-invalid");
        field.classList.remove("is-valid");
        return false;
    }

    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
    return true;
}

export const validarNotas = (field) => {

    //no sea null o vacio
    if (!field || !field.value.trim()) {
        field.classList.add("is-invalid");
        field.classList.remove("is-valid");
        return false;
    }

    //longitud minima y maxima
    if (field.value.trim().length > 2000) {
        field.classList.add("is-invalid");
        field.classList.remove("is-valid");
        return false;
    }
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
    return true;
}
