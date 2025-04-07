const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  paymentStatus: { type: String, required: true } // e.g., 'completed', 'failed'
});

module.exports = mongoose.model('Payment', paymentSchema);
