const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const emailService = require('./email.service');

// @desc Send contact form
// @route POST /api/v1/email
// @access Public
exports.sendContactForm = asyncHandler(async (req, res) => {
  const message = {
    from: req.body.from,
    subject: req.body.subject,
    text: req.body.message,
  };

  await emailService.sendContactForm(message);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Successfully sent contact form!',
    data: message,
  });
});
