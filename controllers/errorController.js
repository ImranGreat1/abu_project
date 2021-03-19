const AppError = require('../utils/appError');

const genericErrMsg = 'Something went wrong!';

const sendErrorDev = (err, req, res) => {
    // API
    if (req.originalUrl.startsWith('/api')) {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }

    // WEBSITE
    return res.status(err.statusCode).render('error', {
        title: genericErrMsg,
        msg: err.message,
    });
};

const sendErrorProd = (err, req, res) => {
    // API
    // operational, trusted errors: Send message to client
    if (req.originalUrl.startsWith('/api')) {
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        }
        // Programming, and other unknown errors: Leak as little error details.
        // for developer to see
        if (process.env.NODE_ENV === 'development') console.log(err);

        // Send generic message
        return res.status(err.statusCode).json({
            status: 'error',
            message: genericErrMsg,
        });
    }

    // WEBSITE
    if (err.isOperational) {
        return res.status(err.statusCode).render('error', {
            title: genericErrMsg,
            msg: err.message,
        });
    }
    // Programming, and other unknown errors: Leak as little error details.
    // for developer to see

    // Send generic message
    return res.status(err.statusCode).render('error', {
        title: genericErrMsg,
        msg: 'Please try again later!',
    });
};

const handleCastErrorDB = (err) => {
    const message = `Invalid "${err.path}" field: ${err.value}`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
    const msg = Object.values(err.errors).map((errorObj) => errorObj.message);
    const message = `Validation error: ${msg.join('. ')}`;
    return new AppError(message, 400);
};

const handleDuplicateKeyErrorDB = (err) => {
    const field = Object.keys(err.keyValue).join('');
    let message = `Please use another ${field} because this ${field} has already been used!`;

    return new AppError(message, 400);
};

const handleInvalidJWTError = () => {
    return new AppError('Invalid token! Please login again', 401);
};

const handleJWTExpiredError = (err) => {
    return new AppError('Your tokeh has expired! Please login again', 401);
};

module.exports = (err, req, res, next) => {
    // console.log(err);
    let error = { ...err };
    error.message = err.message;
    error.code = err.code ? err.code : null;
    error.name = err.name;
    error.stack = err.stack;

    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        //
        sendErrorDev(error, req, res);
        //
    } else if (process.env.NODE_ENV === 'production') {
        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.name === 'ValidationError')
            error = handleValidationErrorDB(error);
        if (error.code === 11000) error = handleDuplicateKeyErrorDB(error);
        if (error.name === 'JsonWebTokenError') error = handleInvalidJWTError();

        if (error.name === 'TokenExpiredError')
            error = handleJWTExpiredError(error);

        sendErrorProd(error, req, res);
    }
};
