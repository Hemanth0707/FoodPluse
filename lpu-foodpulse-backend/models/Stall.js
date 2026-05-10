const mongoose = require('mongoose');

const stallSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isOpen: { type: Boolean, default: true },
  description: { type: String },
  rating: { type: Number, default: 4.5 },
  category: { type: String },
  location: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Stall', stallSchema);
