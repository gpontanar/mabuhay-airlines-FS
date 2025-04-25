const Payment = require('../models/Payment');
const Ticket = require('../models/Ticket'); 

exports.processPayment = async (req, res) => {
  try {
   
    const { ticket, amount, paymentStatus } = req.body;
    
    if (!ticket || !amount || !paymentStatus) {
      return res.status(400).json({ error: 'Ticket ID, amount, and payment status are required' });
    }

   
    const ticketData = await Ticket.findById(ticket);
    if (!ticketData) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

   
    const payment = new Payment({
      ticket,
      amount,
      paymentStatus,
    });

  
    await payment.save();

   
    ticketData.paymentStatus = 'Paid'; 
    await ticketData.save();

  
    res.status(201).json(payment);

  } catch (err) {
    console.error('Error processing payment:', err);
    res.status(500).json({ error: 'An error occurred while processing payment' });
  }
};
