const mongoose = require('mongoose');
const { Schema } = require('mongoose');




const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'A Post must have a title!']
    },
    user: {
        type: Schema.objectId,
        ref: 'User',
        required: [true, 'A Post must be associated with a user!'],
        alias: 'createdBy'
    },
    paragraphs: [
        {
            type: mongoose.Schema.objectId,
            ref: 'Paragraph',
            required: [true, 'A Post must have atleast one paragraph!']
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


const Post = mongoose.model('Post', postSchema);


module.exports = Post;