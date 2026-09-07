const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bike-world';
let productsCollection, usersCollection;

MongoClient.connect(MONGO_URI, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('bike-world');
    productsCollection = db.collection('products');
    usersCollection = db.collection('users');
  })
  .catch(err => console.error('MongoDB Connection Error:', err));

// Middleware to check if admin
const checkAdmin = (req, res, next) => {
  if (req.session.userRole !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'public/uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Add Product
router.post('/products/add', checkAdmin, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category, quantity, specifications } = req.body;

    if (!name || !price || !category || !quantity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newProduct = {
      name,
      description,
      price: parseFloat(price),
      category,
      quantity: parseInt(quantity),
      specifications: specifications ? JSON.parse(specifications) : {},
      image: req.file ? `/uploads/${req.file.filename}` : '/images/placeholder.png',
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: req.session.userId
    };

    const result = await productsCollection.insertOne(newProduct);

    res.status(201).json({ 
      message: 'Product added successfully',
      productId: result.insertedId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Product
router.put('/products/:id', checkAdmin, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category, quantity, specifications } = req.body;
    const productId = req.params.id;

    const updateData = {
      name,
      description,
      price: parseFloat(price),
      category,
      quantity: parseInt(quantity),
      specifications: specifications ? JSON.parse(specifications) : {},
      updatedAt: new Date()
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const result = await productsCollection.updateOne(
      { _id: new ObjectId(productId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Product
router.delete('/products/:id', checkAdmin, async (req, res) => {
  try {
    const result = await productsCollection.deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users (admin only)
router.get('/users', checkAdmin, async (req, res) => {
  try {
    const users = await usersCollection.find({ role: 'user' }).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get dashboard stats
router.get('/stats', checkAdmin, async (req, res) => {
  try {
    const totalProducts = await productsCollection.countDocuments();
    const totalUsers = await usersCollection.countDocuments({ role: 'user' });
    
    res.json({
      totalProducts,
      totalUsers,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
