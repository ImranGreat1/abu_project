const util = require('util');
const User = require('./../models/User');
const Library = require('../models/Library');
const UserProfile = require('../models/UserProfile');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const filterBody = require('./../utils/filterBody');
const jwt = require('jsonwebtoken');
const FACULTYS = require('../data/facultys');

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

const sendAuthResponse = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Set token in cookie
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  // Use HTTPS when in production
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  // Remove user's password before sending the response
  user.password = undefined;
  user.createdAt = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      data: user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  let fields = filterBody(
    req.body,
    'name',
    'email',
    'password',
    'passwordConfirm'
  );

  // const found = FACULTYS[req.body.faculty].find(department => department === fields.department.toLowerCase());

  // if (!found) {
  //     return next(new AppError('The department is not in the faculty you choose!', 400))
  // }
  const newUser = await User.create(fields);

  // Create a new library and profile for new users
  if (newUser) {
    await Library.create({ user: newUser._id });
    await UserProfile.create({ user: newUser._id });
  }

  // const url = `${req.protocol}:/localhost:3000/me`;

  // await new Email(newUser, url).sendWelcome();

  // Authenticate the user after sign up
  sendAuthResponse(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide both Email and Password!', 400));
  }

  // find using the email and also including the password in the query
  const user = await User.findOne({ email }).select('+password');

  // Check if the user exist, if it does also check if the password is correct
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(
      new AppError(
        'Wrong Email or Password! Please try again with the correct credentials',
        400
      )
    );
  }

  // Send email/phone to new created user

  // send token and response
  sendAuthResponse(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get token and check if it's there
  const authHeader = req.headers.authorization;
  let token;

  // Check if auth token exist and if it starts with bearer (API)
  if (authHeader && authHeader.startsWith('Bearer')) {
    // split and take the token only
    token = authHeader.split(' ')[1];
  } else if (
    // Check if auth token exist and if it starts with bearer (Browser)
    req.cookies.jwt &&
    !req.headers['user-agent'].startsWith('PostmanRuntime')
  ) {
    token = req.cookies.jwt;
  }

  // Check if the token exist
  if (!token) {
    return next(new AppError('Please login to access this route', 401));
  }

  // 2) Validate token
  const decoded = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does NOT exist anymore!',
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User hand changed password! Please login again!', 401)
    );
  }

  // ALLOW ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  req.userProfile = await UserProfile.findOne({ user: currentUser._id });
  res.locals.user = currentUser;
  next();
});

// Allow permissions to only permitted users
exports.restrictTo = (...allowedUsers) => {
  return (req, res, next) => {
    if (!allowedUsers.includes(req.userProfile.role)) {
      return next(
        new AppError(
          'You do not have the permission to access this route!',
          403
        )
      );
    }

    next();
  };
};

// USERS RELATIONSHIPS WITH OTHER DOCUMENTS

// Save Assignment
exports.saveAssignment = catchAsync(async (req, res, next) => {
  // For both list and detail page
  let assignment = req.params.slug ? req.params.slug : req.body.slug;

  // Find user and update savedAssignments
  await User.findByIdAndUpdate(req.user.id, {
    $push: { savedAssignments: assignment },
  });

  // Response
  res.status(200).json({
    status: 'success',
    message: 'Assignment saved successfully',
  });
});

// Remove Assignment
exports.removeAssignment = catchAsync(async (req, res, next) => {
  // For both list and detail page
  let assignment = req.params.slug ? req.params.slug : req.body.slug;

  // Find user and update savedAssignments
  await User.findByIdAndUpdate(req.user.id, {
    $pop: { savedAssignments: assignment },
  });

  // Response
  res.status(200).json({
    status: 'success',
    message: 'Assignment removed successfully',
  });
});
