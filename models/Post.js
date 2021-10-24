const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const slugify = require('slugify');
const Paragraph = require('./Paragraph');

const options = {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
};

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title field is required!'],
      unique: true,
    },
    // PARENT REFERENCE
    author: {
      type: Schema.ObjectId,
      ref: 'User',
      required: [true, 'A Post must be associated with a user!'],
      alias: 'createdBy',
    },
    target: {
      type: String,
      enum: ['department', 'faculty', 'school'],
      default: 'department',
    },
    faculty: {
      type: String,
      requied: [true, 'Faculty field is required!'],
    },
    department: {
      type: String,
      requied: [true, 'Department field is required!'],
    },
    level: {
      type: String,
      required: [true, 'Level field is required!'],
    },
    paragraphs: [
      {
        type: Schema.ObjectId,
        ref: 'Paragraph',
      },
    ],
    slug: {
      type: String,
      unique: true,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  options
);

// Virtuals
postSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'post',
  // Count will set the likes field to the number of matched likes
  count: true,
});

// POPULATE PARAGRAPHS ON QUERY
postSchema.pre(/^find/, function (next) {
  this.populate('paragraphs');
  this.populate('author');
  next();
});

// SLUGIFY THE TITLE
postSchema.pre('save', function (next) {
  this.slug = slugify(this.title, {
    lower: true,
    replacement: '-',
    strict: true,
  });
  next();
});

// DELETE PARAGRAPHS ASSOCIATE TO A POST AFTER DELETING THE POST
postSchema.post('findOneAndDelete', function (doc) {
  // check if the deleted post has any paragraphs
  if (doc && doc.paragraphs.length > 0) {
    doc.paragraphs.forEach(async (el) => {
      await Paragraph.findByIdAndDelete(el.id);
    });
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
