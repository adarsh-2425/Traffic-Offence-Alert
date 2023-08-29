const express = require('express');
const router = express.Router();
const { receiptDownload } = require('../services/receiptDownloadService');

// route for downloading receipts
router.get('/receipts/download/:receiptId', receiptDownload);

module.exports = router;