const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
  passenger: { type: mongoose.Schema.Types.ObjectId, ref: 'Passenger', required: true },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  seatNumber: { type: String, required: true },
  price: { type: Number, required: true },
  issueDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', ticketSchema);
