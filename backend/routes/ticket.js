const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket');

router.post('/', ticketController.createTicket);
router.get('/:id', ticketController.getTicketById);

module.exports = router;
