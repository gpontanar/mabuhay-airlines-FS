import React, { useState } from 'react';
import '../index.css';
import CenterBImage from '../assets/Center-b-image.jpg';
import BoraImage from '../assets/Bora-1.jpg';
import BoraImage2 from '../assets/Bora-2.jpg';
import BoraImage5 from '../assets/Bora-5.jpg';
import BoraImage4 from '../assets/Bora-4.jpg';
import CebuImage from '../assets/cebu-1.jpg';
import CebuImage2 from '../assets/cebu-2.jpg';
import CebuImage3 from '../assets/cebu-3.jpg';
import CebuImage4 from '../assets/cebu-4.jpg';
import BaguioImage from '../assets/baguio-1.jpg';
import PalawanImage from '../assets/palawan-1.jpg';
import BoholImage from '../assets/bohol-5.jpg';
import SiargaoImage from '../assets/siargao-1.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Carousel } from 'react-bootstrap';

const destinations = [
  {
    name: 'BORACAY',
    description: 'One of the most beautiful beaches in the world with pristine white sand and crystal clear waters.',
    images: [BoraImage, BoraImage2, BoraImage4, BoraImage5],
    imageDescriptions: [
      { title: 'Breathtaking Sunset', text: 'Experience magical sunset views every evening.' },
      { title: 'White Beach', text: 'The famous 4km stretch of powdery white sand beach.' },
      { title: 'Water Activities', text: 'Enjoy parasailing, diving, and island hopping.' },
      { title: 'Breathtaking Sunset', text: 'One of the most beautiful beaches in the world with pristine white sand and crystal clear waters.' },
    ],
  },
  {
    name: 'CEBU',
    description: 'A vibrant city with rich history, beautiful beaches and amazing diving spots for adventure seekers.',
    images: [CebuImage, CebuImage2, CebuImage3, CebuImage4],
    imageDescriptions: [
      { title: 'World-Class Diving', text: 'Discover amazing underwater adventures.' },
      { title: 'Magelan Cross', text: 'Explore the rich history of Cebu City.' },
      { title: 'Whale Sharks', text: 'Dive with gentle giants.' },
      { title: 'Diving Spots', text: 'Explore underwater treasures and marine biodiversity.' },
    ],
  },
  {
    name: 'BAGUIO CITY',
    description: 'The summer capital of the Philippines with cool climate, pine trees and strawberry farms.',
    images: [BaguioImage, BaguioImage, BaguioImage, BaguioImage],
    imageDescriptions: [
      { title: 'Historical Sites', text: 'Explore the rich history of Cebu City.' },
      { title: 'Magelan Cross', text: 'The Queen City of the South with rich heritage sites.' },
      { title: 'Diving Spots', text: 'Discover amazing underwater adventures.' },
      { title: 'Diving Spots', text: 'Explore underwater treasures and marine biodiversity.' },
      { title: 'Diving Spots', text: 'Explore underwater treasures and marine biodiversity.' },

    ],
  },
  {
    name: 'PALAWAN',
    description: 'One of the most beautiful beaches in the world with pristine white sand and crystal clear waters.',
    images: [PalawanImage, PalawanImage, PalawanImage, PalawanImage],
    imageDescriptions: [
      { title: 'Historical Sites', text: 'Explore the rich history of Cebu City.' },
      { title: 'Diving Spots', text: 'Discover amazing underwater adventures.' },
      { title: 'Local Cuisine', text: 'Savor the unique flavors of Cebuano dishes.' },
      { title: 'Local Cuisine', text: 'Savor the unique flavors of Cebuano dishes.' },
    ],
  },
  {
    name: 'BOHOL',
    description: 'Bohol is known for coral reefs and unusual geological formations, notably the Chocolate Hills.',
    images: [BoholImage, BoholImage, BoholImage, BoholImage],
    imageDescriptions: [
      { title: 'Historical Sites', text: 'Explore the rich history of Cebu City.' },
      { title: 'Diving Spots', text: 'Discover amazing underwater adventures.' },
      { title: 'Local Cuisine', text: 'Savor the unique flavors of Cebuano dishes.' },
      { title: 'Local Cuisine', text: 'Savor the unique flavors of Cebuano dishes.' },
    ],
  },
  {
    name: 'SIARGAO',
    description: 'Known as the “Surfing Capital of the Philippines”, Siargao is mainly responsible for introducing surfing to the country.',
    images: [SiargaoImage, SiargaoImage, SiargaoImage, SiargaoImage],
    imageDescriptions: [
      { title: 'Historical Sites', text: 'Explore the rich history of Cebu City.' },
      { title: 'Diving Spots', text: 'Discover amazing underwater adventures.' },
      { title: 'Local Cuisine', text: 'Savor the unique flavors of Cebuano dishes.' },
      { title: 'Local Cuisine', text: 'Savor the unique flavors of Cebuano dishes.' },
    ],
  },
];

const ImageCards = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentDestination, setCurrentDestination] = useState(null);

  const handleShowMore = (destination) => {
    setCurrentDestination(destination);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setCurrentDestination(null);
  };

  return (
    <div
      className="image-cards-section"
      style={{
        backgroundImage: `url(${CenterBImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 0,
      }}
    >
      <div className="overlay-heading">
        <h1>Explore the Mabuhay Popular Destinations</h1>
      </div>
      <div className="container">
        <div className="row">
          {destinations.map((destination, index) => (
            <div className="col-md-4" key={index}>
              <div
                className="image-card"
                style={{
                  backgroundImage: `url(${destination.images[0]})`,
                }}
              >
                <div className="card-overlay">
                  <h3>{destination.name}</h3>
                  <p>{destination.description}</p>
                  <div className="card-buttons">
                    <button className="btn btn-primary">Book Now</button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleShowMore(destination)}
                    >
                      Show More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {currentDestination && (
        <Modal
          show={showModal}
          onHide={handleClose}
          centered
          className="destination-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>{currentDestination.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Carousel className="destination-carousel">
            {currentDestination.images.map((image, index) => (
              <Carousel.Item key={index}>
                <img src={image} alt={`${currentDestination.name} ${index}`} />
                <Carousel.Caption>
                  <h5><strong>{currentDestination.imageDescriptions[index].title}</strong></h5>
                  <p>{currentDestination.imageDescriptions[index].text}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default ImageCards;