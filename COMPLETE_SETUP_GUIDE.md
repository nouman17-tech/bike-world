# 🏍️ Bike World - Professional E-Commerce Platform

**Created by:** Nouman Ijaz  
**Version:** 2.0 (Professional Edition)  
**Status:** ✅ Production Ready

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation Guide](#installation-guide)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Admin Panel Guide](#admin-panel-guide)
- [API Documentation](#api-documentation)
- [Database Setup](#database-setup)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

Bike World is a **complete, professional-grade e-commerce platform** for selling premium motorcycle spare parts and accessories. It features:

✅ **User Management** - Registration, Login, Profile Management  
✅ **Product Management** - Admin can add/edit/delete products with images  
✅ **Shopping Cart** - Full cart functionality with local storage  
✅ **Checkout System** - Complete order checkout process  
✅ **Payment Integration** - Stripe payment gateway support  
✅ **Admin Dashboard** - Comprehensive admin control panel  
✅ **Order Management** - Track and manage customer orders  
✅ **Responsive Design** - Works on all devices (desktop, tablet, mobile)

---

## ✨ Key Features

### For Users:
- 🔐 Secure user registration and login
- 📦 Browse products with advanced filtering
- 🛒 Shopping cart with persistent storage
- 💳 Secure payment processing (Stripe)
- 📋 Order history and tracking
- ⭐ Product search and category filtering

### For Admin:
- 📊 Dashboard with statistics
- ➕ Add new products with images
- ✏️ Edit product details
- 🗑️ Delete products
- 📦 Manage inventory/quantity
- 👥 View all users
- 📋 Manage customer orders
- 💰 View revenue analytics

---

## 🛠️ Tech Stack

### Frontend:
- HTML5 (Semantic markup)
- CSS3 (Modern styling, Flexbox, Grid)
- JavaScript ES6+ (Dynamic functionality)
- Font Awesome Icons

### Backend:
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Stripe** - Payment processing
- **Multer** - File upload handling
- **bcryptjs** - Password hashing

### Tools & Services:
- Git/GitHub - Version control
- MongoDB Atlas - Cloud database (optional)
- Stripe - Payment gateway

---

## 📥 Installation Guide

### Prerequisites
Before you begin, ensure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)
- **npm** (comes with Node.js)

### Step 1: Clone the Repository

```bash
git clone https://github.com/nouman17-tech/bike-world.git
cd bike-world
```

### Step 2: Install Dependencies

```bash
# Install npm packages
npm install
```

This will install:
- express
- express-session
- bcryptjs
- mongodb
- multer
- stripe
- dotenv
- cors

### Step 3: Create `.env` File

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/bike-world
SESSION_SECRET=your-secret-key-here-change-this
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_PUBLIC_KEY=pk_test_your_stripe_key
ADMIN_EMAIL=admin@bikeworld.pk
ADMIN_PASSWORD=admin123
```

### Step 4: Start MongoDB

**On Windows:**
```bash
mongod
```

**On Mac/Linux:**
```bash
mongod --dbpath /usr/local/var/mongodb
```

---

## ⚙️ Configuration

### MongoDB Setup

1. **Local MongoDB:**
   - Ensure MongoDB is running on `localhost:27017`
   - Database will be created automatically as `bike-world`

2. **MongoDB Atlas (Cloud):**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a cluster
   - Get connection string
   - Replace `MONGODB_URI` in `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bike-world
   ```

### Stripe Setup

1. Sign up at [Stripe](https://stripe.com)
2. Get your API keys from Dashboard → API Keys
3. Add to `.env`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLIC_KEY=pk_test_...
   ```

---

## 🚀 Running the Application

### Start the Server

```bash
# Development mode with auto-reload
npm run dev

# Or regular start
npm start
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:5000
```

### Access the Application

- **Homepage:** http://localhost:5000
- **Products:** http://localhost:5000/public/products.html
- **Admin Panel:** http://localhost:5000/public/admin-login.html

---

## 👨‍💼 Admin Panel Guide

### First Login

1. Go to http://localhost:5000/public/admin-login.html
2. Default credentials:
   ```
   Email: admin@bikeworld.pk
   Password: admin123
   ```

### Dashboard Overview

**Main Statistics:**
- Total Products
- Total Users
- Pending Orders
- Total Revenue

**Quick Actions:**
- Add Product
- View Orders
- Manage Products

### Adding a Product

1. Click **"+ Add New Product"** button
2. Fill in the form:
   - **Product Name:** e.g., "Premium Engine Oil"
   - **Category:** Select from dropdown
   - **Price:** Enter in PKR
   - **Quantity:** Stock amount
   - **Description:** Product details
   - **Image:** Upload product photo
3. Click **"Save Product"**

### Managing Products

**Edit:** Click Edit button → Modify details → Save  
**Delete:** Click Delete → Confirm → Product removed  
**View:** Products table shows all items with details

### Order Management

1. Navigate to **Orders** section
2. Filter by status: Pending, Completed, Cancelled
3. View order details by clicking "View"
4. Track customer information and items

---

## 📡 API Documentation

### Authentication

**Register User**
```
POST /api/auth/register
Body: { name, email, password, phone, address }
Response: { message, userId }
```

**Login User**
```
POST /api/auth/login
Body: { email, password }
Response: { message, user }
```

**Check Auth Status**
```
GET /api/auth/status
Response: { isAuthenticated, user }
```

### Products

**Get All Products**
```
GET /api/products?category=Engine Oil&search=oil&sort=price-low
Response: [{ _id, name, price, description, image, ... }]
```

**Get Single Product**
```
GET /api/products/:id
Response: { _id, name, price, ... }
```

### Admin (Products)

**Add Product** (Admin only)
```
POST /api/admin/products/add
Headers: multipart/form-data
Body: FormData with name, price, category, quantity, image
Response: { message, productId }
```

**Update Product** (Admin only)
```
PUT /api/admin/products/:id
Headers: multipart/form-data
Body: FormData with updated fields
Response: { message }
```

**Delete Product** (Admin only)
```
DELETE /api/admin/products/:id
Response: { message }
```

### Orders

**Create Order**
```
POST /api/orders/create
Body: { items, shippingAddress, total, paymentMethod }
Response: { message, orderId }
```

**Get My Orders**
```
GET /api/orders/my-orders
Response: [{ _id, items, status, createdAt, ... }]
```

### Payment

**Create Payment Intent**
```
POST /api/payment/create-intent
Body: { amount, orderId }
Response: { clientSecret }
```

**Verify Payment**
```
POST /api/payment/verify
Body: { paymentIntentId }
Response: { success, message }
```

---

## 💾 Database Setup

### Collections Structure

**Users Collection:**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  phone: String,
  address: String,
  role: String ("user" or "admin"),
  createdAt: Date
}
```

**Products Collection:**
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  category: String,
  quantity: Number,
  image: String,
  specifications: Object,
  createdAt: Date,
  updatedAt: Date,
  createdBy: ObjectId
}
```

**Orders Collection:**
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  items: Array,
  shippingAddress: Object,
  total: Number,
  paymentMethod: String,
  status: String ("pending", "completed", "cancelled"),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Deployment

### Deploy to Heroku

1. **Install Heroku CLI:**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Create Heroku App:**
   ```bash
   heroku create bike-world-pk
   ```

3. **Add Environment Variables:**
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set SESSION_SECRET=your_secret
   heroku config:set STRIPE_SECRET_KEY=your_stripe_key
   ```

4. **Deploy:**
   ```bash
   git push heroku main
   ```

### Deploy to Railway or Render

1. Connect GitHub repository
2. Add environment variables
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Deploy!

### Deploy Frontend to GitHub Pages

```bash
git subtree push --prefix public origin gh-pages
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error

**Error:** `connect ECONNREFUSED 127.0.0.1:27017`

**Solution:**
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify MongoDB port (default: 27017)

### "Cannot find module" Error

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
rm -rf node_modules
npm install
```

### Port 5000 Already in Use

**Solution:**
- Change PORT in `.env`: `PORT=5001`
- Or kill process using port 5000:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  
  # Mac/Linux
  lsof -i :5000
  kill -9 <PID>
  ```

### Stripe Payment Not Working

**Solution:**
- Verify Stripe keys are correct in `.env`
- Ensure you're using test keys (pk_test_, sk_test_)
- Check Stripe dashboard for errors
- Use test card: `4242 4242 4242 4242`

### File Upload Not Working

**Solution:**
- Ensure `public/uploads` directory exists
- Check file permissions
- Verify file size is under 5MB
- Check MIME type (images only)

---

## 📝 Project Structure

```
bike-world/
├── public/
│   ├── index.html              # Homepage
│   ├── register.html           # User registration
│   ├── login.html              # User login
│   ├── products.html           # Products listing
│   ├── cart.html               # Shopping cart
│   ├── checkout.html           # Checkout page
│   ├── payment.html            # Payment page
│   ├── admin-login.html        # Admin login
│   ├── admin-dashboard.html    # Admin dashboard
│   ├── admin-products.html     # Product management
│   ├── admin-orders.html       # Order management
│   ├── css/
│   │   ├── style.css           # Main stylesheet
│   │   └── admin.css           # Admin styles
│   ├── js/
│   │   ├── api.js              # API communication
│   │   └── app.js              # Main functionality
│   └── uploads/                # Product images
├── routes/
│   ├── auth.js                 # Authentication routes
│   ├── products.js             # Product routes
│   ├── admin.js                # Admin routes
│   ├── orders.js               # Order routes
│   └── payment.js              # Payment routes
├── server.js                   # Main server file
├── package.json                # Dependencies
├── .env.example                # Environment template
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

---

## 🤝 Support

**For Issues:**
- Check the Troubleshooting section
- Review API documentation
- Check console for errors (F12 in browser)

**Contact:**
- Email: info@bikeworld.pk
- Phone: +92-300-1234567

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 🎉 Getting Started Checklist

- [ ] Install Node.js and MongoDB
- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Create `.env` file with configuration
- [ ] Start MongoDB
- [ ] Run `npm start`
- [ ] Visit http://localhost:5000
- [ ] Login to admin panel
- [ ] Add sample products
- [ ] Test user registration
- [ ] Test shopping and checkout

---

**Made with ❤️ by Nouman Ijaz**

*Professional E-Commerce Solution for Bike Parts & Accessories in Pakistan*
