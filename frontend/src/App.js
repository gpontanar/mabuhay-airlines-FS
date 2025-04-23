import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { UserProvider } from './context/UserContext';  // Import UserProvider

import Home from "./pages/Home";
import Login from './components/Login';
import SignUpModal from './components/SignUp';
import UserDashboard from './components/UserDashboard';
import AppNavbar from './components/AppNavbar';
import ImageCards from './components/ImageCards';
import BookingForm from './components/BookingForm';
import SearchResults from './components/SearchResults';
import AllFlights from './components/AllFlights'

// Admin
import AdminDashboard from './components/AdminDashboard';
import AddFlight from './components/AddFlight';
import EditFlight from './components/EditFlight';

import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

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
          <Route path="/book" element={<BookingForm />} />
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
