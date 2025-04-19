const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flight');

// Route to get all flights
router.get('/', flightController.getAllFlights);

// Route to get a flight by ID
router.get('/:id', flightController.getFlightById);

// Route to create a new flight
router.post('/', flightController.createFlight);

// Route to update a flight by ID
router.put('/:id', flightController.updateFlight);

// Route to delete a flight by ID
router.delete('/:id', flightController.deleteFlight);

module.exports = router;
