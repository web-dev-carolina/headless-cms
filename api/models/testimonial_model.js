const mongoose = require('../node_modules/mongoose');

const testimonial_schema = new mongoose.Schema({
    text: { type: String, required: true },
    author: { type: String, required: true },
});

// Testimonial = mongoose.model("testimonial", testimonial_schema);
// module.exports = Testimonial;