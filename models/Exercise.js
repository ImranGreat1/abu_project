const mongoose = require('mongoose');
const { generateUniqueSlug } = require('../utils/generalUtils');

const exerciseSchema = new mongoose.Schema({
  description: String,
  department: String,
  level: String,
  shared: {
    type: Boolean,
    default: false
  },
  score: {
    type: Number,
    default: 0
  },
  questions: Array,
  createdBy: mongoose.Schema.ObjectId,
  slug: {
    type: String,
    required: [true, 'An exercise must have a slug!'],
    unique: true
  }
});

exerciseSchema.pre('save', function(next) {
  this.slug = generateUniqueSlug(description);
  next();
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;

