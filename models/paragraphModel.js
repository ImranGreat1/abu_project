const mongoose = require('mongoose');
const { Schema } = require('mongoose');


const paragraphSchema = new Schema({
    subHeading: {
        type: String,
        maxLength: 100
    },
    text: {
        type: String,
        required: [true, 'Paragraph must contain the paragraph text!'],
        minLengh: 150,
        maxLength: 400
    },
    images: [
        {
            name: {
                type: String,
                required: [true, 'An image must have a name']
            },
            description: {
                type: String,
                maxLength: 100,
            }
        }
    ]
});


const Paragraph = mongoose.model('Paragraph', paragraphSchema);

module.exports = Paragraph;