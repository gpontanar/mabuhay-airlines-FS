import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchFlightsData } from './api'; // API fetch function
import FlightCard from './FlightCard';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    tripType,
    departureCity,
    destinationCity,
    departureDate,
    returnDate,
    passengers,
    cabinClass,
  } = location.state || {};

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFlights = async () => {
      setLoading(true);

      const allFieldsFilled = departureCity && destinationCity && departureDate && cabinClass;

      const data = await fetchFlightsData(
        allFieldsFilled ? {
          from: departureCity,
          to: destinationCity,
          date: departureDate,
          cabinClass,
        } : {}
      );

      setFlights(data);
      setLoading(false);
    };

    getFlights();
  }, [departureCity, destinationCity, departureDate, cabinClass]);

  const handleBookClick = (flightId) => {
    navigate(`/book/${flightId}`);
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Search Results</h2>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2">Loading flights...</p>
        </div>
      ) : flights.length > 0 ? (
        <div className="row">
          {flights.map((flight) => (
            <FlightCard
              key={flight._id}
              flight={flight}
              onBookClick={handleBookClick}
            />
          ))}
        </div>
      ) : (
        <div className="alert alert-warning">No flights found for the selected route.</div>
      )}
    </div>
  );
};

export default SearchResults;
