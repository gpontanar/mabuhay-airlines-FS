import React, { useEffect, useState } from 'react';
import { getAllFlights } from '../api'; 
import FlightCard from './FlightCard'; 

const AllFlights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      try {
        const data = await getAllFlights();
        // Filter out flights where isActive is false
        const activeFlights = data.filter((flight) => flight.isActive);
        setFlights(activeFlights);
      } catch (error) {
        console.error("Error fetching flights:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const handleBookClick = (flightId) => {
    console.log(`Redirecting to booking page for flight ID: ${flightId}`);
    // Add navigation logic here
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
            <FlightCard key={flight._id} flight={flight} onBookClick={handleBookClick} />
          ))
        ) : (
          <div>No flights available at this time.</div>
        )}
      </div>
    </div>
  );
};

export default AllFlights;