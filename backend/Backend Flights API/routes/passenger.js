const express = require('express');
const router = express.Router();
const passengerController = require('../controllers/passenger');

router.get('/:id', passengerController.getPassengerById);
router.post('/', passengerController.createPassenger);
module.exports = router;
