const twilioClient  = require('../config/twilio.js');
const { shortenUrl } = require('./bitlyService');

// Send SMS with violation details
const sendPaymentLinkSMS = async (violationDetails) => {

  // Shorten Payment Link
  const shortenedPaymentLink = await shortenUrl(violationDetails.paymentLink);
  
  // Custom Message Body
  const messageBody = `🚗 Traffic Violation Alert 🚗

Dear ${violationDetails.violatorName},

Recent traffic violation:
Type: ${violationDetails.violationType}
Location: ${violationDetails.violationLocation}
Fine: ${violationDetails.fineAmount}

Pay Fine Online:
${shortenedPaymentLink}

Drive safely,
Traffic Alert System`;

console.log(violationDetails.violatorMobileNumber);
  try {
    const message = await twilioClient.messages.create({
      body: messageBody,
      from: process.env.twilioPhoneNumber, // Your Twilio phone number
      to: violationDetails.violatorMobileNumber,
    });

    console.log('SMS sent successfully:', message.sid);
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};

// Function to send SMS with receipt when payment is success
const sendPaymentSuccessSMS = async (recipientPhoneNumber, receiptId) => {
  
  // Receipt Link
  const receiptLink = `https://trafficoffence-alert.adarsh-2425.repl.co/api/receipts/download/${receiptId}`;

  // Shorten Receipt Link
  const shortenedReceiptLink = await shortenUrl(receiptLink);
  
  const messageBody = `
  Your payment was successful!

  You can download your receipt from this link: ${shortenedReceiptLink}.

  Thank you for using our service,
  Drive safely,
  Traffic Alert System.
`;

  try {
    const message = await twilioClient.messages.create({
      body: messageBody,
      from: process.env.twilioPhoneNumber,
      to: recipientPhoneNumber,
    });

    console.log('Receipt sent successfully:', message.sid);
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};

module.exports = {
  sendPaymentLinkSMS,
  sendPaymentSuccessSMS
}
