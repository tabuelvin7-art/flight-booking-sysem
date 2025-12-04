import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  flight: mongoose.Types.ObjectId;
  passengers: Array<{
    name: string;
    age: number;
    gender: string;
  }>;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  bookingDate: Date;
  paymentStatus: 'pending' | 'completed' | 'failed';
}

const bookingSchema = new Schema<IBooking>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  flight: { type: Schema.Types.ObjectId, ref: 'Flight', required: true },
  passengers: [{
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true }
  }],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  bookingDate: { type: Date, default: Date.now },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' }
});

export default mongoose.model<IBooking>('Booking', bookingSchema);
