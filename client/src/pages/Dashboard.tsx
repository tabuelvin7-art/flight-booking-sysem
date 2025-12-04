import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Ticket, MapPin, TrendingUp } from 'lucide-react';
import api from '../api/axios';
import { useAuthStore } from '../store/authStore';
import { StatsCard, BookingCard, LoadingScreen, EmptyState, Tabs } from '../components';

export default function Dashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingFlights: 0,
    destinations: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const [bookingsRes, destinationsRes] = await Promise.all([
        api.get('/bookings/my-bookings'),
        api.get('/destinations')
      ]);

      const bookings = bookingsRes.data;
      const upcoming = bookings.filter((b: any) => 
        new Date(b.flight.departureTime) > new Date()
      );

      setStats({
        totalBookings: bookings.length,
        upcomingFlights: upcoming.length,
        destinations: destinationsRes.data.length
      });
      setRecentBookings(bookings.slice(0, 3));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen message="Loading your dashboard..." />;

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard
              title="Total Bookings"
              value={stats.totalBookings}
              icon={Ticket}
              color="blue"
            />
            <StatsCard
              title="Upcoming Flights"
              value={stats.upcomingFlights}
              icon={Plane}
              color="green"
            />
            <StatsCard
              title="Destinations"
              value={stats.destinations}
              icon={MapPin}
              color="purple"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Recent Bookings</h2>
            {recentBookings.length === 0 ? (
              <EmptyState
                icon={Ticket}
                title="No Bookings Yet"
                description="Start exploring destinations and book your first flight!"
                actionLabel="Browse Flights"
                onAction={() => navigate('/flights')}
              />
            ) : (
              <div className="space-y-4">
                {recentBookings.map((booking: any) => (
                  <BookingCard key={booking._id} booking={booking} />
                ))}
              </div>
            )}
          </div>
        </div>
      )
    },
    {
      id: 'bookings',
      label: 'All Bookings',
      content: (
        <div className="space-y-4">
          {recentBookings.length === 0 ? (
            <EmptyState
              icon={Ticket}
              title="No Bookings"
              description="You haven't made any bookings yet."
            />
          ) : (
            recentBookings.map((booking: any) => (
              <BookingCard key={booking._id} booking={booking} />
            ))
          )}
        </div>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Here's what's happening with your flights</p>
      </div>

      <Tabs tabs={tabs} />
    </div>
  );
}
