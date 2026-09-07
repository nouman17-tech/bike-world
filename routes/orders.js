const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bike-world';
let ordersCollection;

MongoClient.connect(MONGO_URI, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('bike-world');
    ordersCollection = db.collection('orders');
  })
  .catch(err => console.error('MongoDB Connection Error:', err));

// Middleware to check if user is authenticated
const checkAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};

// Create order
router.post('/create', checkAuth, async (req, res) => {
  try {
    const { items, shippingAddress, total, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const newOrder = {
      userId: new ObjectId(req.session.userId),
      items,
      shippingAddress,
      total,
      paymentMethod,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await ordersCollection.insertOne(newOrder);

    res.status(201).json({
      message: 'Order created successfully',
      orderId: result.insertedId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user orders
router.get('/my-orders', checkAuth, async (req, res) => {
  try {
    const orders = await ordersCollection
      .find({ userId: new ObjectId(req.session.userId) })
      .sort({ createdAt: -1 })
      .toArray();

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get order details
router.get('/:id', checkAuth, async (req, res) => {
  try {
    const order = await ordersCollection.findOne({ 
      _id: new ObjectId(req.params.id),
      userId: new ObjectId(req.session.userId)
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
