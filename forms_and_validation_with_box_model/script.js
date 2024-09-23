document.getElementById('formulario').addEventListener('submit', function(event) {
  var formIsValid = true;
  
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirm_password').value;
  var passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  var errorPassword = document.getElementById('error-password');
  var errorConfirmPassword = document.getElementById('error-confirm_password');

  if (!passwordPattern.test(password)) {
    errorPassword.textContent = 'La contraseña debe contener al menos un número y una letra mayúscula.';
    errorPassword.style.display = 'block';
    formIsValid = false;
  } else {
    errorPassword.style.display = 'none';
  }

  if (password !== confirmPassword) {
    errorConfirmPassword.textContent = 'Las contraseñas no coinciden.';
    errorConfirmPassword.style.display = 'block';
    formIsValid = false;
  } else {
    errorConfirmPassword.style.display = 'none';
  }

  var fechaNacimiento = new Date(document.getElementById('fecha_nacimiento').value);
  var hoy = new Date();
  var edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  var mes = hoy.getMonth() - fechaNacimiento.getMonth();
  var errorFechaNacimiento = document.getElementById('error-fecha_nacimiento');

  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
    edad--;
  }

  if (edad < 18) {
    errorFechaNacimiento.textContent = 'Debes tener al menos 18 años.';
    errorFechaNacimiento.style.display = 'block';
    formIsValid = false;
  } else {
    errorFechaNacimiento.style.display = 'none';
  }

  if (!formIsValid) {
    event.preventDefault();
  }
});
