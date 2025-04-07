import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "../index.css"
import airlinelogo from '../assets/airlinelogo.jpg'

const AppNavbar = () => {
  return (
    <div>
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
                <a className="nav-link" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Flights
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Explore
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact Us
                </a>
              </li>
            </ul>

            <div className="auth-buttons">
              <button className="btn btn-outline-light me-2">Login</button>
              <button className="btn btn-outline-light">Sign Up</button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default AppNavbar;