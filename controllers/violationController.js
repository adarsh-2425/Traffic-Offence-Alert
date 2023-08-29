const Violation = require('../models/Violation');
const { createPaymentLink } = require('../services/paymentLinkService');

exports.createViolation = async (req, res) => {
  try {
    // Formatting date and time and combining
    const [year, month, day] = req.body.violationDate.split('-');
    const [hour, minute] = req.body.violationTime.split(':');
    const formattedDateTime = `${year}${month}${day}${hour}${minute}`;
    console.log(formattedDateTime);
    
    // Process the request body and create a new violation
    const newViolation = new Violation({
      violatorName: req.body.violatorName,
      violatorVehicleNumber: req.body.violatorVehicleNumber,
      violationType: req.body.violationType,
      violationDateTime: formattedDateTime,
      violationLocation: req.body.violationLocation,
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
