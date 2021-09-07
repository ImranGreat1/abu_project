const multer = require('multer');
const sharp = require('sharp');
const Paragraph = require('../models/paragraphModel');
const Post = require('../models/postModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const filterBody = require('../utils/filterBody');

// Create multer memory storage
const multerStorage = multer.memoryStorage();

// Filter invalid files
const multerFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image')) {
        return cb(new AppError('Please upload only images!', 400), false);
    }

    return cb(null, true);
};

// Configure multer upload
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

// Upload not more than four images with the name image
exports.uploadParagraphImage = upload.single('image');


exports.processParagraphImage = catchAsync(async (req, res, next) => {

    if (!req.file) {
        return next();
    }

    console.log(req.file);
    // Generate a unique name using current time and random numbers
    const imageName = `paraImage-${Date.now()}-${JSON.stringify(Math.random()).split('.')[1]}.jpg`
    await sharp(req.file.buffer)
            .toFormat('jpeg')
            .jpeg({ quality: 100 })
            .toFile(`public/img/paragraph/${imageName}`)

    let img = { name: imageName };
    // Check if description is provided and add it to the img object
    if (req.body.imageDescription) {
        img.description = req.body.imageDescription;
    }

    // Pass the image object to the next middleware
    res.locals.image = img;
    next()
    }
)

exports.createParagraph = catchAsync(async (req, res, next) => {
    // Filter the body
    const data = filterBody(req.body, 'subHeading', 'text');
    // get images we passed on res.locals.image
    if (res.locals.image)
    {
        data.image = res.locals.image;
    } 

    // Create paragraph instance
    const paragraph = await Paragraph.create(data);

    // Add paragraph to post
    const post = await Post.findOneAndUpdate(
        { slug: req.params.slug },
        { $push: { paragraphs: paragraph.id } },
        { new: true }
    );

    // console.log(res.locals.image)

    res.status(201).json({
        status: 'success',
        data: {
            data: post
        }
    });
});


