const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  stallId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stall', required: true },
  name: { type: String, required: true },
  pointsCost: { type: Number, required: true }, // e.g. 40 points
  prepTime: { type: Number, required: true }, // in minutes
  isAvailable: { type: Boolean, default: true },
  image: { type: String },
  category: { type: String },
  rating: { type: Number, default: 4.0 }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);
