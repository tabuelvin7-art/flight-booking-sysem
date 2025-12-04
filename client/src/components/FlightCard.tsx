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
    <div className="bg-white rounded-3xl shadow-soft hover:shadow-soft-lg transition p-8">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-2xl">
              <Plane className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{flight.airline}</h3>
              <p className="text-sm text-gray-500">{flight.flightNumber}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div>
              <p className="text-3xl font-bold text-gray-900">{flight.origin}</p>
              <p className="text-sm text-gray-500 mt-1">
                {format(new Date(flight.departureTime), 'HH:mm')}
              </p>
              <p className="text-xs text-gray-400">
                {format(new Date(flight.departureTime), 'MMM dd')}
              </p>
            </div>
            
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full h-0.5 bg-gray-300 relative">
                <Plane className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 rotate-90" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Direct</p>
            </div>
            
            <div>
              <p className="text-3xl font-bold text-gray-900">{flight.destination}</p>
              <p className="text-sm text-gray-500 mt-1">
                {format(new Date(flight.arrivalTime), 'HH:mm')}
              </p>
              <p className="text-xs text-gray-400">
                {format(new Date(flight.arrivalTime), 'MMM dd')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col justify-between items-end">
          <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
            flight.availableSeats < 10 
              ? 'bg-yellow-100 text-yellow-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {flight.availableSeats} seats left
          </span>
          <div className="text-right mt-4">
            <p className="text-sm text-gray-500">From</p>
            <p className="text-4xl font-bold text-blue-600">${flight.price}</p>
            <p className="text-xs text-gray-400 mb-4">per person</p>
            <button 
              onClick={() => navigate(`/booking/${flight._id}`)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 transition shadow-lg shadow-blue-500/30"
            >
              Book Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
