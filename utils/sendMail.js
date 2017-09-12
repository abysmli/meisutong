var nodemailer = require('nodemailer');
var fs = require('fs');
var ejs = require('ejs');

module.exports = (function () {
    function _Class() { }

    _Class.prototype.send = function send(data, callback) {
        var to = data.to;
        var template = process.cwd() + '/views/mailTemplate/' + data.template + '.ejs';
        var subject = data.subject;
        var content = data.content;

        var transporter = nodemailer.createTransport({
            host: 'hwsmtp.exmail.qq.com',
            port: 465,
            secure: 'true',
            auth: {
                user: 'service@cope-express.de',
                pass: 'Cope123'
            },
        });

        // Use fileSystem module to read template file
        fs.readFile(template, 'utf8', function (err, file) {
            if (err) return callback(err, null);

            var html = ejs.render(file, content);

            var mailOptions = {
                from: '"美速通物流" <service@cope-express.de>',
                to: to,
                subject: subject,
                html: html,
            };
            transporter.sendMail(mailOptions, function (err, info) {
                // If a problem occurs, return callback with the error
                if (err) return callback(err, null);
                callback(null, info);
            });
        });
    };
    return _Class;
})();