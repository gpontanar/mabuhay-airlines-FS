const mongoose = require('mongoose');

const airlineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: false },
  logo: { type: String }, 
  contact: { type: String } 
});

module.exports = mongoose.model('Airline', airlineSchema);