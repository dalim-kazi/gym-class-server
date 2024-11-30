import { Router } from 'express';
import authRouter from './auth.routes';
import bookingRouter from './booking.routes';
import classScheduleRouter from './class.schedule.routes';
const router = Router();

// Routes
router.use('/auth', authRouter);
router.use('/booking', bookingRouter);
router.use('/class-schedule', classScheduleRouter);

export default router;
