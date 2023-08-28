const stripe = require('../config/stripe')
const Violation = require('../models/Violation');


exports.webhook = async (req, res) => {
  const event = req.body;

  // Handle the 'checkout.session.completed' event
  if (event.type === 'checkout.session.completed') {
    const paymentIntent = event.data.object;
    const violationId = paymentIntent.metadata.violationId;
    
    // Update the paid field for the associated violation in your database
    try {
      const violation = await Violation.findById(violationId);
      if (violation) {
        violation.paid = true;
        await violation.save();
        console.log('Amount Payed!')
      }
    } catch (error) {
      console.error('Error updating database:', error);
    }
  }

  // Send a response to acknowledge receipt of the event
  res.json({ received: true });
}

