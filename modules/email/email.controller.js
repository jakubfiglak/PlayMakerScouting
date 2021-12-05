const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const emailService = require('./email.service');

// @desc Send contact form
// @route POST /api/v1/email
// @access Public
exports.sendContactForm = asyncHandler(async (req, res) => {
  await emailService.sendContactForm({
    from: req.body.email,
    subject: req.body.subject,
    text: req.body.message,
  });

  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Successfully sent contact form!',
  });
});
