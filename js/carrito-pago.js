// Clase para manejar el proceso de pago del carrito
class CarritoPago {
    constructor() {
        console.log('Inicializando proceso de pago del carrito...');
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

        this.updateCartItems(checkoutData.items);
        this.updateSummary(checkoutData);
    }

    updateCartItems(items) {
        console.log('Actualizando lista de items...');
        const cartItems = document.getElementById('cartItems');
        cartItems.innerHTML = '';

        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item d-flex align-items-center mb-3 p-3 border-bottom';
            itemElement.innerHTML = `
                <div class="item-image me-3" style="width: 80px; height: 80px; overflow: hidden;">
                    <img src="${item.image}" alt="${item.title}" class="img-fluid" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="item-details flex-grow-1">
                    <h6 class="mb-1">${item.title}</h6>
                    <div class="d-flex justify-content-between">
                        <span class="text-muted">Cantidad: ${item.quantity}</span>
                        <span>${item.price}</span>
                    </div>
                </div>
            `;
            cartItems.appendChild(itemElement);
        });
        console.log('Lista de items actualizada correctamente');
    }

    updateSummary(data) {
        console.log('Actualizando resumen de compra...');
        const subtotalElement = document.getElementById('subtotal');
        const taxesElement = document.getElementById('taxes');
        const totalElement = document.getElementById('total');

        if (subtotalElement && taxesElement && totalElement) {
            subtotalElement.textContent = `$${data.subtotal.toLocaleString('es-CO')} COP`;
            taxesElement.textContent = `$${data.taxes.toLocaleString('es-CO')} COP`;
            totalElement.textContent = `$${data.total.toLocaleString('es-CO')} COP`;
            console.log('Resumen actualizado correctamente');
        } else {
            console.error('No se encontraron elementos para actualizar el resumen');
        }
    }

    bindEvents() {
        console.log('Configurando eventos...');
        
        // Evento para los métodos de pago
        document.querySelectorAll('.payment-method').forEach(method => {
            method.addEventListener('click', () => {
                // Remover clase active de todos los métodos
                document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
                // Agregar clase active al método seleccionado
                method.classList.add('active');
                
                // Ocultar todos los detalles de pago
                document.querySelectorAll('.payment-detail').forEach(detail => detail.style.display = 'none');
                
                // Mostrar el detalle correspondiente
                const methodType = method.getAttribute('data-method');
                const detailElement = document.getElementById(`${methodType}Detail`);
                if (detailElement) {
                    detailElement.style.display = 'block';
                }
            });
        });
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
        alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed bottom-0 end-0 m-3';
        alertDiv.style.zIndex = '1000';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(alertDiv);

        // Remover el mensaje después de 3 segundos
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }

    // Función para copiar al portapapeles
    copyToClipboard() {
        try {
            const input = document.querySelector('#llaveDetail .input-group input');
            if (!input) {
                console.error('No se encontró el input de la llave');
                return;
            }

            const textToCopy = input.value;
            
            // Usar la API moderna del portapapeles si está disponible
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    this.showSuccess('Llave copiada al portapapeles');
                }).catch(err => {
                    console.error('Error al copiar:', err);
                    this.fallbackCopyToClipboard(textToCopy);
                });
            } else {
                this.fallbackCopyToClipboard(textToCopy);
            }
        } catch (error) {
            console.error('Error en copyToClipboard:', error);
            this.showError('Error al copiar la llave');
        }
    }

    fallbackCopyToClipboard(text) {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            const successful = document.execCommand('copy');
            textArea.remove();
            
            if (successful) {
                this.showSuccess('Llave copiada al portapapeles');
            } else {
                this.showError('Error al copiar la llave');
            }
        } catch (err) {
            console.error('Error en fallbackCopyToClipboard:', err);
            this.showError('Error al copiar la llave');
        }
    }
}

// Inicializar el proceso de pago cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, iniciando proceso de pago del carrito...');
    window.carritoPago = new CarritoPago();
}); 