
import React, { useState } from 'react';
// import './Auth.css';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({ closeModal, openSignUpModal }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Login successful!');
        console.log(data); 
        closeModal(); 
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  // return (
  //   <form onSubmit={handleSubmit}>
  //     <div className="mb-3">
  //     <label htmlFor="email" className="form-label">Email: </label>
  //       <input type="email" name="email" placeholder="Email" className="form-control" onChange={handleChange} required />
  //     </div>
  //     <div className="mb-3">
  //     <label htmlFor="password" className="form-label">Password: </label>
  //       <input type="password" name="password" placeholder="Password" className="form-control" onChange={handleChange} required />
  //     </div>
  //     <button type="submit" className="btn btn-primary w-100">Login</button>
  //   </form>
  // );
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
            className="btn btn-outline-secondary"
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
