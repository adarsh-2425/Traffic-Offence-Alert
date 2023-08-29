const PDFDocument = require('pdfkit');
const fs = require('fs');

// Example data for the receipt
const receiptData = {
  receiptNumber: '123456',
  date: '2023-08-28',
  violatorName: 'John Doe',
  fineAmount: 1000, // Amount in INR
};

// Create a new PDF document
const doc = new PDFDocument();

// Pipe the PDF content to a writable stream (e.g., a file)
const writeStream = fs.createWriteStream('receipt.pdf');
doc.pipe(writeStream);

// Add content to the PDF
doc.fontSize(16).text('Receipt', { align: 'center' }).moveDown(0.5);
doc.fontSize(12).text(`Receipt Number: ${receiptData.receiptNumber}`);
doc.fontSize(12).text(`Date: ${receiptData.date}`);
doc.moveDown(0.5);
doc.fontSize(14).text(`Received from: ${receiptData.violatorName}`);
doc.fontSize(14).text(`The sum of INR ${receiptData.fineAmount} for violation fine.`);
doc.moveDown(1);
doc.fontSize(10).text('Thank you for your payment.');

// Finalize the PDF and close the stream
doc.end();
