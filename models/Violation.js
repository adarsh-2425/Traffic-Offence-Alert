const mongoose = require('mongoose');

const ViolationSchema = new mongoose.Schema({
  violationType: String,
  violationTime: Date,
  fineAmount: Number,
  paid: Boolean,
});

const Violation = mongoose.model('Violation', ViolationSchema);

module.exports = Violation;
