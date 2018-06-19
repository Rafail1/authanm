const iga = require('../../models/instagramAcount');
const igp = require('../../models/instagramPost');
module.exports = function (router) {
    router.route('/instagram').get(function(req, res, next) {
        console.log(req.user);
        const page = req.query.page ? req.query.page : 1;
        igp.paginate({}, {page: page, limit: 10}, function (err, posts) {
            if(err) {
                return next(err);
            }
            res.json(posts);
        });
    }).post(function(req, res, next) {
        Book.create(req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    });
    router.route('/book/:id').get(function(req, res, next) {
        Book.findById(req.params.id, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    }).put(function(req, res, next) {
        Book.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    }).delete(function(req, res, next) {
        Book.findByIdAndRemove(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    });
};