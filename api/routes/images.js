const app = require('express').Router();
var mongodb = require("mongodb");
var ObjectID = require('mongodb').ObjectID;
const upload = require('../services/upload');

// routes from "/images"
let imagesCollection;
const init = (collection) => {
    imagesCollection = collection;
}
/* Image CRUD routes */


// GET all images 
app.get("/", async (req, res) => {
    try {
        imagesCollection.find().toArray((error, result) => {
            if (error) throw error;
            res.json(result);
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "some error occured" });
    }
});

// POST upload image
app.post("/upload", upload.single("picture"), async (req, res) => {
    try {
        if (req.file && req.file.path) {
            imagesCollection.insertOne( {
                'desc': req.body.desc,
                'url': req.file.path
            }, (error, result) => {
                if(error) throw error;
            });
            return res.status(200).json({ msg: "image successfully saved" });
        } else {
            console.log(req.file);
            return res.status(422).json({ error: "invalid" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "some error occured" });
    }
});

// DELETE image, return updated images list
app.delete("/:id", (req, res) => {
    const imageId = req.params.id;
    imagesCollection.deleteOne({ _id: new mongodb.ObjectID(imageId.toString())}, function (error, result) {
        if (error) throw error; 
        imagesCollection.find().toArray(function (_error, _result) {
            if(_error) throw error; 
            res.json(_result);
        })
    })
});

module.exports = {app,init};