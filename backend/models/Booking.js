const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
  date: { type: Date, default: Date.now },
  cabinClass: { type: String, required: true },
  passengerCount: { type: Number, required: true },
  totalFare: { type: Number, required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);
