// Funcionalidad del carrito
let cart = [];
const cartCount = document.getElementById('cart-count');

// Clase para manejar el carrito
class Carrito {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('carrito')) || [];
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
        this.updateCartCount();
        this.showNotification('Producto agregado al carrito');
    }

    // Guardar carrito en localStorage
    save() {
        localStorage.setItem('carrito', JSON.stringify(this.items));
    }

    // Actualizar contador del carrito
    updateCartCount() {
        const count = this.items.reduce((total, item) => total + item.cantidad, 0);
        document.getElementById('cart-count').textContent = count;
    }

    // Mostrar notificación
    showNotification(message) {
        // Crear el elemento de notificación
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;

        // Añadir la notificación al body
        document.body.appendChild(notification);

        // Mostrar la notificación
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Ocultar y eliminar la notificación después de 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Inicializar carrito
const carrito = new Carrito();

// Función para mostrar notificaciones
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Función para buscar productos
function searchProducts(query) {
    const products = document.querySelectorAll('.card');
    query = query.toLowerCase();

    products.forEach(product => {
        const title = product.querySelector('.card-title').textContent.toLowerCase();
        const description = product.querySelector('.card-text').textContent.toLowerCase();
        
        if (title.includes(query) || description.includes(query)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadCart();

    // Agregar eventos a los botones de carrito
    const addToCartButtons = document.querySelectorAll('.btn-primary');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            const producto = {
                id: card.dataset.id || Math.random().toString(36).substr(2, 9),
                nombre: card.querySelector('.card-title').textContent,
                descripcion: card.querySelector('.card-text').textContent,
                precio: parseFloat(card.querySelector('.h5.mb-0').textContent.replace('$', '').replace('.', '')),
                imagen: card.querySelector('.card-img-top').src
            };
            carrito.addItem(producto);
        });
    });

    // Evento para la búsqueda
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');

    searchButton.addEventListener('click', () => {
        searchProducts(searchInput.value);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchProducts(searchInput.value);
        }
    });
});

// Estilos para las notificaciones
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #2c3e50;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        transform: translateY(100%);
        opacity: 0;
        transition: all 0.3s ease;
    }

    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .notification i {
        color: #2ecc71;
        font-size: 1.2em;
    }
`;
document.head.appendChild(style);

// Función para cargar el carrito desde localStorage
function loadCart() {
    const savedCart = localStorage.getItem('carrito');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.cantidad, 0);
    cartCount.textContent = totalItems;
}

// Función para guardar el carrito en localStorage
function saveCart() {
    localStorage.setItem('carrito', JSON.stringify(cart));
} 