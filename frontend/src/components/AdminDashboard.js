import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllFlights, deleteFlight } from "../api";
import FlightTable from "./FlightTable";

const AdminDashboard = () => {
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();

  // Fetch flights when the component mounts
  useEffect(() => {
    const fetchFlights = async () => {
      const response = await getAllFlights();
      setFlights(response); 
    };
    fetchFlights();
  }, []);

  // Handle the edit button click
 const handleEdit = (flight) => {
  navigate(`/admin/edit-flight/${flight._id}`); 
};
  // Handle the delete button click
  const handleDelete = async (flightId) => {
    const response = await deleteFlight(flightId); // Call API to delete the flight
    if (response.success) {
      setFlights(flights.filter((flight) => flight._id !== flightId)); // Remove flight from state
    } else {
      alert("Error deleting flight");
    }
  };

  return (
     <div className="container">
      <h2>Admin Dashboard</h2>
      <button className="btn btn-primary" onClick={() => navigate("/admin/create-flight")}>
        + Create Flight
      </button>
      <FlightTable flights={flights} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default AdminDashboard;