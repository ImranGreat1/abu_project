const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A timetable must have a name!']
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  timetableType: {
    type: String,
    enum: ['personal', 'departmental'],
    default: 'personal'
  },

  shareWithOthers: {
    type: Boolean,
    default: false
  },

  monday: {
    type: mongoose.Schema.ObjectId,
    ref: 'Day'
  },

  tuesday: {
    type: mongoose.Schema.ObjectId,
    ref: 'Day'
  },

  wednesday: {
    type: mongoose.Schema.ObjectId,
    ref: 'Day'
  },

  thursday: {
    type: mongoose.Schema.ObjectId,
    ref: 'Day'
  },

  friday: {
    type: mongoose.Schema.ObjectId,
    ref: 'Day'
  },

  saturday: {
    type: mongoose.Schema.ObjectId,
    ref: 'Day'
  },

  sunday: {
    type: mongoose.Schema.ObjectId,
    ref: 'Day'
  },
});

module.exports = Timetable = mongoose.model('Timetable', timetableSchema);