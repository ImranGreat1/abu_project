const Handout = require('./../models/handoutModel');
const multer = require('multer');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const filterBody = require('./../utils/filterBody');
const slugify = require('slugify');
const { isSameLevelAndDepartment } = require('../utils/generalUtils');

// CREATE A DISK STORAGE
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Path to store uploaded files
        cb(null, 'public/handout');
    },
    filename: (req, file, cb) => {
        // generate unique random name
        const slugifyTitle = slugify(req.body.courseCode.toUpperCase(), { replacement: '-' });
        const fileName = `${ slugifyTitle }-${Date.now()}-${
            req.user.id
        }.pdf`;

        cb(null, fileName);
    },
});

// FILTER TO ONLY ACCEPT PDF FILES
const multerFilter = async (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
        return cb(
            new AppError('Not a pdf file. Please provide only PDFs!', 400),
            false
        );
    }

    // Check if a handout with that name already exist
    const possibleHandout = await Handout.find({ slug: slugify(
        req.body.title, { lower: true, replacement: '-' }
    ) })

    if (possibleHandout.length > 0)
    {   
        return cb(
            new AppError('A handout with that name already exist!', 400),
            false
        );
    }

    cb(null, true);
};

// CONFIGURE MULTER UPLOAD
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

// HANDLE A SINGLE PDF UPLOAD WITH THE NAME 'handout'
exports.uploadHandout = upload.single('handout');

exports.createHandout = catchAsync(async (req, res, next) => {
    // Run validations
    if (!req.file) return next(new AppError('A handout document must provide the file!', 400))

    // filter the body
    fields = filterBody(req.body, 'title', 'courseCode');

    // Fill in the rest of the fields based on the authenticated user sending the request
    fields.pdf = req.file.filename;
    fields.user = req.user.id;
    fields.level = req.user.role === 'admin' ? req.body.level : req.user.level;
    fields.department = req.user.role === 'admin' ? req.body.department : req.user.department;

    // Instanciate handout document
    const handout = await Handout.create(fields);

    // send http 201 (CREATED) response
    res.status(201).json({
        status: 'success',
        data: {
            data: handout,
        },
    });

});


// Get all handouts posted in the name of your department and level
exports.getAllHandouts = catchAsync( async (req, res, next) => {

    // get all handouts
    const handouts = await Handout.find({
        department: req.user.department,
        level: req.user.level
    });

    // send response
    res.status(200).json({
        status: 'success',
        results: handouts.length,
        data: {
            data: handouts
        }
    })
});


// Handout Detail Page: Get single handout
exports.getHandout = catchAsync(async (req, res, next) => {
    // Will improve this to use slug
    const handout = await Handout.findOne({ slug: req.params.slug });

    if (!handout) return next(new AppError('There\'s no handout with that slug', 404))

    // Response
    res.status(200).json({
        status: 'success',
        data: {
            data: handout
        }
    })
}); 


// Update a handout: restricted to only representatives and admins
exports.updateHandout = catchAsync(async (req, res, next) => {
    
    const handout = await Handout.findOne({ slug: req.params.slug });
    if (!handout) return next(new AppError('There\'s no handout with that slug', 404));
    
    // you have to represent the department and level or be an admin to delete a handout
    if (!isSameLevelAndDepartment(req.user, handout)) {
        return next(new AppError('You cannot perform this operation for other departments', 400));
    }

    // filter the body based on admin and representative
    let fields = filterBody(req.body, 'title', 'courseCode');
    if (req.user.role === 'admin') {
        fields = filterBody(req.body, 'title', 'courseCode', 'department', 'level');
    }

    // If a new file is uploaded then change the name to the new generated name
    if (req.file) fields.pdf = req.file.filename;

    // Updated Handout
    const updatedHandout = await Handout.findByIdAndUpdate(
        { slug: req.params.slug }, 
        fields, 
        { new: true, runValidators: true}
    );

    // Response
    res.status(200).json({
        status: 'success',
        data: {
            data: updatedHandout,
        },
    });

});

// Deleting a handout: restricted to only representatives and admins
exports.deleteHandout = catchAsync(async (req, res, next) => {

    const handout = await Handout.findById({ slug: req.params.slug });
    if (!handout) return next(new AppError('There\'s no handout with that slug', 404));
    
    // you have to represent the department and level or be an admin to delete a handout
    if (!isSameLevelAndDepartment(req.user, handout)) {
        return next(new AppError('You cannot perform this operation for other departments', 400));
    }

    // Delete handout
    await Handout.findByIdAndDelete(handout.id);

    // Response
    res.status(200).json({
        status: 'success',
        data: null
    })

});
