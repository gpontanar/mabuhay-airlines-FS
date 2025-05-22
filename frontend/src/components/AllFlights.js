import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../context/UserContext.js';
import Swal from 'sweetalert2';
import { getAllFlights } from '../api';
import FlightCard from './FlightCard.js';

const AllFlights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext); // Get the user context

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      try {
        const data = await getAllFlights();
        setFlights(data); // Set all active flights
      } catch (error) {
        console.error("Error fetching flights:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const handleBookClick = (flightId) => {
    if (!user) {
      Swal.fire({
        title: 'Login Required',
        text: 'Please log in to book a flight.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    } else if (user.isAdmin) {
      Swal.fire({
        title: 'Access Denied',
        text: 'Only regular users can book flights!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } else {
      console.log(`Redirecting to booking page for flight ID: ${flightId}`);
      // Add navigation logic here
    }
  };

  if (loading) {
    return <div>Loading flights...</div>;
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">All Available Flights</h2>
      <div className="row">
        {flights.length > 0 ? (
          flights.map((flight) => (
            <FlightCard
              key={flight._id}
              flight={flight}
              onBookClick={handleBookClick}
              isAdmin={user?.isAdmin} // Pass isAdmin to FlightCard
            />
          ))
        ) : (
          <div>No flights available at this time.</div>
        )}
      </div>
    </div>
  );
};

export default AllFlights;