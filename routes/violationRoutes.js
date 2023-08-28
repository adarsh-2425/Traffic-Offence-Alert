const express = require('express');
const router = express.Router();
const violationController = require('../controllers/violationController');

router.post('/violations', violationController.createViolation);

module.exports = router;
