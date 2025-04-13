
import React, { useState } from 'react';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', prefix: '', gender: '',
    mobileNumber: '', dateOfBirth: '', address: '',
    email: '', password: '', confirmPassword: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Registration successful!');
        console.log(data);
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
          <input name="firstName" placeholder="First Name" className="form-control" onChange={handleChange} required />
        </div>
        <div className="col">
          <input name="lastName" placeholder="Last Name" className="form-control" onChange={handleChange} required />
        </div>
      </div>
      <div className="row g-2 mb-2">
        <div className="col">
          <select name="prefix" className="form-select" onChange={handleChange} required>
      <option value="">Select Prefix</option>
      <option value="Mr">Mr</option>
      <option value="Ms">Ms</option>
      <option value="Mrs">Mrs</option>
      <option value="Dr">Dr</option>
    </select>
        </div>
        <div className="col">
          <select name="gender" className="form-select" onChange={handleChange} required>
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
      <option value="Prefer not to say">Prefer not to say</option>
    </select>
        </div>
      </div>
      <div className="mb-2">
        <input name="mobileNumber" placeholder="Mobile Number" className="form-control" onChange={handleChange} required />
      </div>
      <div className="mb-2">
        <input name="dateOfBirth" type="date" className="form-control" onChange={handleChange} required />
      </div>
      <div className="mb-2">
        <input name="address" placeholder="Address" className="form-control" onChange={handleChange} required />
      </div>
      <div className="mb-2">
        <input name="email" type="email" placeholder="Email" className="form-control" onChange={handleChange} required />
      </div>
      <div className="mb-2">
        <input name="password" type="password" placeholder="Password" className="form-control" onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <input name="confirmPassword" type="password" placeholder="Confirm Password" className="form-control" onChange={handleChange} required />
      </div>
      <button type="submit" className="btn btn-success w-100">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
