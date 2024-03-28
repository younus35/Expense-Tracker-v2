const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: "picwork35@gmail.com",
        pass: process.env.BREVO_API_KEY
    }
});

module.exports = transporter;