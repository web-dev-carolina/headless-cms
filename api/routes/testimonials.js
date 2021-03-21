const app = require('express').Router();
var mongodb = require("mongodb");
var ObjectID = require('mongodb').ObjectID;

// routes from "/testimonials"
let testimonialCollection;
const init = (collection) => {
    testimonialCollection = collection;
}

/* Testimonial CRUD routes */ 

// CREATE new testimonial
// ex. $ curl -X POST -H "Content-Type: application/json" -d '{"text":"testimonial body", "author":"testimonial author"}' http://localhost:9000/testimonials
// -> new JSON object
app.post("/", (req, res) => {
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
app.get("/", (req, res) => {
    // respond with all items in collection
    testimonialCollection.find().toArray((error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

// UPDATE a testimonial
// ex. $ curl -X PUT -H "Content-Type: application/json" -d '{"text":"testimonial body", "author":"testimonial author"}' http://localhost:9000/testimonials/{testimonialID}
// -> JSON object matching the id
app.put("/:id", async (req, res) => {
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
app.delete("/:id", (req, res) => {
    const testId = req.params.id;
    testimonialCollection.deleteOne({ _id: new mongodb.ObjectID(testId.toString()) }, function (error, result) {
        if (error) throw error;
        testimonialCollection.find().toArray(function (_error, _result) {
            if (_error) throw error;
            res.json(_result);
        });
    });
});

module.exports = { app, init };