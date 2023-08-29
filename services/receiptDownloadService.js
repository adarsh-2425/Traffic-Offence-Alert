const path = require('path');
const fs = require('fs');

exports.receiptDownload = async (req, res) => {
  const receiptId = req.params.receiptId;
  const pdfPath = path.join(__dirname, '..', 'receipts', `${receiptId}.pdf`);

  // Check if the PDF exists
  if (fs.existsSync(pdfPath)) {
    const pdfStream = fs.createReadStream(pdfPath);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${receiptId}.pdf`);
    
    pdfStream.pipe(res);
  } else {
    res.status(404).send('PDF not found');
  }
}