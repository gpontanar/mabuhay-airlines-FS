import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    
    if (userData) {
      console.log('User data:', userData); // Debugging user data
      setUser(userData);
      // Fetch user bookings
      fetch(`${process.env.REACT_APP_API_URL}/api/users/${userData.id}/bookings`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.bookings) {
            setBookings(data.bookings);
          } else {
            setError("No bookings found.");
          }
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
          setError("An error occurred while fetching bookings.");
        })
        .finally(() => setLoading(false));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>Welcome to Your Dashboard, {user ? user.firstName : 'User'}!</h1>
      <p>Here you can manage your bookings and account details.</p>

      <div className="mb-4">
        <h3>Your Bookings</h3>
        {error && <p className="text-danger">{error}</p>}
        {bookings.length === 0 ? (
          <p>You have no bookings at the moment.</p>
        ) : (
          <ul className="list-group">
            {bookings.map((booking) => (
              <li key={booking._id} className="list-group-item">
                <h5>Booking ID: {booking._id}</h5>
                <p><strong>Flight:</strong> {booking.flight}</p>
                <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {booking.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-4">
        <h3>Account Details</h3>
        <p><strong>Email:</strong> {user ? user.email : 'Loading...'}</p>
        <p><strong>Full Name:</strong> {user ? `${user.firstName} ${user.lastName}` : 'Loading...'}</p>
        <p><strong>Gender:</strong> {user ? user.gender : 'Loading...'}</p>
        <p><strong>Mobile Number:</strong> {user ? user.mobileNumber : 'Loading...'}</p>
      </div>

      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserDashboard;
