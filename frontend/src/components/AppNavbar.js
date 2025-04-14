import React, {useState} from 'react'
import { Link, NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../index.css"
// import airlinelogo from '../assets/airlinelogo.jpg'
import airlinelogo from '../assets/mabuhay-logo.png'
import { Modal, Button } from 'react-bootstrap';
import Login from './Login';
import SignUpModal from './SignUp';



export default function AppNavbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 


  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container">
            <a className="navbar-brand d-flex align-items-center" href="#">
              <img src={airlinelogo} alt="Philippine Flag" className="logo me-2" />
              <span className="brand-text">Mabuhay Airline</span>
            </a>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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
                  <a className="nav-link" href="#">Explore</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Contact Us</a>
                </li>
              </ul>

              <div className="auth-buttons">
                 <Button variant="outline-light" className="me-2" onClick={() => setShowLogin(true)} disabled={isLoggedIn}>Login</Button>
              <Button variant="outline-light" onClick={() => setShowSignUp(true)} disabled={isLoggedIn}>Sign Up</Button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Login Modal */}
      <Modal show={showLogin} onHide={() => setShowLogin(false)} centered>
       <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
       </Modal.Header>
          <Modal.Body>
            <Login closeModal={() => setShowLogin(false)} />
          </Modal.Body>
      </Modal>

      <Modal show={showSignUp} onHide={() => setShowSignUp(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignUpModal closeModal={() => setShowSignUp(false)} />
        </Modal.Body>
      </Modal>

    </>
  );
}