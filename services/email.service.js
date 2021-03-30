const sgMail = require('../config/sendgrid');

async function sendEmail({ to, subject, text, html }) {
  return sgMail.send({
    to,
    from: 'playmakerscoutingapp@gmail.com',
    subject,
    text,
    html,
  });
}

module.exports = { sendEmail };
