// Obtener el nombre del curso de la URL
const urlParams = new URLSearchParams(window.location.search);
const nombreCurso = urlParams.get('curso');

// Función para crear y actualizar la información del curso
function actualizarInformacionCurso() {
    // Crear el contenedor de información del curso
    const cursoInfo = document.createElement('div');
    cursoInfo.className = 'curso-info mb-4 text-center';
    
    // Crear la imagen
    const imagen = document.createElement('img');
    imagen.className = 'img-fluid mb-3';
    imagen.style.width = '150px';
    imagen.style.height = '150px';
    imagen.style.objectFit = 'cover';
    imagen.style.borderRadius = '8px';
    imagen.alt = 'Curso';
    imagen.id = 'curso-imagen';
    
    // Crear el título
    const titulo = document.createElement('h3');
    titulo.id = 'curso-nombre';
    titulo.className = 'text-center';
    
    // Crear el precio
    const precio = document.createElement('p');
    precio.className = 'text-muted text-center';
    precio.id = 'curso-precio';
    precio.textContent = '$50.000 COP';
    
    // Agregar elementos al contenedor
    cursoInfo.appendChild(imagen);
    cursoInfo.appendChild(titulo);
    cursoInfo.appendChild(precio);
    
    // Insertar el contenedor después del payment-header
    const paymentHeader = document.querySelector('.payment-header');
    paymentHeader.parentNode.insertBefore(cursoInfo, paymentHeader.nextSibling);
    
    // Actualizar la información según el curso
    if (nombreCurso) {
        titulo.textContent = nombreCurso;
        
        // Actualizar la imagen según el curso
        switch(nombreCurso) {
            case 'Logica de Programacion':
                imagen.src = 'img/LogicaProgramacion.jpg';
                break;
            case 'JavaScript desde Cero':
                imagen.src = 'img/JavaScript.jpg';
                break;
            case 'SQL de Cero a Experto':
                imagen.src = 'img/SQL.jpg';
                break;
            case 'Python para Principiantes':
                imagen.src = 'img/Python.jpg';
                break;
            case 'HTML y CSS Moderno':
                imagen.src = 'img/HTML-CSS.jpg';
                break;
            case 'React.js Avanzado':
                imagen.src = 'img/React.jpg';
                break;
            case 'NoSQL de Cero a Experto':
                imagen.src = 'img/NoSQL.jpg';
                break;
            case 'Programacion Orientada a Objetos':
                imagen.src = 'img/POO.jpg';
                break;
            case 'Desarrollo para Dispositivos Moviles':
                imagen.src = 'img/Movil.jpg';
                break;
            case 'Git y GitHub para Desarrolladores':
                imagen.src = 'img/Git.jpg';
                break;
            case 'Scrum en Accion':
                imagen.src = 'img/Scrum.jpg';
                break;
            case 'Frontend Web desde Cero':
                imagen.src = 'img/Frontend.jpg';
                break;
            case 'APIs RESTful':
                imagen.src = 'img/API.jpg';
                break;
            case 'Flutter':
                imagen.src = 'img/Flutter.jpg';
                break;
            case 'Introduccion a Firebase':
                imagen.src = 'img/Firebase.jpg';
                break;
            default:
                imagen.src = 'img/Educacion.jpg';
        }
    }
}

// Cambiar método de pago
document.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', () => {
        document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
        method.classList.add('active');
    });
});

// Validación del formulario
document.getElementById('paymentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    // Aquí iría la lógica de procesamiento de pago
    alert('¡Pago procesado exitosamente!');
    window.location.href = 'cursos.html';
});

// Llamar a la función cuando se carga la página
document.addEventListener('DOMContentLoaded', actualizarInformacionCurso); 