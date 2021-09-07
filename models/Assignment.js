const mongoose = require('mongoose');
const { generateUniqueSlug } = require('../utils/generalUtils');

const assignmentSchema = new mongoose.Schema({

  description: {
    type: String,
    required: [true, 'An assignment must have a description']
  },

  image: String,

  courseCode: {
    type: String,
    required: [true, 'Please provide the course code for the assignment!']
  },

  department: {
    type: String,
    required: [true, 'An assignment must target a specific department!']
  },

  level: {
    type: String,
    required: [true, 'An assignment must target a specific level!']
  },

  dateIssued: {
    type: Date,
    default: Date.now
  },
  
  postedBy: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'An assignment must be posted by a user!']
  },

  submissionDate: Date,

  toBeSubmittedTo: String,

  active: {
    type: Boolean,
    default: true
  },

  slug: {
    type: String,
    unique: true
  }

});

assignmentSchema.pre('save', function(next) {
  // Generate unique slug using my custom function
  this.slug = generateUniqueSlug(this.description);
  next();
});

const User = mongoose.model('Assignment', assignmentSchema);

module.exports = User;