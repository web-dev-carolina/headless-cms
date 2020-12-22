const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');
const body_parser = require('body-parser');
const express = require('express');
const app = express();
var mongodb = require("mongodb");
var ObjectID = require('mongodb').ObjectID;
app.use(cors());
app.options('*', cors());
// parse JSON (application/json content-type)
app.use(body_parser.json());
const db = require("./db");

// initialize Testimonial schema and db
const dbName = "test1";
let collectionName = "testimonials";
let testimonialCollection;
db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
    testimonialCollection = dbCollection;
    console.log('testimonial collection connection successful');
}, function (err) { // failureCallback
    throw (err);
});

/* Testimonial CRUD routes */

// CREATE new testimonial
// ex. $ curl -X POST -H "Content-Type: application/json" -d '{"text":"testimonial body", "author":"testimonial author"}' http://localhost:9000/testimonials
// -> new JSON object
app.post("/testimonials", (req, res) => {
    const item = req.body;
    testimonialCollection.insertOne(item, (error, result) => {
        if (error) throw error;
        // respond with all items in collection
        testimonialCollection.find().toArray((_error, _result) => {
            if (_error) throw _error;
            res.json(_result);
        });
    });
});

// READ all testimonials
// ex. $ curl http://localhost:9000/testimonials
// -> all testimonials as JSON
app.get("/testimonials", (req, res) => {
    // respond with all items in collection
    testimonialCollection.find().toArray((error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

// UPDATE a testimonial
// ex. $ curl -X PUT -H "Content-Type: application/json" -d '{"text":"testimonial body", "author":"testimonial author"}' http://localhost:9000/testimonials/{testimonialID}
// -> JSON object matching the id
app.put("/testimonials/:id", async (req, res) => {
    const testId = req.params.id;
    const newTestimonial = req.body;
    testimonialCollection.updateOne({ _id: new mongodb.ObjectID(testId.toString()) }, {$set: newTestimonial}, function (error, result) {
        if (error) throw error;
        testimonialCollection.find().toArray(function (_error, _result) {
            if (_error) throw error;
            res.json(_result);
        });
    });
});

// DESTROY a testimonial
// ex. curl -X DELETE http://localhost:9000/testimonials/{testimonialID}
// -> updated array of testimonial objects
app.delete("/testimonials/:id", (req, res) => {
    const testId = req.params.id;
    testimonialCollection.deleteOne({ _id: new mongodb.ObjectID(testId.toString()) }, function (error, result) {
        if (error) throw error;
        testimonialCollection.find().toArray(function (_error, _result) {
            if (_error) throw error;
            res.json(_result);
        });
    });
});

// initialize People schema and db
// from above: const dbName = "test1";
collectionName = "people";
let peopleCollection;
db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
    peopleCollection = dbCollection;
    console.log('people collection connection successful');
}, function (err) { // failureCallback
    throw (err);
});

/* People CRUD routes */

// CREATE new people
// ex. $ curl -X POST -H "Content-Type: application/json" -d '{"fname":"John", "lname":"Doe", "pos":"King", "bio":"Absolute champion"}' http://localhost:9000/people
// -> new JSON object
app.post("/people", (req, res) => {
    const item = req.body;
    peopleCollection.insertOne(item, (error, result) => {
        if (error) throw error;
        // respond with all items in collection
        peopleCollection.find().toArray((_error, _result) => {
            if (_error) throw _error;
            res.json(_result);
        });
    });
});

// READ all people
// ex. $ curl http://localhost:9000/people
// -> all testimonials as JSON
app.get("/people", (req, res) => {
    // respond with all items in collection
    peopleCollection.find().toArray((error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

// UPDATE a people
// ex. $ curl -X PUT -H "Content-Type: application/json" -d '{"fname":"new fname", "lname":"new lname", "pos":"new pos", "bio":"new bio"}' http://localhost:9000/people/{peopleID}
// -> JSON object matching the id
app.put("/people/:id", async (req, res) => {
    const peepId = req.params.id;
    const newPerson = req.body;
    peopleCollection.updateOne({ _id: new mongodb.ObjectID(peepId.toString()) }, {$set: newPerson}, function (error, result) {
        if (error) throw error;
        peopleCollection.find().toArray(function (_error, _result) {
            if (_error) throw error;
            res.json(_result);
        });
    });
});

// DESTROY a testimonial
// ex. curl -X DELETE http://localhost:9000/people/{peopleID}
// -> updated array of testimonial objects
app.delete("/people/:id", (req, res) => {
    const peepId = req.params.id;
    peopleCollection.deleteOne({ _id: new mongodb.ObjectID(peepId.toString()) }, function (error, result) {
        if (error) throw error;
        peopleCollection.find().toArray(function (_error, _result) {
            if (_error) throw error;
            res.json(_result);
        });
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
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

