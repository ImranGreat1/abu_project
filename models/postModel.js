const mongoose = require('mongoose');




const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A post must have a title!']
    },
    user: {
        type: mongoose.Schema.objectId,
        ref: 'User',
        required: [true, 'A post must be associated with a user!'],
        alias: 'createdBy'
    },
    paragraphs: [
        {
            type: mongoose.Schema.objectId,
            ref: 'Paragraph',
            required: [true, 'A post must have atleast one paragraph!']
        }
    ],
    likes: [
        {
            type: mongoose.Schema.objectId,
            ref: 'Like',
        }
    ],
    comments: [
        {
            type: mongoose.Schema.objectId,
            ref: 'Like',
        }
    ]
});


const Post = mongoose.model('Post', postSchema);


module.exports = Post;