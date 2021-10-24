const Assignment = require('../models/Assignment');
const catchAsync = require('../utils/catchAsync');
const filterBody = require('../utils/filterBody');
const AppError = require('../utils/appError');
const Library = require('../models/Library');
const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();
const multerFilter = async (req, file, cb) => {
  if (!file.mimetype.startsWith('image')) {
    cb(new AppError('Upload only Images!', 400), false);
  }
  cb(null, true);
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadImage = upload.single('image');

exports.processImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  // Generate unique name for each image
  const imageName = `assignment-image-${Date.now()}-${
    JSON.stringify(Math.random()).split('.')[1]
  }.jpg`;

  // Process image with sharp
  await sharp(req.file.buffer)
    .toFormat('jpeg')
    .jpeg({ quality: 100 })
    .toFile(`client/public/images/assignments/${imageName}`);

  // Send image to next middleware
  res.locals.image = imageName;
  next();
});

// Create Assignment
exports.createAssignment = catchAsync(async (req, res, next) => {
  // Filter request body
  let requestData = filterBody(
    req.body,
    'description',
    'courseCode',
    'submissionDate',
    'toBeSubmittedTo',
    'active'
  );
  const userInfo = filterBody(
    req.userProfile,
    'faculty',
    'department',
    'level'
  );
  requestData = { ...requestData, ...userInfo, postedBy: req.user._id };

  // Set image if provided to description
  if (res.locals.image) {
    requestData.image = res.locals.image;
  }

  // New Assignment
  const newAssignment = await Assignment.create(requestData);

  // Response
  res.status(201).json({
    status: 'success',
    data: {
      data: newAssignment,
    },
  });
});

// Update/Edit Assignment
exports.updateAssignment = catchAsync(async (req, res, next) => {
  // Filter request body
  const requestData = filterBody(
    req.body,
    'description',
    'courseCode',
    'submissionDate',
    'toBeSubmittedTo',
    'active'
  );

  const userInfo = filterBody(
    req.userProfile,
    'faculty',
    'department',
    'level'
  );
  const query = {
    slug: req.params.slug,
    active: true,
    postedBy: req.user._id,
    ...userInfo,
  };

  // If a new image is uploaded
  if (res.locals.image) {
    requestData.image = res.locals.image;
  }

  // Updated Assingment
  const updatedAssignment = await Assignment.findOneAndUpdate(
    query,
    requestData,
    { new: true, runValidators: true }
  );

  // Response
  res.status(200).json({
    status: 'success',
    data: {
      data: updatedAssignment,
    },
  });
});

// Get Assignments
exports.getAllAssignments = catchAsync(async (req, res, next) => {
  // Filter for the specific user department and level
  const userInfo = {
    faculty: req.userProfile.faculty,
    department: req.userProfile.department,
    level: req.userProfile.level,
    active: true,
  };

  const assignmentCount = await Assignment.estimatedDocumentCount();

  const assignments = await Assignment.find(userInfo)
    .limit(+req.query.limit)
    .skip(+req.query.page * +req.query.limit);

  // Response
  res.status(200).json({
    status: 'success',
    results: assignments.length,
    data: {
      totalDocs: assignmentCount,
      data: assignments,
    },
  });
});

// Get Single Assignment
exports.getAssignment = catchAsync(async (req, res, next) => {
  const assignment = await Assignment.findOne({
    slug: req.params.slug,
    active: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: assignment,
    },
  });
});

// Delete Assignment
exports.deleteAssignment = catchAsync(async (req, res, next) => {
  const userInfo = filterBody(
    req.userProfile,
    'faculty',
    'department',
    'level'
  );
  const query = {
    slug: req.params.slug,
    postedBy: req.user._id,
    ...userInfo,
  };

  // Delete Assignment
  await Assignment.deleteOne(query);

  // Response: status of 204 will be proper but it won't return a response
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

// Deactivate Assignment
exports.deActivateAssignment = catchAsync(async (req, res, next) => {
  const userInfo = filterBody(
    req.userProfile,
    'faculty',
    'department',
    'level'
  );
  const query = {
    slug: req.params.slug,
    postedBy: req.user._id,
    ...userInfo,
  };

  // Set Active to false
  await Assignment.updateOne(query, { active: false }, { new: true });

  // Response with no data
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

// Add handout to library
exports.saveAssignmentToLibrary = catchAsync(async (req, res, next) => {
  const userLibrary = await Library.findOneAndUpdate(
    { user: req.user.id },
    { $push: { assignments: req.body.assignmentId } },
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
exports.removeAssignmentFromLibrary = catchAsync(async (req, res, next) => {
  await Library.findOneAndUpdate(
    { user: req.user.id },
    { $pull: { assignments: req.body.assignmentId } },
    { new: true }
  );
  res.status(200).json({
    status: 'success',
    data: null,
  });
});
