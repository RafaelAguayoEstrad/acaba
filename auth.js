// Función para registrar usuarios
function registrarUsuario(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    // Obtiene los valores de los campos de entrada de registro
    const nuevoUsuario = document.getElementById("registroUsuario").value;
    const nuevaContraseña = document.getElementById("registroContraseña").value;

    // Recupera los usuarios almacenados en localStorage o inicializa un array vacío si no existen
    let usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verifica si el usuario ya está registrado
    const usuarioExistente = usuariosRegistrados.find(usuario => usuario.usuario === nuevoUsuario);

    if (usuarioExistente) {
        Swal.fire({
            title: 'Error',
            text: 'Este usuario ya está registrado.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    } else {
        // Añade el nuevo usuario al array
        usuariosRegistrados.push({ usuario: nuevoUsuario, contraseña: nuevaContraseña });

        // Guarda el array actualizado en localStorage
        localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));

        // Muestra una alerta con el nombre del usuario registrado
        Swal.fire({
            title: 'Registro Exitoso',
            text: `El usuario '${nuevoUsuario}' se ha registrado correctamente.`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
        
        // Limpia los campos del formulario
        document.getElementById("formRegistro").reset();
    }
}

// Función para iniciar sesión con un usuario registrado
function iniciarSesion(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    // Obtiene los valores de los campos de entrada de inicio de sesión
    const usuarioIngresado = document.getElementById("loginUsuario").value;
    const contraseñaIngresada = document.getElementById("loginContraseña").value;

    // Recupera los usuarios almacenados en localStorage
    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Busca si algún usuario coincide con los datos ingresados
    const usuarioValido = usuariosRegistrados.find(usuario =>
        usuario.usuario === usuarioIngresado && usuario.contraseña === contraseñaIngresada
    );

    if (usuarioValido) {
        Swal.fire({
            title: 'Inicio de Sesión Exitoso',
            text: 'Bienvenido de nuevo.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            // Redirige al usuario a la página principal después de iniciar sesión
            window.location.href = "1.html"; // Cambia a la ruta correcta
        });
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Usuario o contraseña incorrectos.',
            icon: 'error',
            confirmButtonText: 'Intentar de nuevo'
        });
    }
}
