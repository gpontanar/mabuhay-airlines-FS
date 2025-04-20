import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; 
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const SignUpForm = ({ openLoginModal }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    prefix: '',
    gender: '',
    mobileNumber: '',
    dateOfBirth: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    passwordMismatch: false,
    requiredFieldsMissing: false,
  });

  const [isFormValid, setIsFormValid] = useState(false); // Add a state to track form validity


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Reset errors when the user types
    if (name === 'password' || name === 'confirmPassword') {
      setErrors((prev) => ({ ...prev, passwordMismatch: false }));
    }
    setErrors((prev) => ({ ...prev, requiredFieldsMissing: false }));
  };

  // Validate the form whenever formData changes
  useEffect(() => {
    const {
      firstName,
      lastName,
      gender,
      mobileNumber,
      dateOfBirth,
      address,
      email,
      password,
      confirmPassword,
    } = formData;

    // Check if all required fields are filled
    if (
      !firstName ||
      !lastName ||
      !gender ||
      !mobileNumber ||
      !dateOfBirth ||
      !address ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setErrors((prev) => ({ ...prev, requiredFieldsMissing: true }));
      setIsFormValid(false);
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setErrors((prev) => ({ ...prev, passwordMismatch: true }));
      setIsFormValid(false);
      return;
    }

    // If all validations pass
    setErrors({ passwordMismatch: false, requiredFieldsMissing: false });
    setIsFormValid(true);
  }, [formData]); // Run this effect whenever formData changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        // Show SweetAlert2 success prompt
        Swal.fire({
          title: 'Registration is successful!',
          text: 'Welcome to Mabuhay Airline',
          icon: 'success',
          confirmButtonText: 'Login Now',
        }).then(() => {
          // Redirect to login page after user clicks "OK"
          openLoginModal(); 
        });
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-2 mb-2">
        <div className="col">
          <label htmlFor="firstName" className="form-label">First Name:</label>
          <input
            name="firstName"
            placeholder="First Name"
            className={`form-control ${errors.requiredFieldsMissing && !formData.firstName ? 'is-invalid' : ''}`}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col">
          <label htmlFor="lastName" className="form-label">Last Name:</label>
          <input
            name="lastName"
            placeholder="Last Name"
            className={`form-control ${errors.requiredFieldsMissing && !formData.lastName ? 'is-invalid' : ''}`}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row g-2 mb-2">
        <div className="col">
          <label htmlFor="prefix" className="form-label">Prefix:</label>
          <select name="prefix" className="form-select" onChange={handleChange}>
            <option value="">Select Prefix</option>
            <option value="Mr">Mr</option>
            <option value="Ms">Ms</option>
            <option value="Mrs">Mrs</option>
            <option value="Dr">Dr</option>
          </select>
        </div>
        <div className="col">
          <label htmlFor="gender" className="form-label">Gender:</label>
          <select
            name="gender"
            className={`form-select ${errors.requiredFieldsMissing && !formData.gender ? 'is-invalid' : ''}`}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
      </div>
      <div className="mb-2">
        <label htmlFor="mobileNumber" className="form-label">Mobile Number:</label>
        <input
          name="mobileNumber"
          placeholder="Mobile Number"
          className={`form-control ${errors.requiredFieldsMissing && !formData.mobileNumber ? 'is-invalid' : ''}`}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="dateOfBirth" className="form-label">Date of Birth:</label>
        <input
          name="dateOfBirth"
          type="date"
          className={`form-control ${errors.requiredFieldsMissing && !formData.dateOfBirth ? 'is-invalid' : ''}`}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="address" className="form-label">Address:</label>
        <input
          name="address"
          placeholder="Address"
          className={`form-control ${errors.requiredFieldsMissing && !formData.address ? 'is-invalid' : ''}`}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="email" className="form-label">Email:</label>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className={`form-control ${errors.requiredFieldsMissing && !formData.email ? 'is-invalid' : ''}`}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="password" className="form-label">Password:</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          className={`form-control ${errors.passwordMismatch ? 'is-invalid' : ''}`}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className={`form-control ${errors.passwordMismatch ? 'is-invalid' : ''}`}
          onChange={handleChange}
          required
        />
        {errors.passwordMismatch && <div className="invalid-feedback">Passwords do not match.</div>}
      </div>
      <button
        type="submit"
        className="btn btn-dark w-100"
        disabled={!isFormValid} // Use the state here
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;