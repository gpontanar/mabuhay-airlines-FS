import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useState, useEffect} from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';


import Home from "./pages/Home";
import Login from './components/Login';
import SignUpModal from './components/SignUp';
import Navbar from './components/AppNavbar';
import BookingForm from './components/BookingForm';
import SearchResults from './components/SearchResults';


function App() {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpModal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<BookingForm/>} />
        <Route path="/results" element={<SearchResults/>} />
     
      </Routes>
    </Router>
  );
}

export default App;
