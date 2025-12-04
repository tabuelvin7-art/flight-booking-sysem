import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, MapPin, Ticket, Users } from 'lucide-react';
import api from '../../api/axios';
import { useAuthStore } from '../../store/authStore';
import { StatsCard, Tabs, LoadingScreen } from '../../components';
import FlightsManagement from './FlightsManagement';
import DestinationsManagement from './DestinationsManagement';
import BookingsManagement from './BookingsManagement';
import UsersManagement from './UsersManagement';

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalFlights: 0,
    totalDestinations: 0,
    totalBookings: 0,
    totalUsers: 0
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchStats();
  }, [user]);

  const fetchStats = async () => {
    try {
      const [flights, destinations, bookings, users] = await Promise.all([
        api.get('/flights'),
        api.get('/destinations'),
        api.get('/bookings'),
        api.get('/users/count')
      ]);

      setStats({
        totalFlights: flights.data.length,
        totalDestinations: destinations.data.length,
        totalBookings: bookings.data.length,
        totalUsers: users.data.count
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen message="Loading admin dashboard..." />;

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard
            title="Total Flights"
            value={stats.totalFlights}
            icon={Plane}
            color="blue"
          />
          <StatsCard
            title="Destinations"
            value={stats.totalDestinations}
            icon={MapPin}
            color="green"
          />
          <StatsCard
            title="Bookings"
            value={stats.totalBookings}
            icon={Ticket}
            color="purple"
          />
          <StatsCard
            title="Users"
            value={stats.totalUsers}
            icon={Users}
            color="orange"
          />
        </div>
      )
    },
    {
      id: 'flights',
      label: 'Flights',
      content: <FlightsManagement onUpdate={fetchStats} />
    },
    {
      id: 'destinations',
      label: 'Destinations',
      content: <DestinationsManagement onUpdate={fetchStats} />
    },
    {
      id: 'bookings',
      label: 'Bookings',
      content: <BookingsManagement />
    },
    {
      id: 'users',
      label: 'Users',
      content: <UsersManagement />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage flights, destinations, and bookings</p>
      </div>

      <Tabs tabs={tabs} />
    </div>
  );
}
