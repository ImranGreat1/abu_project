const Handout = require('./../models/handoutModel');
const multer = require('multer');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const filteredBody = require('./../utils/filteredBody');

// const multerStorage = multer.memoryStorage();
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/handout');
    },
    filename: (req, file, cb) => {
        const fileName = `${req.body.courseCode.toUpperCase()}-${Date.now()}-${
            req.user.id
        }.pdf`;

        cb(null, fileName);
    },
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
        return cb(
            new AppError('Not a pdf file. Please provide only PDFs!', 400),
            false
        );
    }

    cb(null, true);
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadHandout = upload.single('handout');

exports.createHandout = catchAsync(async (req, res, next) => {
    const fields = filteredBody(req.body, 'title', 'courseCode');

    if (!req.file) return next(new AppError('A handout document must provide the file!', 400))

    fields.pdf = req.file.filename;
    fields.user = req.user.id;
    fields.department = req.user.department;
    fields.level = req.user.level;

    const handout = await Handout.create(fields);

    res.status(200).json({
        status: 'success',
        data: {
            handout,
        },
    });
});



exports.getHandouts = catchAsync( async (req, res, next) => {

    const handouts = await Handout.find();

    res.status(200).json({
        status: 'success',
        results: handouts.length,
        data: {
            data: handouts
        }
    })
})
