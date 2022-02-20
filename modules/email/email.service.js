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
    subject: 'Aktywuj swoje konto w aplikacji ScoutmakerPro',
    text: `Dziękujemy za założenie konta. Proszę potwierdź swój adres email poprzez kliknięcie w link ${confirmationURL}`,
    html: `<h2>Witaj ${username}</h2>
                <p>Dziękujemy za założenie konta. Proszę potwierdź swój adres email poprzez kliknięcie w <a href="${confirmationURL}">link</a></p>
              `,
  });
}

function sendResetPasswordEmail({ email, username, resetURL }) {
  return sendEmail({
    to: email,
    subject: 'Prośba o zresetowanie hasła w aplikacji ScoutmakerPro',
    text: `Otrzymujesz tę wiadomość, ponieważ otrzymaliśmy prośbę o zresetowanie hasła do Twojego konta w platformie ScoutmakerPro. Jeśli nie składałeś takiej prośby, proszę zignoruj tę wiadomość. Jeśli jednak chcesz zresetować hasło, udaj się pod adres ${resetURL}`,
    html: `<h2>Witaj ${username}</h2>
                <p>Otrzymujesz tę wiadomość, ponieważ otrzymaliśmy prośbę o zresetowanie hasła do Twojego konta w platformie ScoutmakerPro. Jeśli nie składałeś takiej prośby, proszę zignoruj tę wiadomość. Jeśli jednak chcesz zresetować hasło, udaj się pod adres <a href="${resetURL}">link</a></p>
              `,
  });
}

module.exports = { sendEmail, sendContactForm, sendConfirmationEmail, sendResetPasswordEmail };
