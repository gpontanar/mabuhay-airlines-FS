const mongoose = require('mongoose'); 
const Flight = require('../models/Flight');



// Get all flights
exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json(flights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get flight by ID
exports.getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ error: "Flight not found" });
    }
    res.status(200).json(flight);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update flight details
exports.updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!flight) {
      return res.status(404).json({ error: "Flight not found" });
    }
    res.status(200).json(flight);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a flight
exports.deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);
    if (!flight) {
      return res.status(404).json({ error: "Flight not found" });
    }
    res.status(200).json({ message: "Flight deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createFlight = async (req, res) => {
  console.log(req.body);  
  try {
    const { airline, departure, arrival, from, to, availableSeats, cabinClasses, price } = req.body;

    // Ensure the airline ID is valid
    if (!mongoose.Types.ObjectId.isValid(airline)) {
      return res.status(400).json({ error: "Invalid airline ID" });
    }

    const newFlight = new Flight({
      airline,
      departure,
      arrival,
      from,
      to,
      availableSeats,
      cabinClasses,
      price
    });

    const savedFlight = await newFlight.save();
    return res.status(201).json(savedFlight);
  } catch (err) {
    console.error("Error creating flight:", err); 
    return res.status(500).json({ error: "Failed to create flight", details: err.message });
  }
};
