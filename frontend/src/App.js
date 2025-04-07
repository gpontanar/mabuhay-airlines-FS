
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useState, useEffect} from 'react';


import Home from "./pages/Home";
import Login from './components/Login';
import SignUpModal from './components/SignUp';
import Navbar from './components/AppNavbar';

function App() {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpModal />} />
        <Route path="/login" element={<Login />} />
     
      </Routes>
    </Router>
  );
}

export default App;
