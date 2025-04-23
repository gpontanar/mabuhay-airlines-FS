const mongoose = require('mongoose'); 
const Flight = require('../models/Flight');
const Airline = require('../models/Airline');



exports.getAllFlights = async (req, res) => {
  try {
    const user = req.user;

    // If the user is an admin, return all flights
    if (user && user.role === 'admin') {
      const flights = await Flight.find().populate('airline', 'name');
      return res.status(200).json(flights);
    }

    // For regular users, return only active flights
    const flights = await Flight.find({ isActive: true }).populate('airline', 'name');
    res.status(200).json(flights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get all flights with optional search filters
exports.searchFlights = async (req, res) => {
  try {
    const { from, to, departure, arrival } = req.query;

    
    let filter = {};

    if (from) {
      filter.departure = { $gte: new Date(from) };
    }
    if (to) {
      filter.arrival = { $lte: new Date(to) }; 
    }
    if (departure) {
      filter.departure = { $gte: new Date(departure) };
    }
    if (arrival) {
      filter.arrival = { $lte: new Date(arrival) }; 
    }

   
    let flights = await Flight.find(filter).populate('airline', 'name');

   
    if (flights.length === 0) {
      console.log("No flights found with the given filters. Returning all flights.");
      flights = await Flight.find().populate('airline', 'name'); 
    }

    res.status(200).json(flights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get flight by ID
exports.getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id).populate('airline', 'name'); // Populate airline name
    if (!flight) {
      return res.status(404).json({ error: "Flight not found" });
    }
    res.status(200).json(flight);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update flight details
// exports.updateFlight = async (req, res) => {
//   try {
//     const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!flight) {
//       return res.status(404).json({ error: "Flight not found" });
//     }
//     res.status(200).json(flight);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
exports.updateFlight = async (req, res) => {
  try {
    const { airline, ...updateData } = req.body;

    let airlineId = airline;

    // If the airline is a string (name), resolve it to an ObjectId or create a new airline
    if (!mongoose.Types.ObjectId.isValid(airline)) {
      let airlineDoc = await Airline.findOne({ name: airline });
      if (!airlineDoc) {
        // Create a new airline if it doesn't exist
        airlineDoc = new Airline({ name: airline });
        await airlineDoc.save();
      }
      airlineId = airlineDoc._id;
    }

    const flight = await Flight.findByIdAndUpdate(
      req.params.id,
      { ...updateData, airline: airlineId },
      { new: true }
    );

    if (!flight) {
      return res.status(404).json({ error: "Flight not found" });
    }

    res.status(200).json(flight);
  } catch (err) {
    console.error(err);
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

// Archive a flight
exports.toggleArchiveFlight = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ error: "Flight not found" });
    }

    flight.isActive = !flight.isActive; // Toggle the isActive status
    await flight.save();

    res.status(200).json({
      message: `Flight has been ${flight.isActive ? 'activated' : 'archived'}.`,
      flight,
    });
  } catch (err) {
    console.error(err);
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
