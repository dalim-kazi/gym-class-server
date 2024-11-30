import mongoose, { Schema, Document } from 'mongoose';

// ClassSchedule interface with the required fields
export interface IClassSchedule extends Document {
  className: string;
  trainer: mongoose.Schema.Types.ObjectId; 
  day: Date;
  maxTrainees: number; 
  bookedTrainees: number; 
}

// ClassSchedule Schema definition
const classScheduleSchema = new Schema<IClassSchedule>({
  className: { type: String, required: true },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  day: { type: Date, required: true },
  maxTrainees: { type: Number, default: 10 },
  bookedTrainees: { type: Number, default: 0 } 
});

// Create and export the model
const ClassSchedule = mongoose.model<IClassSchedule>('ClassSchedule', classScheduleSchema);
export default ClassSchedule;
