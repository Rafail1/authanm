const mongoose = require('mongoose');

module.exports = mongoose.model('User',{
    email: {type:String, unique:true},
    password: String,
    confirmed: {type:Boolean, default: false},
    last_send: Date,
    confirm_hash: String,
    role: String
});