const express = require('express');
const Order = require('../models/Order');
const User = require('../models/User');
const crypto = require('crypto');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

// Place a new order
router.post('/', verifyToken, async (req, res) => {
  const { stallId, items, totalPoints } = req.body;
  const studentId = req.user._id;

  try {
    const user = await User.findById(studentId);
    
    // Check points balance
    if (user.foodPoints < totalPoints) {
      return res.status(400).json({ message: 'Insufficient food points.' });
    }

    // Deduct points
    user.foodPoints -= totalPoints;
    await user.save();

    // Generate unique QR token
    const qrCodeToken = crypto.randomBytes(8).toString('hex');

    // Create Order
    const order = await Order.create({
      studentId,
      stallId,
      items,
      totalPoints,
      qrCodeToken,
      status: 'Pending'
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get orders for a student
router.get('/student/:id', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ studentId: req.user._id }).populate('stallId', 'name').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status (Stall Owner)
router.put('/:id/status', async (req, res) => {
  const { status, prepTimeEstimated } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { status, prepTimeEstimated }, 
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
