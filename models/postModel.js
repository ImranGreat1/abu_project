const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const slugify = require('slugify');
const Paragraph = require('./paragraphModel');




const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'A Post must have a title!'],
        unique: true
    },
    content: {
        type: String,
        required: [true, 'A post must have contents'],
        minLength: [150, 'Content must not be less than 150 characters'],
        maxLength: [600, 'Content must not be more than 600 characters'],
    },
    // PARENT REFERENCE
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: [true, 'A Post must be associated with a user!'],
        alias: 'createdBy'
    },
    // EMBEDDED DOCUMENT
    // These are like top most images of the post
    images: [
        {
            image: {
                type: String,
                required: [true, 'Please provide the image']
            },
            description: {
                type: String,
                maxLength: [150, 'Please image description should not be more than 150 characters']
            }
            
        }
    ],
    paragraphs: [
        {
            type: Schema.ObjectId,
            ref: 'Paragraph',
        }
    ],
    slug: {
        type: String,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    likes: Array
});

// POPULATE PARAGRAPHS ON QUERY
postSchema.pre(/^findOne/, function(next) {
    this.populate('paragraphs');
    console.log('HEY');
    next();
});

// SLUGIFY THE TITLE
postSchema.pre('save', function(next) {
    this.slug = slugify(this.title, { lower: true, replacement: '-' });
    next();
})

// DELETE PARAGRAPHS ASSOCIATE TO A POST AFTER DELETING THE POST
postSchema.post('findOneAndDelete', function(doc) {
    // check if the deleted post has any paragraphs
    if (doc && doc.paragraphs.length > 0) {
        doc.paragraphs.forEach(async el => {
            await Paragraph.findByIdAndDelete(el.id);
        });
    }  

});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;