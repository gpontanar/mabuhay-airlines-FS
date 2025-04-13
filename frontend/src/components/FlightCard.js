import React from 'react';

const FlightCard = ({ flight, onBookClick }) => {
  const getCabinBadgeClass = (cabin) => {
    switch (cabin.toLowerCase()) {
      case 'business':
        return 'badge badge-business';
      case 'first':
        return 'badge badge-first';
      default:
        return 'badge badge-economy';
    }
  };

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(flight.price);

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="flight-card">
        <div className="flight-card-header text-center">
          <img
            src={flight.airline.logoUrl}
            alt={flight.airline.name}
            className="img-fluid"
            style={{ maxWidth: '150px', maxHeight: '50px' }}
          />
        </div>
        <div className="flight-card-body p-3">
          <h5 className="card-title text-center">{flight.airline.name}</h5>
          
          <p className="card-text">
            <span className="icon-animate">🛫</span> <strong>Route:</strong> {flight.from} → {flight.to}
          </p>

          <p className="card-text">
            <span className="icon-animate">✈️</span> <strong>Flight Number:</strong> {flight.flightNumber || 'N/A'}
          </p>

          <p className="card-text">
            <span className="icon-animate">🕒</span> <strong>Departure:</strong>{' '}
            {new Date(flight.departure).toLocaleString()}
          </p>

          <p className="card-text">
            <span className="icon-animate">💺</span> <strong>Seats Available:</strong> {flight.availableSeats}
            {flight.availableSeats < 5 && (
              <span className="badge badge-low">Only {flight.availableSeats} left!</span>
            )}
          </p>

          <p className="card-text">
          <strong>Cabin:</strong>{' '}
          {flight.cabinClass ? (
          	<span className={getCabinBadgeClass(flight.cabinClass)}>
          	{flight.cabinClass}
          	</span>
          	) : (
          	'N/A'
          )}
          </p>


          <p className="card-text">
          <strong>Price:</strong>{' '}
          <span className="price-tag">{formattedPrice}</span>
          </p>


          <button
            className="btn w-100 mt-2"
            onClick={() => onBookClick(flight.id)}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
