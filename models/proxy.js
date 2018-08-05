const mongoose = require('mongoose');
const request = require('request');
const schema = new mongoose.Schema({
    uid: {type: mongoose.Schema.ObjectId, ref: "User"},
    login: String,
    password: String,
    host: String,
    type: Number,
    port:Number
});
const protocols = ['http', 'https', 'socks4', "socks5"];
schema.pre('save', function (done) {
    mongoose.model('Proxy').check(this).then(function () {
        done();
    }, function (err) {
        done(err);
    });
});
schema.statics.check = function (proxy) {
    return new Promise(function (resolve, reject) {
        const protocol = protocols[proxy['type'] - 1];
        const proxyUrl = `${protocol}://${proxy['login']}:${proxy['password']}@${proxy['host']}:${proxy['port']}`;
        const proxiedRequest = request.defaults({'proxy': proxyUrl});
        proxiedRequest.get("https://www.instagram.com", function (err) {
            if (err) {
                return reject(err);
            }
            return resolve();
        })
    })
};
module.exports = mongoose.model('Proxy', schema);