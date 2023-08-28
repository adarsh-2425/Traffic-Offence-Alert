const Violation = require('../models/Violation');
const { createPaymentLink } = require('./payment');

exports.createViolation = async (req, res) => {
  try {
    // Process the request body and create a new violation
    const newViolation = new Violation({
      violationType: req.body.violationType,
      violationTime: req.body.violationTime,
      fineAmount: req.body.fineAmount,
      paid: false,
    });
    await newViolation.save();

    // Create a payment link for the violation with the violator's name
    const paymentLink = await createPaymentLink(req.body.fineAmount, req.body.violatorName, newViolation._id);

    // Update the violation with payment link information (optional)
    newViolation.paymentLink = paymentLink;
    await newViolation.save();

    res.status(201).json({
      message: 'Violation recorded and notification sent.',
      paymentLink,
    });
  } catch (error) {
    console.error('Error creating violation:', error.message);
    res.status(500).json({ error: 'An error occurred while processing violation.' });
  }
};
