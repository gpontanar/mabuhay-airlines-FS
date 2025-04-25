import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createPassenger, fetchFlightDetails } from '../api'; 

const PassengerInfo = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { flightId, userId } = state.booking;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('Male');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    if (!firstName || !lastName || !dateOfBirth) {
      alert('Please fill in all required fields');
      return;
    }

    const passengerData = {
      firstName,
      lastName,
      gender,
      dateOfBirth,
    };

    try {
      // Create passenger data
      const passenger = await createPassenger(passengerData);

      // Fetch flight details
      const flightData = await fetchFlightDetails(flightId); 

      if (!flightData) {
        throw new Error('Flight not found');
      }

      navigate('/payment', {
        state: {
          passenger,          
          flightId,            
          userId,             
          price: flightData.price,  
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
          <form onSubmit={handleSubmit}> {/* Updated to use onSubmit */}
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                id="firstName"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
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
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary"> {/* Changed to type="submit" */}
              Continue to Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PassengerInfo;
