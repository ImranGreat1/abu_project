const mongoose = require('mongoose');
const { Schema } = require('mongoose');


const commentSchema = new Schema({
    text: {
        type: String,
        minLength: 1,
        maxLength: 200,
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: [true, 'Comment must be associated to a user!']
    },
    post: {
        type: String,
        required: [true, 'Comment must be associated to a post!']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;