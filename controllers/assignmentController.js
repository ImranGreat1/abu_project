const Assignment = require('../models/Assignment');
const catchAsync = require('../utils/catchAsync');
const filterBody = require('../utils/filterBody');
const AppError = require('../utils/appError');
const { isSameLevelAndDepartment } = require('../utils/generalUtils');

// Create Assignment
exports.createAssignment = catchAsync(async (req, res, next) => {
  // Filter request body
  const body = filterBody(
    req.body,
    'description', 
    'courseCode', 
    'submissionDate', 
    'toBeSubmittedTo', 
    'active'
  );
  
  // Set the remaining fields from the request user information
  body.postedBy = req.user.id;
  body.department = req.user.department;
  body.level = req.user.level;
  
  // New Assignment
  const newAssignment = await Assignment.create(body);

  // Response
  res.status(201).json({
    status: 'success',
    data: {
      data: newAssignment
    }
  });
})


// Update/Edit Assignment
exports.updateAssignment = catchAsync(async (req, res, next) => {
  // Filter request body
  const body = filterBody(
    req.body,
    'description', 
    'courseCode', 
    'submissionDate', 
    'toBeSubmittedTo', 
    'active'
  );

  const assignment = await Assignment.findOne({ slug: req.params.slug });

  // Add validations
  if (!isSameLevelAndDepartment(req.user, assignment)) {
    return next(new AppError('You cannot perform this operation for other departments', 400));
  }

  // Updated Assingment
  const updatedAssignment = await Assignment.findOneAndUpdate(
    { slug:  req.params.slug}, 
    body, 
    { new: true,  runValidators: true}
  );

  // Response
  res.status(200).json({
    status: 'success',
    data: {
      data: updatedAssignment
    }
  });

});


// Get Assignments
exports.getAllAssignments = catchAsync(async (req, res, next) => {
  // Filter for the specific user department and level
  let query = { department: req.user.department, level: req.user.level };

  // Run validations

  // Check if additional queries are sent in the URL
  if (req.query)
  {
    const body = filterBody(req.query, 'courseCode', 'description');
    query = {...query, ...body};
  }

  // Assignments
  const assignments = await Assignment.find(query);

  // Response
  res.status(200).json({
    status: 'success',
    results: assignments.length,
    data: {
      data: assignments
    }
  });

}); 


// Get Single Assignment
exports.getAssignment = catchAsync(async (req, res, next) => {
  const assignment = await Assignment.findOne({ slug: req.params.slug });

  res.status(200).json({
    status: 'success',
    data: {
      data: assignment
    }
  });
});


// Delete Assignment
exports.deleteAssignment = catchAsync(async (req, res, next) => {
  const assignment = await Assignment.findOne({ slug: req.params.slug });

  // Run Validations
  if (!isSameLevelAndDepartment(req.user, assignment)) {
    return next(new AppError('You cannot perform this operation for other departments', 400));
  }

  // Delete Assignment
  await Assignment.deleteOne({ slug: req.params.slug });

  // Response: status of 204 will be proper but it won't return a response 
  res.status(200).json({
    status: 'success',
    data: null
  });

});


