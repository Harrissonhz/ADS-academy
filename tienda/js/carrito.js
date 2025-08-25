// Clase para manejar el carrito
class Carrito {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('carrito')) || [];
        this.render();
        this.updateCartCount();
    }

    // Agregar producto al carrito
    addItem(producto) {
        const existingItem = this.items.find(item => item.id === producto.id);
        if (existingItem) {
            existingItem.cantidad += 1;
        } else {
            this.items.push({...producto, cantidad: 1});
        }
        this.save();
        this.render();
        this.updateCartCount();
    }

    // Eliminar producto del carrito
    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.save();
        this.render();
        this.updateCartCount();
    }

    // Actualizar cantidad de un producto
    updateQuantity(id, cantidad) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.cantidad = Math.max(1, cantidad);
            this.save();
            this.render();
            this.updateCartCount();
        }
    }

    // Guardar carrito en localStorage
    save() {
        localStorage.setItem('carrito', JSON.stringify(this.items));
    }

    // Calcular subtotal
    calculateSubtotal() {
        return this.items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    }

    // Calcular envío
    calculateShipping() {
        return this.items.length > 0 ? 5000 : 0; // $5,000 de envío si hay productos
    }

    // Calcular total
    calculateTotal() {
        return this.calculateSubtotal() + this.calculateShipping();
    }

    // Actualizar contador del carrito
    updateCartCount() {
        const count = this.items.reduce((total, item) => total + item.cantidad, 0);
        document.getElementById('cart-count').textContent = count;
    }

    // Renderizar items del carrito
    render() {
        const cartItems = document.getElementById('cart-items');
        const subtotal = document.getElementById('subtotal');
        const shipping = document.getElementById('shipping');
        const total = document.getElementById('total');

        if (this.items.length === 0) {
            cartItems.innerHTML = `
                <div class="text-center py-4">
                    <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                    <p class="text-muted">Tu carrito está vacío</p>
                    <a href="index.html" class="btn btn-primary">Continuar Comprando</a>
                </div>
            `;
            subtotal.textContent = '$0.00';
            shipping.textContent = '$0.00';
            total.textContent = '$0.00';
            return;
        }

        cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item mb-3 p-3 border-bottom">
                <div class="row align-items-center">
                    <div class="col-md-2">
                        <img src="${item.imagen}" class="img-fluid rounded" alt="${item.nombre}" style="max-height: 80px; object-fit: cover;">
                    </div>
                    <div class="col-md-3">
                        <h5 class="mb-0">${item.nombre}</h5>
                    </div>
                    <div class="col-md-3">
                        <div class="input-group">
                            <button class="btn btn-outline-secondary" type="button" onclick="carrito.updateQuantity('${item.id}', ${item.cantidad - 1})">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="text" class="form-control text-center" value="${item.cantidad}" readonly style="width: 50px;">
                            <button class="btn btn-outline-secondary" type="button" onclick="carrito.updateQuantity('${item.id}', ${item.cantidad + 1})">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-md-2 text-end">
                        <h5 class="mb-0">$${(item.precio * item.cantidad).toLocaleString()}</h5>
                    </div>
                    <div class="col-md-2 text-end">
                        <button class="btn btn-danger" onclick="carrito.removeItem('${item.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        subtotal.textContent = `$${this.calculateSubtotal().toLocaleString()}`;
        shipping.textContent = `$${this.calculateShipping().toLocaleString()}`;
        total.textContent = `$${this.calculateTotal().toLocaleString()}`;
    }
}

// Inicializar carrito
const carrito = new Carrito();

// Manejar el botón de pago
document.getElementById('checkout-btn').addEventListener('click', function() {
    if (carrito.items.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    window.location.href = 'pago.html';
}); 