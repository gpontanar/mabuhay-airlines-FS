import React from 'react';

const Hero = () => {
  return (
    <div>
       <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Mabuhay Airline</h1>
            <p className="tagline">Turning Travel Dreams into Destinations</p>

            <div className="action-buttons">
              <button className="btn btn-book">Book Flights</button>
              <button className="btn btn-manage">Manage Booking</button>
              <button className="btn btn-promo">Promo Flights</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero;