import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the Trainer interface for TypeScript
export interface ITrainer extends Document {
  name: string;
  email: string;
  phone: string;
  specialization: string;
}

// Define the Trainer schema
const trainerSchema: Schema<ITrainer> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Export the Trainer model
const Trainer: Model<ITrainer> = mongoose.model<ITrainer>('Trainer', trainerSchema);
export default Trainer;
