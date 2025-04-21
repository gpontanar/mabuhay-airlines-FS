import React, { useState, useContext, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate for navigation
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../index.css";
import airlinelogo from '../assets/mabuhay-logo.png';
import { Modal, Button } from 'react-bootstrap';
import Login from './Login';
import SignUpForm from './SignUp'; // Ensure this is the correct import
import UserContext from '../context/UserContext'; // Import UserContext


export default function AppNavbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  // Check login state on load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setIsLoggedIn(true);
    }
  }, []);

  const openLoginModal = () => {
    setShowSignUp(false);
    setShowLogin(true);
  };

  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
  };

 const goToDashboard = () => {
  try {
    const userString = localStorage.getItem('user');
    if (!userString) throw new Error("User not found in localStorage");

    const user = JSON.parse(userString);
    if (user?.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/user-dashboard');
    }
  } catch (err) {
    console.error("Error navigating to dashboard:", err);
    // Optional: Redirect to login or show a toast/message
    navigate('/login');
  }
};



  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark">
    <div className="container">
    <a className="navbar-brand d-flex align-items-center" href="#">
    <img src={airlinelogo} alt="Philippine Flag" className="logo me-2" />
    <span className="brand-text">Mabuhay Airline</span>
    </a>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
    <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav mx-auto">
    <li className="nav-item">
    <Link className="nav-link" to="/">Home</Link>
    </li>
    <li className="nav-item">
    <a className="nav-link" href="#">Flights</a>
    </li>
    <li className="nav-item">
    <a
    className="nav-link"
    href="#explore-section"
    onClick={(e) => {
      e.preventDefault();
      document.getElementById('explore-section')?.scrollIntoView({ behavior: 'smooth' });
    }}
    >
    Explore
    </a>
    </li>
    <li className="nav-item">
    <a className="nav-link" href="#">Contact Us</a>
    </li>
    </ul>

    <div className="auth-buttons">
    {isLoggedIn ? (
      <>
      <Button variant="outline-light" className="me-2" onClick={goToDashboard}>Dashboard</Button>
      <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
      </>
      ) : (
      <>
      <Button variant="outline-light" className="me-2" onClick={() => setShowLogin(true)}>Login</Button>
      <Button variant="outline-light" onClick={() => setShowSignUp(true)}>Sign Up</Button>
      </>
      )}
      </div>
      </div>
      </div>
      </nav>

    {/* Login Modal */}
    <Modal show={showLogin} onHide={() => setShowLogin(false)} centered>
    <Modal.Header closeButton>
    <Modal.Title>Login</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Login closeModal={() => setShowLogin(false)} />
    </Modal.Body>
    </Modal>

      {/* Sign Up Modal */}
    <Modal show={showSignUp} onHide={() => setShowSignUp(false)} centered>
    <Modal.Header closeButton>
    <Modal.Title>Sign Up</Modal.Title>
    </Modal.Header>
    <Modal.Body>
          <SignUpForm openLoginModal={openLoginModal} /> {/* Pass the function as a prop */}
    </Modal.Body>
    </Modal>
    </>
    );
  }