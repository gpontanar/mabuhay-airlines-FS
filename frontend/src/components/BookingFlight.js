import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchFlightDetails } from '../api'; // Import API functions

const BookingFlight = () => {
  const navigate = useNavigate();
  const { flightId } = useParams(); // Get the flightId from URL params
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch flight details when the component mounts
  useEffect(() => {
    const getFlightDetails = async () => {
      try {
        const flightDetails = await fetchFlightDetails(flightId);
        if (flightDetails) {
          setFlight(flightDetails);
        } else {
          setError('Flight not found');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch flight details');
        setLoading(false);
      }
    };

    getFlightDetails();
  }, [flightId]);

  const handleContinueToPassengerInfo = () => {
    const userId = JSON.parse(localStorage.getItem('user'))?.id;
    if (!userId) {
      setError('User not logged in. Please log in to book a flight.');
      return;
    }

    // Save flightId and userId for the next step
    const bookingData = {
      flightId,
      userId,
    };

   
    navigate('/passenger', { state: { booking: bookingData } });
  };

  // If the flight is null or not found, show an appropriate message
  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2">Loading flight details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger">{error}</div>
    );
  }

  // Render flight details if the flight data exists
  return (
    <div className="container my-5">
      <h2>Booking Flight</h2>
      <div className="row mb-4">
        <div className="col-md-6">
          <h4>Flight Details</h4>
          <p><strong>From:</strong> {flight?.from}</p>
          <p><strong>To:</strong> {flight?.to}</p>
          <p><strong>Departure:</strong> {new Date(flight?.departure).toLocaleString()}</p>
          <p><strong>Arrival:</strong> {new Date(flight?.arrival).toLocaleString()}</p>
          <p><strong>Price:</strong> ₱{flight?.price}</p>
          <button
            className="btn btn-primary"
            onClick={handleContinueToPassengerInfo}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingFlight;
