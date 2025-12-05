import { Plane, Calendar, Users, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import Card from './Card';
import Badge from './Badge';

interface BookingCardProps {
  booking: {
    _id: string;
    flight: {
      airline: string;
      flightNumber: string;
      origin: string;
      destination: string;
      departureTime: string;
      arrivalTime: string;
    };
    passengers: any[];
    totalPrice: number;
    status: string;
    bookingDate: string;
  };
}

export default function BookingCard({ booking }: BookingCardProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  return (
    <Card hover padding="lg">
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
                <Plane className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg sm:text-xl">{booking.flight.airline}</h3>
                <p className="text-xs sm:text-sm text-gray-500">{booking.flight.flightNumber}</p>
              </div>
            </div>
            <Badge variant={getStatusVariant(booking.status)}>
              {booking.status.toUpperCase()}
            </Badge>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
              <span className="font-semibold">{booking.flight.origin}</span>
              <span className="text-gray-400">→</span>
              <span className="font-semibold">{booking.flight.destination}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
              <span className="break-words">Departure: {format(new Date(booking.flight.departureTime), 'PPp')}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
              <span>{booking.passengers.length} Passenger{booking.passengers.length > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-row sm:flex-col justify-between lg:justify-between items-center sm:items-end gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l lg:pl-6">
          <div className="text-left sm:text-right">
            <p className="text-xs sm:text-sm text-gray-500">Total Price</p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600">${booking.totalPrice}</p>
          </div>
          <p className="text-xs text-gray-400 whitespace-nowrap">
            Booked on {format(new Date(booking.bookingDate), 'PP')}
          </p>
        </div>
      </div>
    </Card>
  );
}
