import React from 'react';
import AppNavbar from '../components/AppNavbar';
import BookingForm from '../components/BookingForm';
import Hero from '../components/Hero';
import ImageCards from '../components/ImageCards';
import FlightDeals from '../components/FlightDeals';
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <AppNavbar />
      <Hero />
      <BookingForm />
      <ImageCards />
      <FlightDeals />
      <Footer />
    </>
  )
}

export default Home;

