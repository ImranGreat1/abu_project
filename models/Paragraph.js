const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const paragraphSchema = new Schema({
  subHeading: {
    type: String,
    maxLength: 200,
  },
  text: {
    type: String,
    required: [true, 'A Paragraph must contain the paragraph text!'],
    minLength: [100, 'A Paragraph must not be less than 150 characters'],
    maxLength: [600, 'A Paragraph must not be more than 600 characters'],
  },
  image: {
    name: {
      type: String,
    },
    description: {
      type: String,
      maxLength: 100,
    },
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  post: {
    type: String,
    required: [true, 'A paragraph must be associated with a slug!'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Paragraph = mongoose.model('Paragraph', paragraphSchema);

exports.paragraphSchema = paragraphSchema;

module.exports = Paragraph;
