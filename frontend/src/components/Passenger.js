import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createPassenger, fetchFlightDetails } from '../api';
import UserContext from '../context/UserContext'; // Import UserContext

const PassengerInfo = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { flightId, userId } = state.booking;

  const { user } = useContext(UserContext); // Access user details from UserContext

  const [prefix, setPrefix] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [passengerCount, setPassengerCount] = useState(1);
  const [flightDetails, setFlightDetails] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isEditable, setIsEditable] = useState(false); // State to toggle edit mode

  // Populate form fields with user details when the component mounts
  useEffect(() => {
    console.log('User in PassengerInfo:', user);
    if (user) {
      setPrefix(user.prefix || '');
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setGender(user.gender || '');
      setDateOfBirth(user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '');
    }
  }, [user]);

  // Fetch flight details and calculate total price
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const flight = await fetchFlightDetails(flightId);
        setFlightDetails(flight);
        setTotalPrice(flight.price * passengerCount);
      } catch (err) {
        console.error('Error fetching flight details:', err);
      }
    };

    fetchDetails();
  }, [flightId, passengerCount]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    if (!firstName || !lastName || !dateOfBirth) {
      alert('Please fill in all required fields');
      return;
    }

    const passengerData = {
      prefix,
      firstName,
      lastName,
      gender,
      dateOfBirth,
    };

    try {
      // Create passenger data
      const passenger = await createPassenger(passengerData);

      navigate('/payment', {
        state: {
          passenger,
          flightId,
          userId,
          totalPrice,
        },
      });
    } catch (err) {
      console.error('Error submitting passenger data:', err);
      alert('Failed to submit passenger information');
    }
  };

  return (
    <div className="container my-5">
      <h2>Passenger Information</h2>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="prefix" className="form-label">Prefix</label>
              <select
                id="prefix"
                className="form-select"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                disabled={!isEditable} // Disable unless in edit mode
              >
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Mrs.">Mrs.</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                id="firstName"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
                disabled={!isEditable} // Disable unless in edit mode
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                id="lastName"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
                disabled={!isEditable} // Disable unless in edit mode
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                className="form-control"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                disabled={!isEditable} // Disable unless in edit mode
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">Gender</label>
              <select
                id="gender"
                className="form-select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                disabled={!isEditable} // Disable unless in edit mode
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="passengerCount" className="form-label">Number of Passengers</label>
              <input
                type="number"
                id="passengerCount"
                className="form-control"
                value={passengerCount}
                onChange={(e) => setPassengerCount(Number(e.target.value))}
                min="1"
                max="10"
                required
              />
            </div>
            <button type="button" className="btn btn-secondary me-2" onClick={() => setIsEditable(!isEditable)}>
              {isEditable ? 'Cancel Edit' : 'Edit'}
            </button>
            <button type="submit" className="btn btn-primary">
              Continue to Payment
            </button>
          </form>
        </div>
        <div className="col-md-6">
          {flightDetails && (
            <div className="flight-details">
              <h4>Flight Details</h4>
              <p><strong>From:</strong> {flightDetails.from}</p>
              <p><strong>To:</strong> {flightDetails.to}</p>
              <p><strong>Departure:</strong> {new Date(flightDetails.departure).toLocaleString()}</p>
              <p><strong>Price per Passenger:</strong> ₱{flightDetails.price}</p>
              <h5 className="mt-3"><strong>Total Price:</strong> ₱{totalPrice}</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PassengerInfo;