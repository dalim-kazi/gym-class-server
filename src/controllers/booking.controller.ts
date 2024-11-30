import { Request, Response, NextFunction } from 'express';
import {
  createBookingService,
  cancelBookingService,
  deleteBookingService,
  getBookingsService
} from '@/services/booking.service';
import {  sendResponse } from '@/libs/response';

// Controller to create a new booking
export const createBookingController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { traineeId, classScheduleId } = req.body;
    const booking = await createBookingService(traineeId, classScheduleId);
    // Sending success response
    sendResponse.post(res, 'Booking', booking);
  } catch (error) {
    next(error);
  }
};

// Controller to cancel an existing booking
export const cancelBookingController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const  bookingId  = req.params.id as string;
    const traineeId = req.query.traineeId as string
    const booking = await cancelBookingService(traineeId, bookingId);
    // Sending success response
    sendResponse.update(res, booking, 'Booking');
  } catch (error) {
    next(error);
  }
};

// Controller to delete a booking
export const deleteBookingController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const  bookingId  = req.params.id as string;
    const traineeId = req.query.traineeId as string
    const response = await deleteBookingService(traineeId, bookingId);
    // Sending success response
    sendResponse.deleteRes(res, response, 'Booking');
  } catch (error) {
    next(error);
  }
};

// Controller to get all bookings for a trainee with pagination
export const getBookingsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { page, limit } = req.query;
    const traineeId =req.query.traineeId as string
    const pageNumber = parseInt(page as string, 10) || 1;  
    const pageSize = parseInt(limit as string, 10) || 10;  
    const { bookings, pagination } = await getBookingsService(traineeId, pageNumber, pageSize);
    // Sending success response
    sendResponse.get(res, bookings, 'Bookings', pagination);
  } catch (error) {
    next(error);
  }
};
