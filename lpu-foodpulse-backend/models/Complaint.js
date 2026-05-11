const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stallId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stall', required: false }, // Direct link to vendor
  hostel: { type: String, required: true },
  mess: { type: String, required: true },
  mealType: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Beverages'], required: true },
  issueType: { 
    type: String, 
    enum: ['Bad taste', 'Undercooked', 'Overcooked', 'Unhygienic', 'Low quantity', 'Repeated menu', 'Stale food', 'Food poisoning risk', 'Quality Issue'],
    required: true
  },
  description: { type: String },
  imageProof: { type: String },
  status: { type: String, enum: ['Pending', 'Verified', 'In Progress', 'Resolved', 'Rejected'], default: 'Pending' },
  upvotes: { type: Number, default: 0 },
}, { timestamps: true });

// We can add an index to quickly group by hostel, mess, mealType, and date for AI validation
complaintSchema.index({ hostel: 1, mess: 1, mealType: 1, createdAt: -1 });

module.exports = mongoose.model('Complaint', complaintSchema);
