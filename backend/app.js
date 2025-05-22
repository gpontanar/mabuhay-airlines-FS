const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user');
const bookingRoutes = require('./routes/booking');
const flightRoutes = require('./routes/flight');
const airlineRoutes = require('./routes/airline');
const passengerRoutes = require('./routes/passenger');
const ticketRoutes = require('./routes/ticket');
const paymentRoutes = require('./routes/payment');

const app = express();

app.use(cors());

// Use this CORS config for deployment
// app.use(cors({
//   origin: [
//     'https://your-frontend.vercel.app', 
//     'http://localhost:3000'
//   ],
//   credentials: true,
// }));
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/airlines', airlineRoutes);
app.use('/api/passengers', passengerRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/payments', paymentRoutes);

module.exports = app;
