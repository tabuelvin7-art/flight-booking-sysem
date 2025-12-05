import { Plane, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface FlightCardProps {
  flight: {
    _id: string;
    airline: string;
    flightNumber: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    price: number;
    availableSeats: number;
  };
}

export default function FlightCard({ flight }: FlightCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-soft hover:shadow-soft-lg transition p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-2 sm:p-3 rounded-xl sm:rounded-2xl">
              <Plane className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">{flight.airline}</h3>
              <p className="text-xs sm:text-sm text-gray-500">{flight.flightNumber}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
            <div className="flex-shrink-0">
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{flight.origin}</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {format(new Date(flight.departureTime), 'HH:mm')}
              </p>
              <p className="text-xs text-gray-400">
                {format(new Date(flight.departureTime), 'MMM dd')}
              </p>
            </div>
            
            <div className="flex-1 flex flex-col items-center min-w-0">
              <div className="w-full h-0.5 bg-gray-300 relative">
                <Plane className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-blue-500 rotate-90" />
              </div>
              <p className="text-xs text-gray-500 mt-2 whitespace-nowrap">Direct</p>
            </div>
            
            <div className="flex-shrink-0">
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{flight.destination}</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {format(new Date(flight.arrivalTime), 'HH:mm')}
              </p>
              <p className="text-xs text-gray-400">
                {format(new Date(flight.arrivalTime), 'MMM dd')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-row lg:flex-col justify-between lg:justify-between items-center lg:items-end gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l lg:pl-6">
          <span className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap ${
            flight.availableSeats < 10 
              ? 'bg-yellow-100 text-yellow-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {flight.availableSeats} seats left
          </span>
          <div className="text-right">
            <p className="text-xs sm:text-sm text-gray-500">From</p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600">${flight.price}</p>
            <p className="text-xs text-gray-400 mb-3 sm:mb-4">per person</p>
            <button 
              onClick={() => navigate(`/booking/${flight._id}`)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium inline-flex items-center gap-2 transition shadow-lg shadow-blue-500/30 whitespace-nowrap"
            >
              Book Now
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
