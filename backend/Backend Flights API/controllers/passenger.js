const Passenger = require('../models/Passenger');

exports.getPassengerById = async (req, res) => {
  try {
    const passenger = await Passenger.findById(req.params.id);
    if (!passenger) return res.status(404).json({ error: "Passenger not found" });
    res.json(passenger);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPassenger = async (req, res) => {
  try {
    const passenger = new Passenger(req.body);
    const savedPassenger = await passenger.save();
    res.status(201).json(savedPassenger);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create passenger', details: error.message });
  }
};
