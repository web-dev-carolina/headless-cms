const mongoose = require('../node_modules/mongoose');

const user_schema = new mongoose.Schema({
    user: { type: String, required: true },
    pswd: { type: String, required: true },
    proj: { type: Array, required: true },
});

// User = mongoose.model("user", user_schema);
// module.exports = User;