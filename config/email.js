const nodemailer = require('nodemailer');
const config = require('config');

const emailServices = config.get('emailServices');
const emailID = config.get('emailID');
const emailPassword = config.get('emailPassword');



exports.mailTransporter = nodemailer.createTransport({
    service: emailServices,
    auth: {
        user: emailID,
        pass: emailPassword
    }
});

exports.mailSend = (mailDetails) => {
    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    });
}
