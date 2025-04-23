import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllFlights, toggleArchiveFlight } from "../api";
import FlightTable from "./FlightTable";

const AdminDashboard = () => {
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlights = async () => {
      const response = await getAllFlights();
      setFlights(response); // Load all flights, including archived ones
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