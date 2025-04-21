import React from 'react';
import BookingForm from '../components/BookingForm';
import Hero from '../components/Hero';
import ImageCards from '../components/ImageCards';
import FlightDeals from '../components/FlightDeals';
import Footer from "../components/Footer";

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

