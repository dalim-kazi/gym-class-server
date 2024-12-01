import { CustomError } from "@/libs/customError";
import { sendError } from "@/libs/response";
import ClassSchedule, { IClassSchedule } from "@/models/class.schedule.model";
import { IPagination } from "@/types/response";
import { deleteByIdService, getByIdService } from "@/utils/findById.service";
import { getPagination } from "@/utils/getPagination";
import { Types } from "mongoose";

// Create a new class schedule
export const createClassScheduleService = async (
  className: string,
  trainer: string,
  day: Date,
  maxTrainees: number = 10,
): Promise<IClassSchedule> => {
  // Check if the maximum of 5 classes per day has been reached
  const existingSchedules = await ClassSchedule.countDocuments({ day: { $eq: day } });
  if (existingSchedules >= 5) {
    throw new CustomError('Max 5 classes can be scheduled per day', 404);
  }
  // Create the class schedule
  const classSchedule = await new ClassSchedule({
    className,
    trainer,
    day,
    maxTrainees,
    bookedTrainees: 0,
  }).save();
  return classSchedule;
};

// Update an existing class schedule
 export const updateClassScheduleService = async (
  id: string,       
  className: string, 
  trainer: string,   
  day: Date,        
  maxTrainees: number, 
): Promise<IClassSchedule> => {
  const objectId = new Types.ObjectId(id);     
  const trainerId = new Types.ObjectId(trainer);
  // Find the class schedule by ID
  const classSchedule: IClassSchedule | any = await ClassSchedule.findById(objectId);
  if (!classSchedule) {
    throw new CustomError('Class schedule not found', 404);
  }
  // Update the class schedule fields
  classSchedule.className = className;
  classSchedule.trainer = trainerId; 
  classSchedule.day = day;
  classSchedule.maxTrainees = maxTrainees;
  await classSchedule.save();
  // Return the updated class schedule
  return classSchedule;
};

// Delete a class schedule by ID
export const deleteClassScheduleService = async (id: string) => {
  return await deleteByIdService(id, ClassSchedule, 'Class schedule not found');
};

// get a class schedule by ID
export const getByIdClassScheduleService = async (id: string) => {
  return await getByIdService(id, ClassSchedule, 'Class schedule not found');
};

// Get all bookings for a trainee with pagination
export const getClassScheduleService = async (
  page: number,
  limit: number
) => {
  const skip = (page - 1) * limit;
  // Fetch bookings and count total
  const bookings = await ClassSchedule.find()
    .populate('trainer', 'fullName email')
    .skip(skip)
    .limit(limit);
  const totalBookings = await ClassSchedule.countDocuments();
  // Generate pagination data
  const pagination: IPagination = getPagination(totalBookings, page, limit);
  return {
    bookings,
    pagination,
  };
};