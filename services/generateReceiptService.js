// Generate a PDF Receipt when violator pays fine
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Function to generate PDF Receipt
exports.generateReceiptPDF = (receiptData, filePath) => {
  const doc = new PDFDocument();

  // Linking writeStream to pdfkit output with pipe
  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  doc.fontSize(16).text('Receipt', { align: 'center' }).moveDown(0.5);
  doc.fontSize(12).text(`Receipt Number: ${receiptData.receiptNumber}`);
  doc.fontSize(12).text(`Date: ${receiptData.date}`);
  doc.moveDown(0.5);
  doc.fontSize(14).text(`Received from: ${receiptData.violatorName}`);
  doc.fontSize(14).text(`The sum of INR ${receiptData.fineAmount} for violation fine.`);
  doc.moveDown(1);
  doc.fontSize(10).text('Thank you for your payment.');

  doc.end();
};