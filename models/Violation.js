const mongoose = require('mongoose');

const ViolationSchema = new mongoose.Schema({
  violatorName: String,
  violatorVehicleNumber: String,
  violationType: String,
  violationDateTime: String,
  violationLocation: String,
  fineAmount: Number,
  paid: Boolean,
  paymentLink: String
});

const Violation = mongoose.model('Violation', ViolationSchema);

module.exports = Violation;
