// Función para obtener usuarios desde los datos incluidos en el HTML
function obtenerUsuarios() {
    return window.usuariosData ? window.usuariosData.usuarios : [];
}

// Función para autenticar usuario
function autenticarUsuario(email, password, curso) {
    const usuarios = obtenerUsuarios();
    
    // Buscar usuario por email y contraseña
    const usuario = usuarios.find(user => 
        user.email === email && user.password === password
    );
    
    if (!usuario) {
        return { autenticado: false, mensaje: 'Credenciales incorrectas' };
    }
    
    // Verificar si el usuario tiene acceso al curso
    if (!usuario.cursos.includes(curso)) {
        return { autenticado: false, mensaje: 'No tienes acceso a este curso' };
    }
    
    return { 
        autenticado: true, 
        usuario: usuario,
        mensaje: 'Autenticación exitosa'
    };
}

// Función para obtener URL de redirección según el curso
function obtenerUrlRedireccion(curso) {
    const urls = {
        'sql': 'curso-sql.html',
        'javascript': 'curso-javascript.html',
        'logica': 'curso-logica.html'
    };
    return urls[curso] || 'index.html';
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Obtener los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const curso = urlParams.get('curso') || 'logica';
    
    // Mostrar indicador de carga
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verificando...';
    submitButton.disabled = true;
    
    try {
        // Autenticar usuario
        const resultado = autenticarUsuario(email, password, curso);
        
        if (resultado.autenticado) {
            // Guardar información del usuario en localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', resultado.usuario.nombre);
            localStorage.setItem('userEmail', resultado.usuario.email);
            localStorage.setItem('userRol', resultado.usuario.rol);
            localStorage.setItem('userCursos', JSON.stringify(resultado.usuario.cursos));
            
            // Redirigir al curso correspondiente
            const redirectUrl = obtenerUrlRedireccion(curso);
            window.location.href = redirectUrl;
        } else {
            alert(resultado.mensaje);
        }
    } catch (error) {
        console.error('Error durante la autenticación:', error);
        alert('Error durante la autenticación. Por favor, intente nuevamente.');
    } finally {
        // Restaurar botón
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
}); 