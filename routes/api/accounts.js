const mongoose = require('mongoose');
const Account = mongoose.model('InstagramAccount');
const vt = require('../../logic/VerifyToken');
module.exports = function (router) {
    router.route('/accounts').get(vt.verifyToken, function (req, res, next) {
        const q = Object.assign({uid: req.userId}, req.body);
        Account.find(q, function (err, accounts) {
            res.json({accounts:accounts});
        });
    }).post(vt.verifyToken, function (req, res, next) {
        const q = {uid: req.userId, login: req.body.login, password: req.body.password};
        if(req.body.use_proxy) {
            const Proxy = mongoose.model('Proxy');
            Proxy.create(req.body.proxy, function (err, proxy) {
                if(err) {
                    return res.json({error: err})
                }
                if(proxy && proxy._id) {
                    q.proxy = proxy._id;
                }
                createAccount(q).then(function (account) {
                    res.json({account: account})
                }, function (err) {
                    res.json({error: true, message: err})
                })
            })


        } else {
            createAccount(q).then(function (account) {
                res.json({account: account})
            }, function (err) {
                res.json({error: true, message: err})
            })
        }
    }).delete(vt.verifyToken, function (req, res, next) {
        const q = {uid: req.userId, _id: mongoose.Types.ObjectId(req.query.id)};
        Account.find(q, function (err, accounts) {
            res.json({accounts:accounts});
        });
    })
};

function createAccount(q) {
    return new Promise(function (resolve, reject) {
        Account.create(q, function (err, account) {
            if (err) {
                return reject(err);
            }
            return resolve(account);
        });
    })

}