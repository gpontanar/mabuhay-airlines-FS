// src/components/AddFlight.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddFlight = () => {
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
  const [airlines, setAirlines] = useState([]); // State to store the list of airlines
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAirlines = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/airlines`);
        const data = await res.json();
        if (res.ok) {
          setAirlines(data); // Set the list of airlines
        } else {
          console.error('Failed to fetch airlines:', data.error);
        }
      } catch (err) {
        console.error('Error fetching airlines:', err);
      }
    };

    fetchAirlines();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/flights/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          ...formData,
          cabinClasses: formData.cabinClasses.split(',').map((className) => className.trim()), // Convert cabin classes to an array
        }),
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Flight added successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/admin'); // Navigate to the admin dashboard after success
        });
      } else {
        Swal.fire({
          title: 'Failed to Add Flight',
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
      <h2 className="my-4">Add New Flight</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="airline" className="form-label">Airline</label>
          <select
            id="airline"
            name="airline"
            className="form-select"
            value={formData.airline}
            onChange={handleChange}
            required
          >
            <option value="">Select Airline</option>
            {airlines.map((airline) => (
              <option key={airline._id} value={airline._id}>
                {airline.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="departure" className="form-label">Departure Date</label>
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
          <label htmlFor="arrival" className="form-label">Arrival Date</label>
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
          <label htmlFor="cabinClasses" className="form-label">Cabin Classes (Comma separated)</label>
          <input
            type="text"
            id="cabinClasses"
            name="cabinClasses"
            className="form-control"
            value={formData.cabinClasses}
            onChange={handleChange}
            required
          />
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
        <button type="submit" className="btn btn-primary">Add Flight</button>
      </form>
    </div>
  );
};

export default AddFlight;