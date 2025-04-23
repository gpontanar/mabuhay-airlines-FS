import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Modal, Button, Collapse } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({ newPassword: '', confirmPassword: '' });
  const [isBookingsExpanded, setIsBookingsExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const userId = userData?.id;

    console.log("User data from localStorage:", userData);

    if (userId) {
     console.log("Fetching user with ID:", userData?.id);
     fetch(`${process.env.REACT_APP_API_URL}/api/users/${userData.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
     .then((res) => {
      if (!res.ok) {
        throw new Error('User not found');
      }
      return res.json();
    })
     .then((data) => {
      console.log("User data fetched:", data);
      setUser(data);
    })
     .catch((err) => {
      console.error('Error fetching user:', err);
      Swal.fire({
        title: 'Error',
        text: err.message || 'Failed to fetch user data.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    });



      // Show loading modal
     Swal.fire({
      title: 'Loading Booking History...',
      text: 'Please wait while we fetch your booking history.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

      // Fetch user bookings
     fetch(`${process.env.REACT_APP_API_URL}/api/bookings/user/${userData.id}`, {
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
     .finally(() => {
      setLoading(false);
          Swal.close(); // Close the loading modal
        });
   } else {
    navigate('/login');
  }
}, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleResetPassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Swal.fire({
        title: 'Error',
        text: 'Passwords do not match!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/update-password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ newPassword: passwordData.newPassword }),
      });

      if (res.ok) {
        Swal.fire({
          title: 'Success',
          text: 'Password has been reset.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          setShowResetPasswordModal(false);
          setPasswordData({ newPassword: '', confirmPassword: '' }); // Clear the fields
        });
      } else {
        const data = await res.json();
        Swal.fire({
          title: 'Error',
          text: data.message || 'Failed to reset password.',
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

  const isResetButtonDisabled = !passwordData.newPassword || !passwordData.confirmPassword || passwordData.newPassword !== passwordData.confirmPassword;

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
  <div className="container mt-5">
{/* Welcome Section */}
<div className="user-welcome">
<div className="user-welcome-overlay">
<h1>Welcome to Your Dashboard, {user ? user.firstName : 'User'}!</h1>
<p>Here you can manage your bookings and account details.</p>
</div>
</div>

{/* Account Details */}
<div className="mb-4">
<h3>Account Details</h3>
<p><strong>Prefix:</strong> {user?.prefix ?? 'N/A'}</p>
<p><strong>Full Name:</strong> {user ? `${user.firstName} ${user.lastName}` : 'N/A'}</p>
<p><strong>Gender:</strong> {user?.gender ?? 'N/A'}</p>
<p><strong>Mobile Number:</strong> {user?.mobileNumber ?? 'N/A'}</p>
<p><strong>Date of Birth:</strong> {user?.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
<p><strong>Address:</strong> {user?.address ?? 'N/A'}</p>
<p><strong>Email Address:</strong> {user?.email ?? 'N/A'}</p>
<button
className="btn"
style={{
  backgroundColor: 'navy',
  color: 'white',
  transition: 'background-color 0.3s',
  }}
  onMouseOver={(e) => (e.target.style.backgroundColor = 'red')}
  onMouseOut={(e) => (e.target.style.backgroundColor = 'navy')}
  onClick={() => setShowResetPasswordModal(true)}
  >
  Reset Password
  </button>
  </div>

{/* Your Bookings Section */}
<div className="mb-4">
<div
className="d-flex justify-content-between align-items-center p-3"
style={{
  backgroundColor: 'navy',
  color: 'white',
  borderRadius: '5px',
  cursor: 'pointer',
  }}
  onClick={() => setIsBookingsExpanded(!isBookingsExpanded)}
  >
  <h3 className="mb-0">Your Bookings</h3>
  <i className={`fas fa-chevron-${isBookingsExpanded ? 'up' : 'down'}`}></i>
  </div>
  <Collapse in={isBookingsExpanded}>
  <div className="mt-3">
  {error && <p className="text-danger">{error}</p>}
  {bookings.length === 0 ? (
    <p>You have no bookings at the moment.</p>
    ) : (
    <ul className="list-group">
    {/* {bookings.map((booking) => (
      <li key={booking._id} className="list-group-item">
      <h5>Booking ID: {booking._id}</h5>
      <p><strong>Flight:</strong> {booking.flight}</p>
      <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
      <p><strong>Status:</strong> {booking.status}</p>
      </li>
      ))} */}
      {bookings.map((booking) => (
      <li key={booking._id} className="list-group-item">
        <h5>Booking ID: {booking._id}</h5>
        {booking.flight ? (
          <>
            <p><strong>Flight:</strong> {booking.flight.airline?.name || 'N/A'}</p>
            <p><strong>From:</strong> {booking.flight.from}</p>
            <p><strong>To:</strong> {booking.flight.to}</p>
            <p><strong>Departure:</strong> {new Date(booking.flight.departure).toLocaleString()}</p>
            <p><strong>Arrival:</strong> {new Date(booking.flight.arrival).toLocaleString()}</p>
            <p><strong>Price:</strong> ₱{booking.flight.price}</p>
          </>
        ) : (
          <p>Flight details not available.</p>
        )}
      </li>
      ))}
      </ul>
      )}
      </div>
      </Collapse>
      </div>

    {/* Logout Button */}
    <button className="btn btn-danger" onClick={handleLogout}>
    Logout
    </button>

  {/* Reset Password Modal */}
  <Modal show={showResetPasswordModal} onHide={() => setShowResetPasswordModal(false)} centered>
  <Modal.Header closeButton>
  <Modal.Title>Reset Password</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <div className="mb-3">
  <label htmlFor="newPassword" className="form-label">New Password</label>
  <input
  type="password"
  id="newPassword"
  className="form-control"
  value={passwordData.newPassword}
  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
  />
  </div>
  <div className="mb-3">
  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
  <input
  type="password"
  id="confirmPassword"
  className="form-control"
  value={passwordData.confirmPassword}
  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
  />
  </div>
  <button
  className="btn w-100"
  style={{
    backgroundColor: 'navy',
    color: 'white',
    transition: 'background-color 0.3s',
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = 'red')}
    onMouseOut={(e) => (e.target.style.backgroundColor = 'navy')}
    onClick={handleResetPassword}
    disabled={isResetButtonDisabled} // Disable button if conditions are not met
    >
    Reset Password
    </button>
    </Modal.Body>
    </Modal>
    </div>
    );
  };

  export default UserDashboard;