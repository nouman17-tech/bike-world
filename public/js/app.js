// Main App Functionality

// Update cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

// Check user authentication status
async function checkUserStatus() {
  const user = localStorage.getItem('user');
  const userBtn = document.getElementById('userBtn');
  const userDropdown = document.getElementById('userDropdown');
  const loginLink = document.getElementById('loginLink');
  const registerLink = document.getElementById('registerLink');
  const dashboardLink = document.getElementById('dashboardLink');
  const logoutLink = document.getElementById('logoutLink');

  if (userBtn && userDropdown) {
    userBtn.addEventListener('click', () => {
      userDropdown.style.display = userDropdown.style.display === 'none' ? 'block' : 'none';
    });
  }

  if (user) {
    const userData = JSON.parse(user);
    if (loginLink) loginLink.style.display = 'none';
    if (registerLink) registerLink.style.display = 'none';
    if (dashboardLink && userData.role === 'admin') {
      dashboardLink.style.display = 'block';
      dashboardLink.href = 'admin-dashboard.html';
    }
    if (logoutLink) {
      logoutLink.style.display = 'block';
      logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        alert('Logged out successfully');
        window.location.href = 'index.html';
      });
    }
  }
}

// Load featured products on homepage
async function loadFeaturedProducts() {
  try {
    const products = await api.getProducts();
    const featuredContainer = document.getElementById('featuredProducts');
    
    if (featuredContainer) {
      let html = '';
      products.slice(0, 6).forEach(product => {
        html += `
          <div class="product-card">
            <div class="product-image">
              <img src="${product.image || 'https://via.placeholder.com/250x250?text=Product'}" alt="${product.name}">
            </div>
            <div class="product-info">
              <h3>${product.name}</h3>
              <p class="price">PKR ${product.price}</p>
              <p class="description">${product.description || ''}</p>
              <button class="btn btn-secondary" onclick="addToCart('${product._id}', '${product.name}', ${product.price})">Add to Cart</button>
            </div>
          </div>
        `;
      });
      featuredContainer.innerHTML = html;
    }
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

// Load all products on products page
async function loadProducts() {
  try {
    const products = await api.getProducts();
    const productsGrid = document.getElementById('productsGrid');
    
    if (productsGrid) {
      let html = '';
      products.forEach(product => {
        html += `
          <div class="product-card">
            <div class="product-image">
              <img src="${product.image || 'https://via.placeholder.com/250x250?text=Product'}" alt="${product.name}">
            </div>
            <div class="product-info">
              <h3>${product.name}</h3>
              <p class="price">PKR ${product.price}</p>
              <p class="description">${product.description || ''}</p>
              <button class="btn btn-secondary" onclick="addToCart('${product._id}', '${product.name}', ${product.price})">Add to Cart</button>
            </div>
          </div>
        `;
      });
      productsGrid.innerHTML = html;
    }
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

// Add to cart
function addToCart(id, name, price) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const existingItem = cart.find(item => item.id === id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id,
      name,
      price,
      quantity: 1,
      image: 'https://via.placeholder.com/80x80?text=Product'
    });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${name} added to cart!`);
}

// Setup filters on products page
function setupFilters() {
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const sortFilter = document.getElementById('sortFilter');

  if (searchInput) searchInput.addEventListener('input', applyFilters);
  if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
  if (sortFilter) sortFilter.addEventListener('change', applyFilters);
}

async function applyFilters() {
  const search = document.getElementById('searchInput')?.value || '';
  const category = document.getElementById('categoryFilter')?.value || '';
  const sort = document.getElementById('sortFilter')?.value || '';

  const filters = {};
  if (search) filters.search = search;
  if (category) filters.category = category;
  if (sort) filters.sort = sort;

  try {
    const products = await api.getProducts(filters);
    const productsGrid = document.getElementById('productsGrid');
    
    if (productsGrid) {
      let html = '';
      products.forEach(product => {
        html += `
          <div class="product-card">
            <div class="product-image">
              <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
              <h3>${product.name}</h3>
              <p class="price">PKR ${product.price}</p>
              <button class="btn btn-secondary" onclick="addToCart('${product._id}', '${product.name}', ${product.price})">Add to Cart</button>
            </div>
          </div>
        `;
      });
      productsGrid.innerHTML = html || '<p>No products found</p>';
    }
  } catch (error) {
    console.error('Error applying filters:', error);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  checkUserStatus();
  loadFeaturedProducts();
  loadProducts();
  setupFilters();

  // Newsletter form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for subscribing!');
      newsletterForm.reset();
    });
  }
});
