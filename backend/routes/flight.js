const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flight');
const { verify, isLoggedIn, verifyAdmin } = require("../auth");

// Route to get all flights
router.get('/all', flightController.getAllFlights);

// Route to get a flight by ID
router.get('/:id', verify, verifyAdmin, flightController.getFlightById);

// Route to create a new flight
router.post('/add', verify, verifyAdmin, flightController.createFlight);

// Route to update a flight by ID
router.put('/:id', verify, verifyAdmin, flightController.updateFlight);

// Route to delete a flight by ID
router.delete('/:id', verify, verifyAdmin, flightController.deleteFlight);

router.patch('/:id/toggle-archive', verify, verifyAdmin, flightController.toggleArchiveFlight);

module.exports = router;
