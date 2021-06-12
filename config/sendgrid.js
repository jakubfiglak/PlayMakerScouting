const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');

dotenv.config({
  path: './config/config.env',
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = sgMail;
