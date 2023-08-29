const { handlePaymentSuccess } = require('../controllers/paymentSuccessController'); 

exports.webhook = async (req, res) => {
  const event = req.body;

  // Handle the 'checkout.session.completed' event
  if (event.type === 'checkout.session.completed') {
    const paymentIntent = event.data.object;
    const violationId = paymentIntent.metadata.violationId;

    // Trigger the handlePaymentSuccess function to update database and generate PDF
    const success = await handlePaymentSuccess(violationId);

    if (success) {
      console.log('Database updated and PDF generated.');
      // Respond with true to acknowledge successful processing
      res.json({ received: true });
    } else {
      console.log('Error updating database or generating PDF.');
      // Respond with false to indicate an issue
      res.json({ received: false });
    }
  }
};
