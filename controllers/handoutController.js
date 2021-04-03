const Handout = require('./../models/handoutModel');
const multer = require('multer');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const filterBody = require('./../utils/filterBody');

// const multer disk storage
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Path to store uploaded files
        cb(null, 'public/handout');
    },
    filename: (req, file, cb) => {
        // generate unique random name
        const fileName = `${req.body.courseCode.toUpperCase()}-${Date.now()}-${
            req.user.id
        }.pdf`;

        cb(null, fileName);
    },
});

// filter to only accept pdf files
const multerFilter = (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
        return cb(
            new AppError('Not a pdf file. Please provide only PDFs!', 400),
            false
        );
    }

    cb(null, true);
};

// Configure multer upload
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

// handle a single pdf upload with the name 'handout'
exports.uploadHandout = upload.single('handout');

exports.createHandout = catchAsync(async (req, res, next) => {
    // filter the body
    const fields = filterBody(req.body, 'title', 'courseCode');

    if (!req.file) return next(new AppError('A handout document must provide the file!', 400))
    
    // Fill in the rest of the fields based on the authenticated user sending the request
    fields.pdf = req.file.filename;
    fields.user = req.user.id;
    fields.department = req.user.department;
    fields.level = req.user.level;

    // Intanciate handout document
    const handout = await Handout.create(fields);

    // send http created response
    res.status(201).json({
        status: 'success',
        data: {
            handout,
        },
    });
});



exports.getHandouts = catchAsync( async (req, res, next) => {

    // get all handouts
    const handouts = await Handout.find();

    // send response
    res.status(200).json({
        status: 'success',
        results: handouts.length,
        data: {
            data: handouts
        }
    })
})
