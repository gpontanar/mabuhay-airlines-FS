import React from 'react';
import BookingForm from '../components/BookingForm.js';
import Hero from '../components/Hero.js';
import ImageCards from '../components/ImageCards.js';
import FlightDeals from '../components/FlightDeals.js';
import Footer from "../components/Footer.js";

const Home = () => {
  return (
    <>
      
      <Hero />
      <BookingForm />
      <ImageCards />
      <FlightDeals />
      <Footer />
    </>
  )
}

export default Home;

