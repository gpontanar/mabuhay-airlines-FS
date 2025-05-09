import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getAllFlights, toggleArchiveFlight, getPassengersByFlight } from "../api";
import FlightTable from "./FlightTable";
import PassengerModal from './PassengerModal';
import UserContext from '../context/UserContext';
import Swal from 'sweetalert2'; // Import Swal for SweetAlert2 modals

const AdminDashboard = () => {
  const [flights, setFlights] = useState([]);
  const [passengers, setPassengers] = useState([]); // State for passengers
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [formData, setFormData] = useState({ email: '', password: '' }); // Define formData
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext); // Get the user context

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await getAllFlights();
        setFlights(response); // Load all flights, including archived ones
      } catch (err) {
        console.error("Error fetching flights:", err);
      }
    };

    fetchFlights();
  }, []);

  const handleToggleArchive = async (flightId) => {
    try {
      const response = await toggleArchiveFlight(flightId);
      if (response) {
        setFlights((prevFlights) =>
          prevFlights.map((flight) =>
            flight._id === flightId ? { ...flight, isActive: !flight.isActive } : flight
          )
        );
      }
    } catch (err) {
      console.error("Error toggling archive status:", err);
    }
  };

  const handleViewPassengers = async (flightId) => {
    try {
      const data = await getPassengersByFlight(flightId); // Fetch passengers for the flight
      setPassengers(data);
      setShowModal(true); // Show the modal with passenger details
    } catch (err) {
      console.error("Error fetching passengers:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log('Login Response:', data); // Debugging: Inspect the response

      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.access);
        setUser(data.user);

        Swal.fire({
          title: 'Mabuhay!',
          text: 'Welcome to your Mabuhay Airline account.',
          icon: 'success',
          confirmButtonText: 'Go to Dashboard',
        }).then(() => {
          if (data.user.isAdmin === true) { // Explicitly check for true
            navigate('/admin'); // Redirect to Admin Dashboard
          } else {
            navigate('/user-dashboard'); // Redirect to User Dashboard
          }
        });
      } else {
        Swal.fire({
          title: 'Login Failed',
          text: data.message || 'Incorrect username or password, please try again!',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (err) {
      console.error('Error during login:', err);
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
      <h2>Admin Dashboard</h2>
      <button className="btn btn-primary" onClick={() => navigate("/admin/create-flight")}>
        + Create Flight
      </button>
      <FlightTable
        flights={flights}
        onEdit={(flight) => navigate(`/admin/edit-flight/${flight._id}`)}
        onToggleArchive={handleToggleArchive}
        onViewPassengers={handleViewPassengers} // Pass the handler to FlightTable
      />
      {showModal && (
        <PassengerModal
          passengers={passengers}
          onClose={() => setShowModal(false)} // Close the modal
        />
      )}
    </div>
  );
};

export default AdminDashboard;