const Handout = require('./../models/Handout');
const multer = require('multer');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const filterBody = require('./../utils/filterBody');
const slugify = require('slugify');
const Library = require('../models/Library');
const util = require('util');
const fs = require('fs');

// CREATE A DISK STORAGE
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Path to store uploaded files: Destination should be changed to cloud storga e.g google
    cb(null, 'client/public/pdfs');
  },
  filename: (req, file, cb) => {
    // generate unique random name
    const slugifyTitle = slugify(req.body.courseCode.toUpperCase(), {
      lower: true,
      replacement: '-',
      strict: true,
    });

    const fileName = `${slugifyTitle}-${Date.now()}-${req.user.id}.pdf`;

    cb(null, fileName);
  },
});

// MEMORY STORAGE
const memoryStorage = multer.memoryStorage();

// FILTER TO ONLY ACCEPT PDF FILES
const multerFilter = async (req, file, cb) => {
  if (file.mimetype !== 'application/pdf') {
    return cb(
      new AppError('Not a pdf file. Please provide only PDFs!', 400),
      false
    );
  }

  /* This will avoid uploading a handout if the handout already exist
   */
  const possibleHandout = await Handout.find({
    slug: slugify(req.body.title, {
      lower: true,
      replacement: '-',
      strict: true,
    }),
  });

  if (possibleHandout.length > 0) {
    return cb(
      new AppError('A handout with that name already exist!', 400),
      false
    );
  }

  cb(null, true);
};

// CONFIGURE MULTER UPLOAD
const upload = multer({ storage: memoryStorage, fileFilter: multerFilter });

// HANDLE A SINGLE PDF UPLOAD WITH THE NAME 'handout'
exports.uploadHandout = upload.single('pdf');

exports.processPDF = catchAsync(async (req, res, next) => {
  const pdfName = `${Date.now()}-${Math.random()}.pdf`;
  const pdfReadStream = fs.createWriteStream(
    `${__dirname}/../client/public/pdfs/handouts/${pdfName}`
  );
  pdfReadStream.write(req.file.buffer);
  req.pdfFileName = pdfName;

  next();
});

exports.createHandout = catchAsync(async (req, res, next) => {
  // Run validations
  if (!req.file)
    return next(new AppError('A handout document must provide the file!', 400));

  // filter the body
  let requestData = filterBody(req.body, 'title', 'courseCode');
  const userInfo = filterBody(
    req.userProfile,
    'faculty',
    'department',
    'level'
  );

  requestData = {
    ...requestData,
    ...userInfo,
    pdf: req.pdfFileName,
    user: req.user._id,
  };

  // Instanciate handout document
  const handout = await Handout.create(requestData);

  // send http 201 (CREATED) response
  res.status(201).json({
    status: 'success',
    data: {
      data: handout,
    },
  });
});

// Get all handouts posted in the name of your department and level
exports.getAllHandouts = catchAsync(async (req, res, next) => {
  let handouts;
  let handoutsCount;

  const userInfo = filterBody(
    req.userProfile,
    'faculty',
    'department',
    'level'
  );

  if (req.query.q) {
    handouts = await Handout.find({
      title: { $regex: new RegExp(`${req.query.q}`), $options: 'i' },
      ...userInfo,
    });
  } else {
    handoutsCount = await Handout.estimatedDocumentCount();
    handouts = await Handout.find(userInfo)
      .limit(+req.query.limit)
      .skip(+req.query.limit * +req.query.page);
  }

  // get all handouts
  handouts = await Handout.find(userInfo);

  // send response
  res.status(200).json({
    status: 'success',
    results: handouts.length,
    data: {
      totalDocs: handoutsCount,
      data: handouts,
    },
  });
});

// Handout Detail Page: Get single handout
exports.getHandout = catchAsync(async (req, res, next) => {
  const handout = await Handout.findOne({ slug: req.params.slug });

  if (!handout)
    return next(new AppError("There's no handout with that slug", 404));

  // Response
  res.status(200).json({
    status: 'success',
    data: {
      data: handout,
    },
  });
});

// Update a handout: restricted to only representatives and admins
exports.updateHandout = catchAsync(async (req, res, next) => {
  // filter the body
  let fields = filterBody(req.body, 'title', 'courseCode');

  // queries
  const userInfo = filterBody(
    req.userProfile,
    'faculty',
    'department',
    'level'
  );
  const query = { slug: req.params.slug, user: req.user._id, ...userInfo };

  // If a new file is uploaded then change the name to the new generated name
  if (req.file) fields.pdf = req.file.filename;

  // Updated Handout
  const updatedHandout = await Handout.findByIdAndUpdate(query, fields, {
    new: true,
    runValidators: true,
  });

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
  const userInfo = filterBody(
    req.userProfile,
    'faculty',
    'department',
    'level'
  );
  const query = { slug: req.params.slug, user: req.user._id, ...userInfo };

  // Delete handout
  await Handout.findOneAndDelete(query);

  // Delete the handout file from google cloud storage

  // Response
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

// Add handout to library
exports.saveHandoutToLibrary = catchAsync(async (req, res, next) => {
  const userLibrary = await Library.findOneAndUpdate(
    { user: req.user.id },
    { $push: { handouts: req.body.handoutId } },
    { new: true }
  );
  res.status(200).json({
    status: 'success',
    data: {
      data: userLibrary,
    },
  });
});

// Remove handout from library
exports.removeHandoutFromLibrary = catchAsync(async (req, res, next) => {
  await Library.findOneAndUpdate(
    { user: req.user.id },
    { $pull: { handouts: req.body.handoutId } },
    { new: true }
  );
  res.status(200).json({
    status: 'success',
    data: null,
  });
});
