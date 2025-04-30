import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getAllFlights, toggleArchiveFlight, getPassengersByFlight } from "../api"; // Import getPassengersByFlight
import FlightTable from "./FlightTable";
import PassengerModal from './PassengerModal';
import UserContext from '../context/UserContext';

const AdminDashboard = () => {
  const [flights, setFlights] = useState([]);
  const [passengers, setPassengers] = useState([]); // State for passengers
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Get the user context

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