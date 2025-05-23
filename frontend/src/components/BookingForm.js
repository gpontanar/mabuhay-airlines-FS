import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const BookingForm = () => {
  const [tripType, setTripType] = useState("oneWay");
  const [departureCity, setDepartureCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1 Adult");
  const [cabinClass, setCabinClass] = useState("Economy");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all required fields are filled, if not, don't proceed
    if (!departureCity || !destinationCity || !departureDate) {
      alert('Please fill in all required fields!');
      return;
    }

    // If round trip, ensure return date is provided
    if (tripType === "roundTrip" && !returnDate) {
      alert('Please select a return date for round trip.');
      return;
    }

    
    console.log("Navigating with data:", {
  tripType,
  departureCity,
  destinationCity,
  departureDate,
  returnDate,
  passengers,
  cabinClass,
});

    // Navigate to the search results page with the form data
    navigate('/results', {
      state: {
        tripType,
        departureCity,
        destinationCity,
        departureDate,
        returnDate,
        passengers,
        cabinClass,
      }
    });
  };

  return (
    <>
      <div className="action-buttons">
        <button className="btn btn-book">Book Flights</button>
        <button className="btn btn-manage">Manage Booking</button>
        <button className="btn btn-promo" onClick={() => {
    document.getElementById('flight-deals-section').scrollIntoView({ behavior: 'smooth' });
  }}>Promo Flights</button>
      </div>
      <div className="booking-form-container">
        <div className="booking-form">
          <form onSubmit={handleSubmit}>
            <div className="trip-type mb-3">
              <label className="radio-label">
                <input
                  type="radio"
                  name="tripType"
                  value="oneWay"
                  checked={tripType === "oneWay"}
                  onChange={() => setTripType("oneWay")} 
                />
                One Way
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="tripType"
                  value="roundTrip"
                  checked={tripType === "roundTrip"}
                  onChange={() => setTripType("roundTrip")}
                />
                Round Trip
              </label>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group mb-3">
                  <label htmlFor="departureFrom">Departure From</label>
                  <select
                    id="departureFrom"
                    className="form-select"
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                  >
                    <option value="">Select City</option>
                    <option value="manila">Manila</option>
                    <option value="cebu">Cebu</option>
                    <option value="davao">Davao</option>
                    <option value="iloilo">Iloilo</option>
                    <option value="baguio">Baguio</option>
                    <option value="palawan">Palawan</option>
                    <option value="bohol">Bohol</option>
                    <option value="caticlan">Caticlan</option>
                    <option value="siargao">Siargao</option>

                  </select>
                </div>
              </div>
              <div className="col">
                <div className="form-group mb-3">
                  <label htmlFor="destinationTo">Destination To</label>
                  <select
                    id="destinationTo"
                    className="form-select"
                    value={destinationCity}
                    onChange={(e) => setDestinationCity(e.target.value)}
                  >
                    <option value="">Select City</option>
                    <option value="manila">Manila</option>
                    <option value="cebu">Cebu</option>
                    <option value="davao">Davao</option>
                    <option value="iloilo">Iloilo</option>
                    <option value="baguio">Baguio</option>
                    <option value="palawan">Palawan</option>
                    <option value="bohol">Bohol</option>
                    <option value="caticlan">Caticlan</option>
                    <option value="siargao">Siargao</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group mb-3">
                  <label htmlFor="departureDate">Departure Date</label>
                  <input
                    type="date"
                    id="departureDate"
                    className="form-control"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group mb-3">
                  <label htmlFor="returnDate">Return Date</label>
                  <input
                    type="date"
                    id="returnDate"
                    className="form-control"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    disabled={tripType === "oneWay"}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group mb-3">
                  <label htmlFor="passengers">Passengers</label>
                  <select
                    id="passengers"
                    className="form-select mb-3"
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                  >
                    <option value="1 Adult">1 Adult</option>
                    <option value="2 Adults">2 Adults</option>
                    <option value="3 Adults">3 Adults</option>
                    <option value="4 Adults">4 Adults</option>
                    <option value="1 Adult, 1 Child">1 Adult, 1 Child</option>
                    <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
                    <option value="2 Adults, 2 Children">2 Adults, 2 Children</option>
                  </select>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="cabinClass">Cabin Class</label>
                  <select
                    id="cabinClass"
                    className="form-select"
                    value={cabinClass}
                    onChange={(e) => setCabinClass(e.target.value)}
                  >
                    <option value="Economy">Economy</option>
                    <option value="Premium Economy">Premium Economy</option>
                    <option value="Business">Business</option>
                    <option value="First Class">First Class</option>
                  </select>
                </div>
              </div>
            </div>

            <button type="submit" className="search-btn">Search Flights</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
