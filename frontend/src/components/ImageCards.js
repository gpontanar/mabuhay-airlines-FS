import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import BaguioImage3 from '../assets/baguio-3.jpg';
import BaguioImage6 from '../assets/baguio-6.jpg';
import BaguioImage4 from '../assets/baguio-4.jpg';
import PalawanImage from '../assets/palawan-1.jpg';
import PalawanImage3 from '../assets/palawan-3.jpg';
import PalawanImage5 from '../assets/palawan-5.jpg';
import PalawanImage2 from '../assets/palawan-2.jpg';
import BoholImage from '../assets/bohol-5.jpg';
import BoholImage4 from '../assets/bohol-4.jpg';
import BoholImage2 from '../assets/bohol-2.jpg';
import BoholImage3 from '../assets/bohol-3.jpg';
import SiargaoImage from '../assets/siargao-1.jpg';
import SiargaoImage4 from '../assets/siargao-4.jpg';
import SiargaoImage3 from '../assets/siargao-3.jpg';
import SiargaoImage5 from '../assets/siargao-5.jpg';
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
    images: [BaguioImage, BaguioImage3, BaguioImage6, BaguioImage4],
    imageDescriptions: [
      { title: 'Summer Capital of the Philippines', text: 'The summer capital of the Philippines with cool climate, pine trees and strawberry farms.' },
      { title: 'City of Pines', text: 'Cool climate and pine-lined landscapes year-round.' },
      { title: 'Straw Berry Farm', text: 'Pick fresh strawberries at La Trinidad Strawberry Farm.' },
      { title: 'Baguio Local', text: 'Baguio Market Shop for local products and souvenirs at the famous market and witness the igorot tribes.' },
    ],
  },
  {
    name: 'PALAWAN',
    description: 'One of the most beautiful beaches in the world with pristine white sand and crystal clear waters.',
    images: [PalawanImage, PalawanImage3, PalawanImage5, PalawanImage2],
    imageDescriptions: [
      { title: 'Witness the beatiful Island', text: 'One of the most beautiful beaches in the world with pristine white sand and crystal clear waters.' },
      { title: 'Barracuda Lake', text: 'Barracuda Lake is a spectacular site with emerald-green brackish waters surrounded by an impressive limestone karst formation.' },
      { title: 'El Nido', text: 'Famous for its white sand beaches, turquoise waters, coral reefs, and splendid limestone rock formations. Understandably, El Nido is one of most popular resort destinations in the Philippines.' },
      { title: 'El Nido Marine Reserve Park', text: 'El Nido Marine Reserve Park is popular for its limestone cliffs and an abundant fauna and flora including endemic species.' },
    ],
  },
  {
    name: 'BOHOL',
    description: 'Bohol is known for coral reefs and unusual geological formations, notably the Chocolate Hills.',
    images: [BoholImage, BoholImage4, BoholImage2, BoholImage3],
    imageDescriptions: [
      { title: 'Witness the beauty of the Chocolate Hills', text: 'The unusual geological formations, notably the Chocolate Hills.' },
      { title: 'Bohol Tarsier Sanctuary', text: 'These cute furry creatures are considered as the smallest primate in the world. The most notable feature of the tarsier is their eyes, which are bigger than its entire brain.' },
      { title: 'Bilar Man-made Forest', text: 'A favorite stop-over for tourists going to and from the Chocolate Hills, the Bilar Man-made Forest is a two-kilometer stretch of dense forest made of red and white mahogany trees. The forest is part of a reforestation project more than 50 years ago.' },
      { title: 'Loboc River Cuisine', text: 'Motorized bancas and floating restaurants take cruisers upstream passing by nipa trees, coconuts and other tropical flora. The two main destinations in the river are the Loctob Spring and Busay Falls and other tropical fauna.' },
    ],
  },
  {
    name: 'SIARGAO',
    description: 'Known as the “Surfing Capital of the Philippines”, Siargao is mainly responsible for introducing surfing to the country.',
    images: [SiargaoImage, SiargaoImage4, SiargaoImage3, SiargaoImage5],
    imageDescriptions: [
      { title: 'Dance with the waves', text: 'Siargao is mainly responsible for introducing surfing to the country.' },
      { title: 'Tayangban Cave Pool', text: 'Apart from surfing, Siargao is also open to other activities such as cave explorations and rock climbing.' },
      { title: 'Siargao Cloud9', text: 'Cloud 9 is world-famous for its thick, hollow tubes and fast-barreling right-hand waves that break over a reef. Most suitable for advanced nimble surfers, the Cloud 9 wave has been described as a death ride, crashing onto shallow razor-sharp coral.' },
      { title: 'Maasin Village palm tree swing', text: 'The Instagram-famous bent tree of Maasin Village is just a quick, 30-minute drive north of General Luna in the direction of Tayangban Cave Pool and Magpupungko Rock Pools.' },
    ],
  },
];

const ImageCards = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentDestination, setCurrentDestination] = useState(null);
   const navigate = useNavigate(); 
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
      id="explore-section"
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
                    <button className="btn btn-primary" onClick={() => navigate('/flights')}>Book Now</button>
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