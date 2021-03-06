const app = require('express').Router();
var mongodb = require("mongodb");
var ObjectID = require('mongodb').ObjectID;

// routes from "/testimonials"
let articlesCollection;
const init = (collection) => {
    articlesCollection = collection;
}

/* Articles CRUD routes */

// CREATE new testimonial
// ex. $ curl -X POST -H "Content-Type: application/json" -d '{"text":"testimonial body", "author":"testimonial author"}' http://localhost:9000/testimonials
// -> new JSON object
app.post("/", (req, res) => {
    const newArticle = req.body;
    articlesCollection.insertOne(newArticle, (error, result) => {
        if (error) throw error;
        // respond with all items in collection
        articlesCollection.find().toArray((_error, _result) => {
            if (_error) throw _error;
            res.json(_result);
        });
    });
});

// READ all testimonials
// ex. $ curl http://localhost:9000/testimonials
// -> all testimonials as array of JSON
app.get("/", (req, res) => {
    // respond with all items in collection
    articlesCollection.find().toArray((error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

// UPDATE a testimonial
// ex. $ curl -X PUT -H "Content-Type: application/json" -d '{"text":"testimonial body", "author":"testimonial author"}' http://localhost:9000/testimonials/{testimonialID}
// -> JSON object matching the id
app.put("/:id", async (req, res) => {
    const artId = req.params.id;
    const newArticle = req.body;
    articlesCollection.updateOne({ _id: new mongodb.ObjectID(artId.toString()) }, { $set: newArticle }, function (error, result) {
        if (error) throw error;
        articlesCollection.find().toArray(function (_error, _result) {
            if (_error) throw error;
            res.json(_result);
        });
    });
});

// DESTROY a testimonial
// ex. curl -X DELETE http://localhost:9000/testimonials/{testimonialID}
// -> updated array of testimonial objects
app.delete("/:id", (req, res) => {
    const artId = req.params.id;
    articlesCollection.deleteOne({ _id: new mongodb.ObjectID(artId.toString()) }, function (error, result) {
        if (error) throw error;
        articlesCollection.find().toArray(function (_error, _result) {
            if (_error) throw error;
            res.json(_result);
        });
    });
});

module.exports = { app, init };