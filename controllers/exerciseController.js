const Exercise = require('../models/Exercise');
const catchAsync = require('../utils/catchAsync');
const filterBody = require('../utils/filterBody');
const AppError = require('../utils/appError');

// Create Exercise
exports.createExercise = catchAsync(async (req, res, next) => {
  const body = filterBody(req.body, 'description', 'questions');  
  body.createdBy = req.user.id;

  // new exercise
  const newExercise = await Exercise.create(body);

  // response
  res.status(201).json({
    status: 'success',
    data: {
      data: newExercise
    }
  });

});


// Get All Exercises
exports.getAllExercises = catchAsync(async (req, res, next) => {
  const filter = { department: req.user.department, level: req.user.level }
  if (req.query) {
    filter = { ...filter, ...req.query };
  }
  const exercises = await Exercise.findOne(filter);

  // Response
  res.status(200).json({
    status: 'success',
    results: exercises.length,
    data: {
      data: exercises
    }
  });

});


// Get Exercise
exports.getExercise = catchAsync(async (req, res, next) => {
  const exercise = await Exercise.findOne({ slug: req.params.slug });
  // Check if exercise does not exist
  if (!exercise) {
    return next(new AppError('There\'s no exercise with that slug!', 400));
  }

  // Response
  res.status(200).json({
    status: 'success',
    data: {
      data: exercise
    }
  });

});



// Update Exercise
exports.updateExercise = catchAsync(async (req, res, next) => {
  // Check if the exercise exist
  const exercise = Exercise.findOne({ slug: req.params.slug });
  if (!exercise) {
    return next(new AppError('There\'s no exercise with that slug!', 400));
  }

  const body = filterBody(req.body, 'description', 'questions');  

  // Updated Exercise
  const updatedExercise = await Exercise.updateOne(
    { slug: req.params.slug },
    body,
    { new: true, runValidators: true }
  );

  // Response
  res.status(201).json({
    status: 'success',
    data: {
      data: updatedExercise
    }
  });

});


// Delete Exercise
exports.deleteExercise = catchAsync(async (req, res, next) => {
  // Check if the exercise exist
  const exercise = Exercise.findOne({ slug: req.params.slug });
  if (!exercise) {
    return next(new AppError('There\'s no exercise with that slug!', 400));
  }

  // Run Validators
  if (req.user !== exercise.user || req.user.role !== 'admin')
  {
    return next(new AppError('Only related user or admin can delete an exercise!', 400));
  }

  // delete exercise
  await Exercise.deleteOne({ slug: req.params.slug });

  // response
  res.status(201).json({
    status: 'success',
    data: null
  });

});

