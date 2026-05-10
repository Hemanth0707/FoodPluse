const express = require('express');
const { submitComplaint, getComplaints, updateStatus } = require('../controllers/complaintController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

// Route to submit a new complaint
router.post('/submit', verifyToken, submitComplaint);

// Route to get all complaints (Admin/Vendor use)
router.get('/', getComplaints);

// Route to manually update status (Admin override)
router.put('/:id/status', updateStatus);

module.exports = router;
