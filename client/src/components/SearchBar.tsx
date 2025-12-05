import { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    origin: '',
    destination: '',
    date: '',
    passengers: 1
  });

  const handleSearch = () => {
    const params = new URLSearchParams(searchData as any).toString();
    navigate(`/flights?${params}`);
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-soft-lg p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">From</label>
          <div className="relative">
            <MapPin className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Origin city"
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={searchData.origin}
              onChange={(e) => setSearchData({...searchData, origin: e.target.value})}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">To</label>
          <div className="relative">
            <MapPin className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Destination city"
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={searchData.destination}
              onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="date"
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={searchData.date}
              onChange={(e) => setSearchData({...searchData, date: e.target.value})}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Passengers</label>
          <div className="relative">
            <Users className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="number"
              min="1"
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={searchData.passengers}
              onChange={(e) => setSearchData({...searchData, passengers: parseInt(e.target.value)})}
            />
          </div>
        </div>
      </div>
      <button 
        onClick={handleSearch}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 sm:py-4 rounded-full text-sm sm:text-base font-medium inline-flex items-center justify-center gap-2 transition shadow-lg shadow-blue-500/30"
      >
        <Search className="w-4 h-4 sm:w-5 sm:h-5" />
        Search Flights
      </button>
    </div>
  );
}
