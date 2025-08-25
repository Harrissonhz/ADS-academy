// Función para obtener parámetros de la URL
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Obtener la URL de redirección del parámetro
var redirectUrl = getUrlParameter('url');

// Si no hay URL especificada, usar una por defecto
if (!redirectUrl) {
    redirectUrl = 'https://outletshop62.mitiendanube.com/';
}

// Actualizar el enlace
document.getElementById('redirect-link').href = redirectUrl;

// Redirección automática después de 1 segundo
setTimeout(function() {
    window.location.href = redirectUrl;
}, 1000); 