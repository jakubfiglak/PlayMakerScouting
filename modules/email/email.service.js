const sgMail = require('../../config/sendgrid');

function sendEmail({ to, subject, text, html }) {
  return sgMail.send({
    to,
    from: 'playmakerscoutingapp@gmail.com',
    subject,
    text,
    html,
  });
}

function sendContactForm({ from, subject, text }) {
  return sgMail.send({
    to: 'biuro@playmaker.pro',
    from: 'playmakerscoutingapp@gmail.com',
    subject,
    text: `${from} ${text}`,
    html: `<h2>Nadawca: ${from}</h2>
    <p>${text}</p>
  `,
  });
}

function sendConfirmationEmail({ email, username, confirmationURL }) {
  return sendEmail({
    to: email,
    subject: 'Aktywuj swoje konto w aplikacji PlaymakerPro Scouting',
    text: `Dziękujemy za założenie konta. Proszę potwierdź swój adres email poprzez kliknięcie w link ${confirmationURL}`,
    html: `<h2>Witaj ${username}</h2>
                <p>Dziękujemy za założenie konta. Proszę potwierdź swój adres email poprzez kliknięcie w <a href="${confirmationURL}">link</a></p>
              `,
  });
}

module.exports = { sendEmail, sendContactForm, sendConfirmationEmail };
