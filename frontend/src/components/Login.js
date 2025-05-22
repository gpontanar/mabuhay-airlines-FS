import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext.js';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({ closeModal }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      if (res.ok) {
        // Store user and token in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.access);
  
        // Set user in context
        setUser(data.user);
  
        // Display success message
        Swal.fire({
          title: 'Mabuhay!',
          text: 'Welcome to your Mabuhay Airline account.',
          icon: 'success',
          confirmButtonText: 'Go to Dashboard',
        }).then(() => {
          closeModal?.(); // Close the login modal
  
          // Redirect based on isAdmin status
          if (data.user.isAdmin) {
            navigate('/admin'); // Redirect to Admin Dashboard
          } else {
            navigate('/user-dashboard'); // Redirect to User Dashboard
          }
        });
      } else {
        // Handle login failure
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
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="form-control"
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="form-control"
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">Login</button>
    </form>
  );
};

export default Login;