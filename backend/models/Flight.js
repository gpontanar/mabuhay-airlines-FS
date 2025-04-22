const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  airline: { type: mongoose.Schema.Types.ObjectId, ref: 'Airline', required: true },
  departure: { type: Date, required: true },
  arrival: { type: Date, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  availableSeats: { type: Number, required: true },
  cabinClasses: { type: [String], required: true },
  price: { type: Number, required: true },
  isArchived: { type: Boolean, default: false },
});

module.exports = mongoose.model('Flight', flightSchema);
