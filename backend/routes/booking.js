const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking');
const { verify } = require('../auth');

router.post('/search', bookingController.searchBooking);
router.post('/add', bookingController.createBooking);


router.get('/user/:id', verify, bookingController.getUserBookings);

module.exports = router;
