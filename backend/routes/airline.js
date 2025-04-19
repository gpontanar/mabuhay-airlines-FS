const express = require('express');
const router = express.Router();
const airlineController = require('../controllers/airline');

router.get('/', airlineController.getAllAirlines);
router.get('/:id', airlineController.getAirlineById);

router.post('/', airlineController.createAirline);
module.exports = router;
