const mongoose = require('mongoose');
const InstagramAccountSchema = new mongoose.Schema({
    login: String,
    password: String,
    posts: {type: mongoose.Schema.ObjectId, ref: "InstagramPost"}
});
module.exports = mongoose.model('InstagramAccount', InstagramAccountSchema);