import React, { useState, useEffect, useContext } from "react"; // Add useContext here
import { useNavigate } from "react-router-dom";
import { getAllFlights, toggleArchiveFlight } from "../api";
import FlightTable from "./FlightTable";
import UserContext from '../context/UserContext';

const AdminDashboard = () => {
  const [flights, setFlights] = useState([]);
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
      />
    </div>
  );
};

export default AdminDashboard;