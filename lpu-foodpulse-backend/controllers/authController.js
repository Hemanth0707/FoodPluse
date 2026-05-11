const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '30d' });
};

// Register User
exports.registerUser = async (req, res) => {
  const { name, email, lpuId, password, hostel, roomNumber, mess, department, year } = req.body;

  try {
    // Strict LPU Validation
    if (!email.endsWith('@lpu.in') && !lpuId) {
      return res.status(400).json({ success: false, message: 'Must provide an @lpu.in email or a valid LPU Registration ID.' });
    }

    const userExists = await User.findOne({ $or: [{ email }, { lpuId }] });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this Email or LPU ID' });
    }

    const user = await User.create({
      name,
      email,
      lpuId,
      password,
      hostel,
      roomNumber,
      mess,
      department,
      year
    });

    if (user) {
      res.status(201).json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          lpuId: user.lpuId,
          role: user.role,
          foodPoints: user.foodPoints,
          hostel: user.hostel,
          roomNumber: user.roomNumber,
          mess: user.mess,
          department: user.department,
          year: user.year
        },
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { identifier, password } = req.body; // identifier can be email or lpuId

  try {
    const user = await User.findOne({ 
      $or: [{ email: identifier }, { lpuId: identifier }] 
    });

    if (user && (await user.comparePassword(password))) {
      res.json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          lpuId: user.lpuId,
          role: user.role,
          foodPoints: user.foodPoints,
          hostel: user.hostel,
          roomNumber: user.roomNumber,
          mess: user.mess,
          department: user.department,
          year: user.year
        },
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email/LPU ID or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
