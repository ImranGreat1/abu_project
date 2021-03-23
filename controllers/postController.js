const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const filterBody = require('../utils/filterBody');
const multer = require('multer');
const { memoryStorage } = require('multer');
const sharp = require('sharp');

const multerStorage = memoryStorage();

const multerFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image')) {
        cb(new AppError('Upload only Images!', 400), false);
    }

    cb(null, true);
}

const upload = multer({ storage: multerStorage, fileFilter: multerFilter })

exports.uploadPostImages = upload.array('image', 2);

exports.processPostImages = catchAsync(async (req, res, next) => {

    /* So that we don't make forEach functional handler async because it
    might cause unusual behaviours*/
    const processImage = async (buffer, imageName) => {
            await sharp(buffer)
                    .resize(500, 500)
                    .toFormat('jpeg')
                    .jpeg({ quality: 100 })
                    .toFile(`public/img/post/${imageName}`)
    }

    if (!req.files) return next();

    // Using res.locals to pass data around middlewares is kind of the convention.
    res.locals.images = [];

    req.files.forEach( async image => {
        const imageName = `post-${Date.now()}-${Math.random()}.jpg`;
        processImage(image.buffer, imageName);

        res.locals.images.push({ image: imageName});
    })

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
    let data = filterBody(req.body, 'title');
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
