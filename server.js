/* This handler has to be on top of any synchronous code to be able to catch any
uncaught exception in the code because this is a synchronous code and it is run
line by line while promises are run in the event loop */

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    console.log(err.name, err.message);
    // console.log(err);
    /* NOT wait for any running or pending request because the process is in
    a so-called unclean state */
    process.exit(1);
});

require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');

const app = require('./app');

mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
    })
    .then(() => {
        console.log('Database connected successfully...');
    })
    .catch((err) => console.log(err));

const port = process.env.PORT || 3030;

const server = app.listen(port, () => {
    console.log(`Server running at port ${port}...`);
});

// Handling unhandled asynchronous code rejection
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.log(err.name, err.message);
    console.log(err);
    // wait for all previous request that are currently running or pending to finish.
    server.close(() => {
        // Shutdown the application.
        process.exit(1); // 0 is success, 1 is uncaught exception
    });
});

/* 
    Im production is not a good idea to just shut the app down, we will usually have a
    tool in place that will restart the app after it has shutdown. Most of the hosting
    platforms have the functionality that usually restart your app when it's down.
*/
