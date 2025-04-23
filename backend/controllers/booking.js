const Booking = require('../models/Booking');
const Flight = require('../models/Flight');

// Helper function to calculate promo and total fare (including tax)
const calculatePromoFare = (flight, passengerCount) => {
  let promoFare = 0;
  let promoName = null;

  // Check for PISO Fare promo (seats <= 20)
  if (flight.availableSeats <= 20) {
    promoFare = 1; // Set to 1 peso for the promo
    promoName = 'PISO Fare';
  }

  // Check for Mabuhay Promo (50% off for Manila to Cebu flights within the promo period)
  if (flight.from === 'Manila' && flight.to === 'Cebu') {
    const promoStartDate = new Date('2025-03-01');
    const promoEndDate = new Date('2025-03-30');
    const flightDate = new Date(flight.departure);

    if (flightDate >= promoStartDate && flightDate <= promoEndDate) {
      promoFare = flight.price * 0.5; 
      promoName = 'MabuhayPromo';
    }
  }

  // Calculate total fare after promo discount (if any)
  const totalFare = (flight.price - promoFare) * passengerCount;
  return { promoFare, promoName, totalFare };
};

// Create a booking
exports.createBooking = async (req, res) => {
  try {
    const { flightId, userId, passengerCount, cabinClass } = req.body;

    // Fetch flight details
    const flight = await Flight.findById(flightId);

    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' });
    }

    // Calculate promo and total fare
    const { promoFare, promoName, totalFare } = calculatePromoFare(flight, passengerCount);

    // Tax calculation ( 12% VAT)
    const tax = 0.12 * totalFare;
    const finalTotalFare = totalFare + tax;

    // Create the booking object
    const booking = new Booking({
      user: userId,
      flight: flightId,
      passengerCount,
      cabinClass,
      promoFare,
      totalFare: finalTotalFare, 
      promoName, 
    });

    // Save the booking
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create booking', details: error.message });
  }
};

// Search for flights and calculate fares with promo (if applicable)
exports.searchBooking = async (req, res) => {
  try {
    const { departure, arrival, from, to, cabinClass, passengerCount } = req.body;

    
    const flights = await Flight.find({ from, to, departure, arrival });

    if (!flights || flights.length === 0) {
      return res.status(404).json({ error: 'No flights found for the selected route' });
    }

   
    const searchResults = flights.map((flight) => {
      // Calculate promo and total fare
      const { promoFare, promoName, totalFare } = calculatePromoFare(flight, passengerCount);

         const tax = 0.12 * totalFare; 
      const finalTotalFare = totalFare + tax;

      return {
        flightId: flight._id,
        departure: flight.departure,
        arrival: flight.arrival,
        from: flight.from,
        to: flight.to,
        cabinClass: flight.cabinClasses,
        passengerCount,
        promoFare,
        taxes: tax, 
        totalFare: finalTotalFare,
        promoName,
      };
    });

    res.status(200).json(searchResults);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.params.id;
    const bookings = await Booking.find({ user: userId }).populate('flight'); // adjust as needed
    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

