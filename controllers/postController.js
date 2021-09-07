const multer = require('multer');
const { memoryStorage } = require('multer');
const sharp = require('sharp');
const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const filterBody = require('../utils/filterBody');
const factoryController = require('./factoryController');

// CREATE A MEMORY STORAGE
const multerStorage = memoryStorage();

// ACCEPT ONLY IMAGE FILES
const multerFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image')) {
        cb(new AppError('Upload only Images!', 400), false);
    }

    cb(null, true);
}

// CONFIGURE A MULTER UPLOAD
const upload = multer({ storage: multerStorage, fileFilter: multerFilter })

// UPLOAD POST IMAGES WITH THE NAME 'image'
exports.uploadPostImages = upload.array('image', 2);


exports.processPostImages = catchAsync(async (req, res, next) => {

    // To prevent unusual behaviours by making callback function async
    const processImage = async (buffer, imageName) => {
        await sharp(buffer)
                    .toFormat('jpeg')
                    .jpeg({ quality: 100 })
                    .toFile(`public/img/post/${imageName}`)
    };

    // If no files we move to the next middleware
    if (!req.files) return next();

    // Using res.locals to pass data around middlewares is kind of the convention.
    res.locals.images = [];

    req.files.forEach( async image => {
        // Generate unique name for the image
        const imageName = `post-${Date.now()}-${Math.random()}.jpg`;

        // Process the buffer and save as image file
        await processImage(image.buffer, imageName);

        // add image to images
        res.locals.images.push({ image: imageName});
    })


    // I'll refined the following line of code to work just as paragraph controller
    // Check for image description and set it
    if (req.body.imageOneDescription && res.locals.images[0]) {
        res.locals.images[0].description = req.body.imageOneDescription;
    }

    if (req.body.imageTwoDescription && res.locals.images[1]) {
        res.locals.images[1].description = req.body.imageTwoDescription;
    }

    next();
});

exports.createPost = catchAsync(async (req, res, next) => {
    // Get the fields/form data and perform some cleanups
    let data = filterBody(req.body, 'title', 'content');
    data.images = res.locals.images;
    data.user = req.user.id;

    // Create the post
    const post = await Post.create(data);


    // send response
    res.status(201).json({
        status: 'success',
        data: {
            data: post
        }
    })
});


exports.getPost = catchAsync(async (req, res, next) => {

    const post = await Post.findOne({ slug: req.params.slug });

    // Send a 404 response if document is not found
    if (!post) {
        return next(new AppError('Cannot find a Post with that ID', 404));
    }
    // Send response
    res.status(200).json({
        status: 'success',
        data: { data: post }
    });

});


exports.deletePost = catchAsync(async (req, res, next) => {
    await Post.findOneAndDelete({ slug: req.params.slug });

    // send response with 204 (DELETED) response status
    res.status(204).json({
        status: 'success',
        data: null
    })
});


exports.getAllPost = factoryController.getAll(Post);
