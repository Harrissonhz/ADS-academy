// Clase para manejar el carrito de compras
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.total = 0;
        this.updateCartCount();
        this.bindEvents();
    }

    // Vincular eventos
    bindEvents() {
        // Delegación para botones de "Agregar al Carrito"
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;
            const isAddToCart = (btn.getAttribute('data-action') === 'add-to-cart') || (btn.textContent && btn.textContent.trim() === 'Agregar al Carrito');
            if (!isAddToCart) return;
            const card = btn.closest('.card');
            if (!card) return;
            e.preventDefault();
            const titleEl = card.querySelector('.card-title');
            const priceEl = card.querySelector('.fw-bold');
            const imgEl = card.querySelector('.card-img-top');
            const container = btn.closest('[data-codigo]');
            const stableId = container ? (container.getAttribute('data-codigo') || '').trim() : '';
            const priceText = priceEl ? priceEl.textContent : '$50.000 COP';
            const priceCents = this.parsePesosToUnits(priceText);
            const course = {
                id: stableId || (titleEl ? titleEl.textContent.trim() : this.generateId()),
                title: titleEl ? titleEl.textContent.trim() : 'Curso',
                price: this.formatPesos(priceCents),
                priceCents: priceCents,
                image: imgEl ? imgEl.src : ''
            };
            this.addItem(course);
        });

        // Evento para el botón de checkout
        document.getElementById('checkoutBtn').addEventListener('click', () => {
            this.checkout();
        });

        // Actualizar el carrito cuando se abre el modal
        const cartModal = document.getElementById('cartModal');
        if (cartModal) {
            cartModal.addEventListener('show.bs.modal', () => {
                this.updateCartItems();
                this.updateTotal();
            });
        }
    }

    // Generar ID único
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Agregar item al carrito
    addItem(course) {
        // Normalizar entrada
        const priceCents = typeof course.priceCents === 'number' ? course.priceCents : this.parsePesosToUnits(course.price || '$50.000 COP');
        const normalized = {
            id: course.id || this.generateId(),
            title: course.title || 'Curso',
            price: course.price || this.formatPesos(priceCents),
            priceCents: priceCents,
            image: course.image || '',
            quantity: typeof course.quantity === 'number' ? course.quantity : 1
        };
        const existingItem = this.items.find(item => (item.id && normalized.id && item.id === normalized.id) || item.title === normalized.title);
        if (!existingItem) {
            this.items.push(normalized);
            this.updateCart();
            this.showNotification('Curso agregado al carrito');
        } else {
            existingItem.quantity = (existingItem.quantity || 1) + (normalized.quantity || 1);
            // Mantener imagen y precio actualizados si llegan nuevos
            if (normalized.image) existingItem.image = normalized.image;
            if (typeof normalized.priceCents === 'number') {
                existingItem.priceCents = normalized.priceCents;
                existingItem.price = this.formatPesos(normalized.priceCents);
            }
            this.updateCart();
            this.showNotification('Cantidad actualizada en el carrito');
        }
    }

    // Actualizar cantidad de un item
    updateQuantity(id, newQuantity) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(id);
            } else {
                item.quantity = newQuantity;
                this.updateCart();
            }
        }
    }

    // Remover item del carrito
    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.updateCart();
        this.showNotification('Curso removido del carrito');
    }

    // Actualizar el carrito
    updateCart() {
        this.updateCartCount();
        this.updateCartItems();
        this.updateTotal();
        this.saveCart();
    }

    // Actualizar contador del carrito
    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        const totalItems = this.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
        cartCount.textContent = totalItems;
        cartCount.classList.add('animate');
        setTimeout(() => cartCount.classList.remove('animate'), 500);
    }

    // Actualizar items del carrito
    updateCartItems() {
        const cartItems = document.getElementById('cartItems');
        if (!cartItems) return;

        cartItems.innerHTML = '';

        if (this.items.length === 0) {
            cartItems.innerHTML = '<div class="text-center py-4">El carrito está vacío</div>';
            return;
        }

        this.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item d-flex align-items-center p-3 border-bottom';
            itemElement.innerHTML = `
                <div class="cart-item-image me-3" style="width: 80px; height: 80px; overflow: hidden;">
                    <img src="${item.image}" alt="${item.title}" class="img-fluid" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="cart-item-details flex-grow-1">
                    <h6 class="mb-1">${item.title}</h6>
                    <div class="cart-item-price">${item.price}</div>
                </div>
                <div class="cart-item-quantity d-flex align-items-center me-3">
                    <button class="btn btn-outline-secondary btn-sm" onclick="cart.updateQuantity('${item.id}', ${(item.quantity || 1) - 1})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="mx-2">${item.quantity || 1}</span>
                    <button class="btn btn-outline-secondary btn-sm" onclick="cart.updateQuantity('${item.id}', ${(item.quantity || 1) + 1})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="cart-item-remove">
                    <button class="btn btn-danger btn-sm" onclick="cart.removeItem('${item.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            cartItems.appendChild(itemElement);
        });
    }

    // Actualizar total
    updateTotal() {
        this.total = this.items.reduce((sum, item) => {
            const unit = (typeof item.priceCents === 'number') ? item.priceCents : this.parsePesosToUnits(item.price);
            const quantity = item.quantity || 1;
            return sum + (unit * quantity);
        }, 0);
        const totalText = this.formatPesos(this.total);
        const totalEl = document.getElementById('cartTotal');
        if (totalEl) totalEl.textContent = totalText;
    }

    // Guardar carrito en localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    // Mostrar notificación
    showNotification(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white bg-${type} border-0 position-fixed bottom-0 end-0 m-3`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;
        
        document.body.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        
        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
        });
    }

    // Proceder al pago
    checkout() {
        if (this.items.length === 0) {
            this.showNotification('El carrito está vacío', 'warning');
            return;
        }

        console.log('Iniciando proceso de checkout...');
        console.log('Items en el carrito:', this.items);

        // Preparar los datos para la página de pago
        const checkoutData = {
            items: this.items.map(item => ({
                id: item.id,
                title: item.title,
                price: this.formatPesos(typeof item.priceCents === 'number' ? item.priceCents : this.parsePesosToUnits(item.price)),
                priceCents: typeof item.priceCents === 'number' ? item.priceCents : this.parsePesosToUnits(item.price),
                quantity: item.quantity || 1,
                image: item.image
            })),
            subtotal: this.total,
            total: this.total,
            taxes: 0
        };

        console.log('Datos preparados para checkout:', checkoutData);

        // Guardar los datos en localStorage para la página de pago
        localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
        console.log('Datos guardados en localStorage:', localStorage.getItem('checkoutData'));

        // Redirigir a la página de pago del carrito
        window.location.href = 'carrito-pago.html';
    }

    // Formatear $x COP
    formatPesos(units) {
        const val = Math.max(0, parseInt(units || 0, 10));
        return `$${val.toLocaleString('es-CO')} COP`;
    }

    // Parsear "$50.000 COP" -> 50000
    parsePesosToUnits(text) {
        if (typeof text === 'number') return Math.max(0, Math.floor(text));
        const digits = String(text || '').replace(/[^0-9]/g, '');
        return digits ? parseInt(digits, 10) : 0;
    }
}

// Inicializar el carrito cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new ShoppingCart();
}); 