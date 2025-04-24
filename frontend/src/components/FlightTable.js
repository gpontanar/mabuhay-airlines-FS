import React from "react";

const FlightTable = ({ flights, onEdit, onToggleArchive, onDelete }) => {
  const safeFlights = Array.isArray(flights) ? flights : [];

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Airline</th>
          <th>From</th>
          <th>To</th>
          <th>Departure</th>
          <th>Arrival</th>
          <th>Seats</th>
          <th>Cabins</th>
          <th>Price</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
  {safeFlights.length > 0 ? (
    safeFlights.map((flight) => (
      <tr key={flight._id}>
        <td>{flight.airline?.name || "N/A"}</td>
        <td>{flight.from}</td>
        <td>{flight.to}</td>
        <td>{flight.departure ? new Date(flight.departure).toLocaleString() : "N/A"}</td>
        <td>{flight.arrival ? new Date(flight.arrival).toLocaleString() : "N/A"}</td>
        <td>{flight.availableSeats || "N/A"}</td>
        <td>{flight.cabinClasses?.join(", ") || "N/A"}</td>
        <td>₱{flight.price || "N/A"}</td>
        <td>{flight.isActive ? "Active" : "Archived"}</td>
        <td>
          <button className="btn btn-warning" onClick={() => onEdit(flight)}>
            Edit
          </button>
          <button
            className={`btn ${flight.isActive ? "btn-secondary" : "btn-success"}`}
            onClick={() => onToggleArchive(flight._id)}
          >
            {flight.isActive ? "Archive" : "Activate"}
          </button>
          <button
            className="btn btn-danger"
            onClick={() => onDelete(flight._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="10">No flights available.</td>
    </tr>
  )}
</tbody>
    </table>
  );
};

export default FlightTable;