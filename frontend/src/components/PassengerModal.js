import React from 'react';

const PassengerModal = ({ passengers, onClose }) => {
  return (
    <div className="modal show" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Passenger Details</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {passengers.length > 0 ? (
              <ul className="list-group">
                {passengers.map((passenger, index) => (
                  <li key={index} className="list-group-item">
                    <p><strong>User:</strong> {passenger.user.name || 'N/A'}</p>
                    <p><strong>Passenger Count:</strong> {passenger.passengerCount}</p>
                    <p><strong>Cabin Class:</strong> {passenger.cabinClass}</p>
                    <p><strong>Total Fare:</strong> ₱{passenger.totalFare}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No passengers found for this flight.</p>
            )}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerModal;