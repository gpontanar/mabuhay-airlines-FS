const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  // passportNumber: { type: String, required: true },
  // nationality: { type: String, required: true }
});

module.exports = mongoose.model('Passenger', passengerSchema);
