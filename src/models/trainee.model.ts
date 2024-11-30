import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the Trainer interface for TypeScript
export interface ITrainee extends Document {
    name: string;
    email: string;
    phone: string;
    membershipType: string;
    startDate:Date;
    endDate:Date
  }

const traineeSchema:Schema<ITrainee> = new mongoose.Schema({
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
  membershipType: {
    type: String,
    enum: ['monthly', 'quarterly', 'yearly'],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

const Trainee:Model<ITrainee> = mongoose.model<ITrainee>('Trainee', traineeSchema);
export default Trainee;