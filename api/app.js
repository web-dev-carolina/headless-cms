const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');
const body_parser = require('body-parser');
const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var mongodb = require("mongodb");
var ObjectID = require('mongodb').ObjectID;
app.use(cors());
app.options('*', cors());
// parse JSON (application/json content-type)
app.use(body_parser.json());
require('dotenv').config();
const db = require("./db");

// initialize User db
let dbName = "users";
let collectionName = "cms-app";
let userCollection;
db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
    userCollection = dbCollection;
    console.log('users collection connection successful');
}, function (err) { // failureCallback
    throw (err);
});

app.post("/users/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("auth-token");
        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_TOKEN_PASS);
        if (!verified) return res.json(false);

        const user = await userCollection.findOne({ _id: new mongodb.ObjectID(verified.id.toString()) });
        if (!user) return res.json(false);

        return res.json({
            valid: true,
            token: token,
            user
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

/* User CRUD routes */

// CREATE new user
// ex. $ curl -X POST -H "Content-Type: application/json" -d '{"user":"username", "pswd":"pswd", "pswdCheck":"pswd confirmation", "proj":"[proj1, proj2]"}' http://localhost:9000/users/signup
// -> new JSON object
app.post('/users/signup', async (req, res) => {
    // verify valid data
    const user = req.body.username;
    let pass = req.body.password;
    const passCheck = req.body.passwordCheck;
    const proj = [];
    if (!user || !pass) return res.status(400).json({ msg: "missing username or password" });
    if (pass != passCheck) return res.status(400).json({ msg: "passwords do not match" });
    const existing = await userCollection.findOne({ user });
    if (existing) return res.status(400).json({ msg: "this user already exists" });
    let salt = await bcrypt.genSalt();
    pass = await bcrypt.hash(pass, salt);
    newUser = { user, pass, proj };
    // add the user
    userCollection.insertOne(newUser, (error, result) => {
        if (error) throw error;
        // respond with all items in collection
        userCollection.find().toArray((_error, _result) => {
            if (_error) throw _error;
            res.json(_result);
        });
    });
});

// LOGIN user
// ex. $ curl -X POST -H "Content-Type: application/json" -d '{"user":"username", "pass":"pswd"}' http://localhost:9000/users/login
// -> new JSON object
app.post('/users/login', async (req, res) => {
    try {
        // verify valid data
        const user = req.body.username;
        const pass = req.body.password;
        if (!user || !pass) return res.status(400).json({ msg: "missing username or password" });
        const existing = await userCollection.findOne({ user });
        if (!existing) return res.status(400).json({ msg: "this user does not exist" });
        let isMatch = await bcrypt.compare(pass, existing.pass);
        if (!isMatch) return res.status(400).json({ msg: "invalid credentials" });
        const token = jwt.sign({ id: existing._id }, process.env.JWT_TOKEN_PASS);
        // login user
        res.json({
            token,
            userInfo: {
                user: existing.user,
                proj: existing.proj,
            }
        });
        console.log('successful login: ' + existing.user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// READ all users
// ex. $ curl http://localhost:9000/users
// -> all users as array of JSON
app.get("/users", (req, res) => {
    // respond with all items in collection
    userCollection.find().toArray((error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

// READ a user by id
// ex. $ curl http://localhost:9000/users/{id}
// -> a user as JSON
app.get("/users/:id", async (req, res) => {
    const userId = req.params.id;
    userCollection.findOne({ _id: new mongodb.ObjectID(userId.toString()) }, function (error, result) {
        if (error) throw error;
        res.json(result);
    });
});

// UPDATE a user's info (primarily project permissions)
// ex. $ curl -X PUT -H "Content-Type: application/json" -d '{"text":"testimonial body", "author":"testimonial author"}' http://localhost:9000/testimonials/{testimonialID}
// -> updated JSON object matching the id
app.put("/users/:id", async (req, res) => {
    const testId = req.params.id;
    const newTestimonial = req.body;
    userCollection.updateOne({ _id: new mongodb.ObjectID(testId.toString()) }, { $set: newTestimonial }, function (error, result) {
        if (error) throw error;
        userCollection.find().toArray(function (_error, _result) {
            if (_error) throw error;
            res.json(_result);
        });
    });
});

// DESTROY a user
// ex. curl -X DELETE http://localhost:9000/users/{userID}
// -> updated array of users
app.delete("/users/:id", (req, res) => {
    const testId = req.params.id;
    userCollection.deleteOne({ _id: new mongodb.ObjectID(testId.toString()) }, function (error, result) {
        if (error) throw error;
        userCollection.find().toArray(function (_error, _result) {
            if (_error) throw error;
            res.json(_result);
        });
    });
});

// After login, a user may connect to one of their projects - this function will initialize connections to all collections.
// CONNECT to user's project
// ex. curl -X POST -H "Content-Type: application/json" -d '{"project":"projectName"}' http://localhost:9000/projects/connect
// initialize Testimonial and People db, should be called after login
let testimonialCollection;
let peopleCollection;
let infoCollection;
app.post('/projects/connect', async (req, res) => {
    try {
        //TODO: Verify project exists (from project collection)
        const proj = req.body.project;


        dbName = "test1";

        // connect to info collection
        collectionName = "info";
        console.log("attempting connection to: " + collectionName);
        db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
            infoCollection = dbCollection;
            console.log('info collection connection successful');
        }, function (err) { // failureCallback
            throw (err);
        });

        // connect to testimonial collection
        collectionName = proj + "-testimonials";
        console.log("attempting connection to: " + collectionName);
        db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
            testimonialCollection = dbCollection;
            console.log('testimonial collection connection successful');
        }, function (err) { // failureCallback
            throw (err);
        });

        // connect to people collection
        // defined above - const dbName = "test1";
        collectionName = proj + "-people";
        console.log("attempting connection to: " + collectionName);
        db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
            peopleCollection = dbCollection;
            console.log('people collection connection successful');
        }, function (err) { // failureCallback
            throw (err);
        });

        res.json(200);
    } catch (err) {
        res.status(500).json(err);
    }
});
/* Get info */
// READ all info
// ex. $ curl http://localhost:9000/info
// -> all info as array of JSON
app.get("/info", (req, res) => {
    // respond with all items in collection
    infoCollection.find().toArray((error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

/* Testimonial CRUD routes */

// CREATE new testimonial
// ex. $ curl -X POST -H "Content-Type: application/json" -d '{"text":"testimonial body", "author":"testimonial author"}' http://localhost:9000/testimonials
// -> new JSON object
app.post("/testimonials", (req, res) => {
    const newTestimonial = req.body;
    testimonialCollection.insertOne(newTestimonial, (error, result) => {
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
// -> all testimonials as array of JSON
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
    testimonialCollection.updateOne({ _id: new mongodb.ObjectID(testId.toString()) }, { $set: newTestimonial }, function (error, result) {
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


/* People CRUD routes */

// CREATE new people
// ex. $ curl -X POST -H "Content-Type: application/json" -d '{"fname":"John", "lname":"Doe", "pos":"King", "bio":"Absolute champion"}' http://localhost:9000/people
// -> new JSON object
app.post("/people", (req, res) => {
    const newPerson = req.body;
    peopleCollection.insertOne(newPerson, (error, result) => {
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
    peopleCollection.updateOne({ _id: new mongodb.ObjectID(peepId.toString()) }, { $set: newPerson }, function (error, result) {
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

