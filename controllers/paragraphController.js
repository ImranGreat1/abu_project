const multer = require('multer');
const sharp = require('sharp');
const Paragraph = require('../models/paragraphModel');
const Post = require('../models/postModel');
const AppError = require('../utils/appError');
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
exports.uploadParagraphImages = upload.array('image', 4);


exports.processParagraphImages = (req, res, next) => {

     /* So that we don't make forEach function handler async because it
    might cause unusual behaviours*/
    const processImage = async (buffer, imageName) => {
        await sharp(buffer)
                .toFormat('jpeg')
                .jpeg({ quality: 100 })
                .toFile(`public/img/paragraph/${imageName}`)
    }

    res.locals.images = [];

    // console.log(req.files);

    req.files.forEach((image, index) => {
        // Generate a unique name using current time and random numbers
        const imageName = `paraImage-${index + 1}-${Date.now()}-${JSON.stringify(Math.random()).split('.')[1]}.jpg`
        // processImage(image.buffer, imageName);

        let img = { name: imageName };
        // Check if description is provided and add it to the img object
        if (req.body[`image-${index + 1}-description`]) {
            img.description = req.body[`image-${index + 1}-description`];
        }

        res.locals.images.push(img);
    });

    next()
};


exports.createParagraph = async (req, res, next) => {
    // console.log(res.locals.images);
    // Filter the body
    const data = filterBody(req.body, 'subHeading', 'text');
    // get images we passed on res.locals.images
    data.images = res.locals.images;

    // Create paragraph instance
    const paragraph = await Paragraph.create(data);

    // Add paragraph to post
    const post = await Post.findByIdAndUpdate(
        req.params.postId,
        { $push: { paragraphs: paragraph.id } },
        { new: true }
    );

    res.status(201).json({
        status: 'success',
        data: {
            data: post
        }
    });
};


