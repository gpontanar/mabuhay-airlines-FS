import React from 'react';
import '../index.css';
import CenterBImage from '../assets/Center-b-image.jpg';
import BoraImage from '../assets/Bora-1.jpg';
import CebuImage from '../assets/cebu-1.jpg';
import BaguioImage from '../assets/baguio-1.jpg';
import PalawanImage from '../assets/palawan-1.jpg';
import BoholImage from '../assets/bohol-5.jpg';
import SiargaoImage from '../assets/siargao-1.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

const ImageCards = () => {
  return (
    <div
      className="image-cards-section"
      style={{
        backgroundImage: `url(${CenterBImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '50px 0',
      }}
    >
      <div className="overlay-heading">
        <h1>Explore the Mabuhay Popular Destinations</h1>
      </div>
      <div className="container">
        <div className="row">
          {/* Card 1 */}
          <div className="col-md-4">
            <div
              className="image-card"
              style={{
                backgroundImage: `url(${BoraImage})`,
              }}
            >
              <div className="card-overlay">
                <h3>BORACAY</h3>
                <p>One of the most beautiful beaches in the world with pristine white sand and crystal clear waters.</p>
                <div className="card-buttons">
                  <button className="btn btn-primary">Book Now</button>
                  <button className="btn btn-secondary">Show More</button>
                </div>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="col-md-4">
            <div
              className="image-card"
              style={{
                backgroundImage: `url(${CebuImage})`,
              }}
            >
              <div className="card-overlay">
                <h3>CEBU</h3>
                <p>A vibrant city with rich history, beautiful beaches and amazing diving spots for adventure seekers.</p>
                <div className="card-buttons">
                  <button className="btn btn-primary">Book Now</button>
                  <button className="btn btn-secondary">Show More</button>
                </div>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="col-md-4">
            <div
              className="image-card"
              style={{
                backgroundImage: `url(${BaguioImage})`,
              }}
            >
              <div className="card-overlay">
                <h3>BAGUIO CITY</h3>
                <p>The summer capital of the Philippines with cool climate, pine trees and strawberry farms.</p>
                <div className="card-buttons">
                  <button className="btn btn-primary">Book Now</button>
                  <button className="btn btn-secondary">Show More</button>
                </div>
              </div>
            </div>
          </div>
          {/* Card 4 */}
          <div className="col-md-4">
            <div
              className="image-card"
              style={{
                backgroundImage: `url(${PalawanImage})`,
              }}
            >
              <div className="card-overlay">
                <h3>PALAWAN</h3>
                <p>One of the most beautiful beaches in the world with pristine white sand and crystal clear waters.</p>
                <div className="card-buttons">
                  <button className="btn btn-primary">Book Now</button>
                  <button className="btn btn-secondary">Show More</button>
                </div>
              </div>
            </div>
          </div>
          {/* Card 5 */}
          <div className="col-md-4">
            <div
              className="image-card"
              style={{
                backgroundImage: `url(${BoholImage})`,
              }}
            >
              <div className="card-overlay">
                <h3>BOHOL</h3>
                <p>Bohol is known for coral reefs and unusual geological formations, notably the Chocolate Hills.</p>
                <div className="card-buttons">
                  <button className="btn btn-primary">Book Now</button>
                  <button className="btn btn-secondary">Show More</button>
                </div>
              </div>
            </div>
          </div>
          {/* Card 6 */}
          <div className="col-md-4">
            <div
              className="image-card"
              style={{
                backgroundImage: `url(${SiargaoImage})`,
              }}
            >
              <div className="card-overlay">
                <h3>SIARGAO</h3>
                <p>Known as the “Surfing Capital of the Philippines”, Siargao is mainly responsible for introducing surfing to the country.</p>
                <div className="card-buttons">
                  <button className="btn btn-primary">Book Now</button>
                  <button className="btn btn-secondary">Show More</button>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default ImageCards;