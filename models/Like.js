const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const likeSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: [true, 'Like must be associated to a user!']
    },
    post: {
        type: String,
        required: [true, 'Like must be associated to a user!']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


const Like = mongoose.model('Like', likeSchema);


module.exports = Like;