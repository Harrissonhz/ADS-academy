async function cargarUsuarios() {
    if (window.USUARIOS_DATA && Array.isArray(window.USUARIOS_DATA.usuarios)) {
        return window.USUARIOS_DATA;
    }
    const res = await fetch('data/usuarios.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error('No se pudo cargar usuarios.json');
    return await res.json();
}

document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Obtener los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const curso = urlParams.get('curso');
    
    try {
        const data = await cargarUsuarios();
        const usuarios = data.usuarios || [];
        const user = usuarios.find(u => u.email === email && u.password === password);
        if (!user) {
            alert('Credenciales incorrectas. Por favor, intente nuevamente.');
            return;
        }
        // Validar permiso al curso si se envió
        if (curso && user.cursosPermitidos && !user.cursosPermitidos.includes(curso)) {
            alert('No tienes permisos para acceder a este curso.');
            return;
        }
        // Guardar el estado de inicio de sesión y permisos
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', user.nombre || email);
        if (Array.isArray(user.cursosPermitidos)) {
            localStorage.setItem('cursosPermitidos', JSON.stringify(user.cursosPermitidos));
        }
        // Redirigir
        const destino = curso ? ('curso-detalle.html?curso=' + encodeURIComponent(curso)) : 'cursos.html';
        window.location.href = destino;
    } catch (err) {
        console.error(err);
        alert('No se pudo validar el usuario.');
    }
}); 