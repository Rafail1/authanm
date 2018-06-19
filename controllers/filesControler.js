const fs = require('fs');
const uniqid = require('uniqid');
const path = require('path');

module.exports = {
    upload: function (req) {
        const oldpath = req.files.file.path;
        const newpath = this.makePath(files.file.name);
        return new Promise(function (resolve, reject) {
            fs.rename(oldpath, newpath, function (err) {
                if (err) reject(err);
                resolve(newpath);
            });
        })
    },
    makePath: function(fname) {
        let path = __dirname + '/../data/files/' + uniqid()+path.extname(fname);
        while(fs.existsSync(path)) {
            path = __dirname + '/../data/files/' + uniqid()+path.extname(fname);
        }
        return path;
    }
};