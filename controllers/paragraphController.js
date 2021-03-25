const Paragraph = require('../models/paragraphModel');
const multer = require('multer');
const sharp = require('sharp');
const AppError = require('../utils/appError');


const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image')) {
        return cb(new AppError('Please upload only images!', 400), false);
    }

    return cb(null, true);
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadParagraphImages = upload.fields([
    { name: 'imageOne', maxCount: 1 },
    { name: 'imageTwo', maxCount: 1 },
    { name: 'imageThree', maxCount: 1 },
    { name: 'imageFour', maxCount: 1 },
]);


exports.processParagraphImages = (req, res, next) => {
    console.log('processing images...')
    next()
};


exports.createParagraph = (req, res, next) => {
    console.log(req.files);
    console.log(req.body);
    console.log('paragraph created...')
    res.status(201).json({
        status: 'success',
        data: {
            data: 'Coming soon!'
        }
    });
};


