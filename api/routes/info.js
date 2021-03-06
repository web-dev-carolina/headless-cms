const app = require('express').Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var mongodb = require("mongodb");
var ObjectID = require('mongodb').ObjectID;
const db = require("../db.js");

// routes from "/info"

// After login, a user may connect to one of their projects - this function will initialize connections to all collections.
// CONNECT to user's project
// ex. curl -X POST -H "Content-Type: application/json" -d '{"project":"projectName"}' http://localhost:9000/info/projectsConnect
// initialize Testimonial and People db, should be called after login
let testimonialCollection;
let peopleCollection;
let infoCollection;
let textCollection;
app.post('/projectsConnect', async (req, res) => {
    try {
        console.log(req);
        //TODO: Verify project exists (from project collection)
        const proj = req.body.project;

        dbName = "test1";

        // connect to info collection
        collectionName = "info";
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
            testimonialCollection = dbCollection;
        }, function (err) { // failureCallback
            throw (err);
        });

        // connect to people collection
        // defined above - const dbName = "test1";
        collectionName = proj + "-people";
        console.log("attempting connection to: " + collectionName);
        db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
            peopleCollection = dbCollection;
        }, function (err) { // failureCallback
            throw (err);
        });

        // connect to people collection
        // defined above - const dbName = "test1";
        collectionName = proj + "-text";
        console.log("attempting connection to: " + collectionName);
        db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
            textCollection = dbCollection;
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
app.get("/", (req, res) => {
    // respond with all items in collection
    infoCollection.find().toArray((error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

module.exports = app;