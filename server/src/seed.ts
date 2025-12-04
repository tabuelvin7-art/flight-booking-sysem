import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Flight from './models/Flight';
import Destination from './models/Destination';
import User from './models/User';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/flight-booking';

const sampleFlights = [
  {
    airline: 'Emirates',
    flightNumber: 'EK123',
    origin: 'Dubai',
    destination: 'New York',
    departureTime: new Date('2024-12-15T14:30:00'),
    arrivalTime: new Date('2024-12-15T20:45:00'),
    price: 850,
    availableSeats: 180,
    totalSeats: 200,
    class: 'economy',
    status: 'scheduled'
  },
  {
    airline: 'Qatar Airways',
    flightNumber: 'QR456',
    origin: 'Doha',
    destination: 'London',
    departureTime: new Date('2024-12-16T08:00:00'),
    arrivalTime: new Date('2024-12-16T13:30:00'),
    price: 720,
    availableSeats: 150,
    totalSeats: 180,
    class: 'economy',
    status: 'scheduled'
  },
  {
    airline: 'Singapore Airlines',
    flightNumber: 'SQ789',
    origin: 'Singapore',
    destination: 'Tokyo',
    departureTime: new Date('2024-12-17T10:15:00'),
    arrivalTime: new Date('2024-12-17T17:45:00'),
    price: 650,
    availableSeats: 200,
    totalSeats: 220,
    class: 'economy',
    status: 'scheduled'
  },
  {
    airline: 'Lufthansa',
    flightNumber: 'LH234',
    origin: 'Frankfurt',
    destination: 'Paris',
    departureTime: new Date('2024-12-18T06:30:00'),
    arrivalTime: new Date('2024-12-18T08:00:00'),
    price: 180,
    availableSeats: 120,
    totalSeats: 150,
    class: 'economy',
    status: 'scheduled'
  },
  {
    airline: 'British Airways',
    flightNumber: 'BA567',
    origin: 'London',
    destination: 'Dubai',
    departureTime: new Date('2024-12-19T22:00:00'),
    arrivalTime: new Date('2024-12-20T08:30:00'),
    price: 780,
    availableSeats: 160,
    totalSeats: 190,
    class: 'economy',
    status: 'scheduled'
  },
  {
    airline: 'Air France',
    flightNumber: 'AF890',
    origin: 'Paris',
    destination: 'New York',
    departureTime: new Date('2024-12-20T11:00:00'),
    arrivalTime: new Date('2024-12-20T14:30:00'),
    price: 920,
    availableSeats: 140,
    totalSeats: 170,
    class: 'business',
    status: 'scheduled'
  },
  {
    airline: 'Turkish Airlines',
    flightNumber: 'TK345',
    origin: 'Istanbul',
    destination: 'Singapore',
    departureTime: new Date('2024-12-21T15:45:00'),
    arrivalTime: new Date('2024-12-22T06:15:00'),
    price: 890,
    availableSeats: 170,
    totalSeats: 200,
    class: 'economy',
    status: 'scheduled'
  },
  {
    airline: 'Etihad Airways',
    flightNumber: 'EY678',
    origin: 'Abu Dhabi',
    destination: 'Sydney',
    departureTime: new Date('2024-12-22T23:30:00'),
    arrivalTime: new Date('2024-12-23T19:00:00'),
    price: 1150,
    availableSeats: 190,
    totalSeats: 220,
    class: 'economy',
    status: 'scheduled'
  },
  {
    airline: 'Cathay Pacific',
    flightNumber: 'CX901',
    origin: 'Hong Kong',
    destination: 'Los Angeles',
    departureTime: new Date('2024-12-23T16:20:00'),
    arrivalTime: new Date('2024-12-23T13:45:00'),
    price: 980,
    availableSeats: 165,
    totalSeats: 195,
    class: 'business',
    status: 'scheduled'
  },
  {
    airline: 'KLM',
    flightNumber: 'KL234',
    origin: 'Amsterdam',
    destination: 'Tokyo',
    departureTime: new Date('2024-12-24T12:00:00'),
    arrivalTime: new Date('2024-12-25T08:30:00'),
    price: 1050,
    availableSeats: 155,
    totalSeats: 180,
    class: 'economy',
    status: 'scheduled'
  }
];

const sampleDestinations = [
  {
    name: 'Paris',
    country: 'France',
    description: 'The City of Light, famous for the Eiffel Tower, art museums, and romantic atmosphere',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    rating: 4.8
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    description: 'A vibrant metropolis blending ancient traditions with cutting-edge technology',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    rating: 4.9
  },
  {
    name: 'Dubai',
    country: 'UAE',
    description: 'A modern oasis with stunning skyscrapers, luxury shopping, and desert adventures',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    rating: 4.7
  },
  {
    name: 'New York',
    country: 'USA',
    description: 'The city that never sleeps, home to iconic landmarks and diverse culture',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    rating: 4.6
  },
  {
    name: 'London',
    country: 'United Kingdom',
    description: 'Historic capital with royal palaces, world-class museums, and vibrant culture',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
    rating: 4.7
  },
  {
    name: 'Singapore',
    country: 'Singapore',
    description: 'A futuristic city-state known for its cleanliness, gardens, and diverse cuisine',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800',
    rating: 4.8
  },
  {
    name: 'Sydney',
    country: 'Australia',
    description: 'Harbor city famous for the Opera House, beaches, and outdoor lifestyle',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800',
    rating: 4.7
  },
  {
    name: 'Barcelona',
    country: 'Spain',
    description: 'Mediterranean gem with Gaudí architecture, beaches, and vibrant nightlife',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800',
    rating: 4.6
  },
  {
    name: 'Istanbul',
    country: 'Turkey',
    description: 'Where East meets West, rich in history, culture, and stunning architecture',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800',
    rating: 4.5
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    description: 'Tropical paradise with beautiful beaches, temples, and lush rice terraces',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    rating: 4.9
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await Flight.deleteMany({});
    await Destination.deleteMany({});
    console.log('Existing data cleared');

    // Insert flights
    console.log('Inserting flights...');
    const flights = await Flight.insertMany(sampleFlights);
    console.log(`✅ ${flights.length} flights inserted`);

    // Insert destinations
    console.log('Inserting destinations...');
    const destinations = await Destination.insertMany(sampleDestinations);
    console.log(`✅ ${destinations.length} destinations inserted`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\nSummary:');
    console.log(`- Flights: ${flights.length}`);
    console.log(`- Destinations: ${destinations.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
