// Shopping Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Add to cart
function addToCart(event) {
    const button = event.target;
    const productId = button.dataset.id;
    const productName = button.dataset.name;
    const productPrice = button.dataset.price;

    const product = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1
    };

    // Check if product already in cart
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    // Show success message
    button.textContent = 'Added to Cart!';
    button.style.backgroundColor = '#28a745';
    setTimeout(() => {
        button.textContent = 'Add to Cart';
        button.style.backgroundColor = '';
    }, 2000);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();

    // Add event listeners to all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert('Thank you for subscribing! Check your email for confirmation.');
            this.reset();
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Cart page functionality
function displayCart() {
    const cartContainer = document.querySelector('.cart-items');
    const cartSummary = document.querySelector('.cart-summary');

    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty. <a href="products.html">Continue shopping</a></p>';
        if (cartSummary) cartSummary.innerHTML = '';
        return;
    }

    let html = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
            <div class="cart-item">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Price: PKR ${item.price}</p>
                </div>
                <div class="item-quantity">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value - ${item.quantity})">
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <div class="item-total">
                    <p>PKR ${itemTotal}</p>
                </div>
                <button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    cartContainer.innerHTML = html;

    if (cartSummary) {
        cartSummary.innerHTML = `
            <div class="summary-card">
                <h3>Order Summary</h3>
                <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>PKR ${total}</span>
                </div>
                <div class="summary-row">
                    <span>Shipping:</span>
                    <span>PKR 500</span>
                </div>
                <div class="summary-row total">
                    <span>Total:</span>
                    <span>PKR ${total + 500}</span>
                </div>
                <button class="btn btn-primary checkout-btn" onclick="checkout()">Proceed to Checkout</button>
            </div>
        `;
    }
}

function updateQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity = Math.max(1, cart[index].quantity + parseInt(change));
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
        updateCartCount();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your order! This is a demo. In a real application, you would be redirected to payment.');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// Products page
function displayProducts() {
    const productsContainer = document.querySelector('.products-container');
    
    const products = [
        { id: 1, name: 'Premium Engine Oil', price: 2500, description: 'High-quality synthetic engine oil', category: 'oil' },
        { id: 2, name: 'Brake Pads Set', price: 3200, description: 'Genuine motorcycle brake pads', category: 'brakes' },
        { id: 3, name: 'Air Filter', price: 1800, description: 'Reusable air filter element', category: 'filters' },
        { id: 4, name: 'Chain & Sprocket Kit', price: 5500, description: 'Complete chain and sprocket assembly', category: 'drivetrain' },
        { id: 5, name: 'Spark Plug', price: 800, description: 'High-performance spark plugs', category: 'ignition' },
        { id: 6, name: 'Motorcycle Battery', price: 4200, description: '12V powerful motorcycle battery', category: 'electrical' },
        { id: 7, name: 'Tire Set (Front & Rear)', price: 8000, description: 'Premium motorcycle tires', category: 'tires' },
        { id: 8, name: 'Clutch Plate', price: 2800, description: 'Original clutch plate', category: 'transmission' },
        { id: 9, name: 'Handlebars & Grips', price: 1500, description: 'Ergonomic handlebar set', category: 'controls' },
        { id: 10, name: 'Headlight Assembly', price: 3500, description: 'LED headlight assembly', category: 'lighting' },
        { id: 11, name: 'Shock Absorbers', price: 6500, description: 'Suspension shock absorbers', category: 'suspension' },
        { id: 12, name: 'Fuel Pump', price: 4000, description: 'High-performance fuel pump', category: 'fuel' }
    ];

    if (productsContainer) {
        let html = '';
        products.forEach(product => {
            html += `
                <div class="product-card">
                    <div class="product-image">
                        <img src="https://via.placeholder.com/250x250?text=${product.name}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="price">PKR ${product.price}</p>
                        <p class="description">${product.description}</p>
                        <button class="btn btn-secondary add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
                    </div>
                </div>
            `;
        });
        productsContainer.innerHTML = html;

        // Re-attach event listeners
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }
}

// Contact form
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
}