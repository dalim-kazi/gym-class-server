import mongoose, { Schema, Document } from 'mongoose';

// Booking interface to track trainee and class schedule
export interface IBooking extends Document {
  trainee: mongoose.Schema.Types.ObjectId; 
  classSchedule: mongoose.Schema.Types.ObjectId; 
  status: 'booked' | 'cancelled';
  bookingDate: Date;
}

// Booking Schema definition
const bookingSchema = new Schema<IBooking>({
  trainee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  classSchedule: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassSchedule', required: true },
  status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' },
  bookingDate: { type: Date, default: Date.now }
});

// Create and export the model
const Booking = mongoose.model<IBooking>('Booking', bookingSchema);
export default Booking;
