import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket } from 'lucide-react';
import api from '../api/axios';
import { useAuthStore } from '../store/authStore';
import { BookingCard, EmptyState, LoadingScreen } from '../components';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    try {
      const { data } = await api.get('/bookings/my-bookings');
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen message="Loading your bookings..." />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      
      {bookings.length === 0 ? (
        <EmptyState
          icon={Ticket}
          title="No Bookings Yet"
          description="You haven't made any flight bookings yet. Start exploring destinations and book your next adventure!"
          actionLabel="Browse Flights"
          onAction={() => navigate('/flights')}
        />
      ) : (
        <div className="space-y-4">
          {bookings.map((booking: any) => (
            <BookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
}
