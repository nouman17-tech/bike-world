# 🚀 Quick Start Guide - Bike World

## What You Have

You now have a **complete, professional e-commerce platform** with:

✅ User authentication system  
✅ Product catalog with search & filters  
✅ Shopping cart functionality  
✅ Checkout & payment system  
✅ Admin panel for management  
✅ Order tracking system  
✅ Professional UI/UX design  

---

## Installation (5 Minutes)

### 1. Install Prerequisites

**Download and install:**
- Node.js: https://nodejs.org/ (LTS version)
- MongoDB: https://www.mongodb.com/try/download/community

### 2. Setup Project

```bash
# Clone the project
git clone https://github.com/nouman17-tech/bike-world.git
cd bike-world

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

### 3. Configure .env

Edit `.env` file and update:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bike-world
SESSION_SECRET=your-secret-key-123
```

### 4. Start Application

**Terminal 1 - Start MongoDB:**
```bash
mongod
```

**Terminal 2 - Start Server:**
```bash
npm start
```

### 5. Open in Browser

Go to: **http://localhost:5000**

---

## How to Use

### For Users:
1. **Register** → Create new account
2. **Login** → Enter credentials
3. **Shop** → Browse products
4. **Add to Cart** → Click "Add to Cart"
5. **Checkout** → Go to cart → Proceed to checkout
6. **Payment** → Enter shipping & pay

### For Admin:
1. Go to: http://localhost:5000/public/admin-login.html
2. **Default Login:**
   - Email: `admin@bikeworld.pk`
   - Password: `admin123`
3. **Dashboard** → View statistics
4. **Add Product** → Click "+ Add New Product"
5. **Manage** → Edit or delete products
6. **Orders** → View customer orders

---

## File Structure

```
bike-world/
├── public/                 # Frontend files
│   ├── *.html             # Web pages
│   ├── css/               # Stylesheets
│   └── js/                # JavaScript
├── routes/                # Backend routes
│   ├── auth.js
│   ├── products.js
│   ├── admin.js
│   ├── orders.js
│   └── payment.js
├── server.js              # Main server
├── package.json           # Dependencies
└── .env                   # Configuration
```

---

## API Endpoints

### Auth
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login user
- `GET /api/auth/status` - Check login status

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/admin/products/add` - Add product (Admin)
- `PUT /api/admin/products/:id` - Edit product (Admin)
- `DELETE /api/admin/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders/create` - Create order
- `GET /api/orders/my-orders` - View my orders
- `GET /api/orders/:id` - Order details

### Payment
- `POST /api/payment/create-intent` - Create payment
- `POST /api/payment/verify` - Verify payment

---

## Features

### User Features
- ✅ Secure registration & login
- ✅ Product search & filtering
- ✅ Shopping cart
- ✅ Checkout process
- ✅ Stripe payment
- ✅ Order history
- ✅ User profile

### Admin Features
- ✅ Product management (Add/Edit/Delete)
- ✅ Image upload
- ✅ Inventory management
- ✅ Order management
- ✅ User management
- ✅ Dashboard statistics
- ✅ Sales analytics

---

## Sample Product Categories

- Engine Oil
- Brakes & Safety
- Filters
- Drivetrain
- Ignition
- Electrical
- Tires
- Transmission
- Controls
- Lighting
- Suspension
- Fuel System

---

## Troubleshooting

### MongoDB not connecting?
```bash
# Make sure MongoDB is running
mongod
```

### Port 5000 already in use?
```bash
# Change PORT in .env file to 5001
PORT=5001
```

### Dependencies not installing?
```bash
# Clear and reinstall
rm -rf node_modules
npm install
```

---

## Next Steps

1. **Customize** - Add your branding, colors, logo
2. **Add Products** - Use admin panel to add items
3. **Setup Payment** - Get Stripe API keys
4. **Deploy** - Push to Heroku, Vercel, or Railway
5. **Promote** - Share with customers

---

## Support

**Need help?** Check `COMPLETE_SETUP_GUIDE.md` for detailed documentation.

---

**Made with ❤️ by Nouman Ijaz**
