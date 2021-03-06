const app = require('express').Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var mongodb = require("mongodb");
var ObjectID = require('mongodb').ObjectID;
const db = require("../db.js");

// routes from "/people"
let peopleCollection;
const init = (collection) => {
    peopleCollection = collection;
}

/* People CRUD routes */

// CREATE new people
// ex. $ curl -X POST -H "Content-Type: application/json" -d '{"fname":"John", "lname":"Doe", "pos":"King", "bio":"Absolute champion"}' http://localhost:9000/people
// -> new JSON object
app.post("/", (req, res) => {
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
app.get("/", (req, res) => {
    console.log("get all people");
    // respond with all items in collection
    peopleCollection.find().toArray((error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

// UPDATE a people
// ex. $ curl -X PUT -H "Content-Type: application/json" -d '{"fname":"new fname", "lname":"new lname", "pos":"new pos", "bio":"new bio"}' http://localhost:9000/people/{peopleID}
// -> JSON object matching the id
app.put("/:id", async (req, res) => {
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

// DESTROY a people
// ex. curl -X DELETE http://localhost:9000/people/{peopleID}
// -> updated array of people objects
app.delete("/:id", (req, res) => {
    const peepId = req.params.id;
    peopleCollection.deleteOne({ _id: new mongodb.ObjectID(peepId.toString()) }, function (error, result) {
        if (error) throw error;
        peopleCollection.find().toArray(function (_error, _result) {
            if (_error) throw error;
            res.json(_result);
        });
    });
});

module.exports = {app, init};