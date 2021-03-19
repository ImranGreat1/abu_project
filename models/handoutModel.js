const mongoose = require('mongoose');

const handoutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide the title of the handout!'],
    },
    courseCode: {
        type: String,
        required: [true, 'Please provide the course code of the handout!'],
    },
    pdf: {
        type: String,
        required: [true, 'Please provide the pdf file!'],
    },
    department: {
        type: String,
        required: [true, 'Please provide the department!'],
    },
    level: {
        type: Number,
        required: [true, 'Please specify the level!'],
    },
    imageCover: {
        type: String,
        default: 'default-cover.jpg',
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
    // parent reference
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A handout must be uploaded by a user!'],
        alias: 'uploadedBy',
    },
});

handoutSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'user',
        // select: ['name', 'photo'],
        select: 'name photo'
    })

    next();
});


const Handout = mongoose.model('Handout', handoutSchema);

module.exports = Handout;
