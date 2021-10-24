const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const filterBody = require('../utils/filterBody');
const UserProfile = require('../models/UserProfile');

// Create User Profile
exports.createProfile = catchAsync(async (req, res, next) => {
  const newProfile = await UserProfile.create({ user: req.user.id });

  res.status(201).json({
    status: 'success',
    data: {
      data: newProfile,
    },
  });
});

// Get User Profile
exports.getProfile = catchAsync(async (req, res, next) => {
  const profile = await UserProfile.findOne({ user: req.user.id });

  res.status(201).json({
    status: 'success',
    data: {
      data: profile,
    },
  });
});

// Update User Profile
exports.updateProfile = catchAsync(async (req, res, next) => {
  const requestData = filterBody(
    req.body,
    'faculty',
    'department',
    'level',
    'photo',
    'phone'
  );
  const updatedProfile = await UserProfile.findOneAndUpdate(
    { user: req.user.id },
    requestData,
    { new: true }
  );

  res.status(201).json({
    status: 'success',
    data: {
      data: updatedProfile,
    },
  });
});

// Create User Profile
exports.deleteProfile = catchAsync(async (req, res, next) => {
  await UserProfile.findOneAndDelete({ user: req.user.id });

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
