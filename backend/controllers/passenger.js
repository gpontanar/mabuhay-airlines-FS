const Passenger = require('../models/Passenger');
const Booking = require('../models/Booking');

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

exports.getPassengersByFlight = async (req, res) => {
  try {
    const flightId = req.params.flightId;

    // Find bookings for the specific flight
    const bookings = await Booking.find({ flight: flightId }).populate('user');

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No passengers found for this flight' });
    }

    // Extract passenger details from bookings
    const passengers = bookings.map((booking) => ({
      user: booking.user,
      passengerCount: booking.passengerCount,
      cabinClass: booking.cabinClass,
      totalFare: booking.totalFare,
    }));

    res.status(200).json(passengers);
  } catch (err) {
    console.error('Error fetching passengers:', err);
    res.status(500).json({ error: 'Failed to fetch passengers' });
  }
};