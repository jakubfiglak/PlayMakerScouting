const sgMail = require('../../config/sendgrid');

async function sendEmail({ to, subject, text, html }) {
  console.log('SEND EMAIL HAVE BEEN CALLED');

  return sgMail.send({
    to,
    from: 'playmakerscoutingapp@gmail.com',
    subject,
    text,
    html,
  });
}

module.exports = { sendEmail };
