
import React, { useState } from 'react';
// import './Auth.css';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({ closeModal }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

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

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input type="email" name="email" placeholder="Email" className="form-control" onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <input type="password" name="password" placeholder="Password" className="form-control" onChange={handleChange} required />
      </div>
      <button type="submit" className="btn btn-primary w-100">Login</button>
    </form>
  );
};

export default Login;
