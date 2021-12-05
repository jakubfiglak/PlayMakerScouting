const express = require('express');
const { sendContactForm } = require('../modules/email/email.controller');

const router = express.Router();

router.post('/', sendContactForm);

module.exports = router;
