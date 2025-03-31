import React from 'react';
import AppNavbar from '../components/AppNavbar';
import BookingForm from '../components/BookingForm';
import Hero from '../components/Hero';
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <AppNavbar />
      <Hero />
      <BookingForm />
      <Footer />
    </>
  )
}

export default Home;
