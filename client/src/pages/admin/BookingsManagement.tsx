import { useState, useEffect } from 'react';
import { Ticket } from 'lucide-react';
import api from '../../api/axios';
import { BookingCard, EmptyState, LoadingScreen } from '../../components';

export default function BookingsManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await api.get('/bookings');
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen message="Loading bookings..." />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">All Bookings</h2>

      {bookings.length === 0 ? (
        <EmptyState
          icon={Ticket}
          title="No Bookings Yet"
          description="Bookings will appear here once customers start booking flights"
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
