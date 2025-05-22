import React from 'react';
import '../index.css';
import promo1 from '../assets/FL-1.png';
import promo2 from '../assets/FL-2.png';
import promo3 from '../assets/FL-3.png';
import promo4 from '../assets/FL-4.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const deals = [
  {
    image: promo1,
    title: 'Mabuhay Promo Ticket',
    description: 'Book now and Get 50% Off on all Flights From Manila to Cebu. Promo runs from March 1 - March 30, 2025.',
  },
  {
    image: promo2,
    title: 'Super Promo Peso Fare',
    description: 'Dont miss the PISO Fare Promo Running NOW until March 30 to all domestic destinations',
  },
  {
    image: promo3,
    title: 'Weekend Wild Sale',
    description: 'Book weekend flights with 30% discount for all destinations. Promo runs from March 1 - March 30, 2025.',
  },
  {
    image: promo4,
    title: 'Mabuhay Family Package',
    description: 'Travel with your family and get special discounts for children and seniors. Promo runs from March 1 - March 30, 2025.',
  },
];

const FlightDeals = () => {
  const navigate = useNavigate();
  return (
    <div id="flight-deals-section" className="flight-deals-section">
      <div className="overlay-heading">
        <h1 className="text-center text-white mb-4">Flight Deals!</h1>
      </div>
      <div className="deals-container">
        {deals.map((deal, index) => (
          <div className="deal-card" key={index}>
            <div
              className="deal-image"
              style={{ backgroundImage: `url(${deal.image})` }}
            >
              <div className="deal-overlay text-start">
                <h3>{deal.title}</h3>
                <p>{deal.description}</p>
                <button className="book-now-btn" onClick={() => navigate('/flights')}>Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightDeals;