const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const slugify = require('slugify');

const handoutSchema = new Schema({
  courseCode: {
    type: String,
    required: [true, 'Please provide the course code of the handout!'],
  },
  title: {
    type: String,
    required: [true, 'Please provide the title of the handout!'],
  },
  pdf: {
    type: String,
    required: [true, 'Please provide the pdf file!'],
  },
  faculty: {
    type: String,
    required: [true, 'Please provide your faculty'],
  },
  department: {
    type: String,
    required: [true, 'Please provide your department!'],
  },
  level: {
    type: Number,
    required: [true, 'Please provide your level!'],
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  // PARENT REFERENCE
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: [true, 'A handout must be uploaded by a user!'],
    alias: 'uploadedBy',
  },
  slug: {
    type: String,
    unique: true,
  },
});

// INCLUDE PREFILL USER'S NAME AND EMAIL ON QUERY
handoutSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    // select: ['name', 'photo'],
    select: 'name photo',
  });

  next();
});

handoutSchema.pre('save', function (next) {
  this.slug = slugify(this.title, {
    lower: true,
    replacement: '-',
    strict: true,
  });
  next();
});

const Handout = mongoose.model('Handout', handoutSchema);

module.exports = Handout;
