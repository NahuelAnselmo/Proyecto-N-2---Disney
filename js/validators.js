export const validateName = ($field) => {
    if (!$field || !$field.value.trim()) {
      $field.classList.add('is-invalid');
      $field.classList.remove('is-valid');
      return false;
    }
  
    if ($field.value.trim().length < 3 || $field.value.trim().length > 25) {
      $field.classList.add('is-invalid');
      $field.classList.remove('is-valid');
      return false;
    }
  
    const regex = /^[a-zA-ZÁÉÍÓÚáéíóúÜüÑñ\s]+$/;
    if (!regex.test($field.value)) {
      $field.classList.add('is-invalid');
      $field.classList.remove('is-valid');
      return false;
    }
  
    $field.classList.remove('is-invalid');
    $field.classList.add('is-valid');
    return true;
  };
  
  export const validateNumber = (field) => {
    if (!field || !field.value.trim()) {
      field.classList.add('is-invalid');
      field.classList.remove('is-valid');
      return false;
    }
  
    const regex = /^\d{8}$/;
    if (!regex.test(field.value)) {
      field.classList.add('is-invalid');
      field.classList.remove('is-valid');
      return false;
    }
  
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    return true;
  };
  
  export const validateEmail = ($field) => {
    if (!$field || !$field.value.trim()) {
      $field.classList.add('is-invalid');
      $field.classList.remove('is-valid');
      return false;
    }
  
    if ($field.value.trim().length < 3 || $field.value.trim().length > 100) {
      $field.classList.add('is-invalid');
      $field.classList.remove('is-valid');
      return false;
    }
  
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!regex.test($field.value)) {
      $field.classList.add('is-invalid');
      $field.classList.remove('is-valid');
      return false;
    }
  
    $field.classList.remove('is-invalid');
    $field.classList.add('is-valid');
    return true;
  };
  
  export const validateUrl = ($field) => {
    if (!$field || !$field.value.trim()) {
      $field.classList.add('is-invalid');
      $field.classList.remove('is-valid');
      return false;
    }
  
    if ($field.value.trim().length < 3) {
      $field.classList.add('is-invalid');
      $field.classList.remove('is-valid');
      return false;
    }
  
    const regex =
      /^\b(?:https?|ftp):\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]+[-A-Za-z0-9+&@#\/%=~_|]$/;
    if (!regex.test($field.value)) {
      $field.classList.add('is-invalid');
      $field.classList.remove('is-valid');
      return false;
    }
  
    $field.classList.remove('is-invalid');
    $field.classList.add('is-valid');
    return true;
  };

  export const validateCategoria = ($field) => {
    if (!$field || !$field.value.trim()) {
      $field.classList.add('is-invalid');
      $field.classList.remove('is-valid');
      return false;
    }
  
    if ($field.value.trim().length < 2 || $field.value.trim().length > 25) {
      $field.classList.add('is-invalid');
      $field.classList.remove('is-valid');
      return false;
    }
  
    const regex = /^[a-zA-ZÁÉÍÓÚáéíóúÜüÑñ\s]+$/;
    if (!regex.test($field.value)) {
      $field.classList.add('is-invalid');
      $field.classList.remove('is-valid');
      return false;
    }
  
    $field.classList.remove('is-invalid');
    $field.classList.add('is-valid');
    return true;
  };
  export const validatePassword = ($field) => {
    if (!$field || !$field.value.trim()) {
      $field.classList.add('is-invalid');
      return false;
    }
    $field.classList.remove('is-invalid');
  return true;
};

 