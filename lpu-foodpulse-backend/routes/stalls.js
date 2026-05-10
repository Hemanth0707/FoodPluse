const express = require('express');
const Stall = require('../models/Stall');
const MenuItem = require('../models/MenuItem');
const router = express.Router();

// Get all stalls
router.get('/', async (req, res) => {
  try {
    const stalls = await Stall.find({}).lean();
    
    // Fetch menu items for all stalls and attach them
    for (let stall of stalls) {
      stall.menuItems = await MenuItem.find({ stallId: stall._id }).lean();
    }
    
    res.json(stalls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get menu for a specific stall
router.get('/:stallId/menu', async (req, res) => {
  try {
    const menu = await MenuItem.find({ stallId: req.params.stallId });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
