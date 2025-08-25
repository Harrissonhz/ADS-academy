document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Obtener los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const curso = urlParams.get('curso');
    
    // Validar credenciales según el curso
    let credencialesCorrectas = false;
    let redirectUrl = 'index.html';
    
    if (curso === 'sql') {
        credencialesCorrectas = (email === 'estudiantecensa@gmail.com' && password === '55555');
        redirectUrl = 'curso-sql.html';
    } else if (curso === 'javascript') {
        credencialesCorrectas = (email === 'estudiantecensa@gmail.com' && password === '987654');
        redirectUrl = 'curso-javascript.html';
    } else {
        credencialesCorrectas = (email === 'estudiantecensa@gmail.com' && password === '123456');
        redirectUrl = 'curso-logica.html';
    }
    
    if (credencialesCorrectas) {
        // Guardar el estado de inicio de sesión
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', 'Estudiante Censa');
        window.location.href = redirectUrl;
    } else {
        alert('Credenciales incorrectas. Por favor, intente nuevamente.');
    }
}); 