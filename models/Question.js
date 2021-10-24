const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'A question must provide the text!'],
  },

  questionType: {
    type: String,
    enum: ['theory', 'objective'],
    default: 'objective',
  },

  answers: {
    type: [String],
    required: [
      true,
      'A question must have atleast an answer to evaluate users!',
    ],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Question = mongoose.model('Question', questionSchema);
