import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plane, MapPin, Users, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import api from '../api/axios';
import { useAuthStore } from '../store/authStore';
import { Card, Button, Input, LoadingScreen } from '../components';

export default function Booking() {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [flight, setFlight] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [passengers, setPassengers] = useState([{ name: '', age: '', gender: 'male' }]);

  useEffect(() => {
    if (!user) {
      toast.error('Please login to book a flight');
      navigate('/login');
      return;
    }
    fetchFlight();
  }, [flightId, user]);

  const fetchFlight = async () => {
    try {
      const { data } = await api.get(`/flights/${flightId}`);
      setFlight(data);
    } catch (error) {
      toast.error('Error loading flight');
    }
  };

  const addPassenger = () => {
    setPassengers([...passengers, { name: '', age: '', gender: 'male' }]);
  };

  const updatePassenger = (index: number, field: string, value: string) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const handleBooking = async () => {
    setLoading(true);
    try {
      await api.post('/bookings', {
        flightId,
        passengers
      });
      toast.success('Booking confirmed!');
      navigate('/my-bookings');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  if (!flight) return <LoadingScreen message="Loading flight details..." />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Complete Your Booking</h1>
      
      <Card className="mb-6" padding="lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
            <Plane className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold">Flight Details</h2>
            <p className="text-sm sm:text-base text-gray-600">{flight.airline} - {flight.flightNumber}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
            <span className="font-semibold">{flight.origin}</span>
            <span className="text-gray-400">→</span>
            <span className="font-semibold">{flight.destination}</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">
            Departure: {format(new Date(flight.departureTime), 'PPp')}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-4">${flight.price} <span className="text-xs sm:text-sm text-gray-500">per person</span></p>
        </div>
      </Card>

      <Card className="mb-6" padding="lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            <h2 className="text-lg sm:text-xl font-bold">Passenger Details</h2>
          </div>
          <Button variant="outline" size="sm" onClick={addPassenger}>
            <Plus className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Add Passenger</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
        
        <div className="space-y-4">
          {passengers.map((passenger, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-600 mb-3">Passenger {index + 1}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  placeholder="Full Name"
                  value={passenger.name}
                  onChange={(e) => updatePassenger(index, 'name', e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Age"
                  value={passenger.age}
                  onChange={(e) => updatePassenger(index, 'age', e.target.value)}
                />
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={passenger.gender}
                  onChange={(e) => updatePassenger(index, 'gender', e.target.value)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card padding="lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-6">
          <span className="text-lg sm:text-xl font-bold">Total Amount</span>
          <span className="text-3xl sm:text-4xl font-bold text-blue-600">
            ${flight.price * passengers.length}
          </span>
        </div>
        <Button onClick={handleBooking} fullWidth size="lg" disabled={loading}>
          {loading ? 'Processing...' : 'Confirm Booking'}
        </Button>
      </Card>
    </div>
  );
}
