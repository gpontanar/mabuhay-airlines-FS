const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking');

router.post('/search', bookingController.searchBooking);
router.post('/add', bookingController.createBooking);

module.exports = router;
