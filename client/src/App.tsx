import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Flights from './pages/Flights';
import FlightDetails from './pages/FlightDetails';
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProfile from './pages/admin/AdminProfile';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/flights/:id" element={<FlightDetails />} />
            <Route path="/booking/:flightId" element={<Booking />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: '12px',
              padding: '16px',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
