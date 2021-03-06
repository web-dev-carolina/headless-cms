const app = require('express').Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var mongodb = require("mongodb");
var ObjectID = require('mongodb').ObjectID;
const db = require("../db.js");

// routes from "/users"

// initialize User db
let dbName = "users";
let collectionName = "cms-app";
let userCollection;
db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
    userCollection = dbCollection;
}, function (err) { // failureCallback
    throw (err);
});

app.post("/tokenIsValid", async (req, res) => {
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
app.post('/signup', async (req, res) => {
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
// ex. $ curl -X POST -H "Content-Type: application/json" -d '{"username":"user", "password":"pswd"}' http://localhost:9000/users/login
// -> new JSON object
app.post('/login', async (req, res) => {
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
app.get("/", (req, res) => {
    // respond with all items in collection
    userCollection.find().toArray((error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

// READ a user by id
// ex. $ curl http://localhost:9000/users/{id}
// -> a user as JSON
app.get("/:id", async (req, res) => {
    const userId = req.params.id;
    userCollection.findOne({ _id: new mongodb.ObjectID(userId.toString()) }, function (error, result) {
        if (error) throw error;
        res.json(result);
    });
});

// UPDATE a user's info (primarily project permissions)
// ex. $ curl -X PUT -H "Content-Type: application/json" -d '{"text":"testimonial body", "author":"testimonial author"}' http://localhost:9000/testimonials/{testimonialID}
// -> updated JSON object matching the id
app.put("/:id", async (req, res) => {
    const testId = req.params.id;
    const newInfo = req.body;
    userCollection.updateOne({ _id: new mongodb.ObjectID(testId.toString()) }, { $set: newInfo }, function (error, result) {
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
app.delete("/:id", (req, res) => {
    const testId = req.params.id;
    userCollection.deleteOne({ _id: new mongodb.ObjectID(testId.toString()) }, function (error, result) {
        if (error) throw error;
        userCollection.find().toArray(function (_error, _result) {
            if (_error) throw error;
            res.json(_result);
        });
    });
});

module.exports = app;