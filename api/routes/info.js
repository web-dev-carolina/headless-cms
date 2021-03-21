const app = require('express').Router();
const db = require("../db.js");
const people = require("./people.js");
const testimonials = require("./testimonials.js");
const text = require("./text.js");
const announcements = require("./announcements.js");
const articles = require("./articles.js");
const images = require("./images.js");
const { names } = require('debug');

// routes from "/info"

// After login, a user may connect to one of their projects - this function will initialize connections to all collections.
// CONNECT to user's project
// ex. curl -X POST -H "Content-Type: application/json" -d '{"project":"projectName"}' http://localhost:9000/info/projectsConnect
// initialize Testimonial and People db, should be called after login
let infoCollection;
app.post('/projectsConnect', async (req, res) => {
    try {
        //TODO: Verify project exists (from project collection)
        const proj = req.body.project;
        const dbName = "test1";

        // connect to info collection
        var collectionName = "info";
        console.log("attempting connection to: " + collectionName);
        db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
            infoCollection = dbCollection;
        }, function (err) { // failureCallback
            throw (err);
        });

        // connect to testimonial collection
        collectionName = proj + "-testimonials";
        console.log("attempting connection to: " + collectionName);
        db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
            testimonials.init(dbCollection);
        }, function (err) { // failureCallback
            throw (err);
        });

        // connect to people collection
        // defined above - const dbName = "test1";
        collectionName = proj + "-people";
        console.log("attempting connection to: " + collectionName);
        db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
            people.init(dbCollection);
        }, function (err) { // failureCallback
            throw (err);
        });

        // connect to text collection
        // defined above - const dbName = "test1";
        collectionName = proj + "-text";
        console.log("attempting connection to: " + collectionName);
        db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
            text.init(dbCollection);
        }, function (err) { // failureCallback
            throw (err);
        });

        // connect to announcements collection
        // defined above - const dbName = "test1";
        collectionName = proj + "-announcements";
        console.log("attempting connection to: " + collectionName);
        db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
            announcements.init(dbCollection);
        }, function (err) { // failureCallback
            throw (err);
        });

        // connect to articles collection
        // defined above - const dbName = "test1";
        collectionName = proj + "-articles";
        console.log("attempting connection to: " + collectionName);
        db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
            articles.init(dbCollection);
        }, function (err) { // failureCallback
            throw (err);
        });
        

        // connect to images collection
        // defined above - const dbName = "test1";
        collectionName = proj + "-images";
        console.log("attempting connection to: " + collectionName);
        db.initialize(dbName, collectionName, function (dbCollection) {
            images.init(dbCollection);
        }, function (err) {
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
app.get("/", (req, res) => {
    // respond with all items in collection
    infoCollection.find().toArray((error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

module.exports = app;