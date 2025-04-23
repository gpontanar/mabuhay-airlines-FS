import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import UserContext from '../context/UserContext';


const FlightCard = ({ flight, onBookClick }) => {
  const { user } = useContext(UserContext); // Get the user context

  // Skip rendering if the flight is archived (isActive: false)
  if (!flight.isActive) return null;

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
    currency: 'PHP',
  }).format(flight.price);

  const handleBookClick = () => {
    const user = JSON.parse(localStorage.getItem('user'));
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
      onBookClick(flight._id);
    }
  };

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
            <strong>Route:</strong> {flight.from} → {flight.to}
          </p>
          <p className="card-text">
            <strong>Departure:</strong> {new Date(flight.departure).toLocaleString()}
          </p>
          <p className="card-text">
            <strong>Seats Available:</strong> {flight.availableSeats}
            {flight.availableSeats < 5 && (
              <span className="badge badge-low">Only {flight.availableSeats} left!</span>
            )}
          </p>
          <p className="card-text">
            <strong>Cabin:</strong>{' '}
            {flight.cabinClasses && flight.cabinClasses.length > 0 ? (
              flight.cabinClasses.map((cabin, idx) => (
                <span key={idx} className={getCabinBadgeClass(cabin)} style={{ marginRight: '5px' }}>
                  {cabin}
                </span>
              ))
            ) : (
              'N/A'
            )}
          </p>
          <p className="card-text">
            <strong>Price:</strong> <span className="price-tag">{formattedPrice}</span>
          </p>
          <button
            className="btn w-100 mt-2"
            onClick={handleBookClick}
            disabled={user?.isAdmin} // Disable button if user is an admin
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;