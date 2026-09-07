// API Communication
const API_BASE = 'http://localhost:5000/api';

const api = {
  // Auth
  register: async (data) => {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  login: async (email, password) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  },

  logout: async () => {
    const response = await fetch(`${API_BASE}/auth/logout`, { method: 'POST' });
    return response.json();
  },

  checkAuth: async () => {
    const response = await fetch(`${API_BASE}/auth/status`);
    return response.json();
  },

  // Products
  getProducts: async (filters = {}) => {
    let url = `${API_BASE}/products`;
    const params = new URLSearchParams(filters);
    if (params.toString()) url += '?' + params.toString();
    const response = await fetch(url);
    return response.json();
  },

  getProduct: async (id) => {
    const response = await fetch(`${API_BASE}/products/${id}`);
    return response.json();
  },

  // Admin
  addProduct: async (formData) => {
    const response = await fetch(`${API_BASE}/admin/products/add`, {
      method: 'POST',
      body: formData
    });
    return response.json();
  },

  updateProduct: async (id, formData) => {
    const response = await fetch(`${API_BASE}/admin/products/${id}`, {
      method: 'PUT',
      body: formData
    });
    return response.json();
  },

  deleteProduct: async (id) => {
    const response = await fetch(`${API_BASE}/admin/products/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  getAdminStats: async () => {
    const response = await fetch(`${API_BASE}/admin/stats`);
    return response.json();
  },

  // Orders
  createOrder: async (data) => {
    const response = await fetch(`${API_BASE}/orders/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  getMyOrders: async () => {
    const response = await fetch(`${API_BASE}/orders/my-orders`);
    return response.json();
  },

  getOrder: async (id) => {
    const response = await fetch(`${API_BASE}/orders/${id}`);
    return response.json();
  },

  // Payment
  createPaymentIntent: async (amount, orderId) => {
    const response = await fetch(`${API_BASE}/payment/create-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, orderId })
    });
    return response.json();
  },

  verifyPayment: async (paymentIntentId) => {
    const response = await fetch(`${API_BASE}/payment/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentIntentId })
    });
    return response.json();
  }
};
