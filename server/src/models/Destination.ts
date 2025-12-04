import mongoose, { Document, Schema } from 'mongoose';

export interface IDestination extends Document {
  name: string;
  country: string;
  description: string;
  image: string;
  rating: number;
  popularityScore: number;
}

const destinationSchema = new Schema<IDestination>({
  name: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, default: 4.5 },
  popularityScore: { type: Number, default: 0 }
});

export default mongoose.model<IDestination>('Destination', destinationSchema);
