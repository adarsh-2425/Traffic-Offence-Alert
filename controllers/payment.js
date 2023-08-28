const stripe = require('../config/stripe');

async function createPaymentLink(fineAmount, violatorName, violationId) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            unit_amount: fineAmount * 100, // Convert to cents
            product_data: {
              name: `Traffic Violation Fine Payment for ${violatorName}`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        violationId: `${violationId}`, // Pass the violationId as STRING to metadata
      },
      mode: 'payment',
      success_url: 'https://yourwebsite.com/success',
      cancel_url: 'https://yourwebsite.com/cancel',
    });

    return session.url;
  } catch (error) {
    console.error('Error creating payment link:', error);
    return null;
  }
}


module.exports = { createPaymentLink };