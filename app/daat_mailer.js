//src: http://www.nodemailer.com/
nodemailer = require('nodemailer');

var sendingEmail = 'daat.mail@gmail.com';
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: sendingEmail,
        pass: process.env['DAAT_MAIL_PASSWD']
    }
});

//usage: mailer.send_email({to: 'sella.rafaeli@gmail.com', subject: 'test876', text: 'hello nurse'});
exports.send_email = function (opts, cb) {
    var mailOptions = {
        from: 'Daat Mail ✔ '+sendingEmail, // sender address
        to: opts['to'], //'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
        subject: opts['subject'] || 'Hello ✔', // Subject line
        text: opts['text'] || opts['body'] || 'An email from Daat', // plaintext body
        //html: '<b>Hello world ✔</b>' // html body
    };

    x=1;
    if (isDevelopment) {
        log('Skipping sending mail (because in development mode) with options:',mailOptions);
        return
    }

    transporter.sendMail(mailOptions, function(error, info){ error ? console.log(error) : console.log('Message sent: ' + info.response); });
}

exports.send_email_1 = function(toEmail, subj, bodyText) {
    this.send_email({to: toEmail, subject: subj, body: bodyText});
}