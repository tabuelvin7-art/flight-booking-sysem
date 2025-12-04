import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plane } from 'lucide-react';
import api from '../api/axios';
import { EmptyState, FlightCard, FilterBar, Alert, FlightCardSkeleton } from '../components';

export default function Flights() {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchFlights();
  }, [searchParams]);

  const fetchFlights = async () => {
    try {
      const params = Object.fromEntries(searchParams);
      const { data } = await api.get('/flights', { params });
      setFlights(data);
      setFilteredFlights(data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = (filters: Record<string, any>) => {
    let filtered = [...flights];

    if (filters.airline) {
      filtered = filtered.filter((f: any) => 
        f.airline.toLowerCase().includes(filters.airline.toLowerCase())
      );
    }

    if (filters.maxPrice) {
      filtered = filtered.filter((f: any) => f.price <= parseInt(filters.maxPrice));
    }

    if (filters.sortBy) {
      if (filters.sortBy === 'price-asc') {
        filtered.sort((a: any, b: any) => a.price - b.price);
      } else if (filters.sortBy === 'price-desc') {
        filtered.sort((a: any, b: any) => b.price - a.price);
      }
    }

    setFilteredFlights(filtered);
  };

  const filterOptions = [
    { id: 'airline', label: 'Airline', type: 'text' as const },
    { id: 'maxPrice', label: 'Max Price', type: 'text' as const },
    {
      id: 'sortBy',
      label: 'Sort By',
      type: 'select' as const,
      options: [
        { value: 'price-asc', label: 'Price: Low to High' },
        { value: 'price-desc', label: 'Price: High to Low' }
      ]
    }
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-4">
          <FlightCardSkeleton />
          <FlightCardSkeleton />
          <FlightCardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Available Flights</h1>
          <p className="text-gray-600">{filteredFlights.length} flights found</p>
        </div>
        <FilterBar filters={filterOptions} onApplyFilters={handleApplyFilters} />
      </div>

      {searchParams.get('origin') && searchParams.get('destination') && (
        <div className="mb-6">
          <Alert variant="info">
            Showing flights from <strong>{searchParams.get('origin')}</strong> to{' '}
            <strong>{searchParams.get('destination')}</strong>
          </Alert>
        </div>
      )}
      
      {filteredFlights.length === 0 ? (
        <EmptyState
          icon={Plane}
          title="No Flights Found"
          description="We couldn't find any flights matching your search criteria. Try adjusting your search parameters or filters."
        />
      ) : (
        <div className="space-y-4">
          {filteredFlights.map((flight: any) => (
            <FlightCard key={flight._id} flight={flight} />
          ))}
        </div>
      )}
    </div>
  );
}
