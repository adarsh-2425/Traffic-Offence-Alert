const express = require('express');
const router = express.Router();

const { webhook } = require('../webhooks/webhookController')

router.post('/payments/webhook', webhook);

module.exports = router;