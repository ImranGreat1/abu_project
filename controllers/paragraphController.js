const multer = require('multer');
const sharp = require('sharp');
const Paragraph = require('../models/Paragraph');
const Post = require('../models/Post');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const filterBody = require('../utils/filterBody');
const UserProfile = require('../models/UserProfile');

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

  // Perform paragraph validation before uploading image to avoid uploading image when paragraph is invalid

  // Generate a unique name using current time and random numbers
  const imageName = `paraImage-${Date.now()}-${
    JSON.stringify(Math.random()).split('.')[1]
  }.jpg`;
  await sharp(req.file.buffer)
    .toFormat('jpeg')
    .jpeg({ quality: 100 })
    .toFile(`client/public/images/paragraphs/${imageName}`);

  let img = { name: imageName };
  // Check if description is provided and add it to the img object
  if (req.body.imageDescription) {
    img.description = req.body.imageDescription;
  }

  // Pass the image object to the next middleware
  res.locals.image = img;
  next();
});

// CREATE
exports.createParagraph = catchAsync(async (req, res, next) => {
  // Filter the body
  const data = filterBody(req.body, 'subHeading', 'text');

  // get image name if posted
  if (res.locals.image) {
    data.image = res.locals.image;
  }

  data.author = req.user.id;
  data.post = req.params.slug;

  // Create paragraph instance
  const paragraph = await Paragraph.create(data);

  // Add paragraph to post
  const post = await Post.findOneAndUpdate(
    { slug: req.params.slug },
    { $push: { paragraphs: paragraph.id } },
    { new: true }
  );

  res.status(201).json({
    status: 'success',
    data: {
      data: post,
    },
  });
});

// UPDATE
exports.updateParagraph = catchAsync(async (req, res, next) => {
  const paragraph = await Paragraph.findById(req.params.paragraphId);
  // Add validation
  // if (req.user._id !== paragraph.author) {
  //   return next(
  //     new AppError('You are not allow to perform this operation', 400)
  //   );
  // }

  console.log(req.user._id);
  console.log(paragraph.author);

  const data = filterBody(req.body, 'subHeading', 'text');

  // get image name if posted
  if (res.locals.image) {
    data.image = res.locals.image;
    console.log(res.locals.image);
  }

  const updatedParagraph = await Paragraph.findByIdAndUpdate(
    paragraph._id,
    data
  );

  res.status(200).json({
    status: 'success',
    data: {
      data: updatedParagraph,
    },
  });
});

// DELETE
exports.deleteParagraph = catchAsync(async (req, res, next) => {
  const paragraph = await Paragraph.findById(req.params.paragraphId);

  if (String(req.user._id) !== String(paragraph.author)) {
    return next(
      new AppError('You are not allow to perform this operation', 400)
    );
  }

  await Paragraph.findByIdAndDelete(req.params.paragraphId);

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
