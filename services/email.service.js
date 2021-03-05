const sgMail = require('../config/sendgrid');

const sendEmail = async ({ to, subject, text, html }) =>
  sgMail.send({
    to,
    from: 'playmakerscoutingapp@gmail.com',
    subject,
    text,
    html,
  });

module.exports = { sendEmail };
