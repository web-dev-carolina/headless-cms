const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const body_parser = require('body-parser');
const express = require('express');
const app = express();
app.use(cors());
app.options('*', cors());
// parse JSON (application/json content-type)
app.use(body_parser.json());
require('dotenv').config();
const db = require("./db");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routers setup
const indexRouter = require('./routes/index.js');
const usersRouter = require('./routes/users.js');
const infoRouter = require('./routes/info.js');
const peopleRouter = require('./routes/people.js');
const testimonialsRouter = require('./routes/testimonials.js');
const textRouter = require('./routes/text.js');
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/info', infoRouter);
app.use('/people', peopleRouter);
app.use('/testimonials', testimonialsRouter);
app.use('/textContent', textRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;