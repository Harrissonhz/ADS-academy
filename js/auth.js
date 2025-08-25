// Verificar si el usuario está logueado
const isLoggedIn = localStorage.getItem('isLoggedIn');
const userName = localStorage.getItem('userName');

if (isLoggedIn === 'true' && userName) {
    document.getElementById('userName').textContent = userName;
} 