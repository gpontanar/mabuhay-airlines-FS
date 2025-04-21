const express = require('express');
const router = express.Router();
const airlineController = require('../controllers/airline');
const { verify, isLoggedIn, verifyAdmin, } = require("../auth");

router.get('/', airlineController.getAllAirlines);
router.get('/:id', verify, verifyAdmin, airlineController.getAirlineById);

router.post('/add', verify, verifyAdmin, airlineController.createAirline);
module.exports = router;
