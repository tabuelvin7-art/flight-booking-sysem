import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Plane, Ticket, ChevronRight, ChevronLeft } from 'lucide-react';
import api from '../api/axios';

export default function Home() {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const { data } = await api.get('/destinations');
      setDestinations(data);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-100 via-blue-50 to-white px-6 lg:px-8 pt-12 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-5xl shadow-soft-lg overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 items-center p-8 lg:p-12">
              <div>
                <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-4">
                  EMBARK YOUR TRAVEL JOURNEY
                </p>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                  Experience<br />
                  The Magic Of<br />
                  Flight!
                </h1>
                <button 
                  onClick={() => navigate('/flights')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-medium inline-flex items-center gap-2 transition shadow-lg shadow-blue-500/30"
                >
                  Book A Trip Now
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                {/* Partner Logos */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-4">Follow us:</p>
                  <div className="flex items-center gap-6 text-gray-400">
                    <span className="text-sm">Facebook</span>
                    <span className="text-sm">Instagram</span>
                    <span className="text-sm">Twitter</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative rounded-4xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80" 
                    alt="Airplane" 
                    className="w-full h-[400px] object-cover"
                  />
                </div>
                
                {/* Info Card */}
                <div className="absolute bottom-4 right-4 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-xl">
                      <Plane className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Know More</p>
                      <p className="font-bold text-sm">Amazing Places</p>
                      <p className="text-xs text-gray-400">Discover 100+ destinations</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Popular Destination</h2>
            <p className="text-gray-600">Unleash Your Wanderlust With Skyline Travels</p>
          </div>
          <div className="flex gap-2">
            <button className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-3 bg-gray-900 text-white rounded-full shadow-md hover:shadow-lg transition">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinations.slice(0, 3).map((dest: any) => (
            <div key={dest._id} className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-lg transition group">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{dest.name}</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{dest.country}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{dest.description?.slice(0, 30)}...</span>
                  <span className="bg-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                    {dest.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Journey Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Journey To The Skies Made Simple!</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Traveling Is A Transformative Experience That Allows You To Explore New Places, Cultures, And Perspectives.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 text-center shadow-soft hover:shadow-soft-lg transition">
            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Find Your Destination</h3>
            <p className="text-gray-600 text-sm">Explore amazing destinations around the world</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-center text-white shadow-soft-lg">
            <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Ticket className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Book A Ticket</h3>
            <p className="text-blue-100 text-sm mb-6">
              Traveling Is A Transformative Way To Explore New Places And Cultures
            </p>
            <button 
              onClick={() => navigate('/flights')}
              className="bg-white text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-blue-50 transition"
            >
              LEARN MORE
            </button>
          </div>
          
          <div className="bg-white rounded-3xl p-8 text-center shadow-soft hover:shadow-soft-lg transition">
            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Plane className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Pay & Start Journey</h3>
            <p className="text-gray-600 text-sm">Complete payment and begin your adventure</p>
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-5xl overflow-hidden shadow-soft-lg">
          <div className="grid lg:grid-cols-2 gap-8 items-center p-8 lg:p-12">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" 
                alt="Beach vacation" 
                className="rounded-4xl shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
            
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                UNLEASH<br />
                WANDERLUST WITH<br />
                SKYLINE TRAVELS
              </h2>
              <p className="text-gray-600 mb-8">
                Traveling Is A Wonderful Way To Explore New Places, Learn About Different Cultures, And Create Lasting Memories.
              </p>
              <div className="bg-blue-100 rounded-3xl p-6 mb-8">
                <p className="text-4xl font-bold text-blue-600 mb-2">20% OFF</p>
                <p className="text-sm text-gray-600">On All Destinations</p>
              </div>
              <button 
                onClick={() => navigate('/flights')}
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-medium inline-flex items-center gap-2 transition"
              >
                Book A Flight Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
