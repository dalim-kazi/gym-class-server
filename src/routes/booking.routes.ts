import { cancelBookingController, createBookingController, deleteBookingController, getBookingsController } from '@/controllers/booking.controller';
import { authenticate } from '@/middlewares/authorization';
import express from 'express';
const bookingRouter = express.Router();

// Route to create a new trainer
bookingRouter.route('/')
.post(authenticate(['admin',"trainee",'trainer']),createBookingController)
.get(authenticate(['admin',"trainee",'trainer']),getBookingsController);

// Route to get a trainer by ID
bookingRouter.route('/:id')
.patch(authenticate(['admin',"trainee",'trainer']),cancelBookingController)
.delete(authenticate(['admin',"trainee",'trainer']),deleteBookingController);

export default bookingRouter;