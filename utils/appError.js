class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // It's an operational error
    this.isOperational = true;

    // preserve the error stack
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
