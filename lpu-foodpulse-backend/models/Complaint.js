const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hostel: { type: String, required: true }, // e.g., 'BH1'
  mess: { type: String, required: true }, // e.g., 'Block A Mess'
  mealType: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner'], required: true },
  issueType: { 
    type: String, 
    enum: ['Bad taste', 'Undercooked', 'Overcooked', 'Unhygienic', 'Low quantity', 'Repeated menu', 'Stale food', 'Food poisoning risk'],
    required: true
  },
  description: { type: String },
  imageProof: { type: String }, // URL from Cloudinary
  status: { type: String, enum: ['Pending', 'Verified', 'Rejected'], default: 'Pending' },
  upvotes: { type: Number, default: 0 },
}, { timestamps: true });

// We can add an index to quickly group by hostel, mess, mealType, and date for AI validation
complaintSchema.index({ hostel: 1, mess: 1, mealType: 1, createdAt: -1 });

module.exports = mongoose.model('Complaint', complaintSchema);
