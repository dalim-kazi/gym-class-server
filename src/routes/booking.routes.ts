import {
    createBookingController,
    deleteBookingController,
    getBookingsController,
    updateBookingStatusController
} from '@/controllers/booking.controller';
import { authenticate } from '@/middlewares/authorization';
import express from 'express';
const bookingRouter = express.Router();

// Route to create a new trainer
bookingRouter
    .route('/')
    .post(authenticate(['admin', 'trainee', 'trainer']), createBookingController)
    .get(authenticate(['admin', 'trainee', 'trainer']), getBookingsController);

// Route to get a trainer by ID
bookingRouter
    .route('/:id')
    .patch(authenticate(['admin', 'trainee', 'trainer']), updateBookingStatusController)
    .delete(authenticate(['admin', 'trainee', 'trainer']), deleteBookingController);

export default bookingRouter;
