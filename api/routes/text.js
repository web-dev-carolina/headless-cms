const app = require('express').Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var mongodb = require("mongodb");
var ObjectID = require('mongodb').ObjectID;

// routes from "/textContent"
let textCollection;
const init = (collection) => {
    textCollection = collection;
}

/* TextContent CRUD routes */

// CREATE new text cotnent
// ex. $ curl -X POST -H "Content-Type: application/json" -d '{}' http://localhost:9000/textContent
// -> new JSON object
app.post("/", (req, res) => {
    const newText = req.body;
    textCollection.insertOne(newText, (error, result) => {
        if (error) throw error;
        // respond with all items in collection
        testimonialCollection.find().toArray((_error, _result) => {
            if (_error) throw _error;
            res.json(_result);
        });
    });
});

// READ text areas for the project
// ex. $ curl http://localhost:9000/textSections
// -> all testimonials as array of JSON
app.get("/sections", (req, res) => {
    // respond with the sections item
    textCollection.find({ sections: { $exists: true } }).toArray((error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

// READ all text content
// ex. $ curl http://localhost:9000/textContent
// -> all testimonials as array of JSON
app.get("/", (req, res) => {
    // respond with all items in collection
    textCollection.find({ sections: { $exists: false } }).toArray((error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

// UPDATE a text block
// ex. $ curl -X PUT -H "Content-Type: application/json" -d '{}' http://localhost:9000/textContent/{textID}
// -> JSON object matching the id
app.put("/:id", async (req, res) => {
    const textId = req.params.id;
    const newText = req.body;
    textCollection.updateOne({ _id: new mongodb.ObjectID(textId.toString()) }, { $set: newText }, function (error, result) {
        if (error) throw error;
        textCollection.find().toArray(function (_error, _result) {
            if (_error) throw error;
            res.json(_result);
        });
    });
});

// DESTROY a text block
// ex. curl -X DELETE http://localhost:9000/textContent/{textID}
// -> updated array of text block objects
app.delete("/:id", (req, res) => {
    const textId = req.params.id;
    textCollection.deleteOne({ _id: new mongodb.ObjectID(textId.toString()) }, function (error, result) {
        if (error) throw error;
        textCollection.find().toArray(function (_error, _result) {
            if (_error) throw error;
            res.json(_result);
        });
    });
});

module.exports = {app,init};