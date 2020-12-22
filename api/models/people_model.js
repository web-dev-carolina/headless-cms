const mongoose = require('../node_modules/mongoose');

const people_schema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    pos: { type: String, required: true },
    // picture: { type: String, required: true },
    bio: { type: String, required: true }
});

People = mongoose.model("people", people_schema);
module.exports = People;