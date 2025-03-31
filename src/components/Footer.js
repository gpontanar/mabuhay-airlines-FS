import React from "react";
import airlinelogo from '../assets/airlinelogo.jpg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-3 footer-logo-section">
            <img src={airlinelogo} alt="Mabuhay Airways Logo" className="logo" />
            <h5 className="text-white">Mabuhay Airline</h5>
            <p className="text-white">Turning Travel Dreams into Destinations</p>
          </div>
          <div className="col-md-9 footer-links-section">
            <div className="row">
              <div className="col-sm-3">
                <h6 className="text-white">Company</h6>
                <ul>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Meet the Team</a></li>
                  <li><a href="#">History</a></li>
                  <li><a href="#">Careers</a></li>
                </ul>
              </div>
              <div className="col-sm-3">
                <h6 className="text-white">Helpful Links</h6>
                <ul>
                  <li><a href="#">FAQs</a></li>
                  <li><a href="#">Contact Us</a></li>
                  <li><a href="#">Live Chat</a></li>
                  <li><a href="#">Flight Status</a></li>
                </ul>
              </div>
              <div className="col-sm-3">
                <h6 className="text-white">Legal</h6>
                <ul>
                  <li><a href="#">Terms & Conditions</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Cookie Policy</a></li>
                  <li><a href="#">Passenger Rights</a></li>
                </ul>
              </div>
              <div className="col-sm-3">
                <h6 className="text-white">Others</h6>
                <ul>
                  <li><a href="#">News and Events</a></li>
                  <li><a href="#">Airport Shuttle Service</a></li>
                  <li><a href="#">Gift Cards</a></li>
                  <li><a href="#">Luggage Info</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
        </div>
        <div className="copyright text-center">
          <p>© 2025 Mabuhay Airline. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;