
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import Swal from 'sweetalert2';
import 'notyf/notyf.min.css';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({ closeModal, openSignUpModal }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext); 


  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = async e => {
  // e.preventDefault();
  // try {
  //   const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(formData),
  //   });
  e.preventDefault();
  try {
    const apiUrl = 'http://web-api:4000';
    const res = await fetch(`${apiUrl}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });


    const data = await res.json();
      console.log(data);  // Add this line to inspect the response

    if (res.ok) {
      // Check if user exists in the response
      if (data.user && data.user.role) {
        // Store token and user
        localStorage.setItem("token", data.access);
        localStorage.setItem("user", JSON.stringify(data.user));


        setUser(data.user); 

        Swal.fire({
          title: 'Mabuhay!',
          text: 'Welcome to your Mabuhay Airline account.',
          icon: 'success',
          confirmButtonText: 'Go to Dashboard',
        }).then(() => {
          closeModal?.();
          if (data.user.role === 'admin') {
              navigate('/admin');
            } else {
              navigate('/user-dashboard');
            }
          });
      } else {

          
        Swal.fire({
          title: 'Login Failed',
          text: 'User information is missing or invalid.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } else {
      Swal.fire({
        title: 'Login Failed',
        text: data.message || 'Incorrect username or password, please try again!',
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
        <div className="input-group">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Password"
            className="form-control"
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="btn btn-outline-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </button>
        </div>
      </div>
      <button type="submit" className="btn btn-primary w-100">Login</button>
      <div className="d-flex justify-content-between mt-3">
        <a href="#" className="text-decoration-none">Forgot password?</a>
        {/* <a
          href="#"
          className="text-decoration-none"
          onClick={(e) => {
            e.preventDefault();
            closeModal(); // Close the login modal
            openSignUpModal(); // Open the sign-up modal
          }}
        >
          Not a member? Sign up
        </a> */}
      </div>
    </form>
  );
};

export default Login;
