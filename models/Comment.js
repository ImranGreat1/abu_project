const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    minLength: 1,
    maxLength: 200,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Comment must be associated to a user!'],
  },
  target: {
    type: String,
    required: [true, 'Comment must be associated to a target!'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
