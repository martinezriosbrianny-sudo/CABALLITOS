const formulario = document.getElementById("formulario");

// Convertir los nombres y apellidos a minúsculas.
const camposDeNombre = ["nombre", "paterno", "materno"];

camposDeNombre.forEach((id) => {
    const campo = document.getElementById(id);

    campo.addEventListener("input", () => {
        const inicio = campo.selectionStart;
        const final = campo.selectionEnd;

        campo.value = campo.value.toLocaleLowerCase("es-MX");
        campo.setSelectionRange(inicio, final);
            });
});

// Validar nombre y apellidos.
function validarNombre(id, idError) {
    const campo = document.getElementById(id);
    const error = document.getElementById(idError);
    const valor = campo.value.trim();
    const patron = /^[a-záéíóúüñ ]+$/i;

    if (valor === "") {
        error.textContent = "Este campo es obligatorio.";
        campo.classList.add("incorrecto");
        campo.classList.remove("correcto");
        return false;
    }

    if (valor.length > 100) {
        error.textContent = "Escribe máximo 100 caracteres.";
        campo.classList.add("incorrecto");
        campo.classList.remove("correcto");
        return false;
    }

    if (!patron.test(valor)) {
        error.textContent = "Usa solamente letras, acentos y espacios.";
        campo.classList.add("incorrecto");
        campo.classList.remove("correcto");
        return false;
    }

    error.textContent = "";
    campo.classList.remove("incorrecto");
    campo.classList.add("correcto");
    return true;
}

// Edad: solo números, máximo 3 dígitos y de 1 a 120.
const edad = document.getElementById("edad");

edad.addEventListener("input", () => {
    edad.value = edad.value.replace(/\D/g, "").slice(0, 3);
});

function validarEdad() {
    const error = document.getElementById("errorEdad");
    const valor = edad.value;

    if (!/^\d{1,3}$/.test(valor) ||
        Number(valor) < 1 || Number(valor) > 120) {
        error.textContent = "Ingresa una edad de 1 a 120 años.";
        edad.classList.add("incorrecto");
        edad.classList.remove("correcto");
        return false;
    }

    error.textContent = "";
    edad.classList.remove("incorrecto");
    edad.classList.add("correcto");
    return true;
}

// Teléfono: exactamente 10 dígitos.
const telefono = document.getElementById("telefono");

telefono.addEventListener("input", () => {
    telefono.value = telefono.value.replace(/\D/g, "").slice(0, 10);
});

function validarTelefono() {
    const error = document.getElementById("errorTelefono");

    if (!/^\d{10}$/.test(telefono.value)) {
        error.textContent = "El teléfono debe tener exactamente 10 números.";
        telefono.classList.add("incorrecto");
        telefono.classList.remove("correcto");
        return false;
    }

    error.textContent = "";
    telefono.classList.remove("incorrecto");
    telefono.classList.add("correcto");
    return true;
}

// Correo electrónico.
function validarEmail() {
    const email = document.getElementById("email");
    const error = document.getElementById("errorEmail");
    const valor = email.value.trim();
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!patron.test(valor) || valor.length > 254) {
        error.textContent = "Escribe un correo electrónico válido.";
        email.classList.add("incorrecto");
        email.classList.remove("correcto");
        return false;
    }

    error.textContent = "";
    email.classList.remove("incorrecto");
    email.classList.add("correcto");
    return true;
}

// Validar todos los campos al enviar.
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombreValido = validarNombre("nombre", "errorNombre");
    const paternoValido = validarNombre("paterno", "errorPaterno");
    const maternoValido = validarNombre("materno", "errorMaterno");
    const edadValida = validarEdad();
    const telefonoValido = validarTelefono();
    const emailValido = validarEmail();

    const mensaje = document.getElementById("mensaje");

    if (nombreValido && paternoValido && maternoValido &&
        edadValida && telefonoValido && emailValido) {
        mensaje.textContent = "¡Todos los datos son correctos!";
        mensaje.style.color = "green";
    } else {
        mensaje.textContent = "Revisa los campos señalados y corrige los errores.";
        mensaje.style.color = "red";
    }
});
