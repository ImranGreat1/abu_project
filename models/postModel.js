const mongoose = require('mongoose');
const { Schema } = require('mongoose');




const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'A Post must have a title!']
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: [true, 'A Post must be associated with a user!'],
        alias: 'createdBy'
    },
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
            // required: [true, 'A Post must have atleast one paragraph!']
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

postSchema.pre(/^find/, function(next) {
    this.populate('paragraphs');
    next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;