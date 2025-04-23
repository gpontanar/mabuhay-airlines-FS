import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchFlightDetails, createBooking } from '../api'; // Import API functions

const BookingFlight = () => {
  const navigate = useNavigate();
  const { flightId } = useParams(); // Get the flightId from URL params
  const [flight, setFlight] = useState(null);
  const [passengerCount, setPassengerCount] = useState(1);
  const [cabinClass, setCabinClass] = useState('Economy');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch flight details when the component mounts
  useEffect(() => {
    const getFlightDetails = async () => {
      try {
        const flightDetails = await fetchFlightDetails(flightId);
        setFlight(flightDetails);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch flight details');
        setLoading(false);
      }
    };

    getFlightDetails();
  }, [flightId]);

  const handleBookingSubmit = async () => {
    const userId = JSON.parse(localStorage.getItem('user'))?.id; // Get user ID from localStorage
    if (!userId) {
      setError('User not logged in. Please log in to book a flight.');
      return;
    }

    const bookingData = {
      flightId,
      userId,
      passengerCount,
      cabinClass,
    };

    try {
      const response = await createBooking(bookingData);
      if (response.status === 201) {
        navigate('/booking-confirmation', { state: { booking: response.data } });
      }
    } catch (err) {
      setError('Failed to create booking');
    }
  };

  return (
    <div className="container my-5">
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2">Loading flight details...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          <h2>Booking Flight</h2>
          <div className="row mb-4">
            <div className="col-md-6">
              <h4>Flight Details</h4>
              <p><strong>From:</strong> {flight.from}</p>
              <p><strong>To:</strong> {flight.to}</p>
              <p><strong>Departure:</strong> {new Date(flight.departure).toLocaleString()}</p>
              <p><strong>Arrival:</strong> {new Date(flight.arrival).toLocaleString()}</p>
              <p><strong>Price:</strong> ₱{flight.price}</p>
            </div>
            <div className="col-md-6">
              <h4>Booking Details</h4>
              <div className="mb-3">
                <label htmlFor="passengerCount" className="form-label">Number of Passengers</label>
                <input
                  type="number"
                  id="passengerCount"
                  className="form-control"
                  value={passengerCount}
                  onChange={(e) => setPassengerCount(e.target.value)}
                  min="1"
                  max="10"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cabinClass" className="form-label">Cabin Class</label>
                <select
                  id="cabinClass"
                  className="form-select"
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value)}
                >
                  <option value="Economy">Economy</option>
                  <option value="Business">Business</option>
                  <option value="First">First</option>
                </select>
              </div>
              <button
                className="btn btn-primary"
                onClick={handleBookingSubmit}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingFlight;