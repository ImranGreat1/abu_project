const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const filterBody = require('./../utils/filterBody');
const Library = require('../models/Library');

// Create Library
exports.createLibrary = catchAsync(async (req, res, next) => {
  const newLibrary = await Library.create({ user: req.user.id });

  res.status(201).json({
    status: 'success',
    data: {
      data: newLibrary,
    },
  });
});

// Get Library
exports.getLibrary = catchAsync(async (req, res, next) => {
  let library = await Library.findOne({ user: req.user.id });
  const only = req.query.only;

  if (only) {
    library = library[only];
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: library,
    },
  });
});

// Update Library
exports.updateLibrary = catchAsync(async (req, res, next) => {
  const library = await Library.findOne({ user: req.user.id });

  if (!library) {
    return next(
      new AppError("You don't have a library but you can create one!", 400)
    );
  }

  const requestData = filterBody(
    req.body,
    'assignments',
    'handouts',
    'exercises'
  );

  const updatedLibrary = await Library.findOneAndUpdate(
    { user: req.user.id },
    requestData,
    { new: true }
  );

  res.status(201).json({
    status: 'success',
    data: {
      data: updatedLibrary,
    },
  });
});

// Delete Library
exports.deleteLibrary = catchAsync(async (req, res, next) => {
  await Library.findOneAndDelete({ user: req.user.id });

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
