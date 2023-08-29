const fs = require('fs');
const path = require('path');

const Violation = require('../models/Violation');
const { generateReceiptPDF } = require('../services/generateReceiptService');

async function handlePaymentSuccess(violationId) {
  try {
    // Update the paid status in the database
    const violation = await Violation.findById(violationId);
    if (violation) {
      violation.paid = true;
      await violation.save();
    } else {
      console.error('Violation not found.');
      return false;
    }

    
// Function to generate a dynamic receipt number
function generateReceiptNumber() {
  const timestamp = violation.violationTime.toISOString();
  const formattedTimestamp = timestamp.replace(/[-:T.]/g, ''); // Remove separators and 'T'
  return `VIOL-${violation.violationLocation}-${formattedTimestamp}`;
}

    // Retrieve receipt data
    const receiptData = {
      receiptNumber: generateReceiptNumber(), 
      date: new Date().toISOString().split('T')[0], // Current date
      violatorName: violation.violatorName,
      fineAmount: violation.fineAmount,
    };

    // Call the generateReceiptPDF function from your PDF generation module
    const pdfFilePath = path.join(__dirname, '..', 'receipts', `${violationId}.pdf`); 
    const pdf = await generateReceiptPDF(receiptData, pdfFilePath);

    // PDF generated and database updated successfully
    return true;
  } catch (error) {
    console.error('Error handling payment success:', error);
    return false;
  }
}


module.exports = {
  handlePaymentSuccess
};
