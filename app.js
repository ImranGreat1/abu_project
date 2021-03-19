const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const xss = require('xss-clean');
const cors = require('cors');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const authRouter = require('./routes/authRoutes');
const handoutRouter = require('./routes/handoutRoutes');

const app = express();

// Set pug as view engine
app.set('view engine', 'pug');
// specify where express can find our views template
app.set('views', path.join(__dirname, 'views'));

if (process.env.NODE_ENV === 'development') {
    // middleware for logging request info
    app.use(morgan('dev'));
}

// Sets security HTTP headers
app.use(helmet());

// Access control credentials
app.use(cors());

// To pass cookie in the req.cookies
app.use(cookieParser());

// Limit request on our API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'You have send too many requests! Try again after an hour.',
});
app.use('/api', limiter);

// Read JSON data in the req body and set limit to amount of data
app.use(express.json({ limit: '10kb' }));

// Read data from submited form url encoded data
app.use(express.urlencoded({ extended: true }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevention against parameter pollution
app.use(
    hpp({
        whitelist: ['name'],
    })
);

// Middleware for serving static files from a specific folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.status(200).render('Hello World!');
});

// Routes
app.use('/api/v1/users', authRouter);
app.use('/api/v1/handouts', handoutRouter);

/* 404 ROUTE. This will match all route that are not handle by the previous 
middlewares/routes */
app.all('*', (req, res, next) => {
    const error = new AppError(
        `Cannot find ${req.originalUrl} on this server.`,
        404
    );

    next(error);
});

app.use(globalErrorHandler);

module.exports = app;
