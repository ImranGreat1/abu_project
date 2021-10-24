const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const filterBody = require('../utils/filterBody');
const Suggestion = require('../models/Suggestion');

// Create Suggestion
exports.createSuggestion = catchAsync(async (req, res, next) => {
  const requestData = filterBody(req.body, 'text');
  requestData.user = req.user.id;
  const newSuggestion = await Suggestion.create(requestData);

  res.status(201).json({
    status: 'success',
    data: {
      data: newSuggestion,
    },
  });
});

// Get Suggestion
exports.getSuggestion = catchAsync(async (req, res, next) => {
  const suggestion = await Suggestion.findById(req.params.id);

  if (!suggestion) {
    return next(new AppError('There is no suggestion with that ID!', 400));
  }

  res.status(201).json({
    status: 'success',
    data: {
      data: suggestion,
    },
  });
});

// Get All Suggestions
exports.getAllSuggestions = catchAsync(async (req, res, next) => {
  let gueryData = {};

  if (req.query) gueryData = req.query;

  const suggestions = await Suggestion.find(gueryData);

  res.status(200).json({
    status: 'success',
    results: suggestions.length,
    data: { data: suggestions },
  });
});

// Update Suggestion
exports.updateSuggestion = catchAsync(async (req, res, next) => {
  const suggestion = await Suggestion.findById(req.params.id);

  if (!suggestion) {
    return next(new AppError('There is no suggestion with that ID!', 400));
  }

  // When a different user trys to update the suggestion
  if (req.user.id !== suggestion.user) {
    return next(
      new AppError('You are not allow to perform this operation!', 403)
    );
  }

  // Filter the body if no error found
  const requestData = filterBody(req.body, 'text');

  const updatedSuggestion = await Suggestion.findByIdAndUpdate(
    req.params.id,
    requestData,
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    data: {
      data: updatedSuggestion,
    },
  });
});

// Delete Suggestion
exports.deleteSuggestion = catchAsync(async (req, res, next) => {
  const suggestion = await Suggestion.findById(req.params.id);

  if (!suggestion) {
    return next(new AppError('There is no suggestion with that ID!', 400));
  }

  // When a different user trys to update the suggestion
  if (req.user.id !== suggestion.user) {
    return next(
      new AppError('You are not allow to perform this operation!', 403)
    );
  }

  // Delete Suggestion
  await Suggestion.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
