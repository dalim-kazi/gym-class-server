import { sendError } from "@/libs/response";
import Booking from "@/models/booking.model";
import ClassSchedule, { IClassSchedule } from "@/models/class.schedule.model";
import { IPagination } from "@/types/response";
import { getPagination } from "@/utils/getPagination";

// Create a new booking
export const createBookingService = async (traineeId: string, classScheduleId: string) => {
  const classSchedule: IClassSchedule | null = await ClassSchedule.findById(classScheduleId);
  if (!classSchedule) {
    sendError.notFound('Class schedule');
    return;
  }
  // Check if the class is already full
  if (classSchedule.bookedTrainees >= classSchedule.maxTrainees) {
    sendError.bookingLimitExceeded();
    return;
  }

  // Check if the trainee has already booked the class
  const existingBooking = await Booking.findOne({ trainee: traineeId, classSchedule: classScheduleId });
  if (existingBooking) {
    sendError.duplicate('Booking');
    return;
  }

  // Create the booking
  const booking = new Booking({
    trainee: traineeId,
    classSchedule: classScheduleId,
    status: 'booked',
  });

  // Update the class schedule's bookedTrainees count
  classSchedule.bookedTrainees += 1;
  await classSchedule.save();
  await booking.save();
  return booking;
};

// Cancel a booking
export const cancelBookingService = async (traineeId: string, bookingId: string) => {
  const booking = await Booking.findOne({ _id: bookingId, trainee: traineeId });
  if (!booking) {
    sendError.notFound('Booking not found or unauthorized');
    return;
  }
  // Cancel the booking
  booking.status = 'cancelled';
  await booking.save();

  // Update the class schedule's bookedTrainees count
  const classSchedule = await ClassSchedule.findById(booking.classSchedule);
  if (classSchedule) {
    classSchedule.bookedTrainees -= 1;
    await classSchedule.save();
  }
  return booking;
};

// Delete a booking
export const deleteBookingService = async (traineeId: string, bookingId: string) => {
  const booking = await Booking.findOne({ _id: bookingId, trainee: traineeId });
  if (!booking) {
    sendError.notFound('Booking not found or unauthorized');
    return;
  }
  // Delete the booking
  await Booking.findByIdAndDelete(bookingId);
  // Update the class schedule's bookedTrainees count
  const classSchedule = await ClassSchedule.findById(booking.classSchedule);
  if (classSchedule) {
    classSchedule.bookedTrainees -= 1;
    await classSchedule.save();
  }
  return { message: "Booking deleted successfully" };
};

// Get all bookings for a trainee with pagination
export const getBookingsService = async (
  traineeId: string,
  page: number,
  limit: number
) => {

  const skip = (page - 1) * limit;
  // Fetch bookings and count total
  const bookings = await Booking.find({ trainee: traineeId })
    .populate('classSchedule')
    .skip(skip)
    .limit(limit);
  const totalBookings = await Booking.countDocuments({ trainee: traineeId });
  // Generate pagination data
  const pagination: IPagination = getPagination(totalBookings, page, limit);
  return {
    bookings,
    pagination,
  };
};
