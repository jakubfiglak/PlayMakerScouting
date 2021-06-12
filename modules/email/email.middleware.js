const asyncHandler = require('express-async-handler');
const emailService = require('./email.service');

const sendConfirmationEmail = asyncHandler(async (req, res, next) => {
  const confirmationURL = `http://${req.headers.host}/api/v1/auth/confirm/${req.body.confirmationCode}`;

  await emailService.sendEmail({
    to: req.createdUser.email,
    subject: 'Aktywuj swoje konto w aplikacji PlaymakerPro Scouting',
    text: `Dziękujemy za założenie konta. Proszę potwierdź swój adres email poprzez kliknięcie w link ${confirmationURL}`,
    html: `<h2>Witaj ${req.createdUser.firstName}</h2>
                <p>Dziękujemy za założenie konta. Proszę potwierdź swój adres email poprzez kliknięcie w <a href="${confirmationURL}">link</a></p>
              `,
  });

  next();
});

module.exports = { sendConfirmationEmail };
