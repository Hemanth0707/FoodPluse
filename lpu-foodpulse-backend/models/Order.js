const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stallId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stall', required: true },
  items: [
    {
      menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
      name: String,
      quantity: Number,
      pointsCost: Number
    }
  ],
  totalPoints: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Preparing', 'Ready', 'Collected', 'Cancelled'],
    default: 'Pending'
  },
  prepTimeEstimated: { type: Number }, // in minutes
  qrCodeToken: { type: String, unique: true } // for pickup
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
