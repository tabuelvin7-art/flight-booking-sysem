import { MapPin } from 'lucide-react';

interface DestinationCardProps {
  destination: {
    _id: string;
    name: string;
    country: string;
    description: string;
    image: string;
    rating: number;
  };
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-lg transition group cursor-pointer">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={destination.image} 
          alt={destination.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2">{destination.name}</h3>
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{destination.country}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 line-clamp-1">{destination.description}</span>
          <span className="bg-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-medium flex-shrink-0 ml-2">
            {destination.rating}
          </span>
        </div>
      </div>
    </div>
  );
}
