// src/components/EditFlight.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditFlight = () => {
  const [formData, setFormData] = useState({
    airline: '',
    departure: '',
    arrival: '',
    from: '',
    to: '',
    availableSeats: '',
    cabinClasses: '',
    price: '',
  });
  const { id: flightId } = useParams(); // Get the flight ID from the URL
  const navigate = useNavigate();

  // Fetch the flight data when the component mounts
  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/flights/${flightId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
    
        if (res.ok) {
          setFormData({
            airline: data.airline?.name || '',
            departure: data.departure ? new Date(data.departure).toISOString().slice(0, 16) : '',
            arrival: data.arrival ? new Date(data.arrival).toISOString().slice(0, 16) : '',
            from: data.from,
            to: data.to,
            availableSeats: data.availableSeats,
            cabinClass: data.cabinClasses[0] || '', // Use the first cabin class as the default value
            price: data.price,
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Flight not found.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      } catch (err) {
        console.error(err);
        Swal.fire({
          title: 'Error',
          text: 'Something went wrong while fetching flight data.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    };

    fetchFlightData();
  }, [flightId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/flights/${flightId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          ...formData,
          cabinClasses: [formData.cabinClass], // Convert cabinClass to an array
          airline: formData.airline,
        }),
      });
  
      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Flight updated successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/admin'); // Navigate to the admin dashboard after success
        });
      } else {
        Swal.fire({
          title: 'Failed to Update Flight',
          text: data.error || 'Something went wrong.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };
  return (
    <div className="container">
      <h2 className="my-4">Edit Flight</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="airline" className="form-label">Airline</label>
          <input
            type="text"
            id="airline"
            name="airline"
            className="form-control"
            value={formData.airline}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="departure" className="form-label">Departure Date and Time</label>
          <input
            type="datetime-local"
            id="departure"
            name="departure"
            className="form-control"
            value={formData.departure}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="arrival" className="form-label">Arrival Date and Time</label>
          <input
            type="datetime-local"
            id="arrival"
            name="arrival"
            className="form-control"
            value={formData.arrival}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="from" className="form-label">From</label>
          <input
            type="text"
            id="from"
            name="from"
            className="form-control"
            value={formData.from}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="to" className="form-label">To</label>
          <input
            type="text"
            id="to"
            name="to"
            className="form-control"
            value={formData.to}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="availableSeats" className="form-label">Available Seats</label>
          <input
            type="number"
            id="availableSeats"
            name="availableSeats"
            className="form-control"
            value={formData.availableSeats}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cabinClass" className="form-label">Cabin Class</label>
          <select
            id="cabinClass"
            name="cabinClass"
            className="form-select"
            value={formData.cabinClass}
            onChange={handleChange}
            required
          >
            <option value="">Select Cabin Class</option>
            <option value="Economy">Economy</option>
            <option value="Premium Economy">Premium Economy</option>
            <option value="Business">Business</option>
            <option value="First Class">First Class</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Flight</button>
      </form>
    </div>
  );
};

export default EditFlight;