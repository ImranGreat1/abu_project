const util = require('util');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const filteredBody = require('./../utils/filteredBody');
const jwt = require('jsonwebtoken');

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
    // Use HTTPS when on production
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);

    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    const fields = filteredBody(
        req.body,
        'name',
        'email',
        'phone',
        'photo',
        'department',
        'level',
        'password',
        'passwordConfirm'
    );

    const newUser = await User.create(fields);

    // const url = `${req.protocol}:/localhost:3000/me`;

    // await new Email(newUser, url).sendWelcome();

    // Authenticate the user after sign up
    sendAuthResponse(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(
            new AppError('Please provide both Email and Password!', 400)
        );
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(
            new AppError(
                'Wrong Email or Password! Please try again with the correct credentials',
                400
            )
        );
    }

    // send token and response
    sendAuthResponse(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
    // 1) Get token and check if it's there
    const authHeader = req.headers.authorization;
    let token;

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
    } else if (
        req.cookies.jwt &&
        !req.headers['user-agent'].startsWith('PostmanRuntime')
    ) {
        token = req.cookies.jwt;
    }

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
    res.locals.user = currentUser;
    next();
});

// Allow permissions to only permitted users
exports.restrictTo = (...allowedUsers) => {
    return (req, res, next) => {
        if (!allowedUsers.includes(req.user.role)) {
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
