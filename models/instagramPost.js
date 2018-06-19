const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Client = require('instagram-private-api').V1;
const fs = require('fs');
const space = '⠀';
const PostSchema = new mongoose.Schema({
    description: String,
    file: Array,
    date: {type: Date, default: Date.now},
});
PostSchema.methods.connect = function (login, password) {
    const device = new Client.Device(login);
    const storage = new Client.CookieFileStorage(__dirname + '/cookies/' + login + '.json');
    return Client.Session.create(device, storage, login, password);
};
PostSchema.methods.uploadVideoPost = function (session, text, video, coverPhoto) {
    text = text.replace(/\t/, space);
    return new Promise(function (resolve, reject) {
        Client.Upload.video(session, video, coverPhoto)
            .then(function (upload) {
                return Client.Media.configureVideo(session, upload.uploadId, text, upload.durationms);
            })
            .then(function (medium) {
                fs.unlink(video);
                resolve(medium);
            })
            .catch(function (error) {
                fs.unlink(video);
                reject(error);
            });
    });
};
PostSchema.methods.uploadPhotoPost = function (session, text, photo) {
    text = text.replace(/\t/, space);
    return new Promise(function (resolve, reject) {
        Client.Upload.photo(session, photo)
            .then(function (upload) {
                return Client.Media.configurePhoto(session, upload.params.uploadId, text);
            })
            .then(function (medium) {
                fs.unlink(photo);
                resolve(medium);
            })
            .catch(function (error) {
                fs.unlink(photo);
                reject(error);
            })
    });
};
PostSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('InstagramPost', PostSchema);