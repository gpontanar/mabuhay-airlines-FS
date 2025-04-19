const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create booking', details: error.message });
  }
};

exports.searchBooking = async (req, res) => {
  try {
    const {
      departure,
      arrival,
      from,
      to,
      cabinClass,
      passenger,
      promoFare
    } = req.body;

    const taxes = 1000;
    const total = promoFare + taxes;

    const searchResult = {
      departure,
      arrival,
      from,
      to,
      cabinClass,
      passenger,
      promoFare,
      taxes,
      total
    };

    res.status(200).json(searchResult);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
