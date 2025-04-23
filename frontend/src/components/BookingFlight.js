import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchFlightDetails } from '../api'; 
import { createBooking } from '../api'; 

const BookingFlight = () => {
  const navigate = useNavigate();
  const { flightId } = useParams(); // Getting the flightId from URL params
  const [flight, setFlight] = useState(null);
  const [passengerCount, setPassengerCount] = useState(1);
  const [cabinClass, setCabinClass] = useState('Economy');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    const userId = 'USER_ID'; // Replace with the actual user ID from the context or session
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
              <p><strong>Price:</strong> ${flight.price}</p>
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
