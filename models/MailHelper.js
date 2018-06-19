const nodemailer = require('nodemailer');
const config = require('../logic/config');
module.exports = {
    sendConfirm:function (email, hash) {
        let transporter = nodemailer.createTransport({
            host: 'smtp.yandex.ru',
            port: 465,
            secure: true,
            auth: {
                user: 'berckutkirill@ya.ru',
                pass: '503349545'
            }
        });

        let mailOptions = {
            from: '"Berckut Kirill" <berckutkirill@ya.ru>',
            to: email,
            subject: 'Подтверждение email',
            text: `для подтверждения перейдите по ссылке ${config.url}/confirm/${hash}`,
            html: `для подтверждения перейдите по ссылке <a href="${config.url}/confirm/${hash}">${config.url}/confirm/${hash}</a>`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    }
};