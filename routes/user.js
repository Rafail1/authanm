const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const randomstring = require("randomstring");
const bcrypt = require('bcryptjs');
const config = require('../logic/config');
const vt = require('../logic/VerifyToken');
const LNG = require('../data/LNG');
const User = mongoose.model('User');
const MailHelper = require('../models/MailHelper');
module.exports = function (router) {
    router.post('/register', function (req, res) {
        User.findOne({email: req.body.email}, function (err, user) {
            let message;
            if (user) {
                if(user.confirmed) {
                    message = 'duplicate_email';
                    return res.send({error: true, message:LNG.getMessage(message)});
                }
                message = 'duplicate_email_unconfirmed';
                return res.send({error: true, code:'resend', message:LNG.getMessage(message)});
            }

            const hashedPassword = bcrypt.hashSync(req.body.password, 8);
            const confirm_hash = randomstring.generate();
            User.create({
                    name: req.body.name,
                    email: req.body.email,
                    confirm_hash:confirm_hash,
                    last_send: new Date(),
                    password: hashedPassword
                },
                function (err) {
                    if (err) {
                        return res.send({error: true, code:code, message:LNG.getMessage('register_server_error')});
                    }
                    MailHelper.sendConfirm(req.body.email, confirm_hash);
                    res.json({message: 'На Ваш email высланы дальнейшие инструкции.'});
                });
        });

    });
    router.post('/resend', function (req, res) {
        User.findOne({email: req.body.email}, function (err, user) {
            if (err) return res.json({error: true, message: 'Ошибка сервера'});
            if (!user) return res.json({error: true, message: 'Пользователь не найдет'});
            if (user.confirmed) return res.json({error: true, message: 'Email уже подтверждён'});
            console.log(new Date().getTime() ,user.last_send.getTime(), new Date().getTime() - user.last_send.getTime());
            if(new Date().getTime() - user.last_send.getTime() > 59000) {
                MailHelper.sendConfirm(req.body.email, user.confirm_hash);
                user.last_send = new Date();
                user.save(function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
                res.json({message: 'Письмо выслано повторно'});
            } else {
                res.json({error: true, message: 'Слишком часто'});
            }
        });
    });

    router.post('/confirm', function (req, res) {
        const confirm_hash = req.body.h;
        User.findOne({confirm_hash : confirm_hash, confirmed: false }, function (err, user) {
            if (err) return res.json({error: true, message: 'Ошибка сервера'});
            if (!user) return res.json({error: true, message: 'Пользователь не найдет'});
            User.updateOne(user, {$set:{confirmed: true}}, function (err) {
                if (err) return res.json({error: true, message: 'Ошибка сервера'});
                res.json({message: 'Email подтвержден'});
            });
        });
    });
    router.get('/me', vt.verifyToken, function (req, res) {
        User.findById(req.userId, {password: 0}, function (err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");

            res.json(user);
        });
    });
    router.post('/login', function (req, res) {
        User.findOne({email: req.body.email}, function (err, user) {
            if (err) return res.json({error: true, message:'Ошибка сервера.'});
            if (!user) return res.json({error: true, message:'Неверный логин или пароль'});
            if (!user.confirmed) return res.json({error: true, code:'resend', message:'Email не подтверждён'});
            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.json({error: true, message:'Неверный логин или пароль'});
            const token = jwt.sign({ id: user._id, confirmed: !!user.confirmed }, config.secret, {
                expiresIn: 86400
            });
            res.json({auth: true, token: token});
        });
    });
    router.post('/resetPassword', function (req, res) {
        User.findOne({email: req.body.email}, function (err, user) {
            if (err) return res.json({error: true, message:'Ошибка сервера.'});
            if (!user) return res.json({error: true, message:'Такого пользователя нет в системе'});
            if (!user.confirmed) return res.json({error: true, code:'resend', message:'Email не подтверждён'});
            const confirm_hash = randomstring.generate();

            User.updateOne(user, {$set:{confirm_hash: confirm_hash}}, function (err) {
                if (err) return res.json({error: true, message: 'Ошибка сервера'});
                MailHelper.sendReset(req.body.email, confirm_hash);
                res.json({message: 'Ссылка на восстановление пароля выслана на email'});
            });

        });
    });
    router.get('/logout', function (req, res) {
        res.json({auth: false, token: null});
    });
};