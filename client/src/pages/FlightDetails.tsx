import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plane, MapPin, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import api from '../api/axios';
import { Card, Button, Badge, LoadingScreen } from '../components';

export default function FlightDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState<any>(null);

  useEffect(() => {
    fetchFlight();
  }, [id]);

  const fetchFlight = async () => {
    try {
      const { data } = await api.get(`/flights/${id}`);
      setFlight(data);
    } catch (error) {
      console.error('Error fetching flight:', error);
    }
  };

  if (!flight) return <LoadingScreen message="Loading flight details..." />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card padding="lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
              <Plane className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{flight.airline}</h1>
              <p className="text-sm sm:text-base text-gray-600">{flight.flightNumber}</p>
            </div>
          </div>
          <Badge variant={flight.availableSeats < 10 ? 'warning' : 'success'} size="lg">
            {flight.availableSeats} seats available
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">From</p>
                <p className="font-bold text-xl sm:text-2xl">{flight.origin}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Departure</p>
                <p className="font-bold text-base sm:text-lg break-words">{format(new Date(flight.departureTime), 'PPp')}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">To</p>
                <p className="font-bold text-xl sm:text-2xl">{flight.destination}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Arrival</p>
                <p className="font-bold text-base sm:text-lg break-words">{format(new Date(flight.arrivalTime), 'PPp')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 sm:pt-6 border-t">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Price per person</p>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600">${flight.price}</p>
            </div>
          </div>
          <Button
            onClick={() => navigate(`/booking/${flight._id}`)}
            fullWidth
            size="lg"
          >
            Book This Flight
          </Button>
        </div>
      </Card>
    </div>
  );
}
