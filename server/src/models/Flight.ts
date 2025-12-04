import mongoose, { Document, Schema } from 'mongoose';

export interface IFlight extends Document {
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: Date;
  arrivalTime: Date;
  price: number;
  availableSeats: number;
  totalSeats: number;
  class: 'economy' | 'business' | 'first';
  status: 'scheduled' | 'delayed' | 'cancelled';
}

const flightSchema = new Schema<IFlight>({
  flightNumber: { type: String, required: true, unique: true },
  airline: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  price: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  totalSeats: { type: Number, required: true },
  class: { type: String, enum: ['economy', 'business', 'first'], default: 'economy' },
  status: { type: String, enum: ['scheduled', 'delayed', 'cancelled'], default: 'scheduled' }
});

export default mongoose.model<IFlight>('Flight', flightSchema);
