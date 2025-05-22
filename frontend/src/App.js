import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { UserProvider } from './context/UserContext.js';  // Import UserProvider


import Home from "./pages/Home.js";
import Login from './components/Login.js';
import SignUpModal from './components/SignUp.js';
import UserDashboard from './components/UserDashboard.js';
import AppNavbar from './components/AppNavbar.js';
import ImageCards from './components/ImageCards.js';

import SearchResults from './components/SearchResults.js';
import AllFlights from './components/AllFlights.js'
import BookingFlight from './components/BookingFlight.js';
import Passenger from './components/Passenger.js';
import Payment from './components/Payment.js';
import BookingConfirmation from './components/BookingConfirmation.js';

// Admin
import AdminDashboard from './components/AdminDashboard.js';
import AddFlight from './components/AddFlight.js';
import EditFlight from './components/EditFlight.js';

import ProtectedRoute from './components/ProtectedRoute.js';
import AdminRoute from './components/AdminRoute.js';

function App() {
  return (
    <UserProvider> {/* Wrap the app with UserProvider */}
      <Router>
        <AppNavbar />
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<ImageCards />} />
          <Route path="/signup" element={<SignUpModal />} />
          <Route path="/login" element={<Login />} />
      
          <Route path="/book/:flightId" element={<BookingFlight />} />
          <Route path="/passenger" element={<Passenger />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/flights" element={<AllFlights />} /> 
          <Route path="/results" element={<SearchResults />} />

          {/* Protected: User Dashboard */}
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected: Admin Dashboard */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/create-flight"
            element={
              <AdminRoute>
                <AddFlight />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/edit-flight/:id"
            element={
              <AdminRoute>
                <EditFlight />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider> 
  );
}

export default App;
