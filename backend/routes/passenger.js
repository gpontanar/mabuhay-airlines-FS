const express = require('express');
const router = express.Router();
const passengerController = require('../controllers/passenger');
const { verify, verifyAdmin } = require('../auth');

router.get('/:id', passengerController.getPassengerById);
router.post('/', passengerController.createPassenger);
// Route to get passengers for a specific flight
router.get('/flight/:flightId', verify, verifyAdmin, passengerController.getPassengersByFlight);


module.exports = router;
