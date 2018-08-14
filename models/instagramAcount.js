const mongoose = require('mongoose');
const Client = require('instagram-private-api').V1;

const schema = new mongoose.Schema({
    uid: {type: mongoose.Schema.ObjectId, ref: "User"},
    photo: String,
    login: {type: String, unique: true},
    password: String,
    proxy: {type: mongoose.Schema.ObjectId, ref: "Proxy"},
});

schema.pre('save', function (done) {
    const Account = mongoose.model('InstagramAccount');
    const _that = this;
    Account.check(this).then(function (session) {
        session.getAccount()
            .then(function(account) {
                _that.photo = account.params.picture;
                done();
            }, function (err) {
                done(err);
            })
    }, function (err) {
        done(err);
    });
});
schema.statics.check = function (account) {
    const _that = this;
    return new Promise(function (resolve, reject) {
        _that.connect(account).then(function (session) {
            resolve(session);
        }, function (error) {
            reject(error);
        })
    })
};


schema.statics.connect = function (account) {
    const device = new Client.Device(account.login);
    const storage = new Client.CookieFileStorage(__dirname + '/../data/cookies/' + account.login + '.json');
    const proxyUrl = account.proxy ? account.proxy.getUrl() : null;
    return Client.Session.create(device, storage, account.login, account.password, proxyUrl);
};

module.exports = mongoose.model('InstagramAccount', schema);