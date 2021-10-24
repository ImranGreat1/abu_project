const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A library must be associated to a user!'],
  },
  assignments: [{ type: mongoose.Schema.ObjectId, ref: 'Assignment' }],
  handouts: [{ type: mongoose.Schema.ObjectId, ref: 'Handout' }],
  timetables: [{ type: mongoose.Schema.ObjectId, ref: 'Timetable' }],
});

// Populate library data
librarySchema.pre(/^find/, function (next) {
  this.populate('assignments');
  this.populate('handouts');
  this.populate('timetables');
  next();
});

const Library = mongoose.model('Library', librarySchema);

module.exports = Library;
