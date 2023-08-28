const express = require('express');
const router = express.Router();

const webhookController = require('../controllers/webhookController')

router.post('/payments/webhook', webhookController.webhook);

module.exports = router;