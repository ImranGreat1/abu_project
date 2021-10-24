const mongoose = require('mongoose');

const suggestionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'A suggestion must come from a user!'],
  },
  text: {
    type: String,
    required: [true, "A suggestion can't be empty!"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Suggestion = mongoose.model('Suggestion', suggestionSchema);
