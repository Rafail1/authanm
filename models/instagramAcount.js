const mongoose = require('mongoose');
const InstagramAccountSchema = new mongoose.Schema({
    uid: {type: mongoose.Schema.ObjectId, ref: "User"},
    login: String,
    password: String,
    proxy: {type: mongoose.Schema.ObjectId, ref: "Proxy"},
});
module.exports = mongoose.model('InstagramAccount', InstagramAccountSchema);