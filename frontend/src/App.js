import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useState, useEffect} from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ImageCards from './components/ImageCards';
import UserDashboard from './components/UserDashboard';
import AppNavbar from './components/AppNavbar';


import Home from "./pages/Home";
import Login from './components/Login';
import SignUpModal from './components/SignUp';
// import Navbar from './components/AppNavbar';
import BookingForm from './components/BookingForm';
import SearchResults from './components/SearchResults';


function App() {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/explore" element={<ImageCards />} />
        <Route path="/signup" element={<SignUpModal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<BookingForm/>} />
        <Route path="/results" element={<SearchResults/>} />
     
      </Routes>
    </Router>
  );
}

export default App;
