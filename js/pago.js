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

// Clase para manejar el proceso de pago
class PaymentProcess {
    constructor() {
        console.log('Inicializando proceso de pago...');
        this.loadCheckoutData();
        this.bindEvents();
    }

    loadCheckoutData() {
        console.log('Cargando datos del checkout...');
        const checkoutData = JSON.parse(localStorage.getItem('checkoutData'));
        console.log('Datos cargados:', checkoutData);

        if (!checkoutData) {
            console.error('No se encontraron datos de checkout');
            this.showError('No se encontraron datos de compra. Por favor, regrese al carrito.');
            return;
        }

        if (!checkoutData.items || !Array.isArray(checkoutData.items)) {
            console.error('Los datos del carrito no tienen el formato esperado:', checkoutData);
            this.showError('Error en los datos del carrito. Por favor, regrese al carrito.');
            return;
        }

        console.log('Número de items en el carrito:', checkoutData.items.length);
        console.log('Items del carrito:', checkoutData.items);
        console.log('Subtotal:', checkoutData.subtotal);
        console.log('Total:', checkoutData.total);

        this.updateSummary(checkoutData);
        this.updateItemsList(checkoutData.items);
    }

    updateItemsList(items) {
        console.log('Actualizando lista de items...');
        const itemsContainer = document.createElement('div');
        itemsContainer.className = 'items-list mb-4';
        
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item d-flex align-items-center mb-3 p-3 border-bottom';
            itemElement.innerHTML = `
                <div class="item-image me-3" style="width: 60px; height: 60px; overflow: hidden;">
                    <img src="${item.image}" alt="${item.title}" class="img-fluid" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="item-details flex-grow-1">
                    <h6 class="mb-1">${item.title}</h6>
                    <div class="d-flex justify-content-between">
                        <span class="text-muted">Cantidad: ${item.quantity || 1}</span>
                        <span>${item.price || ('$' + (item.priceCents || 0).toLocaleString('es-CO') + ' COP')}</span>
                    </div>
                </div>
            `;
            itemsContainer.appendChild(itemElement);
        });

        // Buscar la sección de resumen de compra
        const allH4s = document.querySelectorAll('h4');
        let summarySection = null;
        
        allH4s.forEach(h4 => {
            if (h4.textContent.trim() === 'Resumen de Compra') {
                summarySection = h4.parentElement;
            }
        });

        if (summarySection) {
            summarySection.parentNode.insertBefore(itemsContainer, summarySection);
            console.log('Lista de items insertada correctamente');
        } else {
            console.error('No se encontró la sección de resumen');
            // Insertar al principio del formulario como fallback
            const form = document.getElementById('paymentForm');
            if (form) {
                form.insertBefore(itemsContainer, form.firstChild);
                console.log('Lista de items insertada al principio del formulario');
            }
        }
    }

    updateSummary(data) {
        console.log('Actualizando resumen de compra...');
        const subtotalElement = document.querySelector('.d-flex.justify-content-between.mb-2 span:last-child');
        const totalElement = document.querySelector('.d-flex.justify-content-between.fw-bold span:last-child');

        if (subtotalElement && totalElement) {
            subtotalElement.textContent = `$${(data.subtotal || 0).toLocaleString('es-CO')} COP`;
            totalElement.textContent = `$${(data.total || 0).toLocaleString('es-CO')} COP`;
            console.log('Resumen actualizado correctamente');
        } else {
            console.error('No se encontraron elementos para actualizar el resumen');
        }
    }

    bindEvents() {
        console.log('Configurando eventos...');
        const paymentForm = document.getElementById('paymentForm');
        if (paymentForm) {
            paymentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.processPayment();
            });
            console.log('Evento de formulario configurado');
        } else {
            console.error('No se encontró el formulario de pago');
        }
    }

    processPayment() {
        console.log('Procesando pago...');
        // Aquí iría la lógica de procesamiento de pago
        // Por ahora solo mostraremos un mensaje de éxito
        this.showSuccess('¡Pago procesado con éxito!');
        
        // Limpiar el carrito después del pago exitoso
        localStorage.removeItem('cart');
        localStorage.removeItem('checkoutData');
        
        // Redirigir a la página de cursos
        setTimeout(() => {
            window.location.href = 'cursos.html';
        }, 2000);
    }

    showError(message) {
        console.error('Error:', message);
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-danger alert-dismissible fade show';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.querySelector('.payment-section').insertBefore(alertDiv, document.querySelector('.payment-header'));
    }

    showSuccess(message) {
        console.log('Éxito:', message);
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success alert-dismissible fade show';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.querySelector('.payment-section').insertBefore(alertDiv, document.querySelector('.payment-header'));
    }
}

// Inicializar el proceso de pago cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, iniciando proceso de pago...');
    window.paymentProcess = new PaymentProcess();
});

// Llamar a la función cuando se carga la página
document.addEventListener('DOMContentLoaded', actualizarInformacionCurso); 