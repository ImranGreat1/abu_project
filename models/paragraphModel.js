const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const paragraphSchema = new Schema({
    subHeading: {
        type: String,
        maxLength: 100
    },
    text: {
        type: String,
        required: [true, 'A Paragraph must contain the paragraph text!'],
        minLength: [150, 'A Paragraph must not be less than 150 characters'],
        maxLength: [600, 'A Paragraph must not be more than 600 characters'],
    },
    image: {
        name: {
            type: String,
            required: [true, 'An image must have a name']
        },
        description: {
            type: String,
            maxLength: 100,
        }
    }
});


const Paragraph = mongoose.model('Paragraph', paragraphSchema);

module.exports = Paragraph;